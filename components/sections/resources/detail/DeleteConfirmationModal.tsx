"use client";
import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
}

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading = false, title }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl text-rose-500">
              <AlertTriangle size={32} />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
              Delete Resource?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Are you sure you want to permanently delete <span className="font-bold text-zinc-900 dark:text-zinc-200">"{title}"</span>? This action cannot be undone and will wipe all version history.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={onConfirm}
              isLoading={isLoading}
              leftIcon={<Trash2 size={14} />}
              className="flex-1"
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
