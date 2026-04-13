"use client";
import React, { useState } from "react";
import { 
  User, 
  Settings, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  Download, 
  Heart, 
  Mail, 
  Share2, 
  MoreVertical,
  Edit2,
  CheckCircle,
  Clock,
  LayoutDashboard,
  FolderOpen,
  Globe,
  PlusCircle,
  MessageSquare
} from 'lucide-react';
import Layout from "@/components/layout/Layout";

const EducatorProfile = () => {
    const [activeTab, setActiveTab] = useState('resources');

    
 const colors = {
    bgMain: '#0a0a0a',
    bgCard: '#121212',
    bgSidebar: '#0f0f0f',
    accentGreen: '#00d084',
    accentBlue: '#2563eb',
    textMuted: '#9ca3af',
    textMain: '#ffffff',
    border: '#1f2937'
  };

  const teacher = {
    name: "Dr. Sarah Jenkins",
    handle: "@sjenk_teaching",
    role: "Mathematics & Computer Science Educator",
    institution: "Oak Ridge High School",
    location: "Chicago, IL",
    bio: "Passionate about making abstract mathematical concepts tangible through interactive coding activities. 10+ years experience in K-12 STEM education.",
    stats: [
      { label: "Resources", count: "48", icon: <BookOpen size={18} /> },
      { label: "Downloads", count: "1.9k", icon: <Download size={18} /> },
      { label: "Followers", count: "842", icon: <Users size={18} /> },
      { label: "Likes", count: "3.2k", icon: <Heart size={18} /> }
    ],
    badges: [
      { name: "Top Contributor", color: "text-amber-400" },
      { name: "Certified Mentor", color: "text-emerald-400" },
      { name: "Curriculum Lead", color: "text-blue-400" }
    ]
  };

  const recentResources = [
    {
      id: 1,
      title: "Introduction to Python: Data Structures",
      subject: "Computer Science",
      grade: "Grade 9-12",
      type: "Interactive Activity",
      tags: ["python", "coding", "logic"],
      downloads: 450,
      likes: 128,
      updated: "3 days ago",
      status: "Published"
    },
    {
      id: 2,
      title: "Algebraic Equations - Scavenger Hunt",
      subject: "Mathematics",
      grade: "Grade 7-8",
      type: "Lesson Plan",
      tags: ["algebra", "gamification", "equations"],
      downloads: 320,
      likes: 89,
      updated: "1 week ago",
      status: "Published"
    }
  ];
  return (
    <Layout>
     <main className="flex-1 p-8">

        <div className="max-w-6xl mx-auto">
          {/* PROFILE HEADER CARD */}
          <div className="rounded-2xl overflow-hidden border mb-8" style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
            <div className="h-40 bg-gradient-to-r from-emerald-900/40 via-blue-900/40 to-purple-900/40 relative">
               <button className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-lg text-sm border border-white/10 hover:bg-black/60 transition-all flex items-center gap-2">
                 <Edit2 size={14} /> Edit Cover
               </button>
            </div>
            
            <div className="px-8 pb-8 -mt-12 relative flex flex-col md:flex-row items-end gap-6">
              <div className="relative">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  className="w-32 h-32 rounded-3xl border-4 object-cover shadow-2xl" 
                  style={{ backgroundColor: colors.bgCard, borderColor: colors.bgCard }}
                  alt="Profile"
                />
                <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-1 border-2 border-black">
                  <CheckCircle size={16} className="text-black" />
                </div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div>
                  <h1 className="text-3xl font-bold">{teacher.name}</h1>
                  <p className="text-emerald-400 font-medium">{teacher.handle}</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 border hover:bg-white/5 transition-all" style={{ borderColor: colors.border }}>
                    <Mail size={18} /> Message
                  </button>
                  <button className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all hover:opacity-90" style={{ backgroundColor: colors.accentBlue }}>
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <p className="text-gray-400 leading-relaxed text-lg italic">"{teacher.bio}"</p>
                
                <div className="flex flex-wrap gap-y-4 gap-x-8">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={18} className="text-emerald-500" />
                    <span>{teacher.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <GraduationCap size={18} className="text-emerald-500" />
                    <span>{teacher.institution}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {teacher.badges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
                      <Award size={14} className={badge.color} />
                      {badge.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {teacher.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex flex-col items-center justify-center hover:bg-white/[0.05] transition-all">
                    <div className="text-emerald-500 mb-1">{stat.icon}</div>
                    <span className="text-xl font-bold">{stat.count}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS & RESOURCES GRID */}
          <div className="mb-6 flex items-center justify-between border-b" style={{ borderColor: colors.border }}>
            <div className="flex gap-8">
              <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} label="Resources" count="48" />
              <TabButton active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} label="Collections" count="12" />
              <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} label="Activity" />
            </div>
            <div className="pb-3 flex items-center gap-2 text-sm text-gray-400">
              <span>Sort by:</span>
              <select className="bg-transparent border-none focus:ring-0 text-white font-medium cursor-pointer">
                <option>Most Recent</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} colors={colors} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};


const TabButton = ({ active, onClick, label, count }: any) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-1 text-sm font-semibold transition-all relative ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
  >
    <div className="flex items-center gap-2">
      {label}
      {count && <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>{count}</span>}
    </div>
    {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
  </button>
);


const ResourceCard = ({ resource, colors }: any) => (
  <div className="rounded-2xl border p-5 flex flex-col group hover:scale-[1.01] transition-all" style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          {resource.status}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400">
          {resource.type}
        </span>
      </div>
      <button className="text-gray-600 hover:text-white"><MoreVertical size={18} /></button>
    </div>

    <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors cursor-pointer">{resource.title}</h3>
    <p className="text-sm text-gray-500 mb-4">{resource.subject} • {resource.grade}</p>

    <div className="flex flex-wrap gap-2 mb-6">
      {resource.tags.map(tag => (
        <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5">#{tag}</span>
      ))}
    </div>

    <div className="mt-auto border-t pt-4 flex items-center justify-between text-xs text-gray-500" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1"><Download size={14} /> {resource.downloads}</span>
        <span className="flex items-center gap-1"><Heart size={14} /> {resource.likes}</span>
      </div>
      <div className="flex items-center gap-1"><Clock size={14} /> Updated {resource.updated}</div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3">
       <button className="py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
         View Resource
       </button>
       <button className="py-2.5 rounded-xl font-bold text-sm border hover:bg-white/5 transition-all" style={{ borderColor: colors.border }}>
         Clone
       </button>
    </div>
  </div>
);
export default EducatorProfile;
