import React from "react";
import { Trash2 } from "lucide-react";
import { ResourceCardProps } from "@/types/resources";

export const ResourceCard = ({
  title,
  category,
  type,
  downloads,
  likes,
  updated,
  curriculum,
  coTeachers,
  visibility,
  status,
}: ResourceCardProps) => {
  const isDraft = status === "Draft";

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-1 transition-colors duration-300">
            {title}
          </h4>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider transition-colors duration-300 ${
              status === "Featured"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : status === "Draft"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mb-4 transition-colors duration-300">
          {category} · {type}
        </p>

        <div className="grid grid-cols-2 gap-y-2 mb-4">
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
            Downloads:{" "}
            <span className="text-zinc-900 dark:text-zinc-300 ml-1">
              {downloads}
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
            Likes:{" "}
            <span className="text-zinc-900 dark:text-zinc-300 ml-1">
              {likes}
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
            Updated:{" "}
            <span className="text-zinc-900 dark:text-zinc-300 ml-1">
              {updated}
            </span>
          </div>
        </div>

        <div className="space-y-1 mb-5">
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">
              Curriculum:
            </span>{" "}
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">
              {curriculum}
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">
              Co-teachers:
            </span>{" "}
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">
              {coTeachers}
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">
              Visibility:
            </span>{" "}
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">
              {visibility}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        {isDraft ? (
          <>
            <button className="flex-1 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 py-1.5 rounded-md text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-colors">
              Continue editing
            </button>
            <button className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
              Preview
            </button>
            <button className="px-2.5 py-1.5 bg-red-50 dark:bg-red-500/5 text-red-600 dark:text-red-500/70 rounded-md text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors duration-300">
              <Trash2 size={14} />
            </button>
          </>
        ) : (
          <>
            <button className="flex-1 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 py-1.5 rounded-md text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-colors">
              View
            </button>
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
              Edit
            </button>
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
              Share
            </button>
            <button className="px-3 py-1.5 bg-red-50 dark:bg-red-500/5 text-red-600 dark:text-red-500/70 rounded-md text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors duration-300">
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
