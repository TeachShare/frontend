"use client"
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  onPublish: () => void;
  onSaveDraft: () => void;
}

export const PublishSidebar = ({ onPublish, onSaveDraft }: Props) => {
  const router = useRouter();

  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="bg-blue-50 dark:bg-blue-600/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
        <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors duration-300">
          Publishing tips
        </span>
        <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Make your resource remix-friendly
        </h4>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-500 leading-relaxed transition-colors duration-300">
          Clear structure and multiple file formats help other instructors adapt
          this for their own context.
        </p>
      </div>

      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800/40 text-[11px] transition-colors duration-300">
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Status
          </span>
          <span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
            Draft
          </span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Visibility
          </span>
          <span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
            Community
          </span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Owner
          </span>
          <span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
            You
          </span>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-3 transition-colors duration-300">
        <h4 className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest transition-colors duration-300">
          Student-facing summary
        </h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 transition-colors duration-300">
          &quot;In this lesson, you&apos;ll explore how plants turn light into energy
          through photosynthesis.&quot;
        </p>
      </div>

      <div className="pt-6 space-y-3">
        <button
          onClick={onPublish}
          className="w-full bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20"
        >
          Publish to repository
        </button>
        <button 
        onClick={onSaveDraft}
        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-transparent text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-50 dark:hover:text-white transition-colors duration-300">
          Save draft
        </button>
        <button
          onClick={() => router.back()}
          className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 py-2 text-[11px] font-bold transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
