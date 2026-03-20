import React from "react";
import { ArchiveIcon, Trash2 } from "lucide-react";

export const DangerZone = () => {
  return (
    <>
      <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
        <div>
          <h3 className="text-[13px] font-bold text-rose-600 dark:text-rose-500 transition-colors duration-300">
            Danger Zone
          </h3>
          <p className="text-[10px] text-zinc-600 dark:text-zinc-500 mt-1 transition-colors duration-300">
            Adjust with care. Archiving or deleting your account affects shared
            resources across TeachShare.
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 italic transition-colors duration-300">
            You will be asked to confirm and optionally transfer ownership of
            shared collections before any permanent changes are made.
          </p>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-300">
            <ArchiveIcon size={14} />
            <span>Archive account</span>
          </button>
          <button className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-300">
            <Trash2 size={14} />
            <span>Delete account</span>
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-600 pt-4 transition-colors duration-300">
        Settings are saved to your profile and apply across devices. You can
        export a copy of your data anytime from Data & exports.
      </p>
    </>
  );
};
