export interface Tension {
  name: string;
  sideA: { id: number; stance: string };
  sideB: { id: number; stance: string };
  sideC?: { id: number; stance: string };
}

export const tensions: Tension[] = [
  { name: "Rewrites", sideA: { id: 5, stance: "never" }, sideB: { id: 8, stance: "always" }, sideC: { id: 6, stance: "profile first" } },
  { name: "Concentration vs Diversification", sideA: { id: 12, stance: "concentrate" }, sideB: { id: 13, stance: "diversify" }, sideC: { id: 14, stance: "barbell" } },
  { name: "Prediction vs Preparation", sideA: { id: 13, stance: "model it" }, sideB: { id: 14, stance: "impossible" }, sideC: { id: 15, stance: "position in cycle" } },
  { name: "Simplicity vs Systems", sideA: { id: 8, stance: "delete" }, sideB: { id: 13, stance: "codify" }, sideC: { id: 16, stance: "keep simple" } },
  { name: "Speed vs Patience", sideA: { id: 1, stance: "move fast" }, sideB: { id: 4, stance: "wait" }, sideC: { id: 15, stance: "invest scared" } },
  { name: "Intuition vs Data", sideA: { id: 2, stance: "taste" }, sideB: { id: 3, stance: "data + narrative" }, sideC: { id: 1, stance: "physics + data" } },
  { name: "Design: Less vs Structure", sideA: { id: 9, stance: "reduce" }, sideB: { id: 10, stance: "systematize" }, sideC: { id: 11, stance: "feel it" } },
  { name: "Thai: Build vs Sell", sideA: { id: 21, stance: "vertical empire" }, sideB: { id: 22, stance: "brand & roadshow" }, sideC: { id: 17, stance: "guerrilla marketing" } },
  { name: "Thai: Ecosystem vs Solo", sideA: { id: 20, stance: "build everything" }, sideB: { id: 19, stance: "own the platform" }, sideC: { id: 18, stance: "educate first" } },
  { name: "Thai: Patience vs Speed", sideA: { id: 21, stance: "decades-scale" }, sideB: { id: 19, stance: "กัดไม่ปล่อย" }, sideC: { id: 20, stance: "Godzilla speed" } },
  { name: "Tech Sovereignty", sideA: { id: 19, stance: "own digital infra" }, sideB: { id: 18, stance: "government IT critique" }, sideC: { id: 20, stance: "AI-first banking" } },
  { name: "Practitioner vs Scientist (PM)", sideA: { id: 23, stance: "just build it" }, sideB: { id: 24, stance: "study why it fails first" } },
  { name: "Schedule vs Safety", sideA: { id: 25, stance: "speed" }, sideB: { id: 27, stance: "slow down, learn" }, sideC: { id: 28, stance: "drift into failure" } },
  { name: "Blame vs Systems (HSE)", sideA: { id: 27, stance: "fix systems" }, sideB: { id: 28, stance: "Just Culture" } },
  { name: "Efficiency vs Craft (Engineering)", sideA: { id: 29, stance: "optimize, reduce steel" }, sideB: { id: 30, stance: "material authenticity, bespoke" } },
  { name: "Inspect vs Build-In (QA/QC)", sideA: { id: 32, stance: "plan + control + improve" }, sideB: { id: 31, stance: "cease dependence on inspection" } },
  { name: "Cost Accuracy vs Governance", sideA: { id: 33, stance: "classify the estimate right" }, sideB: { id: 34, stance: "structure the contract right" }, sideC: { id: 24, stance: "debias the forecast" } },
  { name: "Plan vs Execute (Delivery)", sideA: { id: 24, stance: "think slow, act fast" }, sideB: { id: 25, stance: "never my belly to a desk" }, sideC: { id: 35, stance: "FEL before sanction" } },
  { name: "EPC Lump Sum vs Split-Form", sideA: { id: 35, stance: "split-form wins by data" }, sideB: { id: 34, stance: "NEC collaborative" }, sideC: { id: 23, stance: "turnkey/EPC invented it" } },
];
