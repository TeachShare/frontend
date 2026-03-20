import React from "react";
import { Clock, ChevronRight } from "lucide-react";
import { activitySnapshotData } from "@/dummy-datas/dashboard";

export const ActivitySnapshot = () => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">
        Activity snapshot
      </h3>

      <div className="space-y-6">
        {activitySnapshotData.map((activity, i) => (
          <div
            key={i}
            className="flex items-start space-x-3 group cursor-pointer"
          >
            <div
              className={`w-2 h-2 rounded-full ${activity.dot} mt-1.5 shrink-0`}
            />
            <div className="flex-1">
              <p className="text-[12px] text-zinc-700 dark:text-zinc-200 leading-relaxed transition-colors duration-300">
                <span className="font-bold text-zinc-900 dark:text-white">
                  {activity.title}
                </span>{" "}
                {activity.bold}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                {activity.detail}
              </p>
              <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center font-bold tracking-wider uppercase transition-colors duration-300">
                <Clock
                  size={10}
                  className="mr-1 text-zinc-400 dark:text-zinc-600"
                />{" "}
                {activity.time}
              </p>
            </div>
          </div>
        ))}

        <div className="bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 mt-4 flex items-center justify-between gap-3 transition-colors duration-300">
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-zinc-900 dark:text-white truncate transition-colors duration-300">
              Draft resource waiting for review
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
              &quot;Inequalities Card Sort&quot; · In drafts
            </p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all active:scale-95 shrink-0">
            Review
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/30 mt-6 flex flex-col gap-4 transition-colors duration-300">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic transition-colors duration-300">
          These updates are based on your notification settings.
        </p>
        <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-wider flex items-center group self-end transition-colors duration-300">
          <span>Open full activity log</span>
          <ChevronRight
            size={12}
            className="ml-0.5 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};
