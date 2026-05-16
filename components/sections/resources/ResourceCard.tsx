"use client";
import React, { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns"; 
import { useRouter } from "next/navigation";
import { ResourceCardProps } from "@/types/resources";
import { api } from "@/lib/axios"; 
import { Loader2, Trash2, AlertTriangle, X, FileText, Eye, Edit3, GitBranch, Star } from "lucide-react"; 
import { toast } from "react-hot-toast";

interface ExtendedResourceCardProps extends ResourceCardProps {
  is_published?: boolean; 
  collection_id?: number;
  grade?: string;
  tags?: string[];
  updated_at?: string;
  like_count?: number;
  avg_rating?: number;
  download_count?: number; 
  is_collaborator?: boolean;
  is_remix?: boolean;
  original_author_name?: string;
}

export const ResourceCard = ({
  title,
  category, 
  type,
  grade,
  tags = [], 
  downloads = 0, 
  likes = 0,
  weekly_likes = 0,
  avg_rating = 0,
  updated_at, 
  is_published,
  status,
  collection_id, 
  is_collaborator,
  is_remix,
  original_author_name,
  is_selected,
  viewMode = 'grid'
}: ExtendedResourceCardProps & { is_selected?: boolean, viewMode?: 'grid' | 'list', weekly_likes?: number }) => {
  
  const router = useRouter(); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const isDraft = is_published === false || status === "Draft";
  const displayStatus = isDraft ? "Draft" : "Published";

  const displayUpdated = updated_at 
    ? formatDistanceToNow(parseISO(updated_at), { addSuffix: true }) 
    : "Recently";

  const handleViewResource = () => {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/resources/${collection_id}-${cleanTitle}`); 
  };

  const handleEdit = () => {
    const slug = `${collection_id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/create?edit=${slug}`);
  };

  const handleFinalWipe = async () => {
    if (confirmInput !== title) return;

    const deletePromise = api.delete(`/resource_collection/${collection_id}`);

    toast.promise(deletePromise, {
      loading: 'Wiping resource and history...',
      success: () => {
        setShowConfirmModal(false);
        window.location.reload(); // Refresh to show updated list
        return `Successfully deleted "${title}"`;
      },
      error: (err) => {
        console.error("Delete failed:", err);
        return 'Failed to delete resource.';
      },
    });

    try {
      setIsDeleting(true);
      await deletePromise;
    } catch (e) {
        console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderDeleteModal = () => {
     if (!showConfirmModal) return null;
     return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#090a0c] w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg text-rose-600">
                <AlertTriangle size={24} />
              </div>
              <button onClick={() => setShowConfirmModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Delete Resource?</h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                This action is <span className="text-rose-600 font-bold uppercase underline">irreversible</span>. All files and versions linked to this collection will be permanently wiped.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Please type <span className="text-zinc-900 dark:text-zinc-200 italic font-black">&quot;{title}&quot;</span> to confirm.
              </p>
              <input 
                type="text" 
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Enter title here"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button 
                disabled={isDeleting}
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl font-bold text-xs hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleFinalWipe}
                disabled={confirmInput !== title || isDeleting}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Confirm Wipe
              </button>
            </div>
          </div>
        </div>
     );
  }

  if (viewMode === 'list') {
     return (
        <div className={`bg-white dark:bg-[#121417] border rounded-xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md ${is_selected ? 'border-emerald-500 ring-1 ring-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800/60'}`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
               <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <FileText size={20} />
               </div>
               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                     <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">{title}</h4>
                     {is_collaborator && <span className="bg-blue-500/10 text-blue-600 text-[7px] font-black px-1 py-0.5 rounded uppercase border border-blue-500/20">Shared</span>}
                  </div>
                  <p className="text-[10px] text-zinc-500 truncate">
                    {category} • {grade} • {type} 
                    {is_remix && original_author_name && ` • Remixed from ${original_author_name}`}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-8 px-6">
                <div className="text-center">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Rating</p>
                    <div className="flex items-center justify-center gap-1">
                        {avg_rating > 0 ? (
                            <>
                                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                <p className="text-xs font-black text-zinc-900 dark:text-zinc-300">{avg_rating}</p>
                            </>
                        ) : (
                            <p className="text-[9px] font-bold text-zinc-400 italic">No ratings</p>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Likes</p>
                    <p className="text-xs font-black text-zinc-900 dark:text-zinc-300">
                        {likes}
                        {weekly_likes > 0 && <span className="text-[9px] text-emerald-500 ml-1">+{weekly_likes}</span>}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Downloads</p>
                    <p className="text-xs font-black text-zinc-900 dark:text-zinc-300">{downloads}</p>
                </div>
                <div className="text-center w-24">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Updated</p>
                    <p className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">{displayUpdated}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 pl-6 border-l border-zinc-100 dark:border-zinc-800">
               <button onClick={handleViewResource} className="p-2 text-zinc-400 hover:text-blue-500 transition-colors"><Eye size={16} /></button>
               <button onClick={handleEdit} className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors"><Edit3 size={16} /></button>
               <button onClick={() => setShowConfirmModal(true)} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
            </div>
            
            {renderDeleteModal()}
        </div>
     );
  }

  return (
    <>
      <div className={`bg-white dark:bg-[#121417] border flex flex-col justify-between rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-md ${is_selected ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-zinc-200 dark:border-zinc-800/60'} ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white truncate">
                {title}
              </h4>
              {is_collaborator && (
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase border border-blue-500/20 shrink-0">
                  Shared
                </span>
              )}
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${isDraft ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
              {displayStatus}
            </span>
          </div>
          
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3 truncate">
            {category || "Subject"} {grade && `· ${grade}`} · {type || "Resource"}
          </p>

          {is_remix && original_author_name && (
            <div className="flex items-center gap-1.5 mb-3 text-blue-600 dark:text-blue-400/80">
               <GitBranch size={10} />
               <span className="text-[10px] font-bold uppercase tracking-tight truncate">Remixed from {original_author_name}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-700/50">
                {tag}
              </span>
            ))}
            {tags.length > 3 && <span className="text-[9px] text-zinc-400">+{tags.length - 3} more</span>}
          </div>

          <div className="grid grid-cols-4 gap-y-2 mb-4 border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
            <div className="text-center border-r border-zinc-50 dark:border-zinc-800/50">
               <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Rating</p>
               <div className="flex items-center justify-center gap-1">
                 {avg_rating > 0 ? (
                    <>
                        <Star size={8} className="text-yellow-500 fill-yellow-500" />
                        <p className="text-xs font-black text-zinc-900 dark:text-zinc-200">{avg_rating}</p>
                    </>
                 ) : (
                    <p className="text-[9px] font-bold text-zinc-400 italic">None</p>
                 )}
               </div>
            </div>
            <div className="text-center border-r border-zinc-50 dark:border-zinc-800/50">
               <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Likes</p>
               <p className="text-xs font-black text-zinc-900 dark:text-zinc-200">
                 {likes}
                 {weekly_likes > 0 && <span className="text-[8px] text-emerald-500 ml-1">+{weekly_likes}</span>}
               </p>
            </div>
            <div className="text-center border-r border-zinc-50 dark:border-zinc-800/50">
               <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Downloads</p>
               <p className="text-xs font-black text-zinc-900 dark:text-zinc-200">{downloads}</p>
            </div>
            <div className="text-center">
               <p className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Updated</p>
               <p className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 truncate px-1">{displayUpdated}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
          <button onClick={handleViewResource} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-[11px] font-bold transition-all shadow-sm">
            {isDraft ? "Preview" : "View"}
          </button>
          <button onClick={handleEdit} className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 rounded-lg text-[11px] font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 transition-colors">
            Edit
          </button>
          <button 
              onClick={() => setShowConfirmModal(true)}
              className="px-3 py-2 bg-rose-50/50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg text-[11px] font-bold transition-all border border-rose-200/50 dark:border-rose-500/20"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {renderDeleteModal()}
    </>
  );
};
