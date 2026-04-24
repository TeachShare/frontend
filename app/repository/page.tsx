"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
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

const RepositoryPage = () => {
  const router = useRouter();
  
  // React Query for centralized metadata
  const { data: metadata, isLoading: isMetaLoading } = useMetadata();
  
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemixing, setIsRemixing] = useState(false);
  const [remixItem, setRemixItem] = useState<any | null>(null);

  const [filters, setFilters] = useState({
    query: "",
    subject: "All Subjects",
    grade: "All Grades",
    type: "All Types"
  });

  // Fetch Community Discovery Data
  useEffect(() => {
    const fetchDiscoveryData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/resource_collection/discover");
        if (response.data.success) setResources(response.data.data);
      } catch (err) {
        console.error("Discovery fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscoveryData();
  }, []);

  // Filter Logic - useMemo ensures smooth searching even as the list grows
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesSearch = res.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                           res.tags?.some((t: string) => t.toLowerCase().includes(filters.query.toLowerCase()));
      const matchesSubj = filters.subject === "All Subjects" || res.subject === filters.subject;
      const matchesGrade = filters.grade === "All Grades" || res.grade === filters.grade;
      const matchesType = filters.type === "All Types" || res.type === filters.type;
      return matchesSearch && matchesSubj && matchesGrade && matchesType;
    });
  }, [resources, filters]);

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
      <main className="flex-1 flex flex-col min-w-0  transition-colors duration-300">
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
                <p className="text-lg font-black text-white leading-none">{resources.length}</p>
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
                value={filters.subject} 
                // Ensure we map the object to a string if backend returns objects
                options={["All Subjects", ...(metadata?.subjects?.map((s: any) => typeof s === 'string' ? s : s.name) || [])]} 
                onChange={(v: string) => setFilters({...filters, subject: v})} 
                isLoading={isMetaLoading}
              />
              <FilterGroup 
                label="Grade" 
                value={filters.grade} 
                options={["All Grades", ...(metadata?.grades?.map((g: any) => typeof g === 'string' ? g : g.name) || [])]} 
                onChange={(v: string) => setFilters({...filters, grade: v})} 
                isLoading={isMetaLoading}
              />
              <FilterGroup 
                label="Type" 
                value={filters.type} 
                options={["All Types", ...(metadata?.resource_types?.map((t: any) => typeof t === 'string' ? t : t.name) || [])]} 
                onChange={(v: string) => setFilters({...filters, type: v})} 
                isLoading={isMetaLoading}
              />
            </div>
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] font-mono">Fetching Assets...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <RepositoryItemCard
                    key={resource.collection_id}
                    data={resource}
                    onDownload={() => handleDownload(resource.collection_id)}
                    onRemix={() => setRemixItem(resource)}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-[#1F2226] rounded-xl">
                  <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">No resources found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default RepositoryPage;