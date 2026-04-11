"use client";
import React, { useState } from "react";
import { Eye, Download, ThumbsUp, RefreshCw, Star, Trash2, Loader2, X } from "lucide-react";
import { ResourceDetail } from "@/types/resources";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css"; 

interface Props {
  resource: ResourceDetail;
}

export const DetailSidebar = ({ resource }: Props) => {
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
      alert("Failed to zip files. Please try downloading them individually.");
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
      console.error("Download failed:", error);
      window.open(url, '_blank');
    }
  };

 
  return (
    <>
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Files List */}
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
              Files in this resource
            </h2>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded transition-colors duration-300">
              Ready for students
            </span>
          </div>
          <div className="space-y-3">
            {resource.files.map((file, i) => (
              <div
                key={i}
                className="group p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300 truncate max-w-[150px]" title={file.name}>
                      {file.name}
                    </span>
                  </div>  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewFile({ url: file.url, name: file.name })}
                      className="p-1 text-zinc-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 transition-colors duration-300"
                      title="View file"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => handleSingleDownload(file.url, file.name)}
                      className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300"
                      title="Download file"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-wider transition-colors duration-300">
                  {file.type || 'Document'} · {file.size || 'Unknown size'}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors duration-300">
            <span className="flex items-center gap-1">
              <ThumbsUp size={12} /> {resource.likes} likes
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw size={12} /> {resource.remixes} remixes
            </span>
            <span className="flex items-center gap-1">
              <Download size={12} /> {resource.downloads} dls
            </span>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
              Reviews & feedback
            </h2>
            <button className="text-[10px] text-zinc-600 dark:text-zinc-500 font-bold uppercase flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded transition-colors duration-300">
              Leave a review <Star size={12} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
                  <span className="text-xs text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">
                    Priya Singh
                  </span>
                </div>
                <div className="flex text-yellow-500">
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} />
                </div>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-500 italic transition-colors duration-300">
                &quot;Clear progression from concrete to abstract. My students
                especially liked the real-world word problems.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex">
          <button 
            onClick={handleDownloadAll}
            disabled={isZipping || !resource.files || resource.files.length === 0}
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isZipping ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Zipping...
              </>
            ) : (
              <>
                <Download size={14} /> Download all
              </>
            )}
          </button>
        </div>
        <button className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-600 dark:hover:text-rose-500 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2">
          <Trash2 size={12} /> Delete resource
        </button>
      </div>

    {/* --- UPDATED: React Doc Viewer Modal --- */}
      {viewFile && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950/95 backdrop-blur-sm animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex-none h-14 flex justify-between items-center px-6 bg-zinc-950 border-b border-zinc-800 shadow-xl z-10">
            <h3 className="text-white font-bold text-sm truncate max-w-xl italic opacity-80">
              {viewFile.name}
            </h3>
            <button 
              onClick={() => setViewFile(null)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Main Viewer Container */}
          <div className="flex-1 relative w-full max-w-7xl mx-auto my-2 md:my-4 overflow-hidden">
            
            {/* THE TRICK: We use !h-full on every single div and iframe inside DocViewer 
              to bypass the library's internal height calculations.
            */}
            <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
              <DocViewer 
                documents={[{ uri: viewFile.url, fileName: viewFile.name }]} 
                pluginRenderers={DocViewerRenderers}
                style={{ width: "100%", height: "100%" }}
                config={{
                  header: {
                    disableHeader: true,
                  },
                }}
                theme={{
                  primary: "#2563eb", 
                  secondary: "#090a0c", 
                  tertiary: "#18181b", 
                  textPrimary: "#ffffff", 
                  textSecondary: "#a1a1aa", 
                  disableThemeScrollbar: false,
                }}
              />
            </div>
            
          </div>

        </div>
      )}
    </>
  );
};