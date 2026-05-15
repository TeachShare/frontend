"use client";
import React from 'react';
import Layout from '@/components/layout/Layout';

import { DashboardHeader } from '@/components/sections/dashboard/DashboardHeader';
import { GreetingCard } from '@/components/sections/dashboard/GreetingCard';
import { StatCard } from '@/components/sections/dashboard/StatCard';
import { RecentResources } from '@/components/sections/dashboard/RecentResources';
import { TeachingFocus } from '@/components/sections/dashboard/TeachingFocus';
import { ActivitySnapshot } from '@/components/sections/dashboard/ActivitySnapshot';
import { useUser } from '@/hooks/useUser';
import { useMyResources } from '@/hooks/useResources';
import { useFeed } from '@/hooks/useCommunity';
import { useDashboardStats } from '@/hooks/useDashboard';
import { 
  SkeletonStatCard, 
  SkeletonGreetingCard, 
  SkeletonRecentResources, 
  SkeletonTeachingFocus, 
  SkeletonActivitySnapshot 
} from '@/components/sections/dashboard/DashboardSkeletons';

const Page = () => {
  const [days, setDays] = React.useState(30);
  const { data: user, isLoading: isUserLoading }: any = useUser();
  const { data: myResourcesResponse, isLoading: isResourcesLoading } = useMyResources(1);
  const { data: feedData, isLoading: isFeedLoading } = useFeed(1);
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats(days);

  const myResources = myResourcesResponse?.resources || [];
  const communityPosts = feedData?.posts || [];

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          
          <DashboardHeader days={days} setDays={setDays} />

          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {isUserLoading ? (
                <SkeletonGreetingCard />
              ) : (
                <GreetingCard 
                  lastName={user?.last_name} 
                  role={user?.role} 
                  institution={user?.institution} 
                  resourcesCount={stats?.total_resources || 0}
                /> 
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {isStatsLoading ? (
                  <>
                    <SkeletonStatCard />
                    <SkeletonStatCard />
                    <SkeletonStatCard />
                    <SkeletonStatCard />
                  </>
                ) : (
                  <>
                    <StatCard 
                        title="Resources shared" 
                        value={stats?.total_resources.toString() || "0"} 
                        subtext="All-time uploads" 
                        trend={stats?.period_resources && stats.period_resources > 0 ? `+${stats.period_resources}` : "0"} 
                    />
                    <StatCard 
                        title="Total likes" 
                        value={stats?.total_likes !== undefined && stats.total_likes >= 1000 ? `${(stats.total_likes/1000).toFixed(1)}k` : (stats?.total_likes !== undefined ? stats.total_likes.toString() : "0")} 
                        subtext="Across all resources" 
                        trend={stats?.period_likes && stats.period_likes > 0 ? `+${stats.period_likes}` : "0"} 
                    />
                    <StatCard title="Published" value={stats?.published_count !== undefined ? stats.published_count.toString() : "0"} subtext="Live in repository" badge="Active" />
                    <StatCard title="Drafts" value={stats?.draft_count !== undefined ? stats.draft_count.toString() : "0"} subtext="Waiting for polish" />
                  </>
                )}
              </div>

              {isResourcesLoading ? (
                <SkeletonRecentResources />
              ) : (
                <RecentResources resources={myResources} />
              )}
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {isStatsLoading ? (
                <SkeletonTeachingFocus />
              ) : (
                <TeachingFocus stats={stats} />
              )}
              {isFeedLoading ? (
                <SkeletonActivitySnapshot />
              ) : (
                <ActivitySnapshot posts={communityPosts} />
              )}
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;