"use client";
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ViewMode } from '@/types/generator';

import { GeneratorHeader } from '@/components/sections/generator/GeneratorHeader';
import { GeneratorForm } from '@/components/sections/generator/GeneratorForm';
import { ResultsView } from '@/components/sections/generator/ResultsView';

const Page = () => {
  const [activeView, setActiveView] = useState<ViewMode>('generator');

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="p-4 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
          
          <GeneratorHeader activeView={activeView} setActiveView={setActiveView} />

          {activeView === 'generator' ? (
            <GeneratorForm onSuccess={setActiveView} />
          ) : (
            <ResultsView onGenerateMore={setActiveView} />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Page;