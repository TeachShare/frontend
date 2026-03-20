// components/sections/settings/PreferencesSection.tsx
import React from 'react';
import { Circle } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';

export const PreferencesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Appearance */}
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Appearance</h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Choose how TeachShare looks on your devices.</p>
          </div>
          <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 px-2 py-0.5 rounded uppercase font-bold transition-colors duration-300">Synced with system</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Dark mode</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Optimized for evening planning and low-light environments</p>
            </div>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">High contrast surfaces</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Increase card contrast and text clarity across the app</p>
            </div>
            <Toggle enabled={false} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Compact layout</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Show more rows and threads on larger displays</p>
            </div>
            <Toggle enabled={false} />
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
            <span>Quiet hours 21:00-08:00</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Channels</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Email</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Daily summary of new comments, followers, and key updates.</p>
            </div>
            <Toggle enabled={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Push</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Real-time alerts for messages and shared resource mentions.</p>
            </div>
            <Toggle enabled={true} />
          </div>
        </div>
      </div>
    </div>
  );
};