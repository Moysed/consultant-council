"use client";

import { useState, useCallback, useEffect } from "react";
import type { Turn } from "@/types";

export type AvatarState = "idle" | "speaking" | "interrupted" | "listening";

interface AvatarAnimationState {
  consultantName: string;
  state: AvatarState;
}

export function useBoardroomAnimation(turns: Turn[]) {
  const [avatarStates, setAvatarStates] = useState<
    Map<string, AvatarAnimationState>
  >(new Map());
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const updateSpeaker = useCallback(
    (turn: Turn) => {
      const speaker = turn.speaker;
      if (speaker === "Host") return;

      setActiveSpeaker(speaker);

      setAvatarStates((prev) => {
        const next = new Map(prev);

        // Set all current speakers to idle/listening
        for (const [name, state] of next) {
          if (state.state === "speaking") {
            next.set(name, { ...state, state: "listening" });
          }
        }

        // Handle interruption
        if (turn.type === "interruption" && turn.target) {
          const targetState = next.get(turn.target);
          if (targetState) {
            next.set(turn.target, {
              ...targetState,
              state: "interrupted",
            });
          }
        }

        // Set current speaker
        next.set(speaker, {
          consultantName: speaker,
          state: "speaking",
        });

        return next;
      });

      // Reset interrupted state after animation
      if (turn.type === "interruption" && turn.target) {
        setTimeout(() => {
          setAvatarStates((prev) => {
            const next = new Map(prev);
            const targetState = next.get(turn.target!);
            if (targetState?.state === "interrupted") {
              next.set(turn.target!, {
                ...targetState,
                state: "listening",
              });
            }
            return next;
          });
        }, 600);
      }
    },
    []
  );

  // React to new turns
  useEffect(() => {
    const lastTurn = turns[turns.length - 1];
    if (lastTurn) {
      updateSpeaker(lastTurn);
    }
  }, [turns, updateSpeaker]);

  const getAvatarState = useCallback(
    (name: string): AvatarState => {
      return avatarStates.get(name)?.state ?? "idle";
    },
    [avatarStates]
  );

  return { activeSpeaker, getAvatarState };
}
