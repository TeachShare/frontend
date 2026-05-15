import React from "react";
import { CheckCircle2, Circle, ShieldCheck, Trophy } from "lucide-react";
import { DashboardStats } from "@/hooks/useDashboard";

interface TeachingFocusProps {
  stats?: DashboardStats;
}

export const TeachingFocus = ({ stats }: TeachingFocusProps) => {
  const roadmap = stats?.roadmap;
  
  if (!roadmap) return null;

  // Calculate overall progress (average of the 3 milestones)
  const profileProgress = roadmap.profile_completion_percentage;
  const resourceProgress = Math.min((roadmap.resources_published / roadmap.resources_goal) * 100, 100);
  const likesProgress = Math.min((roadmap.likes_received / roadmap.likes_goal) * 100, 100);
  
  const overallProgress = Math.round((profileProgress + resourceProgress + likesProgress) / 3);

  const milestones = [
    {
      label: "Profile Completion",
      current: `${profileProgress}%`,
      isComplete: roadmap.profile_complete,
      icon: <CheckCircle2 size={14} className={roadmap.profile_complete ? "text-emerald-500" : "text-zinc-300"} />
    },
    {
      label: "Shared Resources",
      current: `${roadmap.resources_published}/${roadmap.resources_goal}`,
      isComplete: roadmap.resources_published >= roadmap.resources_goal,
      icon: <Trophy size={14} className={roadmap.resources_published >= roadmap.resources_goal ? "text-amber-500" : "text-zinc-300"} />
    },
    {
      label: "Community Likes",
      current: `${roadmap.likes_received}/${roadmap.likes_goal}`,
      isComplete: roadmap.likes_received >= roadmap.likes_goal,
      icon: <ShieldCheck size={14} className={roadmap.likes_received >= roadmap.likes_goal ? "text-blue-500" : "text-zinc-300"} />
    }
  ];

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
          Certification Roadmap
        </h3>
        {overallProgress === 100 && (
            <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck size={10} /> Certified
            </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="relative pt-2">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <p className="text-2xl font-black text-zinc-900 dark:text-white leading-none">
                        {overallProgress}%
                    </p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight mt-1">
                        to verified educator
                    </p>
                </div>
                <Trophy size={24} className={overallProgress === 100 ? "text-amber-500" : "text-zinc-200 dark:text-zinc-800"} />
            </div>
            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out" 
                    style={{ width: `${overallProgress}%` }}
                />
            </div>
        </div>

        {/* Milestone List */}
        <div className="space-y-3 pt-4">
          {milestones.map((ms, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-[#090b0d] border border-zinc-100 dark:border-zinc-800/50 group transition-all hover:border-emerald-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-[#121417] border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:scale-110 transition-transform">
                    {ms.icon}
                </div>
                <div>
                    <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-200">{ms.label}</p>
                    <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-tighter">Requirement</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[12px] font-black ${ms.isComplete ? "text-emerald-500" : "text-zinc-400"}`}>
                    {ms.current}
                </p>
                {ms.isComplete ? (
                    <span className="text-[8px] font-black text-emerald-500 uppercase">Passed</span>
                ) : (
                    <span className="text-[8px] font-black text-zinc-400 uppercase">Active</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Tip */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100/50 dark:border-amber-500/10">
            <p className="text-[10px] leading-relaxed text-amber-700 dark:text-amber-400/80 font-medium">
                <span className="font-bold">Pro-tip:</span> {
                    !roadmap.profile_complete 
                    ? "Completing your bio and profile picture increases community trust by 40%."
                    : roadmap.resources_published < roadmap.resources_goal
                    ? "Sharing just 2 more resources will unlock the 'Contributor' achievement."
                    : "You're nearly there! Keep engaging with the community to finish your roadmap."
                }
            </p>
        </div>
      </div>
    </div>
  );
};
