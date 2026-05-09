"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  Download,
  ThumbsUp,
  RefreshCw,
  Trash2,
  Loader2,
  X,
  FileText,
  Globe,
  Flag,
} from "lucide-react";
import { ResourceDetail } from "@/types/resources";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { api } from "@/lib/axios";
import { useTheme } from "next-themes";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

import { Button } from "@/components/ui/Button";
import { ReportModal } from "./ReportModal";

interface Props {
  resource: ResourceDetail;
  likesCount?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onRemix?: () => void;
  isOwner?: boolean;
  canEdit?: boolean;
  isPublishing?: boolean;
  onPublish?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export const DetailSidebar = ({
  resource,
  likesCount,
  isLiked,
  onLike,
  onRemix,
  isOwner = false,
  canEdit = false,
  isPublishing = false,
  onPublish,
  onDelete,
  isDeleting = false,
}: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [viewFile, setViewFile] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [downloadsCount, setDownloadsCount] = useState(resource.downloads || 0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // BLOCK BACKGROUND SCROLL
  useEffect(() => {
    if (viewFile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [viewFile]);

  const trackDownload = async () => {
    try {
      await api.post(`/resource_collection/${resource.collection_id}/download`);
      setDownloadsCount((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to track download:", error);
    }
  };

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
      const cleanName = resource.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      saveAs(content, `${cleanName}-files.zip`);
      await trackDownload();
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
      await trackDownload();
    } catch (error) {
      window.open(url, "_blank");
      trackDownload();
    }
  };

  return (
    <>
      <div className="col-span-12 lg:col-span-4 space-y-6">
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
                    <span
                      className="text-xs text-zinc-700 dark:text-[#E1E3E6] font-semibold truncate"
                      title={file.name}
                    >
                      {file.name}
                    </span>
                  </div>
                  <div className="flex gap-1.5 ml-2">
                    <button
                      onClick={() =>
                        setViewFile({ url: file.url, name: file.name })
                      }
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

          {/* Stats & Actions */}
          <div className="grid grid-cols-3 gap-2 mt-8">
            <button
              onClick={onLike}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border transition-all ${isLiked ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-500" : "bg-zinc-50 dark:bg-[#08090A] border-zinc-200 dark:border-[#1F2226] text-zinc-500 hover:border-zinc-300 dark:hover:border-[#2D3138]"}`}
            >
              <ThumbsUp size={14} className={isLiked ? "fill-current" : ""} />
              <span className="text-[10px] font-bold uppercase">
                {likesCount ?? resource.likes}
              </span>
            </button>
            <div className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] text-zinc-500">
              <RefreshCw size={14} />
              <span className="text-[10px] font-bold uppercase">
                {resource.remixes || 0}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] text-zinc-500">
              <Download size={14} />
              <span className="text-[10px] font-bold uppercase">
                {downloadsCount}
              </span>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            {canEdit && !resource.is_published && (
              <Button
                variant="emerald"
                size="lg"
                fullWidth
                onClick={onPublish}
                isLoading={isPublishing}
                leftIcon={<Globe size={16} />}
              >
                Publish Resource
              </Button>
            )}
            {!canEdit && (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onRemix}
                disabled={!resource.allow_remixing}
                leftIcon={<RefreshCw size={16} />}
              >
                {!resource.allow_remixing
                  ? "Remixing Disabled"
                  : "Remix Resource"}
              </Button>
            )}
            <Button
              variant={canEdit ? "outline" : "emerald"}
              size="lg"
              fullWidth
              onClick={handleDownloadAll}
              isLoading={isZipping}
              disabled={!resource.files?.length}
              leftIcon={<Download size={16} />}
            >
              Download all assets
            </Button>
          </div>
        </div>
      </div>

      {/* UPDATED MODAL WITH SCREENSHOT LOGIC */}
      {viewFile && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white/95 dark:bg-[#08090A]/95 backdrop-blur-md animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex-none h-16 flex justify-between items-center px-8 border-b border-zinc-200 dark:border-[#1F2226]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                <FileText size={16} className="text-white dark:text-black" />
              </div>
              <h3 className="text-zinc-900 dark:text-white font-bold text-sm tracking-tight">
                {viewFile.name}
              </h3>
            </div>
            <button
              onClick={() => setViewFile(null)}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-[#1F2226] rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Viewer Container matching screenshot logic */}
          <div className="flex-1 relative w-full max-w-7xl mx-auto my-2 md:my-4 overflow-hidden">
            <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
              {mounted && (
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
              )}
            </div>
          </div>
        </div>
      )}

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={resource.collection_id}
        targetType="resource"
      />
    </>
  );
};