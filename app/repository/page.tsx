"use client";
import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// Hooks & Components
import { useMetadata } from "@/hooks/useMetadata"; 
import { RemixModal } from "@/components/sections/repository/RemixModal";
import { RepositoryItemCard } from "@/components/sections/repository/RepositoryItemCard";
import { FilterGroup } from "@/components/sections/repository/FilterGroup";
import { SkeletonRepositoryCard } from "@/components/sections/repository/RepositorySkeletons";

const RepositoryPage = () => {
  const router = useRouter();
  
  // React Query for centralized metadata
  const { data: metadata, isLoading: isMetaLoading } = useMetadata();
  
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isRemixing, setIsRemixing] = useState(false);
  const [remixItem, setRemixItem] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    query: "",
    subject_id: "",
    grade_level_id: "",
    content_type_id: ""
  });

  const fetchDiscoveryData = async (currentPage: number, currentFilters: typeof filters) => {
    try {
      if (currentPage === 1) setIsLoading(true);
      else setIsFetching(true);

      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      if (currentFilters.query) params.append('search', currentFilters.query);
      if (currentFilters.subject_id) params.append('subject_id', currentFilters.subject_id);
      if (currentFilters.grade_level_id) params.append('grade_level_id', currentFilters.grade_level_id);
      if (currentFilters.content_type_id) params.append('content_type_id', currentFilters.content_type_id);

      const response = await api.get(`/resource_collection/discover?${params.toString()}`);
      if (response.data.success) {
        if (currentPage === 1) {
          setResources(response.data.resources);
        } else {
          setResources(prev => {
            const newRes = response.data.resources.filter(
              (nr: any) => !prev.some(pr => pr.collection_id === nr.collection_id)
            );
            return [...prev, ...newRes];
          });
        }
        setHasNext(response.data.has_next);
        setTotalCount(response.data.total_count || 0);
      }
    } catch (err) {
      console.error("Discovery fetch error:", err);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDiscoveryData(page, filters);
    }, filters.query ? 400 : 0);
    return () => clearTimeout(timer);
  }, [page, filters]);

  const handleConfirmRemix = async () => {
    if (!remixItem || !remixItem.collection_id) return;
    try {
      setIsRemixing(true);
      const response = await api.post(`/resource_collection/remix/${remixItem.collection_id}`);
      if (response.data.success) {
        const newId = response.data.collection_id;
        const cleanTitle = remixItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        router.push(`/resources/create?edit=${newId}-${cleanTitle}`);
      }
    } catch (err) {
      console.error("Remix failed:", err);
      alert("Failed to remix resource.");
    } finally {
      setIsRemixing(false);
      setRemixItem(null);
    }
  };

  const handleDownload = async (collectionId: number) => {
    try {
      const response = await api.get(`/resource_collection/${collectionId}`);
      const resourceData = response.data.data;
      if (!resourceData.files || resourceData.files.length === 0) return;

      const zip = new JSZip();
      const folderName = resourceData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const folder = zip.folder(folderName);

      const filePromises = resourceData.files.map(async (file: any) => {
        const res = await fetch(file.url);
        const blob = await res.blob();
        folder?.file(file.name, blob);
      });

      await Promise.all(filePromises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${folderName}_v${resourceData.version_no || 1}.zip`);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 transition-colors duration-300">
        <RemixModal
          isOpen={!!remixItem}
          item={remixItem}
          onClose={() => setRemixItem(null)}
          onConfirm={handleConfirmRemix}
          isLoading={isRemixing}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1F2226] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight uppercase">Resource Repository</h1>
              </div>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Accessing Global Community Ledger</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-black text-white leading-none">4.7</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">Avg Rating</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-white leading-none">{totalCount}</p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">Snapshots</p>
              </div>
            </div>
          </div>

          {/* Sticky Filter Pipeline */}
          <div className="bg-[#0D0F12]/80 backdrop-blur-xl border border-[#1F2226] rounded-xl p-4 flex flex-wrap items-center gap-4 shadow-2xl sticky top-0 z-10">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                type="text"
                placeholder="Search community ledger..."
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                className="w-full bg-[#050505] border border-[#1F2226] rounded-md pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 font-medium"
              />
            </div>

           <div className="flex flex-wrap gap-3">
              <FilterGroup 
                label="Subject" 
                value={metadata?.subjects?.find((s: any) => s.id.toString() === filters.subject_id)?.name || "All Subjects"} 
                options={["All Subjects", ...(metadata?.subjects?.map((s: any) => s.name) || [])]} 
                onChange={(v: string) => {
                  const sub = metadata?.subjects?.find((s: any) => s.name === v);
                  setFilters({...filters, subject_id: sub ? sub.id.toString() : ""});
                }} 
                isLoading={isMetaLoading}
              />
              <FilterGroup 
                label="Grade" 
                value={metadata?.grade_levels?.find((g: any) => g.id.toString() === filters.grade_level_id)?.name || "All Grades"} 
                options={["All Grades", ...(metadata?.grade_levels?.map((g: any) => g.name) || [])]} 
                onChange={(v: string) => {
                  const gr = metadata?.grade_levels?.find((g: any) => g.name === v);
                  setFilters({...filters, grade_level_id: gr ? gr.id.toString() : ""});
                }} 
                isLoading={isMetaLoading}
              />
              <FilterGroup 
                label="Type" 
                value={metadata?.content_types?.find((t: any) => t.id.toString() === filters.content_type_id)?.name || "All Types"} 
                options={["All Types", ...(metadata?.content_types?.map((t: any) => t.name) || [])]} 
                onChange={(v: string) => {
                  const ct = metadata?.content_types?.find((t: any) => t.name === v);
                  setFilters({...filters, content_type_id: ct ? ct.id.toString() : ""});
                }} 
                isLoading={isMetaLoading}
              />
            </div>
          </div>

          <div className="space-y-8 pb-20">
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <SkeletonRepositoryCard key={i} />
                ))}
                </div>
            ) : resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <RepositoryItemCard
                        key={resource.collection_id}
                        data={resource}
                        onDownload={() => handleDownload(resource.collection_id)}
                        onRemix={() => setRemixItem(resource)}
                    />
                ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-[#1F2226] rounded-xl">
                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No resources found</p>
                </div>
            )}

            {hasNext && (
                <div className="flex justify-center">
                    <button 
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={isFetching}
                        className="bg-[#121417] border border-[#1F2226] px-10 py-3 rounded-xl text-sm font-bold text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isFetching && <Loader2 size={16} className="animate-spin" />}
                        {isFetching ? "Syncing..." : "Load More Discoveries"}
                    </button>
                </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RepositoryPage;
