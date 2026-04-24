export type Domain =
  | "Business"
  | "Engineering"
  | "Design"
  | "Finance"
  | "Thai Business"
  | "Thai Tech"
  | "Thai Fintech"
  | "Thai VC"
  | "Thai Empire"
  | "Construction PM"
  | "Field Operations"
  | "HSE"
  | "Technical & Engineering"
  | "QA/QC"
  | "Project Controls"
  | "Logistics & Procurement";

export interface Consultant {
  id: number;
  name: string;
  domain: Domain;
  lens: string;
  signature: string;
  keywords: string[];
  color: string; // domain-based avatar color
}

export type TurnType =
  | "opening"
  | "speech"
  | "interruption"
  | "rebuttal"
  | "stage_direction"
  | "summary";

export interface Turn {
  id?: string;
  session_id?: string;
  turn_order: number;
  type: TurnType;
  speaker: string;
  content: string;
  action?: string; // stage direction e.g. "leans forward"
  target?: string; // who they're addressing/reacting to
  is_signature?: boolean;
}

export interface SessionSummary {
  agrees: string[];
  splits: string[];
  recommendation: string;
  risk: string;
}

export interface Session {
  id: string;
  user_id: string;
  question: string;
  language: "en" | "th";
  consultant_ids: number[];
  tensions: string[];
  status: "selecting" | "debating" | "completed" | "error";
  summary: SessionSummary | null;
  created_at: string;
}

export interface SelectionResult {
  consultants: Consultant[];
  reasoning: string;
  tensions: string[];
  agenda: string;
}

export interface Database {
  public: {
    Tables: {
      sessions: {
        Row: Session;
        Insert: Omit<Session, "id" | "created_at">;
        Update: Partial<Omit<Session, "id">>;
      };
      turns: {
        Row: Turn & { id: string; session_id: string; created_at: string };
        Insert: Omit<Turn, "id"> & { session_id: string };
        Update: Partial<Turn>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
