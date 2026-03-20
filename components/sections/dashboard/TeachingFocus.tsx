import React from "react";

export const TeachingFocus = () => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">
        Today&apos;s teaching focus
      </h3>

      <div className="space-y-6">
        <div className="group cursor-pointer">
          <div className="flex justify-between items-start mb-1.5">
            <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Linear equations exit ticket
            </h4>
            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Ready to use
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Period 3 · 13 questions · Shared with 4 colleagues
          </p>
        </div>

        <div className="group cursor-pointer">
          <div className="flex justify-between items-start mb-1.5">
            <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
              Discussion routine: &quot;Always, Sometimes, Never&quot;
            </h4>
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ml-2 transition-colors duration-300">
              Suggested
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Community favorite - 132 saves
          </p>
        </div>

        <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Weekly sharing progress
            </p>
            <p className="text-[11px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
              68% of goal
            </p>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
            <div className="h-full bg-emerald-500 w-[68%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
