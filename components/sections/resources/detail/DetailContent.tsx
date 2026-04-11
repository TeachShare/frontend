import React from "react";
import { History, ChevronDown } from "lucide-react";
import { ResourceDetail } from "@/types/resources";

interface Props {
  resource: ResourceDetail;
}

export const DetailContent = ({ resource }: Props) => {
  return (
    <div className="col-span-12 lg:col-span-8 space-y-6">
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
            Resource metadata & description
          </h2>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs transition-colors duration-300">
            <History size={14} /> <span>Version B · Active</span>{" "}
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8 text-[11px]">
          <div>
            <p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">
              Subject
            </p>
            <p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">
              {resource.subject}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">
              Grade level
            </p>
            <p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">
              {resource.grade}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">
              Resource type
            </p>
            <p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">
              {resource.type}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">
              Duration
            </p>
            <p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">
              3-4 class sessions
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6 transition-colors duration-300">
          {["Heading", "Bullets", "Checklist", "Quote"].map((btn) => (
            <button
              key={btn}
              className="px-3 py-1 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-zinc-900 dark:text-white font-bold text-sm mb-3 uppercase tracking-wide transition-colors duration-300">
              Overview
            </h3>
            
            {/* --- UPDATED: Dynamic Rich Text Rendering --- */}
            <div 
              className="text-zinc-600 dark:text-zinc-400 text-[13px] leading-relaxed transition-colors duration-300 
                         [&>p]:mb-3 last:[&>p]:mb-0 
                         [&>strong]:text-zinc-900 dark:[&>strong]:text-white [&>strong]:font-bold 
                         [&>em]:italic 
                         [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-3 [&>ul>li]:mb-1
                         [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-3 [&>ol>li]:mb-1"
              dangerouslySetInnerHTML={{ __html: resource.description || "<p>No description provided.</p>" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};