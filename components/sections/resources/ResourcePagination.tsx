import React from "react";
import { ChevronRight } from "lucide-react";

export const ResourcePagination = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
      <p className="text-[11px] text-zinc-500 font-medium tracking-tight">
        Page 1 of 3
      </p>
      <div className="flex items-center space-x-1">
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          <ChevronRight size={16} className="rotate-180" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 text-white rounded-md text-[11px] font-bold shadow-sm transition-colors duration-300">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
          3
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          <ChevronRight size={16} />
        </button>
      </div>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic max-w-xs text-center sm:text-right transition-colors duration-300">
        Curate and manage your library to help colleagues find the best
        materials.
      </p>
    </div>
  );
};
