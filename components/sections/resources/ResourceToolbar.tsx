"use client";
import React from "react";
import {
  Search,
  ChevronDown,
} from "lucide-react";
import { useMetadata } from "@/hooks/useMetadata";

interface ToolbarProps {
  filters: {
    search: string;
    subject: string;
    grade: string;
    content_type: string;
    status: string;
    sort_by: string;
  };
  setFilters: (f: (prev: any) => any) => void;
}

export const ResourceToolbar = ({ filters, setFilters }: ToolbarProps) => {
 const { data: options, isLoading } = useMetadata();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-4 lg:p-5 space-y-5 transition-colors duration-300">
      {/* Top Row: Search & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              size={14}
            />
            <input
              type="text"
              placeholder='Search your library...'
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-xl py-2 pl-10 pr-4 text-xs text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          {/* Dynamic Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 pr-10 rounded-xl text-[11px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                value={filters.subject || ""}
              >
                <option value="">All Subjects</option>
                {options?.subjects?.map((s: { id: number, name: string }) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={12} />
            </div>

            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 pr-10 rounded-xl text-[11px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                onChange={(e) => handleFilterChange("grade", e.target.value)}
                value={filters.grade || ""}
              >
                <option value="">Grade</option>
                {options?.grade_levels?.map((g: { id: number, name: string }) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={12} />
            </div>

            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 pr-10 rounded-xl text-[11px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                onChange={(e) => handleFilterChange("content_type", e.target.value)}
                value={filters.content_type || ""}
              >
                <option value="">Type</option>
                {options?.content_types?.map((t: { id: number, name: string }) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" size={12} />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              className="appearance-none bg-emerald-500/10 border border-emerald-500/20 pl-4 pr-10 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 outline-none cursor-pointer hover:bg-emerald-500/20 transition-all"
              onChange={(e) => handleFilterChange("sort_by", e.target.value)}
              value={filters.sort_by}
            >
              <option value="newest">Newest First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="likes">Most Popular</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500" size={12} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/30">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-[0.2em]">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange("status", tab.id)}
                className={`pb-1 transition-all relative ${
                  filters.status === tab.id 
                    ? "text-zinc-900 dark:text-white" 
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
                {filters.status === tab.id && <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-emerald-500" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Manage your collection
            </span>
        </div>
      </div>
    </div>
  );
};
