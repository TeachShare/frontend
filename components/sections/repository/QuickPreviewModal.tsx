"use client";
import React, { useState, useEffect } from "react";
import { X, Download, RefreshCw, FileText, CheckCircle2, Shield, Calendar, BookOpen, Eye, Loader2 } from "lucide-react";
import { api } from "@/lib/axios";
import { saveAs } from 'file-saver';
import { useTheme } from "next-themes";
import { unescapeHtml } from "@/lib/utils";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css"; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onRemix: () => void;
  onDownload: () => void;
}

export const QuickPreviewModal = ({ isOpen, onClose, resource, onRemix, onDownload }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewFile, setViewFile] = useState<{url: string, name: string} | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && resource) {
      const fetchFiles = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/resource_collection/${resource.collection_id}`);
          if (res.data.success) {
            setFiles(res.data.data.files || []);
          }
        } catch (err) {
          console.error("Preview fetch failed", err);
        } finally {
          setLoading(false);
        }
      };
      fetchFiles();
    }
  }, [isOpen, resource]);

  const handleSingleDownload = async (url: string, filename: string) => {
    try {
      setDownloadingFile(url);
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      console.error("Single download failed", error);
      window.open(url, '_blank');
    } finally {
      setDownloadingFile(null);
    }
  };

  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/40 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Modal Header */}
        <div className="h-16 border-b border-zinc-100 dark:border-zinc-800/60 px-8 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/20">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                <BookOpen size={18} />
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Quick Content Preview</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <X size={24} />
           </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[70vh]">
            {/* Content Side */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-3xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                                {resource.title}
                            </h3>
                            {resource.owner_is_verified && (
                                <CheckCircle2 size={20} className="text-blue-500" />
                            )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                            <span className="flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> {resource.subject}</span>
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> v{resource.version_no}</span>
                            <span className="flex items-center gap-1.5">Grade {resource.grade}</span>
                        </div>
                    </div>

                    <div 
                        className="prose prose-sm dark:prose-invert max-w-none rich-text-content"
                        dangerouslySetInnerHTML={{ __html: unescapeHtml(resource.description) || "No description provided." }}
                    />

                    <div className="flex flex-wrap gap-2 pt-4">
                        {resource.tags?.map((tag: string, i: number) => (
                            <span key={i} className="text-[9px] font-bold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded-full border border-zinc-200 dark:border-zinc-800">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="w-full lg:w-80 bg-zinc-50/50 dark:bg-zinc-900/10 border-l border-zinc-100 dark:border-zinc-800/60 p-8 overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                    {/* Files Section */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center justify-between">
                            Attached Files
                            <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 px-2 py-0.5 rounded-full">{files.length}</span>
                        </h4>
                        <div className="space-y-2">
                            {loading ? (
                                [1,2].map(i => <div key={i} className="h-12 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl" />)
                            ) : files.length > 0 ? (
                                files.map((file: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group/file">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-lg">
                                                <FileText size={14} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-200 truncate">{file.name}</p>
                                                <p className="text-[8px] text-zinc-400 uppercase font-black tracking-tighter">{file.size}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => setViewFile({ url: file.url, name: file.name })}
                                                className="p-1.5 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/5 rounded-md transition-all"
                                                title="Preview File"
                                            >
                                                <Eye size={12} />
                                            </button>
                                            <button 
                                                onClick={() => handleSingleDownload(file.url, file.name)}
                                                disabled={downloadingFile === file.url}
                                                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all disabled:opacity-50"
                                                title="Download File"
                                            >
                                                {downloadingFile === file.url ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-zinc-400 italic">No files attached to this version.</p>
                            )}
                        </div>
                    </div>

                    {/* Meta Stats */}
                    <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800/60 pt-8">
                        <div className="text-center p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                            <p className="text-xl font-black text-zinc-900 dark:text-white">{resource.download_count || 0}</p>
                            <p className="text-[8px] font-bold text-zinc-400 uppercase">Downloads</p>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                            <p className="text-xl font-black text-zinc-900 dark:text-white">{resource.weekly_likes || 0}</p>
                            <p className="text-[8px] font-bold text-zinc-400 uppercase">New Likes</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <button 
                            onClick={onDownload}
                            className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-emerald-400 transition-all shadow-xl shadow-zinc-500/10"
                        >
                            <Download size={14} /> Download Zip
                        </button>
                        <button 
                            onClick={onRemix}
                            disabled={!resource.allow_remixing}
                            className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all disabled:opacity-50"
                        >
                            <RefreshCw size={14} /> Remix Logic
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Individual File View Modal */}
        {viewFile && (
          <div className="fixed inset-0 z-[120] flex flex-col bg-zinc-950/90 dark:bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex-none h-14 flex justify-between items-center px-8 bg-white dark:bg-[#0c0d0f] border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20">
                    <FileText size={16} />
                  </div>
                  <h3 className="text-zinc-900 dark:text-white font-bold text-sm tracking-tight truncate max-w-lg">{viewFile.name}</h3>
                </div>
                <button 
                  onClick={() => setViewFile(null)}
                  className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
            </div>
            
            {/* New Main Content Area with conditional backgrounds */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-zinc-100 dark:bg-[#090a0c]">
              <div className="h-full w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-[#1F2226] shadow-2xl relative">
                <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                  {mounted && (
                    <DocViewer
                      key={resolvedTheme} // Forces re-initialization on theme switch
                      documents={[{ uri: viewFile.url, fileName: viewFile.name }]}
                      pluginRenderers={DocViewerRenderers}
                      style={{ width: "100%", height: "100%" }}
                      config={{
                        header: {
                          disableHeader: true,
                        },
                      }}
                      theme={{
                        primary: "#00D084",
                        secondary: resolvedTheme === "dark" ? "#08090A" : "#ffffff",
                        tertiary: resolvedTheme === "dark" ? "#111317" : "#f4f4f5",
                        textPrimary: resolvedTheme === "dark" ? "#ffffff" : "#090a0c",
                        textSecondary: resolvedTheme === "dark" ? "#8E9196" : "#71717a",
                        disableThemeScrollbar: false,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};