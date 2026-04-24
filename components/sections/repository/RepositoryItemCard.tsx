"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Download, RefreshCw, Star, User, Trash2 } from "lucide-react";
import { RepositoryData } from "@/types/repository";

interface Props {
  data: any;
  onRemix: () => void;
  onDownload: () => void; // Add this prop
}

export const RepositoryItemCard = ({ data, onRemix, onDownload }: any) => {
  const router = useRouter();
  
  return (
    <div className="bg-[#0D0F12] border border-[#1F2226] rounded-xl p-5 group hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
      {/* Selection Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate pr-4">
          {data.title}
        </h3>
        <span className="shrink-0 text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded uppercase tracking-tighter border border-emerald-500/20">
          v{data.version_no || 1}
        </span>
      </div>
      
      <p className="text-[11px] text-zinc-500 font-medium mb-8">
        {data.subject} • {data.grade} • {data.type}
      </p>

      {/* Stats Pipeline */}
      <div className="flex items-center gap-6 border-t border-zinc-800/50 pt-4 mb-6">
        <div className="space-y-0.5">
          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">Files</p>
          <p className="text-xs font-bold text-zinc-300">{data.file_count || 0}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">Likes</p>
          <p className="text-xs font-bold text-zinc-300">{data.likes || 0}</p>
        </div>
        <div className="space-y-0.5 flex-1 text-right">
           <div className="flex items-center justify-end gap-1 text-yellow-500/80">
              <Star size={10} fill="currentColor" />
              <span className="text-xs font-black">4.9</span>
           </div>
           <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tight">Author: {data.owner_name?.split(' ')[0]}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.push(`/resources/${data.collection_id}`)}
          className="flex-1 py-2.5 bg-white hover:bg-emerald-400 text-black text-[11px] font-black uppercase tracking-widest rounded-md transition-all active:scale-95"
        >
          Explore
        </button>
        <button 
          onClick={onRemix}
          className="px-4 py-2.5 bg-[#16181D] border border-[#1F2226] text-zinc-400 text-[11px] font-bold rounded-md hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center gap-2"
        >
          <RefreshCw size={14} /> Remix
        </button>
        <button 
          onClick={onDownload}
          className="p-2.5 bg-zinc-900 border border-[#1F2226] text-zinc-500 rounded-md hover:text-white transition-all"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
};