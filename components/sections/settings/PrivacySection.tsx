"use client";
import React, { useState, useEffect } from "react";
import { ShieldCheck, Eye, EyeOff, Mail, Users } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useUpdateProfile } from "@/hooks/useTeacher";
import { Toggle } from "@/components/ui/Toggle";
import toast from "react-hot-toast";

export const PrivacySection = () => {
  const { data: user } = useUser();
  const updateProfile = useUpdateProfile();
  
  const [settings, setSettings] = useState({
    is_profile_public: true,
    show_email_on_profile: false
  });

  useEffect(() => {
    if (user?.settings) {
      setSettings({
        is_profile_public: user.settings.is_profile_public,
        show_email_on_profile: user.settings.show_email_on_profile
      });
    }
  }, [user]);

  const handleToggle = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    updateProfile.mutate({ [key]: newValue }, {
      onSuccess: () => {
        toast.success("Privacy settings updated.");
      },
      onError: () => {
        toast.error("Failed to update privacy settings.");
        setSettings(prev => ({ ...prev, [key]: !newValue })); // Rollback
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between transition-colors duration-300">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Privacy & visibility
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 transition-colors duration-300">
            Control who can see your profile and how they can reach you.
          </p>
        </div>
        <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
          <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-500" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <Users size={18} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 transition-colors duration-300">Public profile</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Allow other educators to find and follow your profile.</p>
            </div>
          </div>
          <Toggle 
            enabled={settings.is_profile_public} 
            onToggle={() => handleToggle('is_profile_public')} 
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800/60 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <Mail size={18} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 transition-colors duration-300">Display email</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Show your email address to verified collaborators on your profile.</p>
            </div>
          </div>
          <Toggle 
            enabled={settings.show_email_on_profile} 
            onToggle={() => handleToggle('show_email_on_profile')} 
          />
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4">
           <div className="flex items-start gap-3 text-amber-600 dark:text-amber-500/80 bg-amber-50 dark:bg-amber-500/5 p-4 rounded-lg border border-amber-200 dark:border-amber-500/20">
              <EyeOff size={16} className="mt-0.5 shrink-0" />
              <p className="text-[11px] leading-relaxed italic">
                <strong>Note:</strong> Resources you publish to the community repository will always remain public, even if your profile is hidden.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
