import type { Consultant } from "@/types";

const DOMAIN_COLORS: Record<string, string> = {
  Business: "#3B82F6",
  Engineering: "#10B981",
  Design: "#F59E0B",
  Finance: "#8B5CF6",
  "Thai Business": "#EF4444",
  "Thai Tech": "#06B6D4",
  "Thai Fintech": "#EC4899",
  "Thai VC": "#F97316",
  "Thai Empire": "#DC2626",
  "Construction PM": "#78716C",
  "Field Operations": "#A16207",
  HSE: "#059669",
  "Technical & Engineering": "#6366F1",
  "QA/QC": "#0891B2",
  "Project Controls": "#7C3AED",
  "Logistics & Procurement": "#CA8A04",
};

export const consultants: Consultant[] = [
  { id: 1, name: "Elon Musk", domain: "Business", lens: "First principles", signature: "Who made this requirement?", keywords: ["physics", "10x", "cost", "manufacturing", "scaling", "impossible", "moonshot"], color: DOMAIN_COLORS.Business },
  { id: 2, name: "Steve Jobs", domain: "Business", lens: "Taste / design", signature: "Tell me what's not working.", keywords: ["product", "cut", "focus", "experience", "simplicity", "brand", "beautiful"], color: DOMAIN_COLORS.Business },
  { id: 3, name: "Jeff Bezos", domain: "Business", lens: "Customer / ops", signature: "Who is the customer?", keywords: ["customer", "flywheel", "long-term", "operations", "day-one", "metrics"], color: DOMAIN_COLORS.Business },
  { id: 4, name: "Charlie Munger", domain: "Business", lens: "Mental models", signature: "Invert, always invert.", keywords: ["bias", "inversion", "moat", "incentives", "failure", "rationality"], color: DOMAIN_COLORS.Business },
  { id: 5, name: "Linus Torvalds", domain: "Engineering", lens: "Data structures / taste", signature: "Talk is cheap. Show me the code.", keywords: ["abstraction", "kernel", "API", "backward-compat", "rewrite", "monolithic"], color: DOMAIN_COLORS.Engineering },
  { id: 6, name: "John Carmack", domain: "Engineering", lens: "Performance / focus", signature: "Sometimes, the elegant implementation is just a function.", keywords: ["performance", "optimization", "inline", "focus", "over-engineering"], color: DOMAIN_COLORS.Engineering },
  { id: 7, name: "Andrej Karpathy", domain: "Engineering", lens: "Pedagogy / first-principles", signature: "What I cannot create, I do not understand.", keywords: ["AI", "ML", "neural", "teaching", "understanding", "from-scratch"], color: DOMAIN_COLORS.Engineering },
  { id: 8, name: "George Hotz", domain: "Engineering", lens: "Radical simplification", signature: "You have never refactored enough.", keywords: ["delete", "rewrite", "simplify", "hacker", "LOC", "complexity"], color: DOMAIN_COLORS.Engineering },
  { id: 9, name: "Dieter Rams", domain: "Design", lens: "Reduction / honesty", signature: "Less, but better.", keywords: ["minimal", "honest", "necessary", "sustainable", "ten-principles"], color: DOMAIN_COLORS.Design },
  { id: 10, name: "Massimo Vignelli", domain: "Design", lens: "Structure / systems", signature: "If you can design one thing, you can design everything.", keywords: ["grid", "typography", "system", "structure", "scale", "discipline"], color: DOMAIN_COLORS.Design },
  { id: 11, name: "Hayao Miyazaki", domain: "Design", lens: "Soul / emotion", signature: "Does this feel alive?", keywords: ["soul", "emotion", "craft", "hand-drawn", "nature", "wonder"], color: DOMAIN_COLORS.Design },
  { id: 12, name: "Warren Buffett", domain: "Finance", lens: "Patient value", signature: "Price is what you pay. Value is what you get.", keywords: ["moat", "value", "compounding", "patience", "circle-of-competence"], color: DOMAIN_COLORS.Finance },
  { id: 13, name: "Ray Dalio", domain: "Finance", lens: "Systematic macro", signature: "Pain + Reflection = Progress", keywords: ["principles", "machine", "cycle", "diversification", "radical-transparency"], color: DOMAIN_COLORS.Finance },
  { id: 14, name: "Nassim Taleb", domain: "Finance", lens: "Antifragility", signature: "Wind extinguishes a candle and energizes fire.", keywords: ["fragile", "barbell", "black-swan", "skin-in-game", "fat-tails", "ruin"], color: DOMAIN_COLORS.Finance },
  { id: 15, name: "Howard Marks", domain: "Finance", lens: "Second-level thinking", signature: "The riskiest thing is the belief that there's no risk.", keywords: ["risk", "cycles", "contrarian", "second-level", "consensus"], color: DOMAIN_COLORS.Finance },
  { id: 16, name: "Morgan Housel", domain: "Finance", lens: "Behavioral wisdom", signature: "Doing well with money has little to do with how smart you are.", keywords: ["behavior", "psychology", "enough", "compounding", "tail-events"], color: DOMAIN_COLORS.Finance },
  { id: 17, name: "Tan Passakornnatee", domain: "Thai Business", lens: "Guerrilla marketing / self-made", signature: "ล้มเหลวได้ แต่อย่าล้มเลิก", keywords: ["marketing", "branding", "consumer", "promotion", "thai", "guerrilla", "startup", "mass-market", "crisis", "self-made"], color: DOMAIN_COLORS["Thai Business"] },
  { id: 18, name: "9arm", domain: "Thai Tech", lens: "Tech democratization", signature: "ไม่มีใครเอาอะไรไปจากเราได้", keywords: ["tech-education", "AI", "HPC", "supercomputer", "government-IT", "career", "content", "thai"], color: DOMAIN_COLORS["Thai Tech"] },
  { id: 19, name: "Top Jirayut", domain: "Thai Fintech", lens: "Crypto nation-building", signature: "กัดไม่ปล่อย", keywords: ["crypto", "fintech", "blockchain", "Bitkub", "Thai-economy", "digital-sovereignty", "startup", "regulation"], color: DOMAIN_COLORS["Thai Fintech"] },
  { id: 20, name: "Krating Poonpol", domain: "Thai VC", lens: "Ecosystem building", signature: "ไม่กล้าเปลี่ยน ก็ไม่มีวันโต", keywords: ["VC", "startup", "ecosystem", "fintech", "KBTG", "AI-first", "transformation", "ASEAN", "corporate-innovation"], color: DOMAIN_COLORS["Thai VC"] },
  { id: 21, name: "Dhanin Chearavanont", domain: "Thai Empire", lens: "Vertical integration / long-game", signature: "ความสำเร็จ ดีใจได้วันเดียว", keywords: ["conglomerate", "CP", "agriculture", "7-Eleven", "China", "vertical-integration", "empire", "crisis", "patience"], color: DOMAIN_COLORS["Thai Empire"] },
  { id: 22, name: "Srettha Thavisin", domain: "Thai Business", lens: "Brand building / lifestyle", signature: "I'm not a PM, but Thailand's top salesman.", keywords: ["brand", "real-estate", "luxury", "lifestyle", "marketing", "Sansiri", "roadshow", "Thai-market", "FMCG"], color: DOMAIN_COLORS["Thai Business"] },
  { id: 23, name: "Stephen Bechtel Sr.", domain: "Construction PM", lens: "Turnkey delivery / scale", signature: "We'll build anything for anybody.", keywords: ["mega-project", "EPC", "turnkey", "matrix", "pre-fabrication", "delivery", "Hoover-Dam"], color: DOMAIN_COLORS["Construction PM"] },
  { id: 24, name: "Bent Flyvbjerg", domain: "Construction PM", lens: "Megaproject science", signature: "Over budget, over time, under benefits, over and over again.", keywords: ["overrun", "bias", "reference-class", "Iron-Law", "planning", "forecasting", "governance"], color: DOMAIN_COLORS["Construction PM"] },
  { id: 25, name: "Frank Crowe", domain: "Field Operations", lens: "Site logistics / execution", signature: "Never my belly to a desk.", keywords: ["site", "dam", "concrete", "cableway", "schedule", "superintendent", "field", "crew"], color: DOMAIN_COLORS["Field Operations"] },
  { id: 26, name: "George Goethals", domain: "Field Operations", lens: "Operational command / human systems", signature: "Faith in ability united with faith in justice.", keywords: ["canal", "workforce", "morale", "division", "transparency", "open-door", "delegation"], color: DOMAIN_COLORS["Field Operations"] },
  { id: 27, name: "Todd Conklin", domain: "HSE", lens: "Human & Organizational Performance", signature: "Workers are not the problem. Workers are the problem solvers.", keywords: ["safety", "HOP", "blame", "error", "learning-team", "pre-accident", "incident", "culture"], color: DOMAIN_COLORS.HSE },
  { id: 28, name: "Sidney Dekker", domain: "HSE", lens: "Safety Differently / systems", signature: "Underneath every simple story about human error, there is a deeper story.", keywords: ["safety", "just-culture", "drift", "human-error", "resilience", "systems", "accountability"], color: DOMAIN_COLORS.HSE },
  { id: 29, name: "Fazlur Khan", domain: "Technical & Engineering", lens: "Structural systems / efficiency", signature: "The technical man must not be lost in his own technology.", keywords: ["structural", "tube", "skyscraper", "steel", "concrete", "forces", "efficiency", "tall-building"], color: DOMAIN_COLORS["Technical & Engineering"] },
  { id: 30, name: "Peter Rice", domain: "Technical & Engineering", lens: "Material innovation / craft", signature: "The search for the authentic character of a material.", keywords: ["material", "geometry", "shell", "glass", "detail", "joint", "impossible", "innovation"], color: DOMAIN_COLORS["Technical & Engineering"] },
  { id: 31, name: "W. Edwards Deming", domain: "QA/QC", lens: "Systems thinking / statistics", signature: "You can not inspect quality into the product.", keywords: ["quality", "PDCA", "SPC", "inspection", "system", "variation", "14-points", "continuous-improvement"], color: DOMAIN_COLORS["QA/QC"] },
  { id: 32, name: "Joseph Juran", domain: "QA/QC", lens: "Quality planning / cost of quality", signature: "Quality does not happen by accident; it must be planned.", keywords: ["quality", "Pareto", "trilogy", "COPQ", "planning", "fitness-for-use", "improvement", "standard"], color: DOMAIN_COLORS["QA/QC"] },
  { id: 33, name: "Larry Dysert", domain: "Project Controls", lens: "Cost engineering / estimates", signature: "Adequate scope definition continues to be the most persistent problem.", keywords: ["cost", "estimate", "classification", "contingency", "WBS", "risk", "AACE", "budget"], color: DOMAIN_COLORS["Project Controls"] },
  { id: 34, name: "Martin Barnes", domain: "Project Controls", lens: "Governance / collaborative contracts", signature: "They weren't even referred to as projects.", keywords: ["Iron-Triangle", "NEC", "contract", "time-cost-quality", "governance", "dispute", "collaborative"], color: DOMAIN_COLORS["Project Controls"] },
  { id: 35, name: "Edward Merrow", domain: "Logistics & Procurement", lens: "Front-end loading / contracting", signature: "We almost always knew the right things to do, but failed to do them.", keywords: ["FEL", "procurement", "contracting", "split-form", "scope", "megaproject", "front-end", "failure"], color: DOMAIN_COLORS["Logistics & Procurement"] },
  { id: 36, name: "Brehon Somervell", domain: "Logistics & Procurement", lens: "Wartime logistics / impossible deadlines", signature: "Ample supplies, at the right place, at the right time.", keywords: ["logistics", "Pentagon", "supply-chain", "phased", "buffer", "procurement", "mobilization", "wartime"], color: DOMAIN_COLORS["Logistics & Procurement"] },
];

export function getConsultantById(id: number): Consultant | undefined {
  return consultants.find((c) => c.id === id);
}

export function getConsultantsByIds(ids: number[]): Consultant[] {
  return ids.map((id) => consultants.find((c) => c.id === id)).filter(Boolean) as Consultant[];
}

export function getInitials(name: string): string {
  if (name === "9arm") return "9A";
  return name
    .split(" ")
    .map((w) => w[0])
    .filter((c) => c && c === c.toUpperCase())
    .slice(0, 2)
    .join("");
}
