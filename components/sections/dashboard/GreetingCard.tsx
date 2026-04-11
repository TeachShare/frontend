"use client";
import { Plus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export  const GreetingCard = ({lastName}: {lastName: string}) => {
  const router = useRouter();


  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 lg:p-8 transition-colors duration-300">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
        Good afternoon, {lastName}!
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-1.5">
        Here&apos;s how your algebra resources are supporting learners across
        TeachShare today.
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {[
          "Focus: 1st Year Algebra",
          "Planning time: 16:00-18:00",
          "Weekly goal: 3 new uploads",
        ].map((tag, idx) => (
          <span
            key={idx}
            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-md text-[11px] font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-4 mt-8">
        <button
          onClick={() => router.push("/resources")}
          className="bg-emerald-500 text-white dark:text-zinc-950 font-bold py-2 px-5 rounded-lg flex items-center space-x-2 text-[13px] hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all"
        >
          <Plus size={18} />
          <span>New resource</span>
        </button>
        <button className="text-zinc-500 dark:text-zinc-400 font-bold px-2 py-2 flex items-center space-x-2 text-[13px] hover:text-zinc-900 dark:hover:text-white transition-colors">
          <Share2 size={16} />
          <span>Share with community</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300">
          <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-600 tracking-wider mb-1">
            Uploads this week
          </p>
          <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            2 / 3{" "}
            <span className="text-zinc-500 text-xs font-normal ml-1">goal</span>
          </p>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300">
          <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-600 tracking-wider mb-1">
            New feedback
          </p>
          <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            6{" "}
            <span className="text-zinc-500 text-xs font-normal ml-1">
              comments
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

