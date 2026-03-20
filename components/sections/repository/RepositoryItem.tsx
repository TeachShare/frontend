"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Download,
  RefreshCw,
  GitBranch,
  Trash2,
  Star,
} from "lucide-react";
import { RepositoryData } from "@/types/repository";

interface Props {
  data: RepositoryData;
  onRemix: () => void;
}

export const RepositoryItem = ({ data, onRemix }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden mb-6 group transition-colors duration-300">
      <div className="p-5 flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">
              {data.title}
            </h3>
            {data.typeTag && (
              <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 rounded uppercase tracking-widest border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                {data.typeTag}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium mb-3 transition-colors duration-300">
            {data.subject}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Button */}
            <button
              onClick={() =>
                router.push(
                  `/repository/${data.title.toLowerCase().replace(/ /g, "-")}`,
                )
              }
              className="flex-1 min-w-[100px] py-2 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-all border border-blue-200 dark:border-blue-500/10 flex items-center justify-center space-x-2"
            >
              <Eye size={14} /> <span>View</span>
            </button>

            {/* Download Button */}
            <button className="flex-1 min-w-[100px] py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center space-x-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300">
              <Download size={14} /> <span>Download</span>
            </button>

            {/* Remix Button */}
            <button
              onClick={onRemix}
              className="flex-1 min-w-[100px] py-2 bg-rose-50 dark:bg-rose-600/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold rounded border border-rose-200 dark:border-rose-500/10 flex items-center justify-center space-x-2 hover:bg-rose-100 dark:hover:bg-rose-600/20 transition-colors duration-300"
            >
              <RefreshCw size={14} /> <span>Remix</span>
            </button>

            {/* History Button */}
            <button
              onClick={() =>
                router.push(
                  `/repository/${data.title.toLowerCase().replace(/ /g, "-")}/history`,
                )
              }
              className="flex-1 min-w-[100px] py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[11px] font-bold rounded border border-blue-200 dark:border-blue-400/10 flex items-center justify-center space-x-2 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all"
            >
              <GitBranch size={14} /> <span>History</span>
            </button>

            {/* Delete Button */}
            <button className="flex-1 min-w-[100px] py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500/70 text-[11px] font-bold rounded border border-rose-200 dark:border-zinc-800 flex items-center justify-center space-x-2 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors duration-300">
              <Trash2 size={14} /> <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="xl:w-64 space-y-3 shrink-0">
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/40 rounded-lg p-3 text-center text-xs transition-colors duration-300">
            <div className="flex justify-center gap-1 text-yellow-500 mb-1">
              <Star size={12} fill="currentColor" /> <span>{data.rating}</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
              {data.reviews} reviews
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              Likes
              <br />
              <span className="text-zinc-900 dark:text-white transition-colors duration-300">
                {data.likes}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              Shares
              <br />
              <span className="text-zinc-900 dark:text-white transition-colors duration-300">
                {data.shares}
              </span>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              DLs
              <br />
              <span className="text-zinc-900 dark:text-white transition-colors duration-300">
                {data.downloads}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
