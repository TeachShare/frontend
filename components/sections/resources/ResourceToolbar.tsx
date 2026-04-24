"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Wand2,
  ChevronDown,
  Grid,
  List,
  CheckSquare,
} from "lucide-react";
import { api } from "@/lib/axios";
import { useMetadata } from "@/hooks/useMetadata";

export const ResourceToolbar = ({ filters, setFilters }: any) => {
 const { data: options, isLoading } = useMetadata();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 lg:p-5 space-y-5 transition-colors duration-300">
      {/* Top Row: Search & Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              size={14}
            />
            <input
              type="text"
              placeholder='Search in "My Resources"'
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-md py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
            />
          </div>

          <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md text-xs font-bold transition-colors">
            <Wand2 size={14} /> <span>Recommended first</span>
          </button>

          {/* Dynamic Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Subject Select */}
            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 pr-8 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/30"
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                value={filters.subject || ""}
              >
                <option value="">
                  {isLoading ? "Loading..." : "All Subjects"}
                </option>
                {options?.subjects?.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                size={14}
              />
            </div>

            {/* Grade Select */}
            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 pr-8 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer"
                onChange={(e) => handleFilterChange("grade", e.target.value)}
                value={filters.grade || ""}
              >
                <option value="">Grade</option>
                {options?.grade_levels?.map((g: any) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                size={14}
              />
            </div>

            {/* Resource Type (Content Type) Select */}
            <div className="relative">
              <select
                disabled={isLoading}
                className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 pr-8 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 outline-none cursor-pointer focus:ring-1 focus:ring-blue-500/30"
                onChange={(e) => handleFilterChange("content_type", e.target.value)}
                value={filters.content_type || ""}
              >
                <option value="">
                  {isLoading ? "Loading..." : "Resource Type"}
                </option>
                {options?.content_types?.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                size={14}
              />
            </div>
            
          </div>
        </div>
        {/* View Toggles & Sort */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 transition-colors duration-300">
            <button className="p-1.5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded shadow-sm">
              <Grid size={14} />
            </button>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors duration-300">
              <List size={14} />
            </button>
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-3 pr-8 py-1.5 rounded-md text-xs font-bold text-zinc-900 dark:text-zinc-400 outline-none cursor-pointer"
              onChange={(e) => handleFilterChange("sort", e.target.value)}
            >
              <option value="recent">Sort by: Most recent</option>
              <option value="popular">Sort by: Most popular</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
              size={14}
            />
          </div>
        </div>
      </div>
      {/* Bottom Row: Bulk Actions & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-[11px] font-bold">
            {[
              { id: 'all', label: 'All' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange("status", tab.id)}
                className={`pb-3 transition-colors duration-300 ${
                  filters.status === tab.id 
                    ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white" 
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 font-bold mr-2 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">
            <CheckSquare size={14} /> <span>Select all</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 rounded-md text-[10px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
              Move to folder
            </button>
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 rounded-md text-[10px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
              Bulk share
            </button>
            <button className="px-3 py-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-900 rounded-md text-[10px] font-bold transition-colors duration-300">
              Bulk delete
            </button>
          </div>
          <div className="flex items-center ml-2 space-x-4 border-l border-zinc-200 dark:border-zinc-800 pl-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-tight transition-colors duration-300">
            <span className="flex items-center">
              <span className="text-zinc-700 dark:text-zinc-400 mr-1.5">
                Avg. rating
              </span>{" "}
              4.7
            </span>
            <span className="flex items-center">
              <span className="text-zinc-700 dark:text-zinc-400 mr-1.5">
                Total downloads
              </span>{" "}
              1.3k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
