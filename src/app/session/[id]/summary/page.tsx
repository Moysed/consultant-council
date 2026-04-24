import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getConsultantsByIds } from "@/lib/consultants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Session, SessionSummary, Turn } from "@/types";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!session) redirect("/dashboard");

  const typedSession = session as Session;
  const consultants = getConsultantsByIds(typedSession.consultant_ids);

  const { data: turns } = await supabase
    .from("turns")
    .select("*")
    .eq("session_id", id)
    .order("turn_order", { ascending: true });

  const summaryTurn = (turns as Turn[])?.find((t) => t.type === "summary");
  let summary: SessionSummary | null = typedSession.summary;

  if (!summary && summaryTurn) {
    try {
      summary = JSON.parse(summaryTurn.content);
    } catch {
      summary = {
        agrees: [],
        splits: [],
        recommendation: summaryTurn.content,
        risk: "",
      };
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-border px-6 py-4 flex items-center gap-3">
        <Link href={`/session/${id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Boardroom
          </Button>
        </Link>
        <Separator orientation="vertical" className="h-5" />
        <span className="text-sm font-medium">Executive Summary</span>
      </nav>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        {/* Question */}
        <h1 className="text-2xl font-bold mb-6">{typedSession.question}</h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground">
            {typedSession.language === "th" ? "🇹🇭 Thai" : "🇺🇸 English"}
          </span>
          <span className="text-muted-foreground">&middot;</span>
          <span className="text-sm text-muted-foreground">
            {new Date(typedSession.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Advisors */}
        <div className="mb-8">
          <p className="text-xs tracking-wider text-muted-foreground uppercase mb-3">
            Advisors Present
          </p>
          <div className="flex flex-wrap gap-2">
            {consultants.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .filter((ch) => ch === ch.toUpperCase())
                    .slice(0, 2)
                    .join("")}
                </div>
                <span className="text-sm">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tensions */}
        {typedSession.tensions.length > 0 && (
          <div className="mb-8">
            <p className="text-xs tracking-wider text-muted-foreground uppercase mb-3">
              Active Tensions
            </p>
            <div className="flex flex-wrap gap-2">
              {typedSession.tensions.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* Summary */}
        {summary ? (
          <div className="space-y-6">
            {summary.agrees && summary.agrees.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-emerald-400 mb-2">
                  The room agrees on:
                </p>
                <ul className="space-y-1">
                  {summary.agrees.map((point, i) => (
                    <li key={i} className="text-sm pl-4">
                      &bull; {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary.splits && summary.splits.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-amber-400 mb-2">
                  The room splits on:
                </p>
                <ul className="space-y-1">
                  {summary.splits.map((point, i) => (
                    <li key={i} className="text-sm pl-4">
                      &bull; {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary.recommendation && (
              <div>
                <p className="text-sm font-semibold text-blue-400 mb-1">
                  Recommended action:
                </p>
                <p className="text-sm pl-4">{summary.recommendation}</p>
              </div>
            )}

            {summary.risk && (
              <div>
                <p className="text-sm font-semibold text-red-400 mb-1">
                  Risk if you don&apos;t act:
                </p>
                <p className="text-sm pl-4">{summary.risk}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No summary available yet. The debate may still be in progress.
          </p>
        )}

        {/* Full transcript link */}
        <Separator className="my-8" />
        <div className="flex justify-center gap-4">
          <Link href={`/session/${id}`}>
            <Button variant="outline">View Full Debate</Button>
          </Link>
          <Link href="/session/new">
            <Button>New Session</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
