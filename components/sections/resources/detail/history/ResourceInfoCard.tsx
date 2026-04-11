import React from 'react';
import { ChevronDown } from 'lucide-react';

export const ResourceInfoCard = ({ resource, totalVersions }: { resource: any, totalVersions: number }) => {
  if (!resource) return null;

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{resource.title}</h2>
            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-widest">
              Current: v{resource.version_no} - Active
            </span>
          </div>
          <p className="text-zinc-500 text-xs">
            {resource.file_count} files stored in this snapshot • Created by {resource.author}
          </p>
        </div>
      </div>
      <div className="text-right space-y-2">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Jump to version</p>
        <button className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-8">
          v{resource.version_no} · Latest <ChevronDown size={14} />
        </button>
        <p className="text-[9px] text-zinc-500 italic">Total of {totalVersions} immutable snapshots.</p>
      </div>
    </div>
  );
};