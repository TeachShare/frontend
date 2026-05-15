"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={`relative w-full ${maxWidth} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}>
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/60">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
