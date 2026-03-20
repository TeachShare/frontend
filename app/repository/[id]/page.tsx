// app/repository/[id]/page.tsx
"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';

// Mock Data
import { mockResourceDetail } from '@/dummy-datas/resourceDetails';

// Sections
import { DetailHeader } from '@/components/sections/repository/detail/DetailHeader';
import { DetailHero } from '@/components/sections/repository/detail/DetailHero';
import { DetailContent } from '@/components/sections/repository/detail/DetailContent';
import { DetailSidebar } from '@/components/sections/repository/detail/DetailSidebar';

const ResourceDetailView = () => {
  const { id } = useParams();

  // In a real app: 
  // const { data, isLoading } = useFetchResource(id);
  // const resource = data || mockResourceDetail;
  const resource = mockResourceDetail;

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          
          <DetailHeader />
          
          <DetailHero resource={resource} />

          <div className="grid grid-cols-12 gap-8">
            <DetailContent resource={resource} />
            <DetailSidebar resource={resource} />
          </div>

        </div>
      </main>
    </Layout>
  );
};

export default ResourceDetailView;