"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { api } from '@/lib/axios'; // Make sure this path is correct based on your setup

// Components
import { ResourceHeader } from '@/components/sections/resources/ResourceHeader';
import { ResourceToolbar } from '@/components/sections/resources/ResourceToolbar';
import { ResourceCard } from '@/components/sections/resources/ResourceCard';
import { ResourcePagination } from '@/components/sections/resources/ResourcePagination';
import { SkeletonResourceCard } from '@/components/sections/resources/ResourceSkeletons';

const MyResourcesPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    grade: "",
    content_type: "",
    status: "all"
  })

  const [page, setPage] = useState(1);

  const fetchMyResources = async (currentFilters: typeof filters, currentPage: number) => {
    try {
      setIsLoading(true);
      
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.subject) params.append('subject_id', currentFilters.subject);
      if (currentFilters.grade) params.append('grade_level_id', currentFilters.grade);
      if (currentFilters.content_type) params.append('content_type_id', currentFilters.content_type);
      if (currentFilters.status !== 'all') params.append('status', currentFilters.status);

      const response = await api.get(`/resource_collection/my-resources?${params.toString()}`);
      
      if (response.data.success) {
        setResources(response.data.resources);
        setPagination({
          currentPage: response.data.current_page,
          totalPages: response.data.total_pages
        });
      }
    } catch (error) {
      console.error("Failed to fetch my resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1 on filter change
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMyResources(filters, page);
    }, filters.search ? 400 : 0);

    return () => clearTimeout(timer);
  }, [filters, page]);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          
          <ResourceHeader />
          <ResourceToolbar filters={filters} setFilters={setFilters}/>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {[...Array(6)].map((_, i) => <SkeletonResourceCard key={i} />)}
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-3 bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-xl">
               <p className="text-zinc-500 font-bold text-sm">You haven't created any resources yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {resources.map((res, i) => (
                <ResourceCard
                 key={res.collection_id || i} {...res}
                likes={res.like_count ?? res.likes ?? 0}
                downloads={res.download_count ?? res.downloads ?? 0}
                />
              ))}
            </div>
          )}

          <ResourcePagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(p) => setPage(p)}
          />

        </div>
      </main>
    </Layout>
  );
};

export default MyResourcesPage;