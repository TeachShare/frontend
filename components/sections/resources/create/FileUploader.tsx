"use client";
import React, { useState, useRef } from "react";
import { FileUp, Files, X } from "lucide-react";

interface Props {
  attachedFiles: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

export const FileUploader = ({
  attachedFiles,
  onAddFiles,
  onRemoveFile,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (e.dataTransfer.files?.length)
      onAddFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onAddFiles(Array.from(e.target.files));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Attach files
        </h3>
        <span className="text-[9px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest transition-colors duration-300">
          Required
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
        <FileUp
          size={24}
          className={`mx-auto transition-colors duration-300 ${isDragging ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-700"}`}
        />
        <div>
          <p className="text-xs text-zinc-900 dark:text-white transition-colors duration-300">
            Drop files here or click to browse
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mt-1 transition-colors duration-300">
            PPTX, DOC, PDF, PNG • Max 250 MB
          </p>
        </div>
        <button
          type="button"
          className="bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-1.5 rounded text-[11px] font-bold border border-zinc-200 dark:border-zinc-700 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 pointer-events-none"
        >
          Choose files
        </button>
      </div>

      {attachedFiles.length > 0 && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
          {attachedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-lg group transition-colors duration-300"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Files
                  size={16}
                  className="text-zinc-400 dark:text-zinc-500 shrink-0"
                />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {file.name}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 shrink-0">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(idx);
                }}
                className="p-1 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
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
