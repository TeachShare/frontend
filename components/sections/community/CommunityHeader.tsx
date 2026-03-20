import React from "react";
import { Users2, UserPlus } from "lucide-react";

export const CommunityHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Community</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">
          Discover educators to follow, collaborate with, and learn from across TeachShare.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
          <Users2 size={14} className="text-zinc-500" />
          <span>My network</span>
        </button>
        <button className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors duration-300">
          <UserPlus size={14} />
          <span>Find collaborators</span>
        </button>
      </div>
    </div>
  );
};