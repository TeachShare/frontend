import React from 'react';
import { User, Clock, FileText } from 'lucide-react';
import { Version } from '@/types/repository';

interface Props {
  version: Version;
  isLast: boolean;
}

export const VersionCard = ({ version: v, isLast }: Props) => {
  return (
    <div className="relative group">
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-[7px] top-10 w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/50 group-hover:bg-blue-400 dark:group-hover:bg-blue-500/20 transition-colors duration-300" />
      )}
      
      <div className="grid grid-cols-12 gap-6 bg-white dark:bg-[#121417]/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 hover:bg-zinc-50 dark:hover:bg-[#121417] transition-all duration-300 shadow-sm dark:shadow-none">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">{v.id} · {v.title}</h4>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest transition-colors duration-300 ${
              v.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700/50'
            }`}>
              {v.status}
            </span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">{v.description}</p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
            <span className="flex items-center gap-1.5"><User size={12}/> Created by {v.author}</span>
            <span className="flex items-center gap-1.5"><Clock size={12}/> {v.date}</span>
            <span className="flex items-center gap-1.5"><FileText size={12}/> {v.files} files · {v.size}</span>
          </div>
          <div className="pt-2">
            <p className="text-[10px] text-zinc-600 dark:text-zinc-500 transition-colors duration-300"><span className="font-bold text-zinc-800 dark:text-zinc-600 uppercase mr-2 transition-colors duration-300">Summary:</span>{v.summary}</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 py-2 rounded font-bold text-[11px] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">View</button>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/80 text-white py-2 rounded font-bold text-[11px] dark:hover:bg-blue-500 transition-all duration-300">Compare with current</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {v.status !== 'Active' ? (
              <button className="bg-emerald-100 dark:bg-emerald-500/80 text-emerald-800 dark:text-emerald-950 py-2 rounded font-bold text-[11px] hover:bg-emerald-200 dark:hover:bg-emerald-400 transition-all duration-300">Restore</button>
            ) : (
              <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 py-2 rounded font-bold text-[11px] cursor-not-allowed transition-colors duration-300" disabled>Download</button>
            )}
            <button className={`py-2 rounded font-bold text-[11px] transition-all duration-300 ${
              v.status === 'Active' 
                ? 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-500/80 text-white dark:hover:bg-rose-400' 
                : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}>
              {v.status === 'Active' ? 'Delete' : 'Download'}
            </button>
          </div>
          <button className="text-[10px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest mt-2 hover:text-zinc-700 dark:hover:text-zinc-400 transition-all duration-300">View change summary</button>
        </div>
      </div>
    </div>
  );
};