"use client";
import React, { useState, useEffect } from "react";
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
  ChevronRight,
  UserPlus,
  Check,
  Star,
  Users2,
  Globe,
} from "lucide-react";
import { SidebarItemProps } from "../dashboard/page";

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

interface EducatorCardProps {
  name: string;
  role: string;
  avatar: string;
  resources: string;
  followers: string;
  coTeaching: string;
  alignment: number;
  tags: string[];
  specialTags: string[];
  following: boolean;
}

const EducatorCard = ({
  name,
  role,
  avatar,
  resources,
  followers,
  coTeaching,
  alignment,
  tags,
  specialTags,
  following = false,
}: EducatorCardProps) => {
  return (
    <div className="bg-[#121417] border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900"
            />
            <div>
              <h4 className="text-[15px] font-bold text-white group-hover:text-emerald-400 transition-colors">
                {name}
              </h4>
              <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                {role}
              </p>
            </div>
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              following
                ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                : "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/20"
            }`}
          >
            {following ? (
              <>
                <Check size={14} /> <span>Following</span>
              </>
            ) : (
              <>
                <Plus size={14} /> <span>Follow</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {specialTags?.map((tag, i) => (
            <span
              key={i}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                tag === "Top contributor"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center bg-zinc-900/40 rounded-lg py-2">
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">
              Resources
            </p>
            <p className="text-xs font-bold text-zinc-300">{resources}</p>
          </div>
          <div className="text-center bg-zinc-900/40 rounded-lg py-2">
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">
              Followers
            </p>
            <p className="text-xs font-bold text-zinc-300">{followers}</p>
          </div>
          <div className="text-center bg-zinc-900/40 rounded-lg py-2">
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">
              Co-teaching
            </p>
            <p className="text-xs font-bold text-zinc-300">{coTeaching}</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold text-zinc-600 uppercase">
              Follow alignment
            </span>
            <span className="text-[11px] font-bold text-zinc-400">
              {alignment}% match
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
              style={{ width: `${alignment}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
        <button className="text-[11px] font-bold text-blue-400 hover:underline">
          View profile
        </button>
        <button className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors">
          Invite to collaborate
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const educators = [
    {
      name: "ABC",
      role: "Middle School Math · Curriculum Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ABC",
      resources: "56",
      followers: "1.2k",
      coTeaching: "14 projects",
      alignment: 86,
      specialTags: ["Top contributor", "STEM"],
      tags: ["Algebra", "Formative assessment", "Differentiation"],
      following: false,
    },
    {
      name: "DEF",
      role: "High School Science · Lab Coordinator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DEF",
      resources: "42",
      followers: "892",
      coTeaching: "7 projects",
      alignment: 74,
      specialTags: ["NGSS pioneer"],
      tags: ["Inquiry labs", "Safety", "Grade 9-10"],
      following: true,
    },
    {
      name: "GHI",
      role: "Elementary Literacy · Instructional Coach",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GHI",
      resources: "68",
      followers: "2.1k",
      coTeaching: "21 projects",
      alignment: 91,
      specialTags: ["Mentor"],
      tags: ["Reading - K-3", "Phonics", "Family engagement", "Bilingual"],
      following: false,
    },
    {
      name: "JKL",
      role: "Art & Design · Project-Based Learning",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JKL",
      resources: "31",
      followers: "503",
      coTeaching: "8 projects",
      alignment: 63,
      specialTags: ["Project-based"],
      tags: ["Portfolios", "Critique circles", "Community murals"],
      following: true,
    },
    {
      name: "MNO",
      role: "World Languages · Department Chair",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MNO",
      resources: "47",
      followers: "1.6k",
      coTeaching: "12 projects",
      alignment: 79,
      specialTags: ["Language lab"],
      tags: ["Speaking tasks", "Stations", "AP prep"],
      following: false,
    },
    {
      name: "PQR",
      role: "Special Education · Inclusion Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PQR",
      resources: "39",
      followers: "643",
      coTeaching: "18 projects",
      alignment: 88,
      specialTags: ["Inclusive practices"],
      tags: ["IEP", "Co-teaching models", "Behavior supports"],
      following: false,
    },
  ];

  return (
    <div className="flex h-screen bg-[#090a0c] text-zinc-200 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 border-r border-zinc-800 bg-[#090a0c] flex flex-col transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-[64px] flex items-center px-6 shrink-0 border-b border-zinc-800/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-black font-black text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              TeachShare
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
            Navigation
          </p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={Files} label="My Resources" />
          <SidebarItem icon={Users} label="Community" active />
          <SidebarItem icon={Archive} label="Repository" />
          <SidebarItem icon={Wand2} label="AI Generator" />
          <SidebarItem icon={MessageSquare} label="Messages" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 space-y-2 border-t border-zinc-800/60">
          <button className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-2.5 rounded-lg font-bold text-[13px] transition-all">
            <Plus size={16} />
            <span>Upload Resource</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white py-2 rounded-lg font-bold text-[13px] transition-all">
            <Share2 size={14} />
            <span>Share Idea</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#090a0c]">
        {/* Header */}
        <header className="h-[64px] border-b border-zinc-800/80 flex items-center justify-between px-4 lg:px-8 shrink-0 bg-[#090a0c]">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 mr-2 text-zinc-400"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-xl">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                size={15}
              />
              <input
                type="text"
                placeholder="Search resources, educators, or topics..."
                className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-full py-1.5 pl-10 pr-4 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-4">
            <div className="flex items-center space-x-1">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Bell size={18} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
              <div className="w-10 h-5 bg-zinc-800 rounded-full relative ml-2 cursor-pointer border border-zinc-700 hidden sm:block">
                <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center space-x-3 border-l border-zinc-800 pl-4 h-8">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-white leading-none">
                  Xasler
                </p>
                <p className="text-[10px] text-zinc-500 font-medium mt-1">
                  Software Instructor
                </p>
              </div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Xasler"
                className="w-8 h-8 rounded-full border border-zinc-700"
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        {/* Community Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Community</h1>
              <p className="text-zinc-500 text-[13px] mt-1">
                Discover educators to follow, collaborate with, and learn from
                across TeachShare.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition-colors">
                <Users2 size={14} className="text-zinc-500" />
                <span>My network</span>
              </button>
              <button className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500/20">
                <UserPlus size={14} />
                <span>Find collaborators</span>
              </button>
            </div>
          </div>

          {/* Filtering Toolbar */}
          <div className="bg-[#121417] border border-zinc-800/60 rounded-xl p-4 lg:p-5 space-y-5">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search educators or subjects"
                    className="w-full bg-zinc-950 border border-zinc-800/60 rounded-md py-1.5 pl-9 pr-4 text-xs text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-md text-xs font-bold">
                  <Star size={14} />
                  <span>Recommended for you</span>
                </button>
                <div className="flex items-center gap-2">
                  {["Subject", "Grade band", "Region"].map((label) => (
                    <button
                      key={label}
                      className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-400 hover:text-zinc-200"
                    >
                      <span>{label}</span>
                      <ChevronDown size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 border-l border-zinc-800 pl-0 xl:pl-4">
                <div className="flex items-center space-x-4 text-[11px] font-bold text-zinc-500">
                  <button className="text-white">Educators</button>
                  <button className="hover:text-zinc-300">Schools</button>
                  <button className="hover:text-zinc-300">Topics</button>
                </div>
                <button className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-400">
                  <span className="text-zinc-500">Sort by:</span>
                  <span>Most active</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-zinc-800/30">
              <div className="flex items-center space-x-4">
                <p className="text-[11px] text-zinc-600 font-medium">
                  Showing{" "}
                  <span className="text-zinc-400 font-bold">
                    1-6 of 128 educators
                  </span>
                </p>
                <span className="text-zinc-800">|</span>
                <p className="text-[11px] text-zinc-500 font-medium italic">
                  Based on your subjects and grade levels
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-zinc-900/30 px-3 py-1 rounded-full border border-zinc-800/50">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">
                    Avg. follow score
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    72%
                  </span>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600/5 text-blue-500/80 px-3 py-1 rounded-full border border-blue-500/10 text-[11px] font-bold hover:bg-blue-600/10">
                  <span>You follow 34 educators</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {educators.map((edu, i) => (
              <EducatorCard key={i} {...edu} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-800/50">
            <p className="text-[11px] text-zinc-500 font-medium">
              Page 1 of 22
            </p>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-zinc-800 text-white rounded-md text-[11px] font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white text-[11px] font-bold">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white text-[11px] font-bold">
                3
              </button>
              <span className="text-zinc-700 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white text-[11px] font-bold">
                22
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 italic max-w-sm text-center sm:text-right">
              Follow educators whose practice aligns with yours to surface more
              relevant resources and collaboration invites.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
