"use client";

import React, { useState, useEffect } from 'react';
import { Download, X, Eye, Loader2, FileText } from 'lucide-react';
import { GeneratedCardProps } from '@/types/generator';
import { saveAs } from 'file-saver';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css"; 
import { useTheme } from 'next-themes';

export const GeneratedCard: React.FC<GeneratedCardProps> = ({ id, title, subject, description, tags, type, pdf_url, onDelete }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll when modal is open
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showPreview]);

  const handleDownload = async () => {
    if (!pdf_url) return;
    try {
      setIsDownloading(true);
      const response = await fetch(pdf_url);
      const blob = await response.blob();
      saveAs(blob, `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    } catch (error) {
      console.error("Download failed", error);
      window.open(pdf_url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group duration-300 flex flex-col h-full">
        {/* Card Content ... same as before */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold text-[15px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{title}</h4>
            <p className="text-zinc-500 dark:text-zinc-500 text-[12px] mt-1">{subject}</p>
          </div>
        </div>
        
        <div className="mb-4 flex-1">
          <h5 className="text-zinc-600 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-wider mb-2">{type}</h5>
          <p className="text-zinc-700 dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-500 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          {pdf_url ? (
            <>
              <button onClick={() => setShowPreview(true)} className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 py-2 rounded-lg text-[12px] font-bold transition-all border border-zinc-200 dark:border-zinc-800">
                <Eye size={14} /> View
              </button>
              <button onClick={handleDownload} disabled={isDownloading} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-[12px] font-bold transition-all border border-blue-200 dark:border-blue-500/20 disabled:opacity-50">
                {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} Download
              </button>
            </>
          ) : (
             <button disabled className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 py-2 rounded-lg text-[12px] font-bold cursor-not-allowed">
              <Download size={14} /> Processing...
            </button>
          )}
          <button onClick={() => onDelete?.(id)} className="flex items-center justify-center p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-500/20"><X size={16} /></button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showPreview && pdf_url && (
        <div className="fixed inset-0 z-[110] flex flex-col bg-zinc-950/95 backdrop-blur-md animate-in fade-in duration-300">
           {/* Modal Header */}
           <div className="flex-none h-14 flex justify-between items-center px-8 bg-white dark:bg-[#0c0d0f] border-b border-zinc-200 dark:border-zinc-800 shadow-sm z-20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-emerald-500 text-white rounded-lg">
                <FileText size={16} />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-bold text-sm truncate max-w-lg">{title}</h3>
            </div>
            <button 
              onClick={() => setShowPreview(false)}
              className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Main Content Area - overflow-y-auto enables scrolling for the document */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-zinc-100 dark:bg-[#090a0c]">
            <div className="min-h-full w-full max-w-5xl mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative bg-white dark:bg-[#121417] overflow-hidden">
              <div className="w-full h-full min-h-[80vh] [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                {mounted && (
                  <DocViewer 
                    key={resolvedTheme}
                    documents={[{ uri: pdf_url, fileName: title }]} 
                    pluginRenderers={DocViewerRenderers}
                    config={{ 
                      header: { disableHeader: true },
                      pdfVerticalScrollByDefault: true,
                    }}
                    theme={{
                      primary: "#10b981",
                      secondary: resolvedTheme === 'dark' ? "#0c0d0f" : "#f3f4f6",
                      tertiary: resolvedTheme === 'dark' ? "#121417" : "#f9fafb",
                      textPrimary: resolvedTheme === 'dark' ? "#ffffff" : "#111827",
                      textSecondary: resolvedTheme === 'dark' ? "#a1a1aa" : "#6b7280",
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};