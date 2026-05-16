"use client";
import React, { useState } from "react";
import { GraduationCap, Loader2, ArrowRight } from "lucide-react";
import { TeacherAPI } from "@/lib/teachers";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { UniversitySelect } from "@/components/sections/auth/UniversitySelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const OnboardingModal = ({ isOpen, onClose, userName }: Props) => {
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !role.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await TeacherAPI.updateProfile({
        institution: institution.trim(),
        role: role.trim()
      });
      
      if (res.success) {
        toast.success("Profile updated! Welcome to TeachShare.");
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        onClose();
      }
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-8 overflow-visible">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome, {userName}!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Just one quick step to set up your professional profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <UniversitySelect 
              value={institution} 
              onChange={setInstitution} 
            />

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
                What is your role?
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors">
                  <GraduationCap size={16} />
                </div>
                <input 
                  type="text"
                  placeholder="e.g. Mathematics Lead, Science Teacher"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-[#484f58] text-zinc-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-emerald-400 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Complete Setup
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
            You can always update these later in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
};