"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';

import { DashboardHeader } from '@/components/sections/dashboard/DashboardHeader';
import { GreetingCard } from '@/components/sections/dashboard/GreetingCard';
import { StatCard } from '@/components/sections/dashboard/StatCard';
import { RecentResources } from '@/components/sections/dashboard/RecentResources';
import { TeachingFocus } from '@/components/sections/dashboard/TeachingFocus';
import { ActivitySnapshot } from '@/components/sections/dashboard/ActivitySnapshot';

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          
          <DashboardHeader />

          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <GreetingCard />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Resources shared" value="48" subtext="All-time uploads" trend="+6" />
                <StatCard title="Total downloads" value="1.9k" subtext="Compared to last 30 days" trend="+18%" />
                <StatCard title="Achievements" value="7" subtext='"Collaborative Planner" unlocked' badge="New badge" />
                <StatCard title="Community shares" value="23" subtext="Your resources reshared by others" trend="+4" />
              </div>

              <RecentResources />
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <TeachingFocus />
              <ActivitySnapshot />
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;