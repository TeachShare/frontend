"use client";
import React, { useState } from "react";
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
  Menu,
  ChevronDown,
  History,
  Download,
  GitBranch,
  Trash2,
  Eye,
  RefreshCw,
  Star,
  FileText,
  Layers,
} from "lucide-react";
import { SidebarItemProps } from "../dashboard/page";
import Layout from "@/components/layout/Layout";

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
}: SidebarItemProps) => (
  <div
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${active ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"}`}
  >
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

interface RepositoryItemProps {
  title: string;
  subject: string;
  info?: string;
  tags: string[];
  files: {
    name: string;
    size: string;
    updated: string;
  }[];

  rating: number;
  reviews: number;
  lastReviewed: string;
  likes: number;
  shares: number;
  downloads: number;
  typeTag: string;
}

const RepositoryItem = ({
  title,
  subject,
  info,
  tags,
  files,
  rating,
  reviews,
  lastReviewed,
  likes,
  shares,
  downloads,
  typeTag,
}: RepositoryItemProps) => {
  return (
    <div className="bg-[#121417] border border-zinc-800/60 rounded-xl overflow-hidden mb-6 group">
      <div className="p-5 flex flex-col xl:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {typeTag && (
              <span className="text-[9px] font-bold px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded uppercase tracking-widest border border-zinc-700/50">
                {typeTag}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 font-medium mb-3">
            {subject}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-black/20 border border-zinc-800/40 rounded-lg p-3 mb-5">
            <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-wider flex items-center">
              Files ({files.length}){" "}
              <span className="ml-auto text-[9px] font-normal lowercase text-zinc-500">
                PPTX, DOC, PDF, images
              </span>
            </p>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center space-x-2">
                    <div className="text-zinc-500">
                      <FileText size={14} />
                    </div>
                    <span className="text-zinc-300 font-medium">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-zinc-600 text-[10px]">
                    {file.size} · Updated {file.updated}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="flex-1 min-w-[100px] py-2 bg-blue-600/10 text-blue-400 text-[11px] font-bold rounded hover:bg-blue-600/20 transition-all border border-blue-500/10 flex items-center justify-center space-x-2">
              <Eye size={14} /> <span>View</span>
            </button>
            <button className="flex-1 min-w-[100px] py-2 bg-zinc-900 text-zinc-300 text-[11px] font-bold rounded hover:bg-zinc-800 transition-all border border-zinc-800 flex items-center justify-center space-x-2">
              <Download size={14} /> <span>Download</span>
            </button>
            <button className="flex-1 min-w-[100px] py-2 bg-rose-600/10 text-rose-400 text-[11px] font-bold rounded hover:bg-rose-600/20 transition-all border border-rose-500/10 flex items-center justify-center space-x-2">
              <RefreshCw size={14} /> <span>Remix</span>
            </button>
            <button className="flex-1 min-w-[100px] py-2 bg-blue-500/10 text-blue-300 text-[11px] font-bold rounded hover:bg-blue-500/20 transition-all border border-blue-400/10 flex items-center justify-center space-x-2">
              <GitBranch size={14} /> <span>Version Control</span>
            </button>
            <button className="flex-1 min-w-[100px] py-2 bg-rose-500/10 text-rose-500/70 text-[11px] font-bold rounded hover:bg-rose-500/20 transition-all border border-rose-500/10 flex items-center justify-center space-x-2">
              <Trash2 size={14} /> <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="xl:w-64 space-y-3 shrink-0">
          <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white">{rating}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
              <span>{reviews} reviews</span>
              <span>Last reviewed {lastReviewed}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-lg p-2 text-center">
              <p className="text-[10px] font-bold text-zinc-600 uppercase">
                Likes
              </p>
              <p className="text-xs font-bold text-zinc-300">{likes}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-lg p-2 text-center">
              <p className="text-[10px] font-bold text-zinc-600 uppercase">
                Share
              </p>
              <p className="text-xs font-bold text-zinc-300">{shares}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-lg p-2 text-center">
              <p className="text-[10px] font-bold text-zinc-600 uppercase">
                Downloads
              </p>
              <p className="text-xs font-bold text-zinc-300">{downloads}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout>
      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#090a0c]">
        {/* Repository Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Resource Repository
              </h1>
              <p className="text-zinc-500 text-[13px] mt-1">
                Organize, share, and discover teaching materials with community
                feedback.
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition-all">
              <Plus size={14} />
              <span>Create Resource</span>
            </button>
          </div>

          {/* Banner */}
          <div className="bg-emerald-500 h-8 rounded flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="text-[11px] font-black text-emerald-950 uppercase tracking-widest">
              Resource Repository
            </span>
          </div>

          {/* Version Control Info Box */}
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-5 flex items-start space-x-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <History size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-blue-300">
                Version control for every resource
              </h4>
              <ul className="mt-2 space-y-1.5">
                {[
                  "Every edit automatically creates a new version.",
                  "Past versions are stored safely and accessible via the version dropdown.",
                  "Teachers can view and compare past and latest versions, and restore an older version if preferred.",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="text-[11px] text-zinc-400 flex items-start"
                  >
                    <span className="mr-2 text-zinc-600">•</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-[#121417] border border-zinc-800/60 rounded-xl p-5 space-y-4">
            <p className="text-[13px] font-bold text-white">Search & filters</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Search resources by title or topic..."
                  className="w-full bg-zinc-950 border border-zinc-800/60 rounded py-2 pl-9 pr-4 text-xs text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded py-2 px-3 text-xs text-zinc-400 font-bold focus:outline-none">
                  <option>All Subjects</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded py-2 px-3 text-xs text-zinc-400 font-bold focus:outline-none">
                  <option>All Grades</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-zinc-900 border border-zinc-800 rounded py-2 px-3 text-xs text-zinc-400 font-bold focus:outline-none">
                  <option>Most Recent</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />
              </div>
            </div>
          </div>

          {/* Repository Items */}
          <div>
            <RepositoryItem
              title="Algebra Fundamentals"
              subject="Mathematics · Grade 9-10 · Lesson Plan"
              typeTag="Original Creator"
              tags={[
                "algebra",
                "equations",
                "classroom activities",
                "assessment",
              ]}
              files={[
                {
                  name: "alg-fundamentals-slides.pptx",
                  size: "1.8 MB",
                  updated: "2 days ago",
                },
                {
                  name: "algebra-worksheet.docx",
                  size: "320 KB",
                  updated: "2 days ago",
                },
              ]}
              rating={4.5}
              reviews={28}
              lastReviewed="3 hours ago"
              likes={23}
              shares={8}
              downloads={45}
            />

            <RepositoryItem
              title="Software Engineering Project"
              subject="Computer Science · University · Assessment"
              typeTag="Remix"
              tags={["software design", "rubric", "project-based"]}
              files={[
                {
                  name: "software-engineering-brief.pdf",
                  size: "2.5 MB",
                  updated: "5 hours ago",
                },
              ]}
              rating={5.0}
              reviews={5}
              lastReviewed="yesterday"
              likes={12}
              shares={4}
              downloads={31}
            />
          </div>

          {/* Footer Load More */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-800/50">
            <p className="text-[11px] text-zinc-600 font-medium">
              Showing 1-12 of 86 resources
            </p>
            <button className="flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 px-6 py-2 rounded-lg text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition-all">
              <RefreshCw size={14} />
              <span>Load more</span>
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;
