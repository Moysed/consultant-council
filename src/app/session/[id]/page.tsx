"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BoardroomScene } from "@/components/boardroom/BoardroomScene";
import { useDebateStream } from "@/hooks/useDebateStream";
import { useBoardroomAnimation } from "@/hooks/useBoardroomAnimation";
import { getConsultantsByIds } from "@/lib/consultants";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import type { Session, Consultant, Turn } from "@/types";

export default function BoardroomPage() {
  const params = useParams();
  const sessionId = params.id as string;
  const [session, setSession] = useState<Session | null>(null);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [existingTurns, setExistingTurns] = useState<Turn[]>([]);
  const [followUp, setFollowUp] = useState("");

  const { turns, isStreaming, summary, startDebate } = useDebateStream({
    turnDelay: 600,
  });

  const allTurns = [...existingTurns, ...turns];
  const { getAvatarState } = useBoardroomAnimation(allTurns);

  const loadSession = useCallback(async () => {
    const supabase = createClient();
    const { data: sess } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (sess) {
      setSession(sess as Session);
      setConsultants(getConsultantsByIds((sess as Session).consultant_ids));

      // Load existing turns if session already has data
      if (
        (sess as Session).status === "completed" ||
        (sess as Session).status === "debating"
      ) {
        const { data: turnData } = await supabase
          .from("turns")
          .select("*")
          .eq("session_id", sessionId)
          .order("turn_order", { ascending: true });

        if (turnData && turnData.length > 0) {
          setExistingTurns(turnData as Turn[]);
        }
      }
    }
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Auto-start debate for new sessions
  useEffect(() => {
    if (
      session &&
      session.status === "selecting" &&
      !isStreaming &&
      turns.length === 0
    ) {
      startDebate(sessionId);
    }
  }, [session, sessionId, isStreaming, turns.length, startDebate]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col">
        <nav className="border-b border-border px-6 py-4">
          <Skeleton className="w-48 h-6" />
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="w-96 h-64" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Session not found</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Compact nav */}
      <nav className="border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium truncate max-w-[300px]">
            {session.question}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {session.language === "th" ? "🇹🇭" : "🇺🇸"}
          <span className="text-xs text-muted-foreground">
            {consultants.map((c) => c.name).join(", ")}
          </span>
        </div>
      </nav>

      {/* Boardroom */}
      <div className="flex-1 min-h-0">
        <BoardroomScene
          consultants={consultants}
          turns={allTurns}
          summary={summary}
          isStreaming={isStreaming}
          getAvatarState={getAvatarState}
        />
      </div>

      {/* Follow-up bar (shown after debate ends) */}
      {!isStreaming && allTurns.length > 0 && (
        <div className="border-t border-border px-4 py-3 flex items-center gap-3 shrink-0">
          <Input
            placeholder={`"Call on [Name]", "Bring [Name] in", "Adjourn"...`}
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className="flex-1 bg-card"
            disabled
          />
          <Button size="sm" disabled>
            Send
          </Button>
          <span className="text-xs text-muted-foreground">
            Follow-ups coming soon
          </span>
        </div>
      )}
    </div>
  );
}
