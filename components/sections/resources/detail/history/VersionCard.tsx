import React from "react";
import { User, Clock, FileText, ArrowRightLeft, Eye } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface Props {
  version: any;
  isLast: boolean;
  isLatest: boolean;
  onRestore: () => void;
  disabled?: boolean;
}

export const VersionCard = ({
  version: v,
  isLast,
  isLatest,
  onRestore,
  disabled,
}: Props) => {
  const router = useRouter();
  const params = useParams();

  // Extract the original resource slug/ID from the URL params
  const resourceSlug = params.id;

  const dateFormatted = new Date(v.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCompare = () => {
    // Navigate to /resources/[id]/history/compare?with=[version_no]
    // Use the version number for cleaner URLs as per user request
    router.push(
      `/resources/${resourceSlug}/history/compare?with=${v.version_no}`,
    );
  };

  const handleView = () => {
    // Navigate to the specific unique collection for this version
    router.push(`/resources/${v.collection_id}-v${v.version_no}`);
  };

  return (
    <div className="relative group">
      {!isLast && (
        <div className="absolute left-[7px] top-10 w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/50 group-hover:bg-blue-400 transition-colors duration-300" />
      )}

      <div
        className={`grid grid-cols-12 gap-6 border rounded-xl p-6 transition-all duration-300 ${
          isLatest
            ? "bg-white dark:bg-[#121417] border-blue-200 dark:border-blue-900/40 shadow-sm ring-1 ring-blue-500/5"
            : "bg-white/50 dark:bg-[#121417]/30 border-zinc-200 dark:border-zinc-800/60"
        }`}
      >
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
              v{v.version_no} ·{" "}
              {isLatest ? "Current Version" : "Archive Snapshot"}
            </h4>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                isLatest
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {isLatest ? "Active" : "Immutable"}
            </span>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
              "{v.notes || "No revision notes provided for this snapshot."}"
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <User size={12} /> {v.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {dateFormatted}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText size={12} /> {v.file_count} files
            </span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleView}
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 py-2 rounded font-bold text-[11px] hover:text-zinc-900 dark:hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <Eye size={12} /> View
            </button>

            {/* Compare Button now dynamic for any version */}
            <button
              onClick={handleCompare}
              disabled={isLatest}
              className={`py-2 rounded font-bold text-[11px] flex items-center justify-center gap-2 transition-all ${
                isLatest 
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              }`}
            >
              <ArrowRightLeft size={12} /> Compare
            </button>
          </div>

          {!isLatest && (
            <button
              onClick={onRestore}
              disabled={disabled}
              className={`w-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 py-2 rounded font-bold text-[11px] transition-all ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-emerald-200 dark:hover:bg-emerald-500/20"
              }`}
            >
              {disabled ? "Processing..." : "Restore this version"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
