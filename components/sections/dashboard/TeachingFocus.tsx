import React from "react";

interface TeachingFocusProps {
  resources?: any[];
}

export const TeachingFocus = ({ resources = [] }: TeachingFocusProps) => {
  const publishedCount = resources.filter(r => r.is_published).length;
  const draftResources = resources.filter(r => !r.is_published);
  const goal = 5; // Weekly goal placeholder
  const progress = Math.min(Math.round((publishedCount / goal) * 100), 100);

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">
        Teaching Focus & Progress
      </h3>

      <div className="space-y-6">
        {draftResources.length > 0 ? (
          <div className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1.5">
              <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {draftResources[0].title}
              </h4>
              <span className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                In Draft
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {draftResources[0].category} · Needs your final touch to publish.
            </p>
          </div>
        ) : resources.length > 0 ? (
          <div className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1.5">
              <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {resources[0].title}
              </h4>
              <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Published
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {resources[0].category} · {resources[0].likes} educators liked this.
            </p>
          </div>
        ) : (
          <p className="text-xs text-zinc-500 italic">No resources yet. Start by creating one!</p>
        )}

        <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Weekly publishing progress
            </p>
            <p className="text-[11px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
              {progress}% of goal
            </p>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
            <div 
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
