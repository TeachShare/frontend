"use client"
import React, { useState } from 'react';
import { 
  Files, 
  LayoutDashboard,
  Users, 
  Archive, 
  Wand2, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Share2, 
  Filter, 
  Eye,
  Menu,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Clock,
  Pencil,
  Trash2,
  CheckSquare
} from 'lucide-react';
import { SidebarItemProps } from '../dashboard/page'; // Verify this path is still correct in your project
import Layout from '@/components/layout/Layout';

interface ResourceCardProps {
    title: string;
    category: string;
    type: string;
    downloads: string;
    likes: string;
    updated: string;
    curriculum: string;
    coTeachers: string;
    visibility: string;
    status: string;
}

const SidebarItem = ({ icon: Icon, label, active = false }: SidebarItemProps) => (
  <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
    active 
      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium' 
      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
  }`}>
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

const ResourceCard = ({ title, category, type, downloads, likes, updated, curriculum, coTeachers, visibility, status }: ResourceCardProps) => {
  const isDraft = status === 'Draft';
  
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white line-clamp-1 transition-colors duration-300">{title}</h4>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider transition-colors duration-300 ${
            status === 'Featured' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
            status === 'Draft' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mb-4 transition-colors duration-300">{category} · {type}</p>
        
        <div className="grid grid-cols-2 gap-y-2 mb-4">
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">Downloads: <span className="text-zinc-900 dark:text-zinc-300 ml-1">{downloads}</span></div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">Likes: <span className="text-zinc-900 dark:text-zinc-300 ml-1">{likes}</span></div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">Updated: <span className="text-zinc-900 dark:text-zinc-300 ml-1">{updated}</span></div>
        </div>

        <div className="space-y-1 mb-5">
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">Curriculum:</span>
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">{curriculum}</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">Co-teachers:</span>
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">{coTeachers}</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 flex items-center transition-colors duration-300">
            <span className="font-medium text-zinc-700 dark:text-zinc-600">Visibility:</span>
            <span className="text-zinc-900 dark:text-zinc-400 ml-1">{visibility}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        {isDraft ? (
          <>
            <button className="flex-1 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 py-1.5 rounded-md text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-colors">Continue editing</button>
            <button className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Preview</button>
            <button className="px-2.5 py-1.5 bg-red-50 dark:bg-red-500/5 text-red-600 dark:text-red-500/70 rounded-md text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors duration-300"><Trash2 size={14}/></button>
          </>
        ) : (
          <>
            <button className="flex-1 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 py-1.5 rounded-md text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/20 transition-colors">View</button>
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Edit</button>
            <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md text-[11px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Share</button>
            <button className="px-3 py-1.5 bg-red-50 dark:bg-red-500/5 text-red-600 dark:text-red-500/70 rounded-md text-[11px] font-bold hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors duration-300"><Trash2 size={14}/></button>
          </>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const resourcesList = [
    { title: 'Introduction to Algebra', category: 'Mathematics', type: 'Grade 7 · Worksheet', downloads: '312', likes: '98', updated: '1 hr ago', curriculum: 'Common Core', coTeachers: '2', visibility: 'Public', status: 'Published' },
    { title: 'Creative Writing Workshop', category: 'English', type: 'Mixed Grades · Lesson Plan', downloads: '184', likes: '64', updated: '3 days ago', curriculum: 'Local', coTeachers: '1', visibility: 'Public', status: 'Published' },
    { title: 'Science Lab Safety Guide', category: 'Science', type: 'Grade 8 · Slide Deck', downloads: '421', likes: '152', updated: '1 week ago', curriculum: 'NGSS', coTeachers: '0', visibility: 'Public', status: 'Featured' },
    { title: 'History Timeline Project', category: 'History', type: 'Grade 6 · Project', downloads: '0', likes: '-', updated: '2 days ago', curriculum: 'Inquiry', coTeachers: '1', visibility: 'Private', status: 'Draft' },
    { title: 'Art Techniques Guide', category: 'Arts', type: 'Mixed Grades · Guide', downloads: '132', likes: '65', updated: '1 week ago', curriculum: 'Open', coTeachers: '0', visibility: 'Public', status: 'Published' },
    { title: 'Music Theory Basics', category: 'Music', type: 'High School · Lesson', downloads: '103', likes: '51', updated: '1 month ago', curriculum: 'Performance', coTeachers: '0', visibility: 'Public', status: 'Published' },
    { title: 'Formative Quiz Bank', category: 'Mathematics', type: 'Grades 6-8 · Quiz Pack', downloads: '76', likes: '29', updated: '5 days ago', curriculum: 'Common Core', coTeachers: '3', visibility: 'Shared', status: 'Published' },
    { title: 'Parent Communication Template', category: 'General', type: 'All Grades · Document', downloads: '205', likes: '87', updated: '2 weeks ago', curriculum: '—', coTeachers: '0', visibility: 'Public', status: 'Published' },
    { title: 'Project Rubric Template', category: 'Cross-curricular', type: 'Rubric', downloads: '—', likes: '-', updated: '4 hours ago', curriculum: 'Rubric', coTeachers: '0', visibility: 'Private', status: 'Draft' },
  ];

  return (
    <Layout>
      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">My Resources</h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">Upload, organize, and refine the materials you share with other educators.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                <Eye size={14} className="text-zinc-500" />
                <span>Saved views</span>
              </button>
              <button className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors duration-300">
                <Plus size={14} />
                <span>Upload New</span>
              </button>
            </div>
          </div>

          {/* Filtering Toolbar */}
          <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 lg:p-5 space-y-5 transition-colors duration-300">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={14} />
                  <input 
                    type="text" 
                    placeholder='Search in "My Resources"' 
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-md py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors duration-300">
                  <Wand2 size={14} />
                  <span>Recommended first</span>
                </button>
                <div className="flex items-center gap-2">
                  <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                    <span>Subject</span>
                    <ChevronDown size={14} />
                  </button>
                  <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                    <span>Grade</span>
                    <ChevronDown size={14} />
                  </button>
                  <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                    <span>Type</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 transition-colors duration-300">
                  <button className="p-1.5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded shadow-sm dark:shadow-none transition-colors duration-300"><Grid size={14} /></button>
                  <button className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300"><List size={14} /></button>
                </div>
                <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-900 dark:text-zinc-400 transition-colors duration-300">
                  <span className="text-zinc-500 font-medium">Sort by:</span>
                  <span>Most recent</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Secondary Toolbar / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 text-[11px] font-bold">
                  <button className="text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-3 transition-colors duration-300">All (24)</button>
                  <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 pb-3 transition-colors duration-300">Published (18)</button>
                  <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 pb-3 transition-colors duration-300">Drafts (4)</button>
                  <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 pb-3 transition-colors duration-300">Archived (2)</button>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-600 font-medium hidden md:block transition-colors duration-300">
                  Showing <span className="text-zinc-900 dark:text-zinc-400 font-bold">1-9 of 24 resources</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 font-bold mr-2 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">
                  <CheckSquare size={14} />
                  <span>Select all</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 rounded-md text-[10px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Move to folder</button>
                  <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 rounded-md text-[10px] font-bold hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">Bulk share</button>
                  <button className="px-3 py-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-900 rounded-md text-[10px] font-bold transition-colors duration-300">Bulk delete</button>
                </div>
                <div className="flex items-center ml-2 space-x-4 border-l border-zinc-200 dark:border-zinc-800 pl-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-tight transition-colors duration-300">
                  <span className="flex items-center"><span className="text-zinc-700 dark:text-zinc-400 mr-1.5">Avg. rating</span> 4.7</span>
                  <span className="flex items-center"><span className="text-zinc-700 dark:text-zinc-400 mr-1.5">Total downloads</span> 1.3k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {resourcesList.map((res, i) => (
              <ResourceCard key={i} {...res} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
            <p className="text-[11px] text-zinc-500 font-medium tracking-tight">Page 1 of 3</p>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><ChevronRight size={16} className="rotate-180"/></button>
              <button className="w-8 h-8 flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 text-white rounded-md text-[11px] font-bold shadow-sm transition-colors duration-300">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">3</button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"><ChevronRight size={16}/></button>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic max-w-xs text-center sm:text-right transition-colors duration-300">
              Curate and manage your library to help colleagues find the best materials.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;