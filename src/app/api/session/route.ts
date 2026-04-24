import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { selectConsultants } from "@/lib/ai/select-consultants";

export async function POST(request: Request) {
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { question } = await request.json();
  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }

  try {
    // Phase 1: Select consultants
    const selection = await selectConsultants(question);
    const language = /[\u0E00-\u0E7F]/.test(question) ? "th" : "en";

    // Create session in DB
    const { data: session, error } = await supabase
      .from("sessions")
      .insert({
        user_id: user.id,
        question,
        language,
        consultant_ids: selection.consultants.map((c) => c.id),
        tensions: selection.tensions,
        status: "selecting",
        summary: null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      session,
      selection,
    });
  } catch (err) {
    console.error("Session creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
