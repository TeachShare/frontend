"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Download, RefreshCw, Star, User } from "lucide-react";
import { RepositoryData } from "@/types/repository";

interface Props {
  data: any;
  onRemix: () => void;
  onDownload: () => void; // Add this prop
}

export const RepositoryItem = ({ data, onRemix, onDownload }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden group transition-colors duration-300">
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

          {/* ADDED: Author attribution to show it belongs to someone else */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
              {data.subject}
            </p>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
            <p className="flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
              <User size={12} /> Community Contributor
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {data.tags.map((tag: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Button */}
            <button
              onClick={() =>{
                 const cleanTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/resources/${data.collection_id}-${cleanTitle}`); 
              }
              }
              className="flex-1 min-w-[120px] py-2.5 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-all border border-blue-200 dark:border-blue-500/10 flex items-center justify-center space-x-2"
            >
              <Eye size={14} /> <span>View Details</span>
            </button>

            {/* Download Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="flex-1 min-w-[120px] py-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center space-x-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300"
            >
              <Download size={14} /> <span>Download Files</span>
            </button>

            {/* Remix Button */}
            <button
              onClick={onRemix}
              className="flex-1 min-w-[120px] py-2.5 bg-emerald-50 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold rounded-lg border border-emerald-200 dark:border-emerald-500/10 flex items-center justify-center space-x-2 hover:bg-emerald-100 dark:hover:bg-emerald-600/20 transition-colors duration-300"
            >
              <RefreshCw size={14} /> <span>Remix Resource</span>
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
