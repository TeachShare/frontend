"use client";
import React, { useState, useRef } from "react";
import { FileUp, Files, X, CloudCheck } from "lucide-react";

import { toast } from "react-hot-toast";

interface Props {
  attachedFiles: File[];
  existingFiles?: any[]; // ADDED
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onRemoveExistingFile?: (url: string) => void;
}

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

export const FileUploader = ({
  attachedFiles,
  existingFiles = [], // DEFAULT TO EMPTY
  onAddFiles,
  onRemoveFile,
  onRemoveExistingFile
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkDuplicates = (newFiles: File[]) => {
    const duplicates: string[] = [];
    const uniqueFiles = newFiles.filter(file => {
      const isExistingDuplicate = existingFiles.some(
        ef => ef.name === file.name && ef.size === file.size
      );
      const isAttachedDuplicate = attachedFiles.some(
        af => af.name === file.name && af.size === file.size
      );
      
      if (isExistingDuplicate || isAttachedDuplicate) {
        duplicates.push(file.name);
        return false;
      }
      return true;
    });

    if (duplicates.length > 0) {
      toast.error(
        `DUPLICATE DETECTED: ${duplicates.join(", ")} already added.`,
        TOAST_STYLE
      );
    }

    return uniqueFiles;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      const uniqueFiles = checkDuplicates(Array.from(e.dataTransfer.files));
      if (uniqueFiles.length > 0) {
        onAddFiles(uniqueFiles);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uniqueFiles = checkDuplicates(Array.from(e.target.files));
      if (uniqueFiles.length > 0) {
        onAddFiles(uniqueFiles);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Resource files
        </h3>
        <span className="text-[9px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest transition-colors duration-300">
          {attachedFiles.length + existingFiles.length} Total
        </span>
      </div>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pptx,.doc,.docx,.pdf,.png,.jpg,.jpeg"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center space-y-4 cursor-pointer transition-all duration-300 ${isDragging ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent hover:border-emerald-500/30 dark:hover:border-emerald-500/30"}`}
      >
        <FileUp size={24} className={`mx-auto transition-colors duration-300 ${isDragging ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-700"}`} />
        <div>
          <p className="text-xs text-zinc-900 dark:text-white">Drop files here or click to browse</p>
          <p className="text-[10px] text-zinc-500 mt-1">Add new files to this version</p>
        </div>
      </div>

      {/* RENDER FILES CONTAINER */}
      {(attachedFiles.length > 0 || existingFiles.length > 0) && (
        <div className="space-y-2">
          
          {/* 1. Render Existing Files (Stored in Cloud) */}
          {existingFiles.map((file, idx) => (
            <div key={`exist-${idx}`} className="flex items-center justify-between p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800/40 rounded-lg group">
              <div className="flex items-center gap-3 overflow-hidden">
                <CloudCheck size={16} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {file.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Current Version</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveExistingFile?.(file.url); }}
                  className="p-1 text-zinc-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* 2. Render Newly Attached Files */}
          {attachedFiles.map((file, idx) => (
            <div
              key={`new-${idx}`}
              className="flex items-center justify-between p-3 bg-emerald-50/30 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-lg group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Files size={16} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200 truncate">
                  {file.name}
                </span>
                <span className="text-[10px] text-emerald-600/60 dark:text-emerald-400/60 shrink-0">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveFile(idx); }}
                className="p-1 text-zinc-400 hover:text-rose-500 transition-all duration-200"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
