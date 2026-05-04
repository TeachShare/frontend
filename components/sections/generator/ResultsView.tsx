import React from "react";
import { Wand2, Plus } from "lucide-react";
import { ViewMode } from "@/types/generator";
import { useGenerator } from "@/hooks/useGenerator";
import { GeneratedCard } from "./GeneratedCard";

interface Props {
  onGenerateMore: (view: ViewMode) => void;
}

export const ResultsView = ({ onGenerateMore }: Props) => {
  const { results, isLoadingHistory, deleteItem } = useGenerator();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Your Generated Content
          </h2>
          <p className="text-zinc-600 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">
            View and manage all AI-generated lesson plans, strategies, and
            classroom materials.
          </p>
        </div>
        <button
          onClick={() => onGenerateMore("generator")}
          className="bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-xl border border-blue-200 dark:border-blue-500/20 text-[13px] font-bold flex items-center gap-2 transition-all duration-300 w-fit"
        >
          <Wand2 size={16} /> Generate More
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoadingHistory ? (
          <div className="col-span-full py-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : results.length > 0 ? (
          results.map((item, index) => (
            <GeneratedCard 
              key={item.id || index} 
              id={item.id}
              title={item.title}
              subject={item.subject || item.title}
              type={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              description={item.content.substring(0, 150) + "..."}
              tags={[item.type, item.grade || ""].filter(Boolean)}
              pdf_url={item.pdf_url}
              onDelete={deleteItem}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-zinc-500 italic">
            No content generated yet. Start by using the generator!
          </div>
        )}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 border-dashed text-center transition-colors duration-300">
        <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
          <Plus
            size={24}
            className="text-zinc-500 dark:text-zinc-600 transition-colors duration-300"
          />
        </div>
        <h4 className="text-zinc-700 dark:text-zinc-400 font-bold transition-colors duration-300">
          Need something else?
        </h4>
        <p className="text-zinc-500 dark:text-zinc-600 text-sm mt-1 max-w-sm mx-auto transition-colors duration-300">
          Use the AI Generator to create more custom resources for your classes
          in seconds.
        </p>
      </div>
    </div>
  );
};
