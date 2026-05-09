"use client";
import React, { useState } from "react";
import { Toggle } from "@/components/ui/Toggle";
import { FormField } from "@/components/ui/FormField";
import { Search, UserPlus, X, Shield, Eye, Settings2, Users } from "lucide-react";
import { useTeachers } from "@/hooks/useTeacher";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  collectionId?: string | null;
  collaborators?: any[];
  isOwner?: boolean;
  onCollaboratorChange?: () => void;
  onAddCollaborator?: (teacher: any) => void;
  onRemoveCollaborator?: (teacherId: number) => void;
}

export const ResourceSettingsForm = ({
  formData,
  setFormData,
  collectionId,
  collaborators = [],
  isOwner = true,
  onCollaboratorChange,
  onAddCollaborator,
  onRemoveCollaborator
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, isLoading: isSearching } = useTeachers(1, searchTerm);
  
  const handleToggle = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addCollaborator = async (teacher: any) => {
    if (formData.collaboration_mode === 'none') {
      toast.error("Collaboration is disabled. Change the collaboration mode to 'Invite Only' to add collaborators.");
      return;
    }

    if (!collectionId) {
      if (onAddCollaborator) {
        onAddCollaborator(teacher);
        setSearchTerm("");
      } else {
        toast.error("Collaborator management not available.");
      }
      return;
    }

    try {
      const response = await api.post(`/resource_collection/${collectionId}/collaborators`, {
        teacher_id: teacher.id,
        role: "editor"
      });

      if (response.data.success) {
        toast.success("Collaborator added successfully");
        setSearchTerm("");
        if (onCollaboratorChange) {
           onCollaboratorChange();
        }
      }
    } catch (err: any) {
      console.error("Add collaborator error:", err);
      toast.error(err.response?.data?.error || "Failed to add collaborator");
    }
  };

  const removeCollaborator = async (teacherId: number) => {
    if (!collectionId) {
       onRemoveCollaborator?.(teacherId);
       return;
    }

    try {
      const response = await api.delete(`/resource_collection/${collectionId}/collaborators/${teacherId}`);
      if (response.data.success) {
        toast.success("Collaborator removed");
        onCollaboratorChange?.();
      }
    } catch (err: any) {
      toast.error("Failed to remove collaborator");
    }
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 size={16} className="text-emerald-500" />
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
            Resource Settings
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-zinc-100 dark:border-zinc-800/40">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-200">Allow Remixing</p>
              <p className="text-[10px] text-zinc-500">Allow other teachers to clone and adapt this resource.</p>
            </div>
            <Toggle 
              enabled={formData.allow_remixing} 
              onToggle={() => handleToggle("allow_remixing")} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Visibility">
              <div className="relative">
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleSelectChange}
                  disabled={!isOwner}
                  className={`w-full border rounded-lg p-3 text-xs appearance-none focus:outline-none transition-colors ${
                    !isOwner 
                      ? "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/40 text-zinc-400 cursor-not-allowed" 
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
                <Eye size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </FormField>

            <FormField label="Collaboration Mode">
              <div className="relative">
                <select
                  name="collaboration_mode"
                  value={formData.collaboration_mode}
                  onChange={handleSelectChange}
                  disabled={!isOwner}
                  className={`w-full border rounded-lg p-3 text-xs appearance-none focus:outline-none transition-colors ${
                    !isOwner 
                      ? "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/40 text-zinc-400 cursor-not-allowed" 
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  <option value="none">None</option>
                  <option value="invite_only">Invite Only</option>
                </select>
                <Shield size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>
            </FormField>
          </div>
        </div>
      </div>

      {/* Collaborator Management */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Users size={16} className="text-blue-500" />
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
            Collaborators
          </h2>
        </div>

        <div className="space-y-6">
          {/* Search box */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${formData.collaboration_mode === 'none' ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-400'}`} size={14} />
            <input
              type="text"
              placeholder={formData.collaboration_mode === 'none' ? "Collaboration is disabled" : "Search teachers by name or username..."}
              value={searchTerm}
              disabled={formData.collaboration_mode === 'none'}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border rounded-lg py-2.5 pl-9 pr-4 text-xs focus:outline-none transition-all ${
                formData.collaboration_mode === 'none' 
                  ? "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/40 text-zinc-400 cursor-not-allowed" 
                  : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-blue-500/30"
              }`}
            />
            
            {searchTerm.length >= 2 && searchResults?.teachers && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#181a1d] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {searchResults.teachers.map((t: any) => (
                  <div key={t.id} className="p-3 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden font-bold text-[10px] text-zinc-500">
                        {t.profile_image_url ? (
                          <img src={t.profile_image_url} alt={t.username} className="w-full h-full object-cover" />
                        ) : (
                          <span>{t.first_name[0]}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{t.first_name} {t.last_name}</span>
                        <span className="text-[10px] text-zinc-500">@{t.username}</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => addCollaborator(t)}
                      className="p-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                    >
                      <UserPlus size={14} />
                    </button>
                  </div>
                ))}
                {searchResults.teachers.length === 0 && !isSearching && (
                  <div className="p-4 text-center text-xs text-zinc-500">No teachers found.</div>
                )}
              </div>
            )}
          </div>

          {/* Collaborator List */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">Active Collaborators</h3>
            <div className="grid grid-cols-1 gap-2">
              {collaborators.length > 0 ? (
                collaborators.map((c: any) => (
                  <div key={c.teacher_id} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-100 dark:border-zinc-800/40 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500">
                        {c.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{c.name}</span>
                        <span className="text-[10px] text-zinc-500 capitalize">{c.role}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeCollaborator(c.teacher_id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-zinc-50/50 dark:bg-zinc-950/10 border border-dashed border-zinc-200 dark:border-zinc-800/60 rounded-xl">
                  <p className="text-[10px] text-zinc-500 italic">No collaborators invited yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
