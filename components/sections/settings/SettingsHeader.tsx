import React from 'react';
import { RotateCcw, Save } from 'lucide-react';

export const SettingsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">Manage your profile, appearance, notifications, and how TeachShare works for your classroom.</p>
      </div>
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-bold transition-colors duration-300">
          <RotateCcw size={14} />
          <span>Reset changes</span>
        </button>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md dark:shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 transition-all duration-300">
          <Save size={14} />
          <span>Save settings</span>
        </button>
      </div>
    </div>
  );
};