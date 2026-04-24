"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpeechBubble } from "./SpeechBubble";
import type { Turn, Consultant } from "@/types";

interface DebateTranscriptProps {
  turns: Turn[];
  consultants: Consultant[];
}

export function DebateTranscript({
  turns,
  consultants,
}: DebateTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const consultantMap = new Map(consultants.map((c) => [c.name, c]));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns.length]);

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-1">
        {turns.map((turn, i) => (
          <SpeechBubble
            key={i}
            turn={turn}
            consultant={consultantMap.get(turn.speaker)}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
