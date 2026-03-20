"use client";
import React from "react";
import { Search, ChevronDown, Star } from "lucide-react";

export const CommunityToolbar = () => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 lg:p-5 space-y-5 transition-colors duration-300">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Search educators or subjects"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-md py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-colors duration-300"
            />
          </div>
          <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md text-xs font-bold transition-colors duration-300">
            <Star size={14} />
            <span>Recommended for you</span>
          </button>
          <div className="flex items-center gap-2">
            {["Subject", "Grade band", "Region"].map((label) => (
              <button
                key={label}
                className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-300"
              >
                <span>{label}</span>
                <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 border-l border-zinc-200 dark:border-zinc-800 pl-0 xl:pl-4 transition-colors duration-300">
          <div className="flex items-center space-x-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-500">
            <button className="text-zinc-900 dark:text-white transition-colors duration-300">Educators</button>
            <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">Schools</button>
            <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">Topics</button>
          </div>
          <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-900 dark:text-zinc-400 transition-colors duration-300">
            <span className="text-zinc-500 dark:text-zinc-500">Sort by:</span>
            <span>Most active</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <p className="text-[11px] text-zinc-600 dark:text-zinc-600 font-medium transition-colors duration-300">
            Showing <span className="text-zinc-900 dark:text-zinc-400 font-bold transition-colors duration-300">1-6 of 128 educators</span>
          </p>
          <span className="text-zinc-300 dark:text-zinc-800 transition-colors duration-300">|</span>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium italic transition-colors duration-300">
            Based on your subjects and grade levels
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900/30 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase transition-colors duration-300">
              Avg. follow score
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
              72%
            </span>
          </div>
          <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/5 text-blue-600 dark:text-blue-500/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/10 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/10 transition-colors duration-300">
            <span>You follow 34 educators</span>
          </button>
        </div>
      </div>
    </div>
  );
};