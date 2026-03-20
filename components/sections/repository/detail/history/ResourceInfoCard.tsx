import React from 'react';
import { ChevronDown } from 'lucide-react';

export const ResourceInfoCard = () => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Algebra Fundamentals</h2>
            <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-widest transition-colors duration-300">Current version: v5 - Active</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs transition-colors duration-300">Mathematics · Grade 9-10 · Lesson Plan · 2 files · 4.5 rating</p>
        </div>
        <div className="flex gap-2">
          {['algebra', 'equations', 'assessment', 'classroom activities'].map(tag => (
            <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-500 font-bold lowercase transition-colors duration-300">{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-right space-y-2">
        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Jump to version</p>
        <div className="relative inline-block text-left">
          <button className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-8 transition-colors duration-300">
            v5 · Updated 2 days ago <ChevronDown size={14} className="text-zinc-500 dark:text-zinc-600"/>
          </button>
        </div>
        <p className="text-[9px] text-zinc-500 dark:text-zinc-600 italic transition-colors duration-300">Every edit creates a new version automatically.</p>
      </div>
    </div>
  );
};