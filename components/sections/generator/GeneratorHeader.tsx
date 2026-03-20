import React from "react";
import { Wand2, Sparkles } from "lucide-react";
import { ViewMode } from "@/types/generator";

interface Props {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
}

export const GeneratorHeader = ({ activeView, setActiveView }: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="max-w-xl">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
          AI Content Generator
        </h1>
        <p className="text-zinc-600 dark:text-zinc-500 text-[14px] mt-2 leading-relaxed transition-colors duration-300">
          Generate customized lesson plans, teaching strategies, and classroom
          materials powered by AI.
        </p>
      </div>
      <div className="flex bg-zinc-200/50 dark:bg-zinc-900/40 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800/60 self-start transition-colors duration-300">
        <button
          onClick={() => setActiveView("generator")}
          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeView === "generator"
              ? "bg-emerald-500 text-white dark:text-zinc-950 shadow-lg shadow-emerald-500/10"
              : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          }`}
        >
          <Wand2 size={14} /> Generate Content
        </button>
        <button
          onClick={() => setActiveView("results")}
          className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeView === "results"
              ? "bg-emerald-500 text-white dark:text-zinc-950 shadow-lg shadow-emerald-500/10"
              : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          }`}
        >
          <Sparkles size={14} /> My Generated (2)
        </button>
      </div>
    </div>
  );
};
