"use client";
import React from "react";
import { RefreshCw, Loader2, Info } from "lucide-react";
import { RemixItemType } from "@/types/repository";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: RemixItemType | null;
  onConfirm: () => void;
  isLoading?: boolean; // New prop for loading state
}

export const RemixModal = ({ isOpen, onClose, item, onConfirm, isLoading = false }: Props) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 transition-colors">
      <div className="w-full max-w-xl bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 transition-colors duration-300">
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <RefreshCw size={24} />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                {isLoading ? "Cloning Resource..." : "Remix this collection?"}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1 transition-colors duration-300">
                {isLoading 
                  ? "We are preparing your personal immutable copy..." 
                  : "Create your own copy to customize for your students."}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Original collection</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">{item.title}</p>
          </div>

          {/* Remix Rules Box */}
          <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-4 space-y-3 transition-colors duration-300">
             <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
               <Info size={14} />
               <p className="text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">Remix Protocol</p>
             </div>
             <p className="text-[11px] text-zinc-600 dark:text-zinc-400 transition-colors duration-300 leading-relaxed">
               This creates an independent lineage. The original owner is permanently cited in the version history for attribution.
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  Confirm remix
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};