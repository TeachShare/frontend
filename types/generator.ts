import { LucideIcon } from "lucide-react";

export type ContentType = "lesson" | "strategy" | "classroom";
export type ViewMode = "generator" | "results";

export interface ContentTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

export interface GeneratedCardProps {
  title: string;
  subject: string;
  description: string;
  tags: string[];
  type: string;
}
