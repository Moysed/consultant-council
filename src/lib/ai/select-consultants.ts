import Anthropic from "@anthropic-ai/sdk";
import { buildSelectionPrompt } from "./prompts";
import { getConsultantsByIds } from "@/lib/consultants";
import type { SelectionResult } from "@/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function selectConsultants(question: string): Promise<SelectionResult> {
  const prompt = buildSelectionPrompt(question);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  // Parse JSON - handle potential markdown fences
  const cleaned = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
  const result = JSON.parse(cleaned);

  const consultants = getConsultantsByIds(result.consultant_ids);

  return {
    consultants,
    reasoning: result.reasoning,
    tensions: result.tensions || [],
    agenda: result.agenda,
  };
}
