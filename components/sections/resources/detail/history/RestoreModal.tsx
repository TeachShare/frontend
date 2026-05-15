"use client";
import React from "react";
import { ArchiveRestore, Loader2, Info, AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  version: any | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const RestoreModal = ({ isOpen, onClose, version, onConfirm, isLoading = false }: Props) => {
  if (!isOpen || !version) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 transition-colors">
      <div className="w-full max-w-xl bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <ArchiveRestore size={24} />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                {isLoading ? "Restoring Version..." : "Restore this version?"}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1 transition-colors duration-300">
                {isLoading 
                  ? "We are rolling back the collection state..." 
                  : "This will promote this snapshot to the current active version."}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Target Version</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">v{version.version_no}</p>
            </div>
            <div className="space-y-1 text-right">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Created At</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                    {new Date(version.created_at).toLocaleDateString()}
                </p>
            </div>
          </div>

          {/* Restore Rules Box */}
          <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 rounded-xl p-4 space-y-3 transition-colors duration-300">
             <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
               <AlertTriangle size={14} />
               <p className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">Restoration Protocol</p>
             </div>
             <p className="text-[11px] text-zinc-600 dark:text-zinc-400 transition-colors duration-300 leading-relaxed">
               Restoring will make this version the &quot;Latest&quot;. Your current work will be preserved as a previous version in the history lineage.
             </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose} 
              disabled={isLoading}
              className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              disabled={isLoading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <ArchiveRestore size={14} />
                  Confirm Restore
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};