import Anthropic from "@anthropic-ai/sdk";
import { buildDebatePrompt } from "./prompts";
import type { Consultant, Turn } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function* generateDebate(
  question: string,
  selectedConsultants: Consultant[],
  tensionNames: string[],
  language: "en" | "th"
): AsyncGenerator<Turn> {
  const prompt = buildDebatePrompt(question, selectedConsultants, tensionNames, language);

  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  let buffer = "";
  let turnOrder = 0;

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      buffer += event.delta.text;

      // Try to parse complete JSON lines
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const parsed = JSON.parse(trimmed);
          yield {
            turn_order: turnOrder++,
            type: parsed.type,
            speaker: parsed.speaker,
            content: parsed.content,
            action: parsed.action,
            target: parsed.target,
            is_signature: parsed.is_signature,
          };
        } catch {
          // Not a complete JSON line yet, skip
        }
      }
    }
  }

  // Process any remaining buffer
  if (buffer.trim()) {
    try {
      const parsed = JSON.parse(buffer.trim());
      yield {
        turn_order: turnOrder++,
        type: parsed.type,
        speaker: parsed.speaker,
        content: parsed.content,
        action: parsed.action,
        target: parsed.target,
        is_signature: parsed.is_signature,
      };
    } catch {
      // Ignore incomplete final line
    }
  }
}
