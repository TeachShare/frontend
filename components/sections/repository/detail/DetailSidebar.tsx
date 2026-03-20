import React from "react";
import { Eye, Download, ThumbsUp, RefreshCw, Star, Trash2 } from "lucide-react";
import { ResourceDetail } from "@/types/resources";

interface Props {
  resource: ResourceDetail;
}

export const DetailSidebar = ({ resource }: Props) => {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      {/* Files List */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
            Files in this resource
          </h2>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded transition-colors duration-300">
            Ready for students
          </span>
        </div>
        <div className="space-y-3">
          {resource.files.map((file, i) => (
            <div
              key={i}
              className="group p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-500 dark:text-zinc-500 font-black text-[10px] transition-colors duration-300">
                    {file.type}
                  </div>
                  <span className="text-xs text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300 truncate max-w-[150px]">
                    {file.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300">
                    <Eye size={14} />
                  </button>
                  <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300">
                    <Download size={14} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-wider transition-colors duration-300">
                Presentation·21 slides·{file.size}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors duration-300">
          <span className="flex items-center gap-1">
            <ThumbsUp size={12} /> {resource.likes} likes
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw size={12} /> {resource.remixes} remixes
          </span>
          <span className="flex items-center gap-1">
            <Download size={12} /> {resource.downloads} dls
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
            Reviews & feedback
          </h2>
          <button className="text-[10px] text-zinc-600 dark:text-zinc-500 font-bold uppercase flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded transition-colors duration-300">
            Leave a review <Star size={12} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
                <span className="text-xs text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
                  Priya Singh
                </span>
              </div>
              <div className="flex text-yellow-500">
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} fill="currentColor" />
                <Star size={10} />
              </div>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-500 italic transition-colors duration-300">
              &quot;Clear progression from concrete to abstract. My students
              especially liked the real-world word problems.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">
          <Download size={14} /> Download all
        </button>
        <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">
          <RefreshCw size={14} /> Remix
        </button>
      </div>
      <button className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-600 dark:hover:text-rose-500 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2">
        <Trash2 size={12} /> Delete resource
      </button>
    </div>
  );
};
