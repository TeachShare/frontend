import React from 'react';

export const SettingsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">Manage your profile, appearance, notifications, and how TeachShare works for your classroom.</p>
      </div>
    </div>
  );
};