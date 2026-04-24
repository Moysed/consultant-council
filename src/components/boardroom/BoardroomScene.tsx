"use client";

import { BoardroomTable } from "./BoardroomTable";
import { ConsultantAvatar } from "./ConsultantAvatar";
import { DebateTranscript } from "./DebateTranscript";
import { ExecutiveSummary } from "./ExecutiveSummary";
import type { Consultant, Turn, SessionSummary } from "@/types";
import type { AvatarState } from "@/hooks/useBoardroomAnimation";

interface BoardroomSceneProps {
  consultants: Consultant[];
  turns: Turn[];
  summary: SessionSummary | null;
  isStreaming: boolean;
  getAvatarState: (name: string) => AvatarState;
}

// Position consultants around the oval table
function getPositions(count: number): { x: number; y: number }[] {
  switch (count) {
    case 2:
      return [
        { x: 25, y: 35 },
        { x: 75, y: 35 },
      ];
    case 3:
      return [
        { x: 20, y: 35 },
        { x: 80, y: 35 },
        { x: 50, y: 12 },
      ];
    case 4:
      return [
        { x: 20, y: 25 },
        { x: 80, y: 25 },
        { x: 25, y: 55 },
        { x: 75, y: 55 },
      ];
    default:
      return [{ x: 50, y: 30 }];
  }
}

export function BoardroomScene({
  consultants,
  turns,
  summary,
  isStreaming,
  getAvatarState,
}: BoardroomSceneProps) {
  const positions = getPositions(consultants.length);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-0">
      {/* Visual boardroom - left/top */}
      <div className="relative w-full lg:w-[45%] h-[300px] lg:h-full bg-gradient-to-b from-[#0a0a1a] to-[#111128] rounded-xl overflow-hidden shrink-0">
        <BoardroomTable isActive={isStreaming || turns.length > 0} />

        {consultants.map((c, i) => (
          <ConsultantAvatar
            key={c.id}
            consultant={c}
            state={getAvatarState(c.name)}
            position={positions[i]}
          />
        ))}

        {/* President indicator at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold mx-auto mb-1">
            YOU
          </div>
          <p className="text-[10px] text-amber-400/60 tracking-wider font-medium">
            THE PRESIDENT
          </p>
        </div>
      </div>

      {/* Transcript - right/bottom */}
      <div className="flex-1 min-h-0 flex flex-col bg-background border-l border-border">
        <div className="flex-1 min-h-0 overflow-hidden">
          <DebateTranscript turns={turns} consultants={consultants} />
        </div>

        {summary && <ExecutiveSummary summary={summary} />}

        {isStreaming && (
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              The council is deliberating...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
