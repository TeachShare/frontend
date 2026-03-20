"use client";
import React from "react";
import { Plus, Check } from "lucide-react";
import { Educator } from "@/types/community";

export const EducatorCard = ({
  name,
  role,
  avatar,
  resources,
  followers,
  coTeaching,
  alignment,
  tags,
  specialTags,
  following = false,
}: Educator) => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group duration-300">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300"
            />
            <div>
              <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {name}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-tight mt-0.5 transition-colors duration-300">
                {role}
              </p>
            </div>
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 ${
              following
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                : "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/20"
            }`}
          >
            {following ? (
              <>
                <Check size={14} /> <span>Following</span>
              </>
            ) : (
              <>
                <Plus size={14} /> <span>Follow</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {specialTags?.map((tag, i) => (
            <span
              key={i}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                tag === "Top contributor"
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/10"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 border border-transparent"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Resources
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{resources}</p>
          </div>
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Followers
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{followers}</p>
          </div>
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Co-teaching
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{coTeaching}</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-600 uppercase transition-colors duration-300">
              Follow alignment
            </span>
            <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              {alignment}% match
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
              style={{ width: `${alignment}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-300">
          View profile
        </button>
        <button className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          Invite to collaborate
        </button>
      </div>
    </div>
  );
};