import React from "react";
import { LucideIcon } from "lucide-react";

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  status?: string;
  onClick?: () => void;
  active?: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  onClick,
  status,
  active = false,
}: NavItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-300 ${
      active
        ? "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-900 dark:text-white"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
    }`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={18} />
      <span className="text-[13px] font-medium">{label}</span>
    </div>
    {status && (
      <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-wider">
        {status}
      </span>
    )}
  </div>
);
