import { Calendar, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface DashboardHeaderProps {
  days: number;
  setDays: (days: number) => void;
}

export const DashboardHeader = ({ days, setDays }: DashboardHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
    { label: "Last 90 days", value: 90 },
  ];

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
      <div className="flex items-center space-x-2 relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
        >
          <Calendar size={14} className="text-zinc-500" />
          <span>{options.find(opt => opt.value === days)?.label}</span>
          <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setDays(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                  days === option.value 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
