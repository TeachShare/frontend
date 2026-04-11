"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { api } from '@/lib/axios'; // Make sure this path is correct based on your setup

// Components
import { ResourceHeader } from '@/components/sections/resources/ResourceHeader';
import { ResourceToolbar } from '@/components/sections/resources/ResourceToolbar';
import { ResourceCard } from '@/components/sections/resources/ResourceCard';
import { ResourcePagination } from '@/components/sections/resources/ResourcePagination';

const MyResourcesPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyResources = async () => {
      try {
        const response = await api.get('/resource_collection/my_resources');
        
        if (response.data.success) {
          setResources(response.data.data);
          console.log(response.data.data)
        }
        
      } catch (error) {
        console.error("Failed to fetch my resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyResources();
  }, []);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          
          <ResourceHeader />
          <ResourceToolbar />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
               <span className="text-zinc-500 animate-pulse font-bold text-sm">Loading your resources...</span>
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3 bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-xl">
               <p className="text-zinc-500 font-bold text-sm">You haven't created any resources yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {resources.map((res, i) => (
                // Note: We'll need to make sure your ResourceCard accepts the structure Flask returns
                <ResourceCard key={res.collection_id || i} {...res} />
              ))}
            </div>
          )}

          <ResourcePagination />

        </div>
      </main>
    </Layout>
  );
};

export default MyResourcesPage;