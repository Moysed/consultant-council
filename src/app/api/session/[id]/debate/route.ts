import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { generateDebate } from "@/lib/ai/generate-debate";
import { getConsultantsByIds } from "@/lib/consultants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get session
  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!session) {
    return new Response("Session not found", { status: 404 });
  }

  // Update status
  await supabase
    .from("sessions")
    .update({ status: "debating" })
    .eq("id", id);

  const consultants = getConsultantsByIds(session.consultant_ids);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const turns = generateDebate(
          session.question,
          consultants,
          session.tensions,
          session.language as "en" | "th"
        );

        for await (const turn of turns) {
          // Save turn to DB
          await supabase.from("turns").insert({
            session_id: id,
            turn_order: turn.turn_order,
            type: turn.type,
            speaker: turn.speaker,
            content: turn.content,
            action: turn.action || null,
            target: turn.target || null,
            is_signature: turn.is_signature || false,
          });

          // Send SSE
          const data = JSON.stringify(turn);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }

        // Update session status
        await supabase
          .from("sessions")
          .update({ status: "completed" })
          .eq("id", id);

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Debate stream error:", err);
        await supabase
          .from("sessions")
          .update({ status: "error" })
          .eq("id", id);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Stream failed" })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
