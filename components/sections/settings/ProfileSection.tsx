"use client"
import React from "react";
import { Camera, Trash2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import Layout from "@/components/layout/Layout";

export const ProfileSection = () => {
  const { data: user, isLoading, isError }: any = useUser();
  
  const seed = `${user?.id ?? "0"}-${user?.last_name ?? "Xasler"}`;


  if(isLoading){
    return (
         <Layout>
           <div className="flex items-center justify-center h-screen">
             Loading form...
           </div>
         </Layout>
       );
  }

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between transition-colors duration-300">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Profile
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 transition-colors duration-300">
            Let other educators know who you are and how you teach.
          </p>
        </div>
        <button className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
          Public educator profile
        </button>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <p className="text-xs font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Profile photo
          </p>
          <div className="flex items-center space-x-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
              className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm dark:shadow-xl transition-colors duration-300"
              alt="Profile Large"
            />
            <div className="space-y-3">
              <p className="text-[11px] text-zinc-600 dark:text-zinc-500 max-w-sm leading-relaxed transition-colors duration-300">
                A clear, friendly photo helps collaborators recognize you across
                messages and resources.
              </p>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors duration-300">
                  <Camera
                    size={14}
                    className="text-zinc-500 dark:text-zinc-500"
                  />
                  <span>Upload new</span>
                </button>
                <button className="flex items-center space-x-2 text-[11px] font-bold text-rose-600 dark:text-rose-500/70 hover:text-rose-700 dark:hover:text-rose-400 px-2 py-1.5 transition-colors duration-300">
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Full Name</span>
              <span className="text-[10px] font-normal uppercase text-zinc-500 dark:text-zinc-600">
                Visible on shared resources
              </span>
            </label>
            <input
              type="text"
              defaultValue={`${user?.first_name} ${user?.last_name}`}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Preferred name</span>
              <span className="text-[10px] font-normal uppercase italic text-zinc-500 dark:text-zinc-600">
                Optional
              </span>
            </label>
            <input
              type="text"
              defaultValue="Xasler"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
              Role
            </label>
            <input
              type="text"
              defaultValue="Software Instructor"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
              School/Organization
            </label>
            <input
              type="text"
              defaultValue="University of Cebu - Main Campus"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Bio</span>
              <span className="text-[10px] font-normal italic text-zinc-500 dark:text-zinc-600">
                1-2 sentences about your teaching context and what you love
                sharing.
              </span>
            </label>
            <textarea
              rows={3}
              defaultValue="Designing low-floor, high-ceiling tasks for middle school algebra learners. Passionate about discourse routines and multilingual supports."
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 resize-none transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
