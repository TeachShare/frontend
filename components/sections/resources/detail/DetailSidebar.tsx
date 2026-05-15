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
  Share2,
  User,
} from "lucide-react";
import { ResourceDetail } from "@/types/resources";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { api } from "@/lib/axios";
import { useTheme } from "next-themes";
import Link from "next/link";

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
  onShare?: () => void;
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
  onShare,
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
        {/* Author Card(s) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-colors duration-300">
            <h2 className="text-[10px] font-bold text-zinc-500 dark:text-[#8E9196] uppercase tracking-[0.2em] mb-4">
              {resource.is_remix ? "Original Author" : "Primary Author"}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                  <User size={20} className="text-zinc-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[120px]">
                    {resource.is_remix ? resource.original_author_name : resource.owner_name}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-500">
                    @{resource.is_remix ? (resource.original_author_username || "archived") : resource.owner_username}
                  </span>
                </div>
              </div>
              {(resource.is_remix ? resource.original_author_username : resource.owner_username) && (
                <Link 
                  href={`/profile/${resource.is_remix ? resource.original_author_username : (resource.owner_username || resource.owner_id)}`}
                  className="px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase rounded-lg hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-all active:scale-95 shadow-sm"
                >
                  Profile
                </Link>
              )}
            </div>
          </div>

          {resource.is_remix && (
            <div className="bg-zinc-50 dark:bg-[#0D0F12] border border-zinc-200 dark:border-[#1F2226] rounded-xl p-4 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-md">
                    <RefreshCw size={12} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Remixed By</p>
                    <p className="text-[11px] font-black text-zinc-900 dark:text-zinc-200">{resource.owner_name}</p>
                  </div>
                </div>
                <Link 
                  href={`/profile/${resource.owner_username || resource.owner_id}`}
                  className="text-[9px] font-bold text-blue-600 hover:text-blue-700 uppercase"
                >
                  View Profile
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm overflow-hidden transition-colors duration-300">
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
          <div className="grid grid-cols-4 gap-2 mt-8">
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
            <button
              onClick={onShare}
              className="flex flex-col items-center gap-1.5 py-3 rounded-lg bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] text-zinc-500 hover:border-zinc-300 dark:hover:border-[#2D3138] transition-all"
            >
              <Share2 size={14} />
              <span className="text-[10px] font-bold uppercase">Share</span>
            </button>
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

            {isOwner && (
              <Button
                variant="ghost"
                size="lg"
                fullWidth
                onClick={onDelete}
                isLoading={isDeleting}
                leftIcon={<Trash2 size={16} />}
                className="text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 transition-all font-bold mt-4"
              >
                Delete Resource
              </Button>
            )}

            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-[10px] font-bold text-zinc-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 transition-all"
            >
              <Flag size={12} />
              Report this resource
            </button>
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