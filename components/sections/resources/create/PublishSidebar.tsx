"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Props {
  onPublish: () => void;
  onSaveDraft: () => void;
  isEdit?: boolean;
  isSaving?: boolean;
  visibility?: string;
  isPublished?: boolean;
  studentSummary?: string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const PublishSidebar = ({ 
  onPublish, 
  onSaveDraft, 
  isEdit = false, 
  isSaving = false,
  visibility = "public",
  isPublished = false,
  studentSummary = "",
  setFormData
}: Props) => {
  const router = useRouter();

  return (
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="bg-blue-50 dark:bg-blue-600/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
        <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors duration-300">
          Publishing tips
        </span>
        <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Make your resource remix-friendly
        </h4>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-500 leading-relaxed transition-colors duration-300">
          Clear structure and multiple file formats help other instructors adapt
          this for their own context.
        </p>
      </div>

      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800/40 text-[11px] transition-colors duration-300">
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Status
          </span>
          <span className={`font-bold transition-colors duration-300 ${isPublished ? "text-emerald-500" : "text-zinc-400"}`}>
            {isPublished ? "Live" : "Draft"}
          </span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Visibility
          </span>
          <span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300 capitalize">
            {visibility}
          </span>
        </div>
        <div className="p-4 flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-500 font-medium">
            Type
          </span>
          <span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
            {isEdit ? "Revised" : "New"}
          </span>
        </div>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-3 transition-colors duration-300">
        <h4 className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest transition-colors duration-300">
          Student-facing summary
        </h4>
        <textarea
          value={studentSummary}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, student_summary: e.target.value }))}
          placeholder="E.g. In this lesson, you'll explore photosynthesis..."
          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 min-h-[80px] resize-none italic transition-all"
        />
        <p className="text-[9px] text-zinc-400 leading-relaxed italic">
          This note will be visible to students when they access this resource.
        </p>
      </div>

      <div className="pt-6 space-y-3">
        <Button
          onClick={onPublish}
          variant="emerald"
          size="lg"
          fullWidth
          isLoading={isSaving}
        >
          {isEdit ? "Update and Publish" : "Publish to repository"}
        </Button>
        <Button 
          onClick={onSaveDraft}
          variant="outline"
          size="lg"
          fullWidth
          disabled={isSaving}
        >
          {isEdit ? "Update Draft" : "Save as draft"}
        </Button>
        <button
          onClick={() => router.back()}
          disabled={isSaving}
          className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 py-2 text-[11px] font-bold transition-colors duration-300 disabled:opacity-30"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

