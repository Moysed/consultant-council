"use client";

import { motion } from "framer-motion";
import type { Turn } from "@/types";
import type { Consultant } from "@/types";

interface SpeechBubbleProps {
  turn: Turn;
  consultant?: Consultant;
}

export function SpeechBubble({ turn, consultant }: SpeechBubbleProps) {
  const isHost = turn.speaker === "Host";
  const isSummary = turn.type === "summary";

  if (isSummary) return null; // Rendered by ExecutiveSummary

  return (
    <motion.div
      className="flex gap-3 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Speaker indicator */}
      {!isHost && consultant && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1"
          style={{ backgroundColor: consultant.color }}
        >
          {turn.speaker.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
      )}

      <div className={`flex-1 ${isHost ? "pl-0" : ""}`}>
        {/* Speaker name + action */}
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="text-sm font-bold"
            style={{ color: isHost ? "#6366F1" : consultant?.color }}
          >
            {isHost ? "HOST" : turn.speaker}
          </span>
          {turn.type === "interruption" && (
            <span className="text-xs text-red-400 font-medium">
              interrupts {turn.target}
            </span>
          )}
          {turn.type === "rebuttal" && (
            <span className="text-xs text-amber-400 font-medium">
              rebuts {turn.target}
            </span>
          )}
        </div>

        {/* Stage direction */}
        {turn.action && (
          <p className="text-xs text-muted-foreground italic mb-1">
            *{turn.action}*
          </p>
        )}

        {/* Content */}
        <div
          className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
            isHost
              ? "bg-indigo-500/10 border border-indigo-500/20 text-foreground"
              : turn.type === "interruption"
                ? "bg-red-500/5 border border-red-500/20 text-foreground"
                : "bg-card border border-border text-foreground"
          }`}
        >
          {turn.is_signature && (
            <p className="text-xs text-muted-foreground font-medium mb-2 border-b border-border pb-2">
              &ldquo;{consultant?.signature}&rdquo;
            </p>
          )}
          <p className="whitespace-pre-wrap">{turn.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
