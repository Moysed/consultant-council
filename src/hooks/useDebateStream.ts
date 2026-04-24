"use client";

import { useState, useCallback, useRef } from "react";
import type { Turn, SessionSummary } from "@/types";

interface UseDebateStreamOptions {
  onTurn?: (turn: Turn) => void;
  onComplete?: (summary: SessionSummary | null) => void;
  onError?: (error: string) => void;
  turnDelay?: number; // ms between turns for dramatic pacing
}

export function useDebateStream(options: UseDebateStreamOptions = {}) {
  const { onTurn, onComplete, onError, turnDelay = 800 } = options;
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const turnQueueRef = useRef<Turn[]>([]);
  const processingRef = useRef(false);

  const processTurnQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    while (turnQueueRef.current.length > 0) {
      const turn = turnQueueRef.current.shift()!;

      // Parse summary if it's the summary turn
      if (turn.type === "summary") {
        try {
          const parsed =
            typeof turn.content === "string"
              ? JSON.parse(turn.content)
              : turn.content;
          setSummary(parsed);
          onComplete?.(parsed);
        } catch {
          // Summary content is plain text
          setSummary({
            agrees: [],
            splits: [],
            recommendation: turn.content,
            risk: "",
          });
          onComplete?.(null);
        }
      }

      setTurns((prev) => [...prev, turn]);
      onTurn?.(turn);

      // Dramatic pacing delay
      if (turnQueueRef.current.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, turnDelay));
      }
    }

    processingRef.current = false;
  }, [onTurn, onComplete, turnDelay]);

  const startDebate = useCallback(
    async (sessionId: string) => {
      setTurns([]);
      setSummary(null);
      setIsStreaming(true);
      turnQueueRef.current = [];

      try {
        const response = await fetch(`/api/session/${sessionId}/debate`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") {
                setIsStreaming(false);
                return;
              }
              try {
                const turn: Turn = JSON.parse(data);
                turnQueueRef.current.push(turn);
                processTurnQueue();
              } catch {
                // Skip malformed data
              }
            }
          }
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Stream failed";
        onError?.(message);
      } finally {
        setIsStreaming(false);
      }
    },
    [onError, processTurnQueue]
  );

  const reset = useCallback(() => {
    setTurns([]);
    setSummary(null);
    setIsStreaming(false);
    turnQueueRef.current = [];
  }, []);

  return { turns, isStreaming, summary, startDebate, reset };
}
