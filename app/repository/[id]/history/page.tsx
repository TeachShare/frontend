"use client"
import React from 'react';
import { 
  ArrowLeft, History, Eye, Download, RefreshCw, 
  Trash2, ChevronDown, Clock, User, FileText, Check 
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';

const VersionHistoryPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const versions = [
    {
      id: "v1",
      title: "Initial upload",
      status: "Archived",
      description: "Original lesson plan and worksheet for introducing linear equations.",
      author: "Xavier Lee",
      date: "3 months ago",
      files: 2,
      size: "1.9 MB total",
      summary: "First draft with basic examples, no assessment rubric included yet."
    },
    {
      id: "v2",
      title: "Added formative quiz",
      status: "Archived",
      description: "Included a short 10-item quiz and updated worksheet with extra practice.",
      author: "Xavier Lee",
      date: "2 months ago",
      files: 3,
      size: "2.1 MB total",
      summary: "Added quiz document and minor wording changes in side 3 and 4."
    },
    {
      id: "v3",
      title: "Visual examples",
      status: "Archived",
      description: "Updated presentation with visual graphs and real-world examples for engagement.",
      author: "Maria Chen",
      date: "1 month ago",
      files: 3,
      size: "2.5 MB total",
      summary: "New image assets and teacher notes added in the slide notes section."
    },
    {
      id: "v4",
      title: "Assessment rubric",
      status: "Archived",
      description: "Added a detailed rubric for evaluating student work and aligned objectives.",
      author: "Xavier Lee",
      date: "3 weeks ago",
      files: 4,
      size: "2.9 MB total",
      summary: "Rubric document added and learning objectives refined for clarity."
    },
    {
      id: "v5",
      title: "Current version",
      status: "Active",
      description: "Latest refinements based on peer reviews and classroom feedback.",
      author: "Xavier Lee",
      date: "2 days ago",
      files: 4,
      size: "3.0 MB total",
      summary: "Adjusted pacing guide, clarified problem 7 wording, and updated answer key."
    }
  ].reverse(); // Show newest first

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-2 transition-colors duration-300">
                <span>Resource Repository</span>
                <span>/</span>
                <span className="text-zinc-900 dark:text-zinc-300">Version History</span>
              </div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Version History</h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1 transition-colors duration-300">Review every edit from the first version to the most recent, and safely restore older versions.</p>
            </div>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg text-xs font-bold hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={14} />
              Back to resource
            </button>
          </div>

          {/* Progress Tracker Banner */}
          <div className="bg-blue-600 h-8 rounded flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Version History Tracking Active</span>
          </div>

          {/* Resource Info Card */}
          <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Algebra Fundamentals</h2>
                  <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 uppercase tracking-widest transition-colors duration-300">Current version: v5 - Active</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-500 text-xs transition-colors duration-300">Mathematics · Grade 9-10 · Lesson Plan · 2 files · 4.5 rating</p>
              </div>
              <div className="flex gap-2">
                {['algebra', 'equations', 'assessment', 'classroom activities'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-500 font-bold lowercase transition-colors duration-300">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-right space-y-2">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Jump to version</p>
              <div className="relative inline-block text-left">
                <button className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-8 transition-colors duration-300">
                  v5 · Updated 2 days ago <ChevronDown size={14} className="text-zinc-500 dark:text-zinc-600"/>
                </button>
              </div>
              <p className="text-[9px] text-zinc-500 dark:text-zinc-600 italic transition-colors duration-300">Every edit creates a new version automatically.</p>
            </div>
          </div>

          {/* Version List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/50 pb-4 transition-colors duration-300">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors duration-300">All versions from first to most recent</h3>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
                <span>Order:</span>
                <button className="text-zinc-900 dark:text-zinc-300 font-bold flex items-center gap-1 transition-colors duration-300">Oldest to newest <ChevronDown size={12}/></button>
              </div>
            </div>

            {versions.map((v, i) => (
              <div key={v.id} className="relative group">
                {/* Timeline connector line */}
                {i !== versions.length - 1 && (
                  <div className="absolute left-[7px] top-10 w-[2px] h-full bg-zinc-200 dark:bg-zinc-800/50 group-hover:bg-blue-400 dark:group-hover:bg-blue-500/20 transition-colors duration-300" />
                )}
                
                <div className="grid grid-cols-12 gap-6 bg-white dark:bg-[#121417]/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 hover:bg-zinc-50 dark:hover:bg-[#121417] transition-all duration-300 shadow-sm dark:shadow-none">
                  <div className="col-span-12 lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">{v.id} · {v.title}</h4>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest transition-colors duration-300 ${
                        v.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700/50'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">{v.description}</p>
                    <div className="flex items-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
                      <span className="flex items-center gap-1.5"><User size={12}/> Created by {v.author}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12}/> {v.date}</span>
                      <span className="flex items-center gap-1.5"><FileText size={12}/> {v.files} files · {v.size}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-[10px] text-zinc-600 dark:text-zinc-500 transition-colors duration-300"><span className="font-bold text-zinc-800 dark:text-zinc-600 uppercase mr-2 transition-colors duration-300">Summary:</span>{v.summary}</p>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 py-2 rounded font-bold text-[11px] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">View</button>
                      <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/80 text-white py-2 rounded font-bold text-[11px] dark:hover:bg-blue-500 transition-all duration-300">Compare with current</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {v.status !== 'Active' ? (
                        <button className="bg-emerald-100 dark:bg-emerald-500/80 text-emerald-800 dark:text-emerald-950 py-2 rounded font-bold text-[11px] hover:bg-emerald-200 dark:hover:bg-emerald-400 transition-all duration-300">Restore</button>
                      ) : (
                        <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 py-2 rounded font-bold text-[11px] cursor-not-allowed transition-colors duration-300" disabled>Download</button>
                      )}
                      <button className={`py-2 rounded font-bold text-[11px] transition-all duration-300 ${
                        v.status === 'Active' 
                          ? 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-500/80 text-white dark:hover:bg-rose-400' 
                          : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
                      }`}>
                        {v.status === 'Active' ? 'Delete' : 'Download'}
                      </button>
                    </div>
                    <button className="text-[10px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest mt-2 hover:text-zinc-700 dark:hover:text-zinc-400 transition-all duration-300">View change summary</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest pt-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
            <span>Showing versions 1-5 · All changes are stored safely</span>
            <div className="flex items-center gap-4">
              <span>Need to roll back completely?</span>
              <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300">Restore</button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default VersionHistoryPage;