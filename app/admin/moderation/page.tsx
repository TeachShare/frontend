"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Flag, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  User as UserIcon,
  MessageSquare,
  BookOpen,
  ArrowRight,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

const AdminModerationPage = () => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    if (!isUserLoading && !user?.is_admin) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const fetchReports = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/moderation/admin/reports?status=${filter}`);
      if (res.data.success) {
        setReports(res.data.reports);
      }
    } catch (err) {
      console.error("Failed to fetch reports", err);
      toast.error("Failed to load moderation data.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (user?.is_admin) {
      fetchReports();
    }
  }, [user, fetchReports]);

  const handleAction = async (reportId: number, action: 'hide' | 'dismiss') => {
    try {
      const res = await api.post(`/moderation/admin/reports/${reportId}/action`, { action });
      if (res.data.success) {
        toast.success(`Action ${action} successful.`);
        fetchReports(); // Refresh list
      }
    } catch (err) {
      console.error("Action failed", err);
      toast.error("Failed to perform moderation action.");
    }
  };

  if (isUserLoading || !user?.is_admin) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-emerald-500" size={32} />
        </div>
      </Layout>
    );
  }

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'resource': return <BookOpen size={14} />;
      case 'comment': return <MessageSquare size={14} />;
      case 'post': return <ArrowRight size={14} />;
      case 'teacher': return <UserIcon size={14} />;
      default: return <Flag size={14} />;
    }
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090b0d] min-h-screen p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <Shield size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Admin Control Center</span>
              </div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Content Moderation</h1>
              <p className="text-zinc-500 text-sm mt-1">Review and manage community-flagged content.</p>
            </div>

            <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1">
              {['pending', 'resolved', 'dismissed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    filter === s 
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Grid/List */}
          <div className="space-y-4">
            {loading ? (
               <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-zinc-400" />
               </div>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <div key={report.report_id} className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                   <div className="p-6 flex flex-col md:flex-row gap-6">
                      {/* Reporter Info */}
                      <div className="w-full md:w-48 shrink-0">
                         <div className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                               <UserIcon size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase text-zinc-400">Reporter</span>
                         </div>
                         <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{report.reporter_name}</p>
                         <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1.5">
                            <Clock size={10} /> {new Date(report.created_at).toLocaleDateString()}
                         </p>
                      </div>

                      {/* Flagged Content Info */}
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-3">
                            <div className={`p-1.5 rounded-lg ${report.status === 'pending' ? 'bg-rose-500/10 text-rose-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                               {getTargetIcon(report.target_type)}
                            </div>
                            <span className="text-[10px] font-black uppercase text-zinc-400">Flagged {report.target_type} (ID: {report.target_id})</span>
                         </div>
                         <h3 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-tight mb-2">
                           Reason: {report.reason.replace('_', ' ')}
                         </h3>
                         <div className="bg-zinc-50 dark:bg-black/20 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/40">
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                               &quot;{report.description || "No additional context provided."}&quot;
                            </p>
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="w-full md:w-56 shrink-0 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800/60 pt-4 md:pt-0 md:pl-6">
                         {report.status === 'pending' ? (
                           <>
                            <button 
                              onClick={() => handleAction(report.report_id, 'hide')}
                              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/10"
                            >
                              <XCircle size={14} /> Hide Content
                            </button>
                            <button 
                              onClick={() => handleAction(report.report_id, 'dismiss')}
                              className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                            >
                              <CheckCircle size={14} /> Dismiss Report
                            </button>
                           </>
                         ) : (
                           <div className="flex flex-col items-center justify-center py-4">
                              <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border ${
                                report.status === 'resolved' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                                : 'bg-zinc-500/10 border-zinc-500/20 text-zinc-500'
                              }`}>
                                {report.status}
                              </span>
                           </div>
                         )}
                         <button 
                          onClick={() => {
                            if (report.target_type === 'resource') router.push(`/resources/${report.target_id}`);
                            if (report.target_type === 'teacher') router.push(`/profile/${report.target_id}`);
                          }}
                          className="w-full py-2 text-[9px] font-bold text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-widest flex items-center justify-center gap-1.5"
                         >
                            <Eye size={12} /> Inspect Target
                         </button>
                      </div>
                   </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-3xl py-32 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle size={32} />
                 </div>
                 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Clean Slate!</h2>
                 <p className="text-zinc-500 text-sm mt-2">There are no {filter} reports to review.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AdminModerationPage;
