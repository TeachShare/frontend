"use client";

import { SidebarItemProps } from "@/app/dashboard/page";
import { usePathname } from "next/navigation";
import Link from 'next/link';

export const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps) => {
  const pathname = usePathname();

  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
        active
          ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-medium"
          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
      }`}
    >
      <Icon size={18} />
      <span className="text-[13px]">{label}</span>
    </Link>
  );
};