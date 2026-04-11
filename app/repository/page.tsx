"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// Types
import { RemixItemType } from "@/types/repository";

// Components
import { RemixModal } from "@/components/sections/repository/RemixModal";
import { RepositoryItem } from "@/components/sections/repository/RepositoryItem";

const RepositoryPage = () => {
  const router = useRouter();
  const [remixItem, setRemixItem] = useState<RemixItemType | null>(null);
  const [isRemixing, setIsRemixing] = useState(false);

  // --- API State ---
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [gradeFilter, setGradeFilter] = useState("All Grades");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortBy, setSortBy] = useState("Most Recent");

  // --- Fetch Data from Flask ---
  useEffect(() => {
    const fetchDiscoveryData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/resource_collection/discover");

        if (response.data.success) {
          setResources(response.data.data);
        }
      } catch (err: any) {
        console.error("Discovery fetch error:", err);
        setError("Failed to load resources from the community.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscoveryData();
  }, []);

  // --- Client-side Filtering Logic ---
  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t: string) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesSubject =
      subjectFilter === "All Subjects" || item.subject === subjectFilter;
    const matchesGrade =
      gradeFilter === "All Grades" || item.grade === gradeFilter;
    const matchesType = typeFilter === "All Types" || item.type === typeFilter;

    return matchesSearch && matchesSubject && matchesGrade && matchesType;
  });

  const handleConfirmRemix = async () => {
    if (!remixItem || !remixItem.collection_id) return;

    try {
      setIsRemixing(true);
      // 1. Call the Flask remix endpoint
      const response = await api.post(`/resource_collection/remix/${remixItem.collection_id}`);

      if (response.data.success) {
        const newId = response.data.collection_id;
        const cleanTitle = remixItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // 2. Redirect to the EDIT page of the NEWLY created collection
        // This allows the teacher to immediately start customizing their remix
        router.push(`/resources/create?edit=${newId}-${cleanTitle}`);
      }
    } catch (err) {
      console.error("Remix failed:", err);
      alert("Failed to remix resource. Please try again.");
    } finally {
      setIsRemixing(false);
      setRemixItem(null);
    }
  };

  const handleDownload = async (collectionId: number) => {
    try {
      const response = await api.get(`/resource_collection/${collectionId}`);
      const resourceData = response.data.data;

      if (!resourceData.files || resourceData.files.length === 0) {
        alert("No files available for this resource.");
        return;
      }

      const zip = new JSZip();
      const folderName = resourceData.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const folder = zip.folder(folderName);

      const filePromises = resourceData.files.map(async (file: any) => {
        try {
          const fileResponse = await fetch(file.url);
          if (!fileResponse.ok) throw new Error(`Failed to fetch ${file.name}`);
          const blob = await fileResponse.blob();
          folder?.file(file.name, blob);
        } catch (err) {
          console.error(`Error adding ${file.name} to zip:`, err);
        }
      });

      await Promise.all(filePromises);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${folderName}_v${resourceData.version_no || 1}.zip`);
    } catch (error) {
      console.error("ZIP Download failed:", error);
      alert("Failed to bundle files. Please check your connection.");
    }
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 min-h-full bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <RemixModal
          isOpen={!!remixItem}
          item={remixItem}
          onClose={() => setRemixItem(null)}
          onConfirm={handleConfirmRemix}
          isLoading={isRemixing} // Pass the remixing state to show the loader
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Community Discovery
              </h1>
              <p className="text-zinc-500 text-xs">
                Explore immutable snapshots shared by teachers worldwide.
              </p>
            </div>
            <button
              onClick={() => router.push("/resources/create")}
              className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> Create Resource
            </button>
          </div>

          {/* Search & Filters */}
          <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Search & filters
            </h3>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search community resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-lg pl-10 pr-4 py-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Grid for Dropdowns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:w-2/3 xl:w-[60%]">
                {/* ... (Your dropdown logic here) ... */}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-zinc-400" size={40} />
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Fetching Community Resources...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-rose-500">
              <AlertCircle size={40} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <RepositoryItem
                    key={resource.collection_id}
                    onDownload={() => handleDownload(resource.collection_id)}
                    data={resource}
                    onRemix={() =>
                      setRemixItem({
                        collection_id: resource.collection_id, // Pass collection_id here
                        title: resource.title,
                        subject: resource.subject,
                      })
                    }
                  />
                ))
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <p className="text-sm text-zinc-500">
                    No resources found matching your criteria.
                  </p>
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