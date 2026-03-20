"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";

import { CommunityHeader } from "@/components/sections/community/CommunityHeader";
import { CommunityToolbar } from "@/components/sections/community/CommunityToolbar";
import { EducatorCard } from "@/components/sections/community/EducatorCard";
import { CommunityPagination } from "@/components/sections/community/CommunityPagination";

import { educatorsData } from "@/dummy-datas/educator";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          
          <CommunityHeader />
          <CommunityToolbar />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {educatorsData.map((edu, i) => (
              <EducatorCard key={i} {...edu} />
            ))}
          </div>

          <CommunityPagination />
          
        </div>
      </main>
    </Layout>
  );
};

export default Page;