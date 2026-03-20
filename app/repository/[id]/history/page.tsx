"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';

// Data & Types
import { mockVersions } from '@/dummy-datas/versions';

// Components
import { HistoryHeader } from '@/components/sections/repository/detail/history/HistoryHeader';
import { ResourceInfoCard } from '@/components/sections/repository/detail/history/ResourceInfoCard';
import { VersionCard } from '@/components/sections/repository/detail/history/VersionCard';
import { HistoryFooter } from '@/components/sections/repository/detail/history/HistoryFooter';

const VersionHistoryPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          
          <HistoryHeader />

          {/* Progress Tracker Banner */}
          <div className="bg-blue-600 h-8 rounded flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Version History Tracking Active</span>
          </div>

          <ResourceInfoCard />

          {/* Version List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/50 pb-4 transition-colors duration-300">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest transition-colors duration-300">All versions from first to most recent</h3>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">
                <span>Order:</span>
                <button className="text-zinc-900 dark:text-zinc-300 font-bold flex items-center gap-1 transition-colors duration-300">
                  Oldest to newest <ChevronDown size={12}/>
                </button>
              </div>
            </div>

            {mockVersions.map((version, i) => (
              <VersionCard 
                key={version.id} 
                version={version} 
                isLast={i === mockVersions.length - 1} 
              />
            ))}
          </div>

          <HistoryFooter />

        </div>
      </main>
    </Layout>
  );
};

export default VersionHistoryPage;