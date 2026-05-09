"use client"
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  subtitle?: string;
  isPublished?: boolean;
}

export const ResourceHeader = ({ title, subtitle, isPublished = false }: Props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 text-xs group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Repository</span>
          </button>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
            {title || "Create a new learning resource"}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">
            {subtitle || "Design a resource your students can access and other teachers can remix."}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 px-2 py-1 rounded-md ${
              isPublished 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                : "text-zinc-500 dark:text-zinc-600"
            }`}>
              {isPublished ? "Status: Published" : "Draft - Not yet published"}
            </span>
        </div>
      </div>

      <div className="h-6 rounded bg-gradient-to-r from-rose-50 dark:from-rose-500/20 via-orange-50 dark:via-orange-500/20 to-emerald-50 dark:to-emerald-500/20 border border-zinc-200 dark:border-zinc-800/50 flex items-center justify-center transition-colors duration-300">
        <p className="text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] transition-colors duration-300">Repository · Metadata, content, and files are required before publishing</p>
      </div>
    </>
  );
};