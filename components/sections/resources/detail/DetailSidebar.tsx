"use client";
import React, { useState } from "react";
import { Eye, Download, ThumbsUp, RefreshCw, Star, Trash2, Loader2, X, FileText } from "lucide-react";
import { ResourceDetail } from "@/types/resources";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css"; 

interface Props {
  resource: ResourceDetail;
  // Added props from our previous integration plan
  likesCount?: number;
  isLiked?: boolean;
  onLike?: () => void;
}

export const DetailSidebar = ({ resource, likesCount, isLiked, onLike }: Props) => {
  const [isZipping, setIsZipping] = useState(false);
  const [viewFile, setViewFile] = useState<{url: string, name: string} | null>(null);

  const handleDownloadAll = async () => {
    if (!resource.files || resource.files.length === 0) return;
    try {
      setIsZipping(true);
      const zip = new JSZip();
      const fetchPromises = resource.files.map(async (file) => {
        const response = await fetch(file.url);
        const blob = await response.blob();
        zip.file(file.name, blob);
      });
      await Promise.all(fetchPromises);
      const content = await zip.generateAsync({ type: "blob" });
      const cleanName = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      saveAs(content, `${cleanName}-files.zip`);
    } catch (error) {
      console.error("Error creating zip file:", error);
    } finally {
      setIsZipping(false);
    }
  };

  const handleSingleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Files Card */}
        <div className="bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[10px] font-bold text-zinc-500 dark:text-[#8E9196] uppercase tracking-[0.2em]">
              Resource Content
            </h2>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-[#00D084] px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter border border-emerald-500/20">
              Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {resource.files.map((file, i) => (
              <div
                key={i}
                className="group p-3 bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] rounded-lg hover:border-zinc-300 dark:hover:border-[#2D3138] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-white dark:bg-[#111317] rounded border border-zinc-200 dark:border-[#1F2226]">
                      <FileText size={14} className="text-zinc-400" />
                    </div>
                    <span className="text-xs text-zinc-700 dark:text-[#E1E3E6] font-semibold truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>  
                  <div className="flex gap-1.5 ml-2">
                    <button 
                      onClick={() => setViewFile({ url: file.url, name: file.name })}
                      className="p-1.5 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/5 rounded-md transition-all"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => handleSingleDownload(file.url, file.name)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1F2226] rounded-md transition-all"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interaction Bar - Revamped */}
          <div className="grid grid-cols-3 gap-2 mt-8">
            <button 
              onClick={onLike}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border transition-all ${
                isLiked 
                ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-500' 
                : 'bg-zinc-50 dark:bg-[#08090A] border-zinc-200 dark:border-[#1F2226] text-zinc-500 hover:border-zinc-300 dark:hover:border-[#2D3138]'
              }`}
            >
              <ThumbsUp size={14} className={isLiked ? "fill-current" : ""} />
              <span className="text-[10px] font-bold uppercase">{likesCount ?? resource.likes}</span>
            </button>
            <div className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] text-zinc-500">
              <RefreshCw size={14} />
              <span className="text-[10px] font-bold uppercase">{resource.remixes || 0}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] text-zinc-500">
              <Download size={14} />
              <span className="text-[10px] font-bold uppercase">{resource.downloads || 0}</span>
            </div>
          </div>

          {/* Main Action Button */}
          <button 
            onClick={handleDownloadAll}
            disabled={isZipping || !resource.files?.length}
            className="w-full mt-4 bg-zinc-900 dark:bg-[#1A1C20] border border-zinc-800 dark:border-[#2D3138] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-[#25282E] transition-all duration-300 shadow-lg shadow-black/20 disabled:opacity-50 group"
          >
            {isZipping ? (
              <Loader2 size={16} className="animate-spin text-emerald-500" />
            ) : (
              <>
                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="uppercase tracking-widest">Download all assets</span>
              </>
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <button className="w-full group py-2 text-zinc-400 dark:text-[#5C5F66] hover:text-rose-500 transition-colors flex items-center justify-center gap-2">
          <Trash2 size={12} className="opacity-50 group-hover:opacity-100" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Delete resource</span>
        </button>
      </div>

      {/* Doc Viewer Modal */}
      {viewFile && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#08090A]/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex-none h-16 flex justify-between items-center px-8 border-b border-[#1F2226]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                <FileText size={16} className="text-black" />
              </div>
              <h3 className="text-white font-bold text-sm tracking-tight">{viewFile.name}</h3>
            </div>
            <button 
              onClick={() => setViewFile(null)}
              className="p-2 text-zinc-400 hover:text-white bg-[#1F2226] rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 md:p-8">
            <div className="h-full w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-[#1F2226] shadow-2xl relative">
              <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                <DocViewer 
                  documents={[{ uri: viewFile.url, fileName: viewFile.name }]} 
                  pluginRenderers={DocViewerRenderers}
                  config={{ header: { disableHeader: true } }}
                  theme={{
                    primary: "#00D084",
                    secondary: "#08090A",
                    tertiary: "#111317",
                    textPrimary: "#ffffff",
                    textSecondary: "#8E9196",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};