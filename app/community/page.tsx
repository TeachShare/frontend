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
import { SidebarItemProps } from "../dashboard/page"; // Verify this path in your project
import Layout from "@/components/layout/Layout";

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
}: SidebarItemProps) => (
  <div
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium" 
        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
    }`}
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
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group duration-300">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300"
            />
            <div>
              <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {name}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-tight mt-0.5 transition-colors duration-300">
                {role}
              </p>
            </div>
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 ${
              following
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                : "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/20"
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
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                tag === "Top contributor"
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/10"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 border border-transparent"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Resources
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{resources}</p>
          </div>
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Followers
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{followers}</p>
          </div>
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Co-teaching
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{coTeaching}</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-600 uppercase transition-colors duration-300">
              Follow alignment
            </span>
            <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              {alignment}% match
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
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
              className="text-[10px] text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-300">
          View profile
        </button>
        <button className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
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
    <Layout>
      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        {/* Community Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Community</h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">
                Discover educators to follow, collaborate with, and learn from
                across TeachShare.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                <Users2 size={14} className="text-zinc-500" />
                <span>My network</span>
              </button>
              <button className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors duration-300">
                <UserPlus size={14} />
                <span>Find collaborators</span>
              </button>
            </div>
          </div>

          {/* Filtering Toolbar */}
          <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 lg:p-5 space-y-5 transition-colors duration-300">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search educators or subjects"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-md py-1.5 pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-colors duration-300"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-md text-xs font-bold transition-colors duration-300">
                  <Star size={14} />
                  <span>Recommended for you</span>
                </button>
                <div className="flex items-center gap-2">
                  {["Subject", "Grade band", "Region"].map((label) => (
                    <button
                      key={label}
                      className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-300"
                    >
                      <span>{label}</span>
                      <ChevronDown size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 border-l border-zinc-200 dark:border-zinc-800 pl-0 xl:pl-4 transition-colors duration-300">
                <div className="flex items-center space-x-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-500">
                  <button className="text-zinc-900 dark:text-white transition-colors duration-300">Educators</button>
                  <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">Schools</button>
                  <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors duration-300">Topics</button>
                </div>
                <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold text-zinc-900 dark:text-zinc-400 transition-colors duration-300">
                  <span className="text-zinc-500 dark:text-zinc-500">Sort by:</span>
                  <span>Most active</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <p className="text-[11px] text-zinc-600 dark:text-zinc-600 font-medium transition-colors duration-300">
                  Showing{" "}
                  <span className="text-zinc-900 dark:text-zinc-400 font-bold transition-colors duration-300">
                    1-6 of 128 educators
                  </span>
                </p>
                <span className="text-zinc-300 dark:text-zinc-800 transition-colors duration-300">|</span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium italic transition-colors duration-300">
                  Based on your subjects and grade levels
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900/30 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase transition-colors duration-300">
                    Avg. follow score
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                    72%
                  </span>
                </div>
                <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-600/5 text-blue-600 dark:text-blue-500/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/10 text-[11px] font-bold hover:bg-blue-100 dark:hover:bg-blue-600/10 transition-colors duration-300">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium transition-colors duration-300">
              Page 1 of 22
            </p>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 text-white rounded-md text-[11px] font-bold transition-colors duration-300">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
                3
              </button>
              <span className="text-zinc-400 dark:text-zinc-700 px-1 transition-colors duration-300">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] font-bold transition-colors duration-300">
                22
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
                <ChevronRight size={16} />
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic max-w-sm text-center sm:text-right transition-colors duration-300">
              Follow educators whose practice aligns with yours to surface more
              relevant resources and collaboration invites.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;