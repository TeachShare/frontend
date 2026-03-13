"use client";
import React, { useState } from "react";
import {
  Files,
  Search,
  Plus,
  ChevronDown,
  History,
  Download,
  GitBranch,
  Trash2,
  Eye,
  RefreshCw,
  Star,
  FileText,
  X,
  Zap
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/navigation";

// --- REMIX MODAL COMPONENT ---
const RemixModal = ({ isOpen, onClose, item, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 transition-colors">
      <div className="w-full max-w-xl bg-white dark:bg-[#090a0c] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 transition-colors duration-300">
              <RefreshCw size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Remix this collection?</h2>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1 transition-colors duration-300">
                Create your own copy to customize for your students.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Original collection</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">{item.title}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-4 space-y-3 transition-colors duration-300">
             <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors duration-300">Remix rules</p>
             <p className="text-[11px] text-zinc-600 dark:text-zinc-400 transition-colors duration-300">The original owner is always shown for attribution.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Cancel</button>
            <button onClick={onConfirm} className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20">
              <RefreshCw size={14} />
              Confirm remix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RepositoryItemProps {
  title: string;
  subject: string;
  tags: string[];
  files: any[];
  rating: number;
  reviews: number;
  lastReviewed: string;
  likes: number;
  shares: number;
  downloads: number;
  typeTag: string;
  onRemix: () => void;
  router: any; 
}

const RepositoryItem = ({ title, subject, tags, files, rating, reviews, likes, shares, downloads, typeTag, onRemix, router }: RepositoryItemProps) => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden mb-6 group transition-colors duration-300">
      <div className="p-5 flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">{title}</h3>
            {typeTag && (
              <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 rounded uppercase tracking-widest border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                {typeTag}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium mb-3 transition-colors duration-300">{subject}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="text-[10px] px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full transition-colors duration-300">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/*View Button*/}
            <button 
              onClick={() => router.push(`/repository/${title.toLowerCase().replace(/ /g, '-')}`)}
              className="flex-1 min-w-[100px] py-2 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold rounded hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-all border border-blue-200 dark:border-blue-500/10 flex items-center justify-center space-x-2"
            >
              <Eye size={14} /> <span>View</span>
            </button>            
            
            {/*Download Button*/}
            <button className="flex-1 min-w-[100px] py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-center space-x-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300"><Download size={14} /> <span>Download</span></button>
            
            {/*Remix Button*/}
            <button 
              onClick={onRemix}
              className="flex-1 min-w-[100px] py-2 bg-rose-50 dark:bg-rose-600/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold rounded border border-rose-200 dark:border-rose-500/10 flex items-center justify-center space-x-2 hover:bg-rose-100 dark:hover:bg-rose-600/20 transition-colors duration-300"
            >
              <RefreshCw size={14} /> <span>Remix</span>
            </button>
            
            {/*History Button*/}
            <button 
              onClick={() => router.push(`/repository/${title.toLowerCase().replace(/ /g, '-')}/history`)}
              className="flex-1 min-w-[100px] py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[11px] font-bold rounded border border-blue-200 dark:border-blue-400/10 flex items-center justify-center space-x-2 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all"
            >
              <GitBranch size={14} /> <span>History</span>
            </button>        
            
            {/*Delete Button*/}
            <button className="flex-1 min-w-[100px] py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500/70 text-[11px] font-bold rounded border border-rose-200 dark:border-zinc-800 flex items-center justify-center space-x-2 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors duration-300"><Trash2 size={14} /> <span>Delete</span></button>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="xl:w-64 space-y-3 shrink-0">
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/40 rounded-lg p-3 text-center text-xs transition-colors duration-300">
            <div className="flex justify-center gap-1 text-yellow-500 mb-1">
              <Star size={12} fill="currentColor"/> <span>{rating}</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-500 transition-colors duration-300">{reviews} reviews</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
             <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">Likes<br/><span className="text-zinc-900 dark:text-white transition-colors duration-300">{likes}</span></div>
             <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">Shares<br/><span className="text-zinc-900 dark:text-white transition-colors duration-300">{shares}</span></div>
             <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">DLs<br/><span className="text-zinc-900 dark:text-white transition-colors duration-300">{downloads}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const [remixItem, setRemixItem] = useState<any>(null);

  const handleConfirmRemix = () => {
    router.push(`/repository/create?remix=true&title=${encodeURIComponent(remixItem.title)}`);
    setRemixItem(null);
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 min-h-full bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <RemixModal 
          isOpen={!!remixItem} 
          item={remixItem} 
          onClose={() => setRemixItem(null)} 
          onConfirm={handleConfirmRemix}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Resource Repository</h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-xs transition-colors duration-300">Manage and discover materials.</p>
            </div>
            <button 
              onClick={() => router.push('/repository/create')}
              className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> Create Resource
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RepositoryItem
              title="Algebra Fundamentals"
              subject="Mathematics · Grade 9-10"
              typeTag="Original Creator"
              tags={["algebra", "equations"]}
              files={[{name: "alg-slides.pptx", size: "1.8 MB"}]}
              rating={4.5} reviews={28} lastReviewed="3h ago" likes={23} shares={8} downloads={45}
              onRemix={() => setRemixItem({ title: "Algebra Fundamentals", subject: "Mathematics" })}
              router={router} 
            />

            <RepositoryItem
              title="Software Engineering Project"
              subject="Computer Science · University"
              typeTag="Remix"
              tags={["software design"]}
              files={[{name: "brief.pdf", size: "2.5 MB"}]}
              rating={5.0} reviews={5} lastReviewed="yesterday" likes={12} shares={4} downloads={31}
              onRemix={() => setRemixItem({ title: "Software Engineering Project", subject: "Computer Science" })}
              router={router} 
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;