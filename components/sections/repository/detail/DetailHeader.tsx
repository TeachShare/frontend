"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Share2, History, Edit3 } from 'lucide-react';

export const DetailHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-widest transition-colors duration-300">
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          Resource Repository
        </button>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-300 transition-colors duration-300">View Resource</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><Share2 size={14}/> Share</button>
        <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><History size={14}/> Version History</button>
        <button className="bg-emerald-100 dark:bg-emerald-500 text-emerald-800 dark:text-emerald-950 px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-emerald-200 dark:hover:bg-emerald-400 transition-colors duration-300">
          <Edit3 size={14}/> Edit Resource
        </button>
      </div>
    </div>
  );
};