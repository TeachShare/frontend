"use client";
import React, { useState } from "react";
import { Lock, ShieldCheck, Loader2, Key } from "lucide-react";
import { useChangePassword } from "@/hooks/useTeacher";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export const SecuritySection = () => {
  const { data: user } = useUser();
  const changePassword = useChangePassword();
  
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const isLocalUser = user?.auth_provider === 'local';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error("New passwords do not match.");
      return;
    }
    
    if (formData.new_password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    changePassword.mutate({
      current_password: formData.current_password,
      new_password: formData.new_password
    }, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        setFormData({ current_password: "", new_password: "", confirm_password: "" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update password.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between transition-colors duration-300">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
              Security
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 transition-colors duration-300">
              Manage your password and account security settings.
            </p>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
            <ShieldCheck size={20} className="text-blue-600 dark:text-blue-500" />
          </div>
        </div>

        <div className="p-6 space-y-8">
          {isLocalUser ? (
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                variant="emerald" 
                isLoading={changePassword.isPending}
                leftIcon={<Key size={14} />}
              >
                Update Password
              </Button>
            </form>
          ) : (
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Lock size={20} />
                <div>
                  <p className="text-sm font-bold italic">Managed by Google</p>
                  <p className="text-xs mt-1">
                    Your account is secured via Google OAuth. To manage your password, please visit your Google Account settings.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
