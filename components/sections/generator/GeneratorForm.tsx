"use client";
import React, { useState } from "react";
import {
  Sparkles,
  AlertCircle,
  ChevronDown,
  ClipboardList,
  Lightbulb,
  FileText,
} from "lucide-react";
import { ContentType, ViewMode } from "@/types/generator";
import { ContentTypeCard } from "./ContentTypeCard";

interface Props {
  onSuccess: (view: ViewMode) => void;
}

export const GeneratorForm = ({ onSuccess }: Props) => {
  const [selectedType, setSelectedType] = useState<ContentType>("classroom");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState<string>("Computer Science");
  const [grade, setGrade] = useState<string>("University");
  const [objectives, setObjectives] = useState<string>("");

  const handleGenerate = () => {
    if (!objectives || !subject || !grade) {
      setError(
        "Subject, Grade Level, and Learning Goals/Objectives are required to generate content.",
      );
      return;
    }
    setError(null);
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            onSuccess("results");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Type Selection */}
      <div className="flex flex-wrap gap-4">
        <ContentTypeCard
          icon={ClipboardList}
          title="Lesson Plan"
          description="Complete lesson structure with objectives materials, and activities."
          active={selectedType === "lesson"}
          onClick={() => setSelectedType("lesson")}
        />
        <ContentTypeCard
          icon={Lightbulb}
          title="Teaching Strategy"
          description="Innovative approaches and engagement techniques for your class."
          active={selectedType === "strategy"}
          onClick={() => setSelectedType("strategy")}
        />
        <ContentTypeCard
          icon={FileText}
          title="Classroom Material"
          description="Worksheets, assessments, and activity sheets tailored to your goals."
          active={selectedType === "classroom"}
          onClick={() => setSelectedType("classroom")}
        />
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-8 space-y-8 relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Content Details
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1 transition-colors duration-300">
            Provide information to customize your generated content.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
                Subject <span className="text-red-500 ml-1 font-black">*</span>
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300"
                >
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
                Grade Level{" "}
                <span className="text-red-500 ml-1 font-black">*</span>
              </label>
              <div className="relative">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300"
                >
                  <option>University</option>
                  <option>High School</option>
                  <option>Middle School</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
              Learning Goals/Objectives{" "}
              <span className="text-red-500 ml-1 font-black">*</span>
            </label>
            <textarea
              placeholder="Introduce students to software engineering basics..."
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              rows={5}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700 leading-relaxed transition-colors duration-300"
            />
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3.5 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-3 ${
                isGenerating
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 active:scale-[0.99] shadow-lg shadow-emerald-500/5"
              }`}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles size={18} />
              )}
              Generate Content with AI
            </button>

            {isGenerating && (
              <div className="space-y-3 animate-in fade-in">
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-center text-zinc-500 dark:text-zinc-500 text-[11px] font-medium italic transition-colors duration-300">
                  Generating classroom materials based on your objectives...
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-500 text-[12px] font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 animate-in shake-in duration-200 transition-colors duration-300">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};
