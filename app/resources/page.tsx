// app/resources/page.tsx
"use client";
import React from 'react';
import Layout from '@/components/layout/Layout';

// Data
import { myResourcesData } from '@/dummy-datas/myResources';

// Components
import { ResourceHeader } from '@/components/sections/resources/ResourceHeader';
import { ResourceToolbar } from '@/components/sections/resources/ResourceToolbar';
import { ResourceCard } from '@/components/sections/resources/ResourceCard';
import { ResourcePagination } from '@/components/sections/resources/ResourcePagination';

const MyResourcesPage = () => {
  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          
          <ResourceHeader />
          <ResourceToolbar />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {myResourcesData.map((res, i) => (
              <ResourceCard key={i} {...res} />
            ))}
          </div>

          <ResourcePagination />

        </div>
      </main>
    </Layout>
  );
};

export default MyResourcesPage;