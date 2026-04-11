import React from "react";
import { RefreshCw, Star } from "lucide-react";
import { ResourceDetail } from "@/types/resources";

interface Props {
  resource: ResourceDetail;
}

export const DetailHero = ({ resource }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
            {resource.title}
          </h1>
          <div className="flex gap-2">
            {[
              `Subject: ${resource.subject}`,
              resource.grade,
              `Unit: ${resource.unit}`,
              `Type: ${resource.type}`,
            ].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right space-y-2">
          <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 rounded text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-tighter inline-flex items-center gap-2 transition-colors duration-300">
            <RefreshCw size={12} /> Remix of Algebra Fundamentals by Maria
            Santos
          </div>
          <div className="flex items-center justify-end gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />{" "}
            <span className="text-zinc-900 dark:text-white font-bold transition-colors duration-300">
              {resource.rating}
            </span>
            <span className="text-zinc-500 dark:text-zinc-500 text-xs ml-1 transition-colors duration-300">
              · {resource.reviews} reviews
            </span>
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
