"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, School, Check, Loader2 } from "lucide-react";

interface University {
  name: string;
  "state-province": string | null;
}

interface UniversitySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const UniversitySelect = ({ value, onChange, error }: UniversitySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      const cached = localStorage.getItem("ph_universities");
      if (cached) {
        setUniversities(JSON.parse(cached));
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("http://universities.hipolabs.com/search?country=Philippines");
        const data = await res.json();
        
        // Basic deduplication and sorting
        const uniqueData = Array.from(new Map(data.map((item: any) => [item.name, item])).values()) as University[];
        const sortedData = uniqueData.sort((a, b) => a.name.localeCompare(b.name));
        
        localStorage.setItem("ph_universities", JSON.stringify(sortedData));
        setUniversities(sortedData);
      } catch (err) {
        console.error("Failed to fetch universities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUniversities = universities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    (u["state-province"]?.toLowerCase().includes(search.toLowerCase()))
  );

  // Grouping by state-province for optimization/UX
  const grouped = filteredUniversities.reduce((acc, curr) => {
    const region = curr["state-province"] || "Other Regions";
    if (!acc[region]) acc[region] = [];
    acc[region].push(curr);
    return acc;
  }, {} as Record<string, University[]>);

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
        School / Organization
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-zinc-50 dark:bg-[#0d1117] border rounded-xl py-3 pl-10 pr-10 text-sm text-left transition-all duration-300 flex items-center justify-between ${
            isOpen ? "ring-2 ring-emerald-500/10 border-emerald-500/50" : 
            error ? "border-rose-500/50" : "border-zinc-200 dark:border-[#30363d]"
          } ${!value ? "text-zinc-400 dark:text-[#484f58]" : "text-zinc-900 dark:text-white"}`}
        >
          <School className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <span className="truncate">{value || "Select your university"}</span>
          <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-[#30363d] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-zinc-100 dark:border-[#30363d]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search universities..."
                  className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="p-8 flex flex-col items-center justify-center text-zinc-500">
                  <Loader2 size={24} className="animate-spin mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Loading database...</p>
                </div>
              ) : filteredUniversities.length === 0 ? (
                <div className="p-8 text-center text-zinc-500">
                  <p className="text-xs">No universities found matching "{search}"</p>
                </div>
              ) : (
                Object.entries(grouped).map(([region, unis]) => (
                  <div key={region}>
                    <div className="px-3 py-1.5 bg-zinc-50 dark:bg-[#0d1117]/50 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-y border-zinc-100 dark:border-[#30363d]/50">
                      {region}
                    </div>
                    {unis.map((u) => (
                      <button
                        key={u.name}
                        type="button"
                        onClick={() => {
                          onChange(u.name);
                          setIsOpen(false);
                          setSearch("");
                        }}
                        className="w-full px-4 py-2.5 text-left text-xs text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between group"
                      >
                        <span className="truncate pr-4">{u.name}</span>
                        {value === u.name && <Check size={14} className="text-emerald-500 shrink-0" />}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
