import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  trend?: string;
  badge?: string;
}

export interface ResourceItem {
  title: string;
  subtitle: string;
  subject: string;
  type: string;
  typeIcon: LucideIcon;
  last: string;
}

export interface ActivityItem {
  dot: string;
  title: string;
  bold: string;
  detail: string;
  time: string;
}
