import React from "react";

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 transition-colors duration-300">
        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1 transition-colors duration-300">
          Plan
        </p>
        <p className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Teacher · Free
        </p>
      </div>
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 transition-colors duration-300">
        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1 transition-colors duration-300">
          Last updated
        </p>
        <p className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Just now
        </p>
      </div>
    </div>
  );
};

