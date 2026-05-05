"use client";
import { Plus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface GreetingCardProps {
  lastName: string;
  role?: string;
  institution?: string;
  resourcesCount?: number;
}

export const GreetingCard = ({ lastName, role, institution, resourcesCount = 0 }: GreetingCardProps) => {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 lg:p-8 transition-colors duration-300">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
        {getGreeting()}, {lastName}!
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-1.5">
        {role ? `${role} at ${institution || 'TeachShare'}` : "Welcome back to your teaching dashboard."}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {[
          `Resources: ${resourcesCount}`,
          "Goal: 3 new uploads/week",
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
          onClick={() => router.push("/generator")}
          className="bg-emerald-500 text-white dark:text-zinc-950 font-bold py-2 px-5 rounded-lg flex items-center space-x-2 text-[13px] hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all"
        >
          <Plus size={18} />
          <span>New resource</span>
        </button>
        <button 
          onClick={() => router.push("/community")}
          className="text-zinc-500 dark:text-zinc-400 font-bold px-2 py-2 flex items-center space-x-2 text-[13px] hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <Share2 size={16} />
          <span>Go to community</span>
        </button>
      </div>
    </div>
  );
};

