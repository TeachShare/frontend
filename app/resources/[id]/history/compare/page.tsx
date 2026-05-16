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
  X,
  User,
  Shield,
  Eye,
  Activity,
  Columns2,
  XCircle
} from "lucide-react";
import { saveAs } from 'file-saver'; 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useTheme } from "next-themes"; // Added useTheme import

import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";

const CompareVersionsPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme(); // Hooked next-themes
  const { data: user } = useUser();
  
  // Extract base ID from the URL (e.g., "38-lesson-plan" -> "38")
  const currentId = typeof params.id === 'string' ? params.id.split("-")[0] : null;
  const compareWithVersion = searchParams.get("with"); // The version number the user clicked to compare
  
  const [allVersions, setAllVersions] = useState<any[]>([]);
  const [compareData, setCompareData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsSaving] = useState(false);
  const [sideBySideFiles, setSideBySideFiles] = useState<{ v1: any; v2: any } | null>(null);

  const fetchLineage = async () => {
    if (!currentId) return;
    try {
      setLoading(true);
      // 1. Get the full list of all versions for the sidebar
      const historyRes = await api.get(`/resource_collection/${currentId}/history`);
      const versions = historyRes.data.data;
      setAllVersions(versions);

      // 2. Identify the 'Current Active' version (is_latest = true)
      // This is the version currently serving as the production/live state
      const activeVersion = versions.find((v: any) => v.is_latest);
      const v2_no = activeVersion?.version_no; 

      // 3. Determine the 'Target Version' (v1)
      // If "with" is provided, use it. Otherwise, default to the most recent version.
      // If the most recent is the active version itself, fallback to the previous archive.
      const mostRecentVersion = versions[0];
      let v1_no = compareWithVersion ? Number(compareWithVersion) : null;

      if (!v1_no) {
        if (mostRecentVersion?.version_no === v2_no) {
          v1_no = versions[1]?.version_no; // Compare Active v5 against Archive v4
        } else {
          v1_no = mostRecentVersion?.version_no; // Compare Proposal v6 against Active v5
        }
      }
      
      if (v1_no && v2_no) {
        // If trying to compare the same version, handle gracefully
        if (String(v1_no) === String(v2_no)) {
          // If we have at least 2 versions, default to v[1] vs v[0]
          if (versions.length > 1) {
            const compRes = await api.get(`/resource_collection/compare/${currentId}?v1=${versions[1].version_no}&v2=${v2_no}`);
            setCompareData(compRes.data);
          } else {
            // Only one version exists
            setCompareData(null);
          }
        } else {
          const compRes = await api.get(`/resource_collection/compare/${currentId}?v1=${v1_no}&v2=${v2_no}`);
          setCompareData(compRes.data);
        }
      }
    } catch (err) {
      console.error("Comparison Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchLineage();
  }, [currentId, compareWithVersion]);

  const handleApprove = async () => {
    if (!compareData?.v1?.version_id) return;
    try {
      setIsSaving(true);
      const res = await api.post(`/resource_collection/${currentId}/approve/${compareData.v1.version_id}`);
      if (res.data.success) {
        toast.success("Version approved and published!");
        router.push(`/resources/${params.id}/history`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Approval failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReject = async () => {
    if (!compareData?.v1?.version_id) return;
    if (!window.confirm("Are you sure you want to reject these proposed changes? This will delete this version permanently.")) return;
    
    try {
      setIsSaving(true);
      const res = await api.post(`/resource_collection/${currentId}/reject/${compareData.v1.version_id}`);
      if (res.data.success) {
        toast.success("Proposal rejected and removed.");
        router.push(`/resources/${params.id}/history`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Rejection failed");
    } finally {
      setIsSaving(false);
    }
  };

  const selectForComparison = (v_no: number) => {
    // If selecting the current active version, we can either do nothing or toast
    const activeNo = allVersions[0]?.version_no;
    if (v_no === activeNo) {
       return;
    }
    router.push(`?with=${v_no}`);
  };

  // 4. Identify which version is currently being used as v1 for highlighting in sidebar
  const currentV1No = compareData?.v1?.version_no;

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
            <p className="text-[10px] text-zinc-500 mt-1">Select a version to compare with current active version</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {allVersions.map((v, idx) => (
              <button
                key={`${v.version_id}-${idx}`}
                onClick={() => selectForComparison(v.version_no)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  v.version_no === currentV1No
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
                <div className="space-y-1">
                  <h1 className="text-xl font-bold flex items-center gap-3">
                    <ArrowLeftRight className="text-blue-600" /> Comparison Workspace
                  </h1>
                  {!compareData.v1.is_approved && (
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                       <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Reviewing Proposed Changes</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {user && compareData.owner_id === user.id && !compareData.v1.is_approved && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleReject}
                        isLoading={isApproving}
                        leftIcon={<XCircle size={14} />}
                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-500/20"
                      >
                        Reject Proposal
                      </Button>

                      <Button 
                        variant="emerald" 
                        size="sm" 
                        onClick={handleApprove}
                        isLoading={isApproving}
                        leftIcon={<CheckCircle2 size={14} />}
                        className="shadow-emerald-500/20"
                      >
                        Approve & Publish Changes
                      </Button>
                    </>
                  )}
                  
                  <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Added</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Removed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Column 1: The Selected Archive Snapshot (v1, v2, v3...) */}
                <CompareColumn 
                  label={`Target Version v${compareData.v1.version_no}`} 
                  data={compareData.v1} 
                  otherData={compareData.v2}
                  isLatest={false} 
                  setSideBySideFiles={setSideBySideFiles}
                />

                {/* Column 2: The Current Active Reference (v5) */}
                <CompareColumn 
                  label={`Current Active Version v${compareData.v2.version_no}`} 
                  data={compareData.v2} 
                  otherData={compareData.v1}
                  isLatest={true} 
                  setSideBySideFiles={setSideBySideFiles}
                />
              </div>
            </div>
          )}
        </section>

        {/* --- Side-by-Side Visual Comparison Modal --- */}
        {sideBySideFiles && (
          <div className="fixed inset-0 z-[110] flex flex-col bg-[#08090A] animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex-none h-14 flex justify-between items-center px-6 bg-[#08090A] border-b border-[#1F2226]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                   <Columns2 size={18} className="text-[#00D084]" />
                   <h3 className="font-bold text-sm tracking-tight">Side-by-Side Comparison: <span className="text-zinc-400 italic font-medium">{sideBySideFiles.v1.name}</span></h3>
                </div>
                <div className="h-4 w-[1px] bg-zinc-700" />
                <div className="flex gap-4">
                   <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Target v{compareData.v1.version_no}</span>
                   <span className="text-[10px] font-black uppercase text-[#00D084] tracking-widest">Current Active v{compareData.v2.version_no}</span>
                </div>
              </div>
              <button 
                onClick={() => setSideBySideFiles(null)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Viewers */}
            <div className="flex-1 flex divide-x divide-[#1F2226] overflow-hidden bg-[#08090A]">
               {/* Left Viewer (Archive) */}
               <div className="flex-1 relative h-full">
                  <div className="absolute top-2 left-4 z-20 pointer-events-none">
                     <span className="bg-rose-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-xl">Original</span>
                  </div>
               <div className="flex-1 p-4 md:p-8">
                <div className="h-full w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-[#1F2226] shadow-2xl relative">
                  <div className="absolute inset-0 [&_*]:h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                    <DocViewer
                      documents={[{ uri: sideBySideFiles.v1.url, fileName: sideBySideFiles.v1.name }]}         pluginRenderers={DocViewerRenderers}
                      config={{ header: { disableHeader: true } }}
                      theme={{
                        primary: "#00D084",
                        secondary: "#08090A",
                        tertiary: "#111317",
                        textPrimary: "#ffffff",
                        textSecondary: "#8E9196",
                      }}
                    />
                  </div>
                </div>
              </div>
               </div>

               {/* Right Viewer (Current Active) */}
               <div className="flex-1 relative h-full">
                  <div className="absolute top-2 left-4 z-20 pointer-events-none">
                     <span className="bg-[#00D084] text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-xl">Modified</span>
                  </div>
                  <div className="h-full w-full relative">
                    <div className="absolute inset-0 [&_*]:h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                      <DocViewer 
                        key={`right-${resolvedTheme}`}
                        documents={[{ uri: sideBySideFiles.v2.url, fileName: sideBySideFiles.v2.name }]} 
                        pluginRenderers={DocViewerRenderers}
                        config={{ header: { disableHeader: true } }}
                        theme={{ 
                          primary: "#00D084", 
                          secondary: "#08090A", 
                          tertiary: "#111317", 
                          textPrimary: "#ffffff",
                          textSecondary: "#8E9196",
                        }}
                      />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

const CompareColumn = ({ label, data, otherData, isLatest, setSideBySideFiles }: any) => {
  const [viewFile, setViewFile] = useState<{ url: string; name: string } | null>(null);
  const { resolvedTheme } = useTheme(); // Hooked next-themes for child component

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

  // Difference Helpers
  const isTagAdded = (tag: string) => !otherData.tags?.includes(tag);
  
  const isFileAdded = (fileUrl: string) => !otherData.files?.some((f: any) => f.url === fileUrl);
  const isFileModified = (fileName: string, currentHash: string) => {
    const otherFile = otherData.files?.find((f: any) => f.name === fileName);
    return otherFile && otherFile.hash !== currentHash;
  };

  const hasDescriptionChanged = data.description !== otherData.description;
  const hasTitleChanged = data.title !== otherData.title;
  const hasDurationChanged = data.estimate_duration !== otherData.estimate_duration;
  const hasVisibilityChanged = data.visibility !== otherData.visibility;
  const hasCollaborationChanged = data.collaboration_mode !== otherData.collaboration_mode;

  return (
    <>
      <div className="space-y-4 flex flex-col h-full">
        {/* Version Notes / Contextual Intent */}
        <div className={`p-4 rounded-2xl border flex items-start gap-4 transition-all duration-300 ${
          isLatest 
            ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20' 
            : 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800/60'
        }`}>
          <div className={`p-2 rounded-xl ${isLatest ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-lg' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
            <Activity size={16} />
          </div>
          <div className="flex-1">
            <h4 className={`text-[10px] font-black uppercase tracking-widest ${isLatest ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}>
              Version Intent & Notes
            </h4>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-200 mt-1 italic">
              &quot;{data.version_notes || "No revision notes provided for this version."}&quot;
            </p>
          </div>
        </div>

        {/* Header Info */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          isLatest 
          ? 'bg-blue-600 border-blue-700 text-white shadow-lg' 
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white'
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isLatest ? 'text-blue-100' : 'text-zinc-500'}`}>
              {label}
            </span>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${isLatest ? 'bg-blue-500/30' : 'bg-white/50 dark:bg-black/20'}`}>
              <User size={10} className={isLatest ? "text-blue-100" : "text-zinc-400"} />
              <span className={`text-[9px] font-bold ${isLatest ? 'text-white' : 'text-zinc-500'}`}>
                {data.version_creator_name || "System"}
              </span>
            </div>
          </div>
          <h3 className={`text-lg font-bold mt-1 truncate ${hasTitleChanged ? (isLatest ? 'text-emerald-300' : 'text-rose-400') : ''}`}>
            {data.title}
          </h3>
          
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
            {data.tags?.map((tag: string) => {
              const added = isLatest && isTagAdded(tag);
              return (
                <span key={tag} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                  added 
                    ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' 
                    : isLatest 
                      ? 'bg-blue-500/30 border-blue-400/30 text-white' 
                      : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Settings & Pedagogy Diffing */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 p-4">
           <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-widest flex items-center gap-2">
            <Shield size={12} /> Resource Specifications
          </h4>
          <div className="grid grid-cols-1 gap-2">
             {/* Duration */}
             <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
               hasDurationChanged ? (isLatest ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/10' : 'bg-rose-500/5 border-rose-500/20') : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/50'
             }`}>
                <div className="flex items-center gap-2">
                   <Clock size={12} className="text-zinc-400" />
                   <span className="text-[10px] font-bold text-zinc-500 uppercase">Duration</span>
                </div>
                <span className={`text-[11px] font-bold ${hasDurationChanged ? (isLatest ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400') : 'text-zinc-700 dark:text-zinc-300'}`}>
                   {data.estimate_duration || "Not set"}
                </span>
             </div>

             {/* Visibility */}
             <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
               hasVisibilityChanged ? (isLatest ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/10' : 'bg-rose-500/5 border-rose-500/20') : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/50'
             }`}>
                <div className="flex items-center gap-2">
                   <Eye size={12} className="text-zinc-400" />
                   <span className="text-[10px] font-bold text-zinc-500 uppercase">Visibility</span>
                </div>
                <span className={`text-[11px] font-bold capitalize ${hasVisibilityChanged ? (isLatest ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400') : 'text-zinc-700 dark:text-zinc-300'}`}>
                   {data.visibility}
                </span>
             </div>

             {/* Collaboration */}
             <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
               hasCollaborationChanged ? (isLatest ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/10' : 'bg-rose-500/5 border-rose-500/20') : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/50'
             }`}>
                <div className="flex items-center gap-2">
                   <Shield size={12} className="text-zinc-400" />
                   <span className="text-[10px] font-bold text-zinc-500 uppercase">Collaboration</span>
                </div>
                <span className={`text-[11px] font-bold capitalize ${hasCollaborationChanged ? (isLatest ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400') : 'text-zinc-700 dark:text-zinc-300'}`}>
                   {data.collaboration_mode?.replace('_', ' ') || "None"}
                </span>
             </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 p-4">
          <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-widest flex items-center gap-2">
            <FileText size={12} /> Attached Files ({data.files?.length || 0})
          </h4>
          <div className="space-y-2">
            {data.files?.length > 0 ? data.files.map((file: any, idx: number) => {
              const added = isLatest && isFileAdded(file.url);
              const modified = isLatest && isFileModified(file.name, file.hash);
              const otherFile = modified ? otherData.files.find((f: any) => f.name === file.name) : null;

              return (
                <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border transition-all group ${
                  added 
                    ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/10' 
                    : modified
                      ? 'bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/10'
                      : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/50 hover:border-blue-500/50'
                }`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-1.5 rounded transition-colors ${
                      added ? 'bg-emerald-500/10 text-emerald-500' : 
                      modified ? 'bg-blue-500/10 text-blue-500' :
                      'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 group-hover:text-blue-500'
                    }`}>
                      <FileText size={14} />
                    </div>
                    <div className="overflow-hidden">
                      <p className={`text-[11px] font-bold truncate max-w-[140px] ${
                        added ? 'text-emerald-600 dark:text-emerald-400' : 
                        modified ? 'text-blue-600 dark:text-blue-400' :
                        'text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {file.name}
                      </p>
                      <p className="text-[9px] text-zinc-400 uppercase">{file.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {added && <span className="text-[8px] font-black text-emerald-500 uppercase mr-2 tracking-tighter">New</span>}
                    {modified && <span className="text-[8px] font-black text-blue-500 uppercase mr-2 tracking-tighter">Modified</span>}
                    
                    {modified && (
                       <button 
                        onClick={() => setSideBySideFiles({ v1: otherFile, v2: file })}
                        title="Compare Content"
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                      >
                        <Columns2 size={14} />
                      </button>
                    )}

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
              );
            }) : (
              <p className="text-[10px] text-zinc-500 italic py-2 text-center">No files in this version.</p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className={`flex-1 p-8 rounded-2xl border shadow-sm overflow-hidden transition-all duration-500 ${
          hasDescriptionChanged 
            ? (isLatest ? 'bg-emerald-500/[0.02] border-emerald-500/20 ring-1 ring-emerald-500/5' : 'bg-rose-500/[0.02] border-rose-500/20') 
            : 'bg-white dark:bg-[#121417] border-zinc-200 dark:border-zinc-800/60'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Description Snapshot</h4>
            {hasDescriptionChanged && (
              <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                isLatest ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
              }`}>
                {isLatest ? 'Current Active Version' : 'Target Version'}
              </span>
            )}
          </div>
          <div 
            className="prose dark:prose-invert prose-sm max-w-none prose-zinc"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </div>

      {/* --- UPDATED: React Doc Viewer Modal --- */}
      {viewFile && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-zinc-900/90 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex-none h-14 flex justify-between items-center px-6 bg-[#08090A] border-b border-[#1F2226] shadow-xl z-10">
            <h3 className="text-white font-bold text-sm truncate max-w-xl italic opacity-80 flex items-center gap-2">
              <FileText size={16} className="text-[#00D084]" />
              {viewFile.name}
            </h3>
            <button 
              onClick={() => setViewFile(null)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 md:p-8">
            <div className="h-full w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-[#1F2226] shadow-2xl relative">
              <div className="absolute inset-0 [&_*]:!h-full [&_iframe]:!h-full [&_iframe]:!border-none">
                <DocViewer
                  documents={[{ uri: viewFile.url, fileName: viewFile.name }]}
                  pluginRenderers={DocViewerRenderers}
                  config={{ header: { disableHeader: true } }}
                  theme={{
                    primary: "#00D084",
                    secondary: "#08090A",
                    tertiary: "#111317",
                    textPrimary: "#ffffff",
                    textSecondary: "#8E9196",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}    </>
  );
};
export default CompareVersionsPage;