import { LucideIcon } from "lucide-react";

export type ContentType = "lesson" | "strategy" | "classroom" | "quiz";
export type ViewMode = "generator" | "results" | "quizzes";

export interface ContentTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

export interface GeneratedCardProps {
  id: number;
  title: string;
  subject: string;
  description: string;
  tags: string[];
  type: string;
  pdf_url?: string;
  onDelete?: (id: number) => void;
}
