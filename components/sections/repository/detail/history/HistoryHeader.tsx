"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const HistoryHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-2 transition-colors duration-300">
          <span>Resource Repository</span>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-300">Version History</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Version History</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1 transition-colors duration-300">Review every edit from the first version to the most recent, and safely restore older versions.</p>
      </div>
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg text-xs font-bold hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
      >
        <ArrowLeft size={14} />
        Back to resource
      </button>
    </div>
  );
};