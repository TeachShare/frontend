"use client";
import React, { useState } from "react";
import { AlertCircle, Loader2, Flag, Send } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetId: number;
  targetType: 'resource' | 'comment' | 'post' | 'teacher';
}

const REASONS = [
  { label: "Inappropriate Content", value: "inappropriate" },
  { label: "Spam or Advertising", value: "spam" },
  { label: "Copyright Violation", value: "copyright" },
  { label: "Harassment", value: "harassment" },
  { label: "Other", value: "other" },
];

const TOAST_STYLE = {
  style: {
    minWidth: "280px",
    fontSize: "11px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderRadius: "12px",
    background: "#090a0c",
    color: "#fff",
    border: "1px solid #27272a",
    padding: "12px 16px",
  },
};

export const ReportModal = ({ isOpen, onClose, targetId, targetType }: Props) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason.", TOAST_STYLE);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/moderation/report", {
        target_type: targetType,
        target_id: targetId,
        reason,
        description
      });

      if (response.data.success) {
        toast.success("REPORT SUBMITTED: Thank you for keeping TeachShare safe.", TOAST_STYLE);
        onClose();
        // Reset state
        setReason("");
        setDescription("");
      }
    } catch (error: unknown) {
      console.error("Report failed", error);
      const apiError = error as { response?: { data?: { error?: string } } };
      toast.error(`ERROR: ${apiError.response?.data?.error || "Failed to submit report"}`, TOAST_STYLE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400 transition-colors duration-300">
              <Flag size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                Report {targetType}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1 transition-colors duration-300">
                Help us understand what is wrong with this {targetType}.
              </p>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Select Reason</p>
             <div className="grid grid-cols-1 gap-2">
                {REASONS.map((r) => (
                   <button
                    key={r.value}
                    onClick={() => setReason(r.value)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${
                      reason === r.value 
                        ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400' 
                        : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-200 dark:hover:border-zinc-700'
                    }`}
                   >
                     {r.label}
                   </button>
                ))}
             </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Additional Details (Optional)</p>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more context..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-rose-500/30 min-h-[100px] resize-none"
            />
          </div>

          {/* Warning Note */}
          <div className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
             <AlertCircle size={14} className="text-zinc-400 shrink-0 mt-0.5" />
             <p className="text-[10px] text-zinc-500 dark:text-zinc-500 leading-relaxed italic">
               Submitting false reports may result in account suspension. Our team reviews all reports.
             </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose} 
              disabled={isSubmitting}
              className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !reason}
              className="flex-1 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
