"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TeacherAPI } from "@/lib/teachers";
import { toast } from "react-hot-toast";
import { ArchiveRestore, LogOut, Loader2 } from "lucide-react";

export const RestoreAccountLayout = ({ onRestore }: { onRestore: () => void }) => {
  const [isRestoring, setIsRestoring] = useState(false);

  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      const res = await TeacherAPI.restoreAccount();
      if (res.success) {
        toast.success("Welcome back! Your account has been restored.");
        onRestore();
      } else {
        toast.error(res.message || "Failed to restore account");
      }
    } catch (err) {
      toast.error("An error occurred during restoration");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = '/auth?view=login';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <ArchiveRestore size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">Account Archived</h1>
          <p className="text-zinc-500 text-sm transition-colors duration-300">
            Your account is currently archived. All your resources are hidden from the community.
          </p>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 italic font-medium">
            "Restore your account to resume sharing and creating amazing lesson plans."
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button 
            onClick={handleRestore} 
            isLoading={isRestoring}
            className="w-full py-6 text-base font-bold"
            leftIcon={!isRestoring && <ArchiveRestore size={20} />}
          >
            Restore My Account
          </Button>
          
          <button 
            onClick={handleLogout}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};
