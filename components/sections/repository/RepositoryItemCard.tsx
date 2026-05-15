"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Download, RefreshCw, Star, CheckCircle2, Edit3, GitBranch } from "lucide-react";
import Link from "next/link";

interface Props {
  data: any;
  onRemix: () => void;
  onDownload: () => void; 
  onPreview: (resource: any) => void;
}

export const RepositoryItemCard = ({ data, onRemix, onDownload, onPreview }: Props) => {
  const router = useRouter();
  
  const handleEditProposal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const slug = `${data.collection_id}-${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/create?edit=${slug}`);
  };
  return (
    <div className="bg-white dark:bg-[#0D0F12] border border-zinc-200 dark:border-[#1F2226] rounded-xl p-5 group hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-400 transition-colors truncate">
                {data.title}
                </h3>
                {data.owner_is_verified && (
                    <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                )}
            </div>
            <span className="shrink-0 text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded uppercase tracking-tighter border border-emerald-500/20">
            v{data.version_no || 1}
            </span>
        </div>
        
        <p className="text-[11px] text-zinc-500 font-medium mb-6">
            {data.subject} • {data.grade} • {data.type}
            {data.is_remix && data.original_author_name && (
                <span className="flex items-center gap-1 mt-1.5 text-blue-500 dark:text-blue-400 font-bold uppercase text-[9px] tracking-tight">
                    <GitBranch size={10} />
                    Remixed from {data.original_author_name}
                </span>
            )}
        </p>

        {/* Stats Pipeline */}
        <div className="flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-800/50 pt-4 mb-6">
            <div className="space-y-0.5">
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">Files</p>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{data.file_count || 0}</p>
            </div>
            <div className="space-y-0.5">
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">Likes</p>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {data.likes || 0}
                {data.weekly_likes > 0 && <span className="text-[10px] text-emerald-500 ml-1">+{data.weekly_likes}</span>}
            </p>
            </div>
            <div className="space-y-0.5 flex-1 text-right">
            <div className="flex items-center justify-end gap-1 text-yellow-500/80">
                <Star size={10} fill="currentColor" />
                <span className="text-xs font-black">4.9</span>
            </div>
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">
                Author: {" "}
                <Link 
                href={`/profile/${data.owner_username || data.owner_id}`}
                className="hover:text-emerald-500 transition-colors cursor-pointer"
                >
                {data.owner_name?.split(' ')[0]}
                </Link>
            </p>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPreview(data)}
          className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-[#1F2226] text-zinc-500 rounded-md hover:text-blue-500 transition-all"
          title="Quick Preview"
        >
          <Eye size={16} />
        </button>
        <button 
          onClick={() => router.push(`/resources/${data.collection_id}`)}
          className="flex-1 py-2.5 bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-emerald-400 text-white dark:text-black text-[11px] font-black uppercase tracking-widest rounded-md transition-all active:scale-95 shadow-sm"
        >
          Explore
        </button>

        {data.collaboration_mode === 'everyone' && (
          <button 
            onClick={handleEditProposal}
            className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all"
            title="Propose Changes"
          >
            <Edit3 size={16} />
          </button>
        )}

        <button 
          onClick={!!data.allow_remixing ? onRemix : undefined}
          disabled={!data.allow_remixing}
          className={`px-4 py-2.5 text-[11px] font-bold rounded-md transition-all flex items-center gap-2 border ${
            !data.allow_remixing 
            ? "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed" 
            : "bg-zinc-50 dark:bg-[#16181D] border-zinc-200 dark:border-[#1F2226] text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400"
          }`}
        >
          <RefreshCw size={14} /> 
          {!data.allow_remixing ? "Remix" : "Remix"}
        </button>
        <button 
          onClick={onDownload}
          className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-[#1F2226] text-zinc-500 rounded-md hover:text-zinc-900 dark:hover:text-white transition-all"
          title="Download All Files"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
};
