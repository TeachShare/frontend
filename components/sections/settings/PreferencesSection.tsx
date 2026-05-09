"use client";
import React, { useState, useEffect } from 'react';
import { Circle, Monitor, Moon, Sun, Bell, Mail, Smartphone } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { useTheme } from 'next-themes';
import { useUser } from '@/hooks/useUser';
import { useUpdateProfile } from '@/hooks/useTeacher';
import toast from 'react-hot-toast';

export const PreferencesSection = () => {
  const { theme, setTheme } = useTheme();
  const { data: user } = useUser();
  const updateProfile = useUpdateProfile();
  
  const [notifs, setNotifs] = useState({
    email_notifications: true,
    push_notifications: true
  });

  useEffect(() => {
    if (user?.settings) {
      setNotifs({
        email_notifications: user.settings.email_notifications,
        push_notifications: user.settings.push_notifications
      });
    }
  }, [user]);

  const handleNotifToggle = (key: keyof typeof notifs) => {
    const newValue = !notifs[key];
    setNotifs(prev => ({ ...prev, [key]: newValue }));
    
    updateProfile.mutate({ [key]: newValue }, {
      onSuccess: () => {
        toast.success("Notification settings updated.");
      },
      onError: () => {
        toast.error("Failed to update notification settings.");
        setNotifs(prev => ({ ...prev, [key]: !newValue }));
      }
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateProfile.mutate({ theme_preference: newTheme });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Appearance */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Appearance</h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Choose how TeachShare looks on your devices.</p>
          </div>
          <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 px-2 py-0.5 rounded uppercase font-bold transition-colors duration-300">
            {theme === 'system' ? 'Synced with system' : `${theme} mode`}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg border border-zinc-100 dark:border-zinc-800/60">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                    <Moon size={16} />
                </div>
                <div>
                   <p className="text-[12px] font-bold text-zinc-900 dark:text-zinc-200">Dark mode</p>
                   <p className="text-[10px] text-zinc-500">Easier on the eyes in low light</p>
                </div>
             </div>
             <Toggle enabled={theme === 'dark'} onToggle={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
             {['light', 'dark', 'system'].map((t) => (
                <button
                    key={t}
                    onClick={() => handleThemeChange(t)}
                    className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                        theme === t 
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100' 
                        : 'bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                    }`}
                >
                    {t}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Notifications</h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Decide when TeachShare should tap you on the shoulder.</p>
          </div>
          <div className="flex items-center space-x-1.5 text-[9px] font-bold text-amber-600 dark:text-amber-500/80 uppercase transition-colors duration-300">
            <Circle size={8} fill="currentColor" />
            <span>Smart alerts active</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Channels</p>
          
          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg border border-zinc-100 dark:border-zinc-800/60">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${notifs.email_notifications ? 'bg-blue-500/10 text-blue-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                    <Mail size={16} />
                </div>
                <div>
                   <p className="text-[12px] font-bold text-zinc-900 dark:text-zinc-200">Email</p>
                   <p className="text-[10px] text-zinc-500">Weekly resource digest</p>
                </div>
             </div>
             <Toggle enabled={notifs.email_notifications} onToggle={() => handleNotifToggle('email_notifications')} />
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg border border-zinc-100 dark:border-zinc-800/60">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${notifs.push_notifications ? 'bg-purple-500/10 text-purple-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                    <Smartphone size={16} />
                </div>
                <div>
                   <p className="text-[12px] font-bold text-zinc-900 dark:text-zinc-200">Push</p>
                   <p className="text-[10px] text-zinc-500">Real-time collaboration alerts</p>
                </div>
             </div>
             <Toggle enabled={notifs.push_notifications} onToggle={() => handleNotifToggle('push_notifications')} />
          </div>
        </div>
      </div>
    </div>
  );
};