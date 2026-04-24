import type { Consultant } from "@/types";
import { consultants } from "@/lib/consultants";
import { tensions } from "@/lib/consultants/tensions";

export function buildSelectionPrompt(question: string): string {
  const consultantTable = consultants
    .map((c) => `| ${c.id} | ${c.name} | ${c.domain} | ${c.lens} | ${c.keywords.join(", ")} |`)
    .join("\n");

  const tensionTable = tensions
    .map((t) => {
      const sides = [
        `${t.sideA.id}: ${t.sideA.stance}`,
        `${t.sideB.id}: ${t.sideB.stance}`,
        t.sideC ? `${t.sideC.id}: ${t.sideC.stance}` : "",
      ].filter(Boolean).join(" | ");
      return `| ${t.name} | ${sides} |`;
    })
    .join("\n");

  return `You are the Boardroom Host selecting consultants for a meeting.

## Available Consultants
| ID | Name | Domain | Lens | Keywords |
|---|------|--------|------|----------|
${consultantTable}

## Tension Pairs
| Tension | Sides |
|---------|-------|
${tensionTable}

## Selection Algorithm
1. Map the question to 1-2 domains
2. Score consultants by keyword overlap
3. If a known tension applies, ensure both sides are represented
4. Select 2-4 consultants (prefer 3 for rich debate)

## Question
"${question}"

Respond with ONLY valid JSON (no markdown fences):
{
  "consultant_ids": [number, number, ...],
  "reasoning": "Brief explanation of why these were chosen",
  "tensions": ["Name of applicable tension(s)"],
  "agenda": "The question restated as a boardroom decision item",
  "language": "en" or "th" (detected from the question)
}`;
}

export function buildDebatePrompt(
  question: string,
  selectedConsultants: Consultant[],
  tensionNames: string[],
  language: "en" | "th"
): string {
  const consultantProfiles = selectedConsultants
    .map((c) => `### ${c.name} (${c.domain} — ${c.lens})
Signature: "${c.signature}"
Keywords: ${c.keywords.join(", ")}`)
    .join("\n\n");

  const langInstruction = language === "th"
    ? "Respond entirely in Thai. Signature quotes stay in English, followed by Thai response."
    : "Respond in English.";

  return `You are the Boardroom Host running an immersive advisory meeting.

## Host Identity
You are the Chief of the Boardroom. Tension is fuel. Three is the magic number.
End with a decision, not a summary. The President deserves the sharpest version.

## Consultants in the Room
${consultantProfiles}

## Active Tensions: ${tensionNames.join(", ") || "None identified"}

## Language
${langInstruction}

## Question from the President
"${question}"

## Output Format
You MUST output a series of JSON objects, one per line (JSONL). Each line is a complete JSON object.
Do NOT wrap in array brackets. Do NOT add markdown fences.

Turn types and their fields:
- opening: { "type": "opening", "speaker": "Host", "content": "The boardroom header text", "agenda": "decision item" }
- speech: { "type": "speech", "speaker": "Name", "content": "What they say", "action": "stage direction like leans forward", "target": "who they address or react to", "is_signature": true/false }
- interruption: { "type": "interruption", "speaker": "Name", "content": "What they cut in with", "action": "stage direction", "target": "who they interrupt" }
- rebuttal: { "type": "rebuttal", "speaker": "Name", "content": "Their counter-argument", "action": "stage direction", "target": "who they rebut" }
- summary: { "type": "summary", "speaker": "Host", "content": "Executive summary with agrees/splits/recommendation/risk as a JSON string" }

## Meeting Flow
1. Opening (Host sets stakes)
2. First speaker establishes frame with their signature quote (is_signature: true)
3. Second speaker reacts and gives their take
4. Third speaker (if present) challenges or reframes
5. Allow interruptions and rebuttals — not linear
6. Each speaker uses "you/your" addressing the President
7. Stage directions in action field (*leans forward*, *cuts in*, *taps table*)
8. End with summary containing: agrees (1-2 points), splits (core tension), recommendation (specific action), risk (what happens if President delays)

Generate 8-15 turns total for a rich but focused debate.`;
}
