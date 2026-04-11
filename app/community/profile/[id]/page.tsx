"use client";
import React from "react";
import { ChevronLeft, Share2, FileText, Download, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";

const EducatorProfile = () => {
  // Mock data for the profile
  const profileData = {
    name: "ABC",
    role: "Middle School Math - Curriculum Lead",
    badges: ["TOP CONTRIBUTOR", "STEM"],
    stats: {
      resources: 56,
      followers: "1.2k",
    },
    alignment: 86,
    tags: ["Algebra", "Formative assessment", "Differentiation"],
    bio: "Passionate about making math accessible for all students. I focus on project-based learning and integrating tech into the middle school math curriculum.",
  };

  // Mock data for the redesigned resources section
  const resources = [
    {
      id: 1,
      title: "Algebra I: Linear Equations Unit Plan",
      type: "Unit Plan",
      grade: "8th Grade",
      downloads: 342,
      likes: 89,
    },
    {
      id: 2,
      title: "Interactive Geometry Digital Notebook",
      type: "Template",
      grade: "7th Grade",
      downloads: 856,
      likes: 214,
    },
    {
      id: 3,
      title: "Real-world Fractions: Pizza Parlor Project",
      type: "Activity",
      grade: "6th Grade",
      downloads: 120,
      likes: 45,
    },
    {
      id: 4,
      title: "Weekly Math Reflection Rubric",
      type: "Assessment",
      grade: "6th-8th",
      downloads: 540,
      likes: 112,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-sans p-6 lg:p-10">
        {/* Back Navigation */}
        <button className="flex items-center text-sm text-neutral-400 hover:text-white mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" />
          Back to Community
        </button>

        {/* Main Profile Header Card */}
        <div className="bg-[#141414] border border-neutral-800 rounded-xl overflow-hidden mb-6 shadow-lg">
          {/* Cover Photo Area */}
          <div className="h-28 bg-gradient-to-r from-neutral-800 to-neutral-900"></div>

          <div className="px-6 sm:px-10 pb-8 relative">
            {/* Avatar and Actions */}
            <div className="flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end gap-5">
                <div className="w-24 h-24 rounded-full border-4 border-[#141414] bg-neutral-700 overflow-hidden relative flex-shrink-0">
                  <img
                    src="/api/placeholder/96/96"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    {profileData.name}
                  </h1>
                  <p className="text-sm text-neutral-400 mt-1">
                    {profileData.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pb-1">
                <button className="p-2 rounded-md bg-transparent border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors">
                  <Share2 size={18} />
                </button>
                <button className="px-6 py-2 rounded-md bg-transparent border border-teal-600/50 text-teal-500 hover:bg-teal-600/10 transition-colors text-sm font-medium">
                  + Follow
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-8">
              <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                TOP CONTRIBUTOR
              </span>
              <span className="px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-neutral-800 text-neutral-400 border border-neutral-700">
                STEM
              </span>
            </div>

            {/* Stats & Alignment */}
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t border-neutral-800 pt-6">
              <div className="flex gap-12 w-full md:w-auto">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {profileData.stats.resources}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">
                    Resources
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {profileData.stats.followers}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mt-1">
                    Followers
                  </div>
                </div>
              </div>

              {/* Alignment Bar */}
              <div className="w-full md:w-1/3 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-neutral-400 font-semibold uppercase tracking-wider">
                    Follow Alignment
                  </span>
                  <span className="text-white font-bold">
                    {profileData.alignment}% match
                  </span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className="bg-teal-500 h-1.5 rounded-full"
                    style={{ width: `${profileData.alignment}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: About & Tags */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-neutral-800 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-3">About</h2>
              <p className="text-sm leading-relaxed text-neutral-400">
                {profileData.bio}
              </p>
            </div>

            <div className="bg-[#141414] border border-neutral-800 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Areas of Focus</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md text-xs text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Redesigned Resources Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-semibold text-white">
                Resources ({profileData.stats.resources})
              </h2>
              <button className="text-sm text-teal-500 hover:text-teal-400 font-medium">
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-[#141414] border border-neutral-800 rounded-xl p-5 hover:border-neutral-600 transition-colors group cursor-pointer flex flex-col justify-between h-44"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {resource.grade}
                      </span>
                    </div>
                    <h3 className="text-white font-medium text-sm mt-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-800 pt-3 mt-4">
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Download size={14} />
                        <span>{resource.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Heart size={14} />
                        <span>{resource.likes}</span>
                      </div>
                    </div>
                    <FileText size={16} className="text-neutral-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EducatorProfile;
