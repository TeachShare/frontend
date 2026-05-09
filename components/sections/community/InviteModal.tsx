"use client";
import React, { useState, useEffect } from "react";
import { Users, Loader2, BookOpen, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teacherId: number;
  teacherName: string;
}

const TOAST_STYLE = {
  style: {
    minWidth: "280px",
    fontSize: "11px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderRadius: "12px",
    background: "#090a0c",
    color: "#fff",
    border: "1px solid #27272a",
    padding: "12px 16px",
  },
};

export const InviteModal = ({ isOpen, onClose, teacherId, teacherName }: Props) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchEligible = async () => {
        try {
          setLoading(true);
          const res = await api.get("/resource_collection/eligible-for-collab");
          if (res.data.success) {
            setResources(res.data.resources);
          }
        } catch (err) {
          console.error("Failed to fetch eligible resources", err);
          toast.error("Failed to load your resources.", TOAST_STYLE);
        } finally {
          setLoading(false);
        }
      };
      fetchEligible();
    }
  }, [isOpen]);

  const handleInvite = async () => {
    if (!selectedId) return;

    try {
      setIsInviting(true);
      const response = await api.post(`/resource_collection/${selectedId}/collaborators`, {
        teacher_id: teacherId,
        role: 'editor'
      });

      if (response.data.success) {
        toast.success(`INVITATION SENT: ${teacherName} has been invited to collaborate.`, TOAST_STYLE);
        onClose();
        setSelectedId(null);
      }
    } catch (error: unknown) {
      console.error("Invite failed", error);
      const apiError = error as { response?: { data?: { error?: string } } };
      toast.error(`ERROR: ${apiError.response?.data?.error || "Failed to send invitation"}`, TOAST_STYLE);
    } finally {
      setIsInviting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Invite to Collaborate
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1">
                Choose which resource you want to invite <span className="font-bold text-zinc-900 dark:text-zinc-200">{teacherName}</span> to edit.
              </p>
            </div>
          </div>

          {/* Resource List */}
          <div className="space-y-3">
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Your Collaboration-Enabled Resources</p>
             <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-emerald-500" size={24} />
                    </div>
                ) : resources.length > 0 ? (
                    resources.map((res) => (
                        <button
                            key={res.collection_id}
                            onClick={() => res.is_eligible && setSelectedId(res.collection_id)}
                            disabled={!res.is_eligible}
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                                !res.is_eligible
                                ? 'bg-zinc-50 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-800/20 opacity-60 cursor-not-allowed'
                                : selectedId === res.collection_id 
                                  ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-500/30' 
                                  : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-700'
                            }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`p-2 rounded-lg ${
                                    !res.is_eligible 
                                    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400' 
                                    : selectedId === res.collection_id ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                                }`}>
                                    <BookOpen size={14} />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <p className={`text-xs font-bold truncate ${selectedId === res.collection_id ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                            {res.title}
                                        </p>
                                        {!res.is_eligible && (
                                            <span className="text-[7px] font-black uppercase px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700 shrink-0">
                                                Collab Disabled
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-zinc-400 uppercase font-medium">{res.subject} • {res.grade}</p>
                                </div>
                            </div>
                            {selectedId === res.collection_id && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                        </button>
                    ))
                ) : (
                    <div className="py-10 text-center space-y-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <p className="text-xs text-zinc-500 italic">No resources found.</p>
                        <p className="text-[10px] text-zinc-400 px-6 leading-relaxed">Create a resource first to invite others to collaborate.</p>
                    </div>
                )}
             </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose} 
              disabled={isInviting}
              className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleInvite} 
              disabled={isInviting || !selectedId}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInviting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
