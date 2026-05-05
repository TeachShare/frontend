"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import Layout from "@/components/layout/Layout";
import { 
  ArrowLeft, 
  History, 
  ArrowLeftRight, 
  FileText, 
  Clock, 
  Loader2,
  CheckCircle2,
  Download,
  ExternalLink,
  X
} from "lucide-react";
import { saveAs } from 'file-saver'; 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const CompareVersionsPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Extract base ID from the URL (e.g., "38-lesson-plan" -> "38")
  const currentId = typeof params.id === 'string' ? params.id.split("-")[0] : null;
  const compareWithId = searchParams.get("with"); // The version the user clicked to compare
  console.log(currentId)
  const [allVersions, setAllVersions] = useState<any[]>([]);
  const [compareData, setCompareData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchLineage = async () => {
      if (!currentId) return;
      try {
        setLoading(true);
        // 1. Get the full list of all versions for the sidebar
        const historyRes = await api.get(`/resource_collection/${currentId}/history`);
        const versions = historyRes.data.data;
        setAllVersions(versions);

        console.log(versions)
        // 2. Fetch the comparison between the selected "with" ID and the current ID
        // If no "with" is provided, default to the second newest version (v4 vs v5)
        const targetId = compareWithId || versions[1]?.collection_id;
        
        if (targetId) {
          const compRes = await api.get(`/resource_collection/compare/${targetId}/${currentId}`);
          setCompareData(compRes.data);
          console.log(compRes)
        }
      } catch (err) {
        console.error("Comparison Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLineage();
  }, [currentId, compareWithId]);

  const selectForComparison = (id: number) => {
    router.push(`?with=${id}`);
  };

  return (
    <Layout>
      <main className="flex h-[calc(100vh-64px)] bg-zinc-50 dark:bg-[#090a0c] overflow-hidden">
        
        {/* LEFT SIDEBAR: ALL PAST VERSIONS (V1, V2, V3...) */}
        <aside className="w-80 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d0f] flex flex-col">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft size={12} /> Back to History
            </button>
            <h2 className="text-sm font-bold flex items-center gap-2">
              <History size={16} className="text-blue-600" /> Version History
            </h2>
            <p className="text-[10px] text-zinc-500 mt-1">Select a version to compare with current</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {allVersions.map((v, idx) => (
              <button
                key={`${v.collection_id}-${idx}`}
                onClick={() => selectForComparison(v.collection_id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  compareWithId === String(v.collection_id) || (v.is_latest && !compareWithId)
                    ? "bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30"
                    : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${v.is_latest ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-zinc-100 text-zinc-500'}`}>
                    V{v.version_no} {v.is_latest && "• Active"}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {new Date(v.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-200 mt-2 truncate">
                  {v.notes || "No revision notes"}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT: SIDE-BY-SIDE VIEW */}
        <section className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Generating comparison...</p>
            </div>
          ) : compareData && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold flex items-center gap-3">
                  <ArrowLeftRight className="text-blue-600" /> Comparison Workspace
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Column 1: The Selected Archive Snapshot (v1, v2, v3...) */}
                <CompareColumn 
                  label={`Snapshot v${compareData.v1.version_no}`} 
                  data={compareData.v1} 
                  isLatest={false} 
                />

                {/* Column 2: The Current Active Reference (v5) */}
                <CompareColumn 
                  label={`Current Active v${compareData.v2.version_no}`} 
                  data={compareData.v2} 
                  isLatest={true} 
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

const CompareColumn = ({ label, data, isLatest }: any) => {
  const [viewFile, setViewFile] = useState<{ url: string; name: string } | null>(null);

  const handleDownloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      console.error("Download failed:", error);
      saveAs(url, filename);
    }
  };

  return (
    <>
      <div className="space-y-4 flex flex-col h-full">
        {/* Header Info */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          isLatest 
          ? 'bg-blue-600 border-blue-700 text-white shadow-lg' 
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white'
        }`}>
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isLatest ? 'text-blue-100' : 'text-zinc-500'}`}>
            {label}
          </span>
          <h3 className="text-lg font-bold mt-1 truncate">{data.title}</h3>
          
          <div className="flex flex-wrap gap-3 mt-3 opacity-90">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
              <Clock size={12}/> {new Date(data.updated_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
              <CheckCircle2 size={12} className={isLatest ? "text-blue-200" : "text-emerald-500"}/> 
              {data.subject} • {data.grade}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {data.tags?.map((index: number, tag: string) => (
              <span key={tag} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                isLatest ? 'bg-blue-500/30 border-blue-400/30 text-white' : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 p-4">
          <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-widest flex items-center gap-2">
            <FileText size={12} /> Attached Files ({data.files?.length || 0})
          </h4>
          <div className="space-y-2">
            {data.files?.length > 0 ? data.files.map((file: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800/50 group hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded text-zinc-400 group-hover:text-blue-500 transition-colors">
                    <FileText size={14} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">{file.name}</p>
                    <p className="text-[9px] text-zinc-400 uppercase">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setViewFile({ url: file.url, name: file.name })}
                    title="View File"
                    className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                  >
                    <ExternalLink size={14} />
                  </button>
                  <button 
                    onClick={() => handleDownloadFile(file.url, file.name)}
                    title="Download File"
                    className="p-2 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            )) : (
              <p className="text-[10px] text-zinc-500 italic py-2 text-center">No files in this version.</p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white dark:bg-[#121417] p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm overflow-hidden">
          <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-widest">Description Snapshot</h4>
          <div 
            className="prose dark:prose-invert prose-sm max-w-none prose-zinc"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </div>

      {/* --- UPDATED: React Doc Viewer Modal --- */}
      {viewFile && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-950/95 backdrop-blur-sm animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex-none h-14 flex justify-between items-center px-6 bg-zinc-950 border-b border-zinc-800 shadow-xl z-10">
            <h3 className="text-white font-bold text-sm truncate max-w-xl italic opacity-80">
              {viewFile.name}
            </h3>
            <button 
              onClick={() => setViewFile(null)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Main Viewer Container */}
          <div className="flex-1 relative w-full max-w-7xl mx-auto my-2 md:my-4 overflow-hidden">
            <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
              <DocViewer 
                documents={[{ uri: viewFile.url, fileName: viewFile.name }]} 
                pluginRenderers={DocViewerRenderers}
                style={{ width: "100%", height: "100%" }}
                config={{
                  header: {
                    disableHeader: true,
                  },
                }}
                theme={{
                  primary: "#2563eb", 
                  secondary: "#090a0c", 
                  tertiary: "#18181b", 
                  textPrimary: "#ffffff", 
                  textSecondary: "#a1a1aa", 
                  disableThemeScrollbar: false,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CompareVersionsPage;