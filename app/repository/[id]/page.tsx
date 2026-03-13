"use client"
import React from 'react';
import { 
  ArrowLeft, Share2, History, Edit3, Star, ThumbsUp, 
  RefreshCw, Download, Eye, Trash2, FileText, CheckCircle2,
  MoreVertical, MessageSquare, ChevronDown
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';

const ResourceDetailView = () => {
  const router = useRouter();
  const { id } = useParams();

  // Mock data - In a real app, you'd fetch this using the 'id'
  const resource = {
    title: "Algebra Fundamentals—Linear Equations Pack",
    description: "A complete mini-unit to introduce, practice, and assess one-variable linear equations for Grade 8 learners.",
    subject: "Mathematics",
    grade: "Grade 8",
    unit: "Linear Equations",
    type: "Lesson Pack",
    author: "Alex Martinez",
    lastUpdated: "May 4, 2025",
    rating: 4.2,
    reviews: 18,
    likes: 132,
    remixes: 9,
    downloads: 412,
    files: [
      { name: "Intro to Linear Equations— Slides", type: "PPTX", size: "4.3 MB", status: "Ready" },
      { name: "Practice Worksheet—Solving Equations", type: "PDF", size: "620 KB", status: "Ready" },
      { name: "Exit Ticket—Linear Equations", type: "DOC", size: "220 KB", status: "Ready" },
      { name: "Answer Key & Rubric", type: "PDF", size: "540 KB", status: "Ready" },
    ]
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          
          {/* Breadcrumbs & Actions */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-widest transition-colors duration-300">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()} className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Resource Repository</button>
              <span>/</span>
              <span className="text-zinc-900 dark:text-zinc-300 transition-colors duration-300">View Resource</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><Share2 size={14}/> Share</button>
              <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><History size={14}/> Version History</button>
              <button className="bg-emerald-100 dark:bg-emerald-500 text-emerald-800 dark:text-emerald-950 px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-emerald-200 dark:hover:bg-emerald-400 transition-colors duration-300">
                <Edit3 size={14}/> Edit Resource
              </button>
            </div>
          </div>

          {/* Title Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">{resource.title}</h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-3xl leading-relaxed transition-colors duration-300">{resource.description}</p>
                <div className="flex gap-2">
                   {['Subject: Mathematics', 'Grade 8', 'Unit: Linear Equations', 'Type: Lesson Pack'].map((tag) => (
                     <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider transition-colors duration-300">{tag}</span>
                   ))}
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-1 rounded text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-tighter inline-flex items-center gap-2 transition-colors duration-300">
                  <RefreshCw size={12}/> Remix of Algebra Fundamentals by Maria Santos
                </div>
                <div className="flex items-center justify-end gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor"/> <span className="text-zinc-900 dark:text-white font-bold transition-colors duration-300">{resource.rating}</span>
                  <span className="text-zinc-500 dark:text-zinc-500 text-xs ml-1 transition-colors duration-300">· {resource.reviews} reviews</span>
                </div>
                <div className="flex gap-4 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors duration-300">
                   <span>Likes {resource.likes}</span>
                   <span>Remixes {resource.remixes}</span>
                   <span>Downloads {resource.downloads}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column: Metadata & Description */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">Resource metadata & description</h2>
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs transition-colors duration-300">
                    <History size={14}/> <span>Version B · Active</span> <ChevronDown size={14}/>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-8 text-[11px]">
                  <div><p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">Subject</p><p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">{resource.subject}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">Grade level</p><p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">{resource.grade}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">Resource type</p><p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">{resource.type}</p></div>
                  <div><p className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mb-1 transition-colors duration-300">Duration</p><p className="text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">3-4 class sessions</p></div>
                </div>

                {/* Content Editor Toolbar Mockup */}
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6 transition-colors duration-300">
                   {['Heading', 'Bullets', 'Checklist', 'Quote'].map(btn => (
                     <button key={btn} className="px-3 py-1 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">{btn}</button>
                   ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-sm mb-2 uppercase tracking-wide transition-colors duration-300">Overview</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-[13px] leading-relaxed transition-colors duration-300">This pack introduces one-variable linear equations using real-world scenarios and multiple representations (tables, graphs, and equations). Students move from concrete balance models to abstract symbolic manipulation.</p>
                  </div>
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-sm mb-2 uppercase tracking-wide transition-colors duration-300">Learning objectives</h3>
                    <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-[13px] space-y-1 transition-colors duration-300">
                      <li>Identify and write linear equations from verbal descriptions.</li>
                      <li>Solve one-step and multi-step equations using inverse operations.</li>
                      <li>Check solutions and interpret them in context.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Files & Reviews */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">Files in this resource</h2>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded transition-colors duration-300">Ready for students</span>
                </div>
                <div className="space-y-3">
                  {resource.files.map((file, i) => (
                    <div key={i} className="group p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-zinc-500 dark:text-zinc-500 font-black text-[10px] transition-colors duration-300">{file.type}</div>
                          <span className="text-xs text-zinc-900 dark:text-zinc-300 font-medium transition-colors duration-300">{file.name}</span>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300"><Eye size={14}/></button>
                           <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300"><Download size={14}/></button>
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-wider transition-colors duration-300">Presentation·21 slides·{file.size}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 text-[10px] text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors duration-300">
                  <span className="flex items-center gap-1"><ThumbsUp size={12}/> {resource.likes} likes</span>
                  <span className="flex items-center gap-1"><RefreshCw size={12}/> {resource.remixes} remixes</span>
                  <span className="flex items-center gap-1"><Download size={12}/> {resource.downloads} dls</span>
                </div>
              </div>

              {/* Reviews Area */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
                 <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest transition-colors duration-300">Reviews & feedback</h2>
                    <button className="text-[10px] text-zinc-600 dark:text-zinc-500 font-bold uppercase flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded transition-colors duration-300">Leave a review <Star size={12}/></button>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300"/>
                             <span className="text-xs text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">Priya Singh</span>
                          </div>
                          <div className="flex text-yellow-500"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10}/></div>
                       </div>
                       <p className="text-[11px] text-zinc-600 dark:text-zinc-500 italic transition-colors duration-300">"Clear progression from concrete to abstract. My students especially liked the real-world word problems."</p>
                    </div>
                 </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="grid grid-cols-2 gap-3">
                 <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">
                    <Download size={14}/> Download all
                 </button>
                 <button className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300">
                    <RefreshCw size={14}/> Remix
                 </button>
              </div>
              <button className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-600 dark:hover:text-rose-500 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2">
                <Trash2 size={12}/> Delete resource
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ResourceDetailView;