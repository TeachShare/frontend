"use client";
import React from "react";
import {
  LayoutDashboard,
  Files,
  Users,
  Archive,
  Wand2,
  MessageSquare,
  Settings,
  Plus,
  Share2,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem"; 
import Image from "next/image"
import Logo from "@/public/logos/logo.svg"
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const router = useRouter();
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-60 border-r border-zinc-800 bg-[#090a0c] flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-[64px] flex items-center px-6 shrink-0 border-b border-zinc-800/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6  rounded flex items-center justify-center">
                <Image src={Logo} alt="Logo" width={30} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              TeachShare
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
            Navigation
          </p>
             <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" />
             <SidebarItem icon={Files} label="My Resources"  href="/resources" />
             <SidebarItem icon={Users} label="Community" href="/community" />
             <SidebarItem icon={Archive} label="Repository" href="/repository"/>
             <SidebarItem icon={Wand2} label="AI Generator" href="/generator"/>
             <SidebarItem icon={MessageSquare} label="Messages" href="/messages"/>
             <SidebarItem icon={Settings} label="Settings" href="/settings"/>
        </nav>

        <div className="p-4 space-y-2 border-t border-zinc-800/60">
          <p className="px-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
            Quick Actions
          </p>
          <button onClick={() => router.push("/resources")} className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-2 rounded-lg font-bold text-[13px] transition-all active:scale-[0.98]">
            <Plus size={16} />
            <span>Upload Resource</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white py-2 rounded-lg font-bold text-[13px] transition-all">
            <Share2 size={14} />
            <span>Share Idea</span>
          </button>
        </div>
      </aside>
    </>
  );
};
