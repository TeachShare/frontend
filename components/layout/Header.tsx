"use client";
import React from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => (
  <header className="h-[64px] border-b border-zinc-800/80 flex items-center justify-between px-4 lg:px-8 shrink-0">
    <div className="flex items-center flex-1 max-w-2xl">
      <button
        onClick={onMenuClick}
        className="p-2 mr-2 text-zinc-400 lg:hidden"
      >
        <Menu size={20} />
      </button>
      <div className="relative w-full max-w-xl">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          size={15}
        />
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-full py-1.5 pl-10 pr-4 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
      </div>
    </div>

    <div className="flex items-center space-x-4 ml-4">
      <div className="flex items-center space-x-2">
        <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>
        <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
          <Settings size={18} />
        </button>
        {/* Theme Toggle placeholder as seen in image */}
        <div className="w-10 h-5 bg-zinc-800 rounded-full relative ml-2 cursor-pointer border border-zinc-700">
          <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center space-x-3 border-l border-zinc-800 pl-4 h-8">
        <div className="text-right hidden sm:block">
          <p className="text-[13px] font-bold text-white leading-none">
            Xasler
          </p>
          <p className="text-[10px] text-zinc-500 font-medium mt-1">
            Software Instructor
          </p>
        </div>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Xasler"
          className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800"
          alt="Xasler"
        />
      </div>
    </div>
  </header>
);
