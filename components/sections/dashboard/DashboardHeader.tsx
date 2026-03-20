import { Calendar, Filter } from "lucide-react";
import React from "react";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Dashboard
        </h1>
        <p className="text-zinc-500 text-[13px] mt-1">
          At a glance: how your resources are performing and what needs your
          attention today.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
          <Calendar size={14} className="text-zinc-500" />
          <span>Last 30 days</span>
        </button>
        <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors duration-300">
          <Filter size={14} />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

