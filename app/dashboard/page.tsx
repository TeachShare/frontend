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
  const { data: user, isLoading: isUserLoading }: any = useUser();
  const { data: myResourcesResponse, isLoading: isResourcesLoading } = useMyResources(1);
  const { data: feedData, isLoading: isFeedLoading } = useFeed(1);
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats();

  const myResources = myResourcesResponse?.resources || [];
  const communityPosts = feedData?.posts || [];
  
  // Calculate Stats fallback if stats hook fails or is loading
  const totalResources = stats?.total_resources ?? myResources.length;
  const totalLikes = stats?.total_likes ?? 0;
  const publishedCount = stats?.published_count ?? myResources.filter((res: any) => res.is_published).length;
  const draftCount = stats?.draft_count ?? (totalResources - publishedCount);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          
          <DashboardHeader />

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
                  resourcesCount={totalResources}
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
                    <StatCard title="Resources shared" value={totalResources.toString()} subtext="All-time uploads" trend={totalResources > 0 ? `+${totalResources}` : "0"} />
                    <StatCard title="Total likes" value={totalLikes >= 1000 ? `${(totalLikes/1000).toFixed(1)}k` : totalLikes.toString()} subtext="Across all resources" trend="+0" />
                    <StatCard title="Published" value={publishedCount.toString()} subtext="Live in repository" badge="Active" />
                    <StatCard title="Drafts" value={draftCount.toString()} subtext="Waiting for polish" />
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
              {isResourcesLoading ? (
                <SkeletonTeachingFocus />
              ) : (
                <TeachingFocus resources={myResources} />
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