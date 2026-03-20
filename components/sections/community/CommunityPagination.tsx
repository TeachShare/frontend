"use client";
import React from "react";
import { ChevronRight } from "lucide-react";

export const CommunityPagination = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
      <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
        Page 1 of 22
      </p>
      <div className="flex items-center space-x-1">
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          <ChevronRight size={16} className="rotate-180" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 text-white rounded-md text-[11px] font-bold transition-colors duration-300">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
          3
        </button>
        <span className="text-zinc-400 dark:text-zinc-700 px-1 transition-colors duration-300">...</span>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
          22
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          <ChevronRight size={16} />
        </button>
      </div>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic max-w-sm text-center sm:text-right transition-colors duration-300">
        Follow educators whose practice aligns with yours to surface more relevant resources and collaboration invites.
      </p>
    </div>
  );
};