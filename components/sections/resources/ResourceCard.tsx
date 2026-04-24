"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns"; 
import { useRouter } from "next/navigation";
import { ResourceCardProps } from "@/types/resources";
import { api } from "@/lib/axios"; 
import { Loader2, Trash2, AlertTriangle, X } from "lucide-react"; 
import { toast } from "react-hot-toast"; // --- IMPORT TOAST ---

interface ExtendedResourceCardProps extends ResourceCardProps {
  is_published?: boolean; 
  collection_id?: number;
  grade?: string;
  tags?: string[];
  updated_at?: string;
  like_count?: number;    // Add the backend's likely naming
  download_count?: number; 
}
export const ResourceCard = ({
  title,
  category, 
  type,
  grade,
  tags = [], 
  downloads = 0, 
  likes = 0,
  like_count,
  updated, 
  updated_at, 
  curriculum = "Local",
  coTeachers = 0,
  visibility = "Private",
  is_published,
  status,
  collection_id, 
}: ExtendedResourceCardProps) => {
  
  const router = useRouter(); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const isDraft = is_published === false || status === "Draft";
  const displayStatus = isDraft ? "Draft" : "Published";

  const activeLikes = likes || like_count || 0;
  // const activeDownloads = downloads || download_count || 0;
  
  const displayUpdated = updated_at 
    ? formatDistanceToNow(new Date(updated_at), { addSuffix: true }) 
    : updated;

  const handleViewResource = () => {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/resources/${collection_id}-${cleanTitle}`); 
  };

  const handleEdit = () => {
    const slug = `${collection_id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/create?edit=${slug}`);
  };

  // --- Updated Final Wipe Function with Toast ---
  const handleFinalWipe = async () => {
    if (confirmInput !== title) return;

    // We can use a promise toast for a better UX during the async call
    const deletePromise = api.delete(`/resource_collection/${collection_id}`);

    toast.promise(deletePromise, {
      loading: 'Wiping resource and history...',
      success: () => {
        setShowConfirmModal(false);
        router.refresh();
        return `Successfully deleted "${title}"`;
      },
      error: (err) => {
        console.error("Delete failed:", err);
        return 'Failed to delete resource. Please try again.';
      },
    }, {
      style: {
        minWidth: '250px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderRadius: '12px',
        background: '#090a0c',
        color: '#fff',
        border: '1px solid #27272a'
      },
      success: {
        duration: 4000,
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#f43f5e',
          secondary: '#fff',
        },
      }
    });

    try {
      setIsDeleting(true);
      await deletePromise;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={`bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-md ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* ... Card Content Remains Same ... */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-1">
              {title}
            </h4>
            <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${isDraft ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500" : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600"}`}>
              {displayStatus}
            </span>
          </div>
          
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">
            {category || "Subject"} {grade && `· ${grade}`} · {type || "Resource Type"}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200 dark:border-zinc-700/50">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-y-2 mb-4 border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
            <div className="text-[10px] text-zinc-500 font-medium">Downloads: <span className="text-zinc-900 dark:text-zinc-300 font-bold">{downloads}</span></div>
            <div className="text-[10px] text-zinc-500 font-medium text-center">Likes: <span className="text-zinc-900 dark:text-zinc-300 font-bold">{activeLikes}</span></div>
            <div className="text-[10px] text-zinc-500 font-medium text-right">Updated: <span className="text-zinc-900 dark:text-zinc-300 font-bold">{displayUpdated}</span></div>
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

      {/* --- PURE DELETE MODAL --- */}
      {showConfirmModal && (
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
                Please type <span className="text-zinc-900 dark:text-zinc-200 italic font-black">"{title}"</span> to confirm.
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
      )}
    </>
  );
};