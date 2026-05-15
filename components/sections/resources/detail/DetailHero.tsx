import React from "react";
import { RefreshCw, Star, GitBranch } from "lucide-react";
import { ResourceDetail } from "@/types/resources";
import Link from "next/link";

interface Props {
  resource: ResourceDetail;
}

export const DetailHero = ({ resource }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          {/* Citation / Remix Badge */}
          {resource.is_remix && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-900/30 rounded-lg w-fit transition-colors duration-300">
               <GitBranch size={12} className="text-blue-500 dark:text-blue-400" />
               <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-tight">
                 Remixed from: {" "}
                 {resource.parent_version_id ? (
                    <span className="text-blue-900 dark:text-blue-200">
                      {resource.original_author_name}&apos;s &quot;{resource.original_resource_title}&quot;
                    </span>
                 ) : (
                    <span className="text-zinc-500 italic">
                       {resource.original_author_name}&apos;s &quot;{resource.original_resource_title}&quot; (Archived)
                    </span>
                 )}
               </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
              {resource.title}
            </h1>
            {!resource.is_published && (
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded text-[9px] font-black uppercase tracking-[0.2em]">
                Draft
              </span>
            )}
          </div>
          
          {/* Tags Array Iteration */}
          <div className="flex gap-2 flex-wrap">
            {resource.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
        <div className="text-right space-y-2">
          <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 rounded text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-tighter inline-flex items-center gap-2 transition-colors duration-300">
            <RefreshCw size={12} /> {resource.title}
          </div>
          <div className="flex items-center justify-end gap-1 text-yellow-500">
            {resource.avg_rating > 0 ? (
                <>
                    <Star size={14} fill="currentColor" />{" "}
                    <span className="text-zinc-900 dark:text-white font-bold transition-colors duration-300">
                    {resource.avg_rating}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-500 text-xs ml-1 transition-colors duration-300">
                    · {resource.reviews_count || 0} reviews
                    </span>
                </>
            ) : (
                <span className="text-[10px] font-bold text-zinc-400 italic">No ratings yet</span>
            )}
          </div>
          <div className="flex gap-4 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors duration-300">
            <span>Likes {resource.likes}</span>
            <span>Remixes {resource.remixes}</span>
            <span>Downloads {resource.downloads}</span>
          </div>
        </div>
      </div>
    </div>
  );
};