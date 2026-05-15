"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, Loader2, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { useUser } from "@/hooks/useUser";

// Components
import { HistoryHeader } from "@/components/sections/resources/detail/history/HistoryHeader";
import { ResourceInfoCard } from "@/components/sections/resources/detail/history/ResourceInfoCard";
import { VersionCard } from "@/components/sections/resources/detail/history/VersionCard";
import { HistoryFooter } from "@/components/sections/resources/detail/history/HistoryFooter";
import { RestoreModal } from "@/components/sections/resources/detail/history/RestoreModal";
import { toast } from "react-hot-toast";

const VersionHistoryPage = () => {
  const { id } = useParams(); // e.g., "38-photosynthesis-lesson"
  const collectionId = typeof id === 'string' ? id.split("-")[0] : null;

  const [versions, setVersions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<any | null>(null);

  const { data: user } = useUser();
  const isOwner = user && versions.length > 0 && versions[0].owner_id === user.id;

   const fetchHistory = async (showLoader = true) => {
      if (!collectionId) return;
      
      try {
      if (showLoader) setIsLoading(true);
        const response = await api.get(`/resource_collection/${collectionId}/history`);
        
        if (response.data.success) {
          setVersions(response.data.data);
          console.log(response.data.data)
        } else {
          setError("Could not retrieve version history.");
        }
      } catch (err: any) {
        console.error("History fetch error:", err);
        setError(err.response?.data?.error || "Internal server error");
      } finally {
        setIsLoading(false);
      }
    };

  // Fetch real version history from your spawned collections
  useEffect(() => {
  
    fetchHistory(true);
  }, [collectionId]);

  const handleRestore = async () => {
    if (!restoreTarget) return;

    try {
      setIsRestoring(true);
      const response = await api.post(`/resource_collection/${collectionId}/restore/${restoreTarget.version_id}`);
      
      if (response.data.success) {
        await fetchHistory(false); 
        toast.success("Version restored successfully!");
        setRestoreTarget(null);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error restoring version");
    } finally {
      setIsRestoring(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Tracing Resource Lineage...
            </p>
          </div>
        </main>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto text-rose-500" size={40} />
            <p className="text-zinc-600 dark:text-zinc-400 font-medium">{error}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <RestoreModal 
          isOpen={!!restoreTarget}
          onClose={() => setRestoreTarget(null)}
          version={restoreTarget}
          onConfirm={handleRestore}
          isLoading={isRestoring}
        />
        <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
          <HistoryHeader />

          {/* Progress Tracker Banner */}
          <div className="bg-blue-600 h-8 rounded flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Immutable Version Tracking Active • {versions.length} Snapshots Stored
            </span>
          </div>

          {/* Pass the current (latest) version info to the card */}
         {versions.length > 0 && <ResourceInfoCard resource={versions[0]} totalVersions={versions.length} />}

          {/* Version List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/50 pb-4 transition-colors duration-300">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors duration-300">
                Lineage from original to current
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
                <span>Order:</span>
                <button className="text-zinc-900 dark:text-zinc-300 font-bold flex items-center gap-1 transition-colors duration-300">
                  Newest to oldest <ChevronDown size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {versions.length > 0 ? (
                versions.map((version, i) => (
                  <VersionCard
                    key={version.version_id}
                    version={version}
                    isLast={i === versions.length - 1}
                    isLatest={version.is_latest}
                    isOwner={isOwner}
                    onRestore={() => setRestoreTarget(version)}
                    disabled={isRestoring}
                  />
                ))
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                   <p className="text-sm text-zinc-500">No version history found for this resource.</p>
                </div>
              )}
            </div>
          </div>

          <HistoryFooter />
        </div>
      </main>
    </Layout>
  );
};

export default VersionHistoryPage;