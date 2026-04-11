import React from "react";

export const HistoryFooter = () => (
  <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest pt-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
    <span>Showing versions 1-5 · All changes are stored safely</span>
    <div className="flex items-center gap-4">
      <span>Need to roll back completely?</span>
      <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300">
        Restore
      </button>
    </div>
  </div>
);
