"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

// Types & Data
import { RemixItemType } from "@/types/repository";
import { repositoryListData } from "@/dummy-datas/repositoryList";

// Components
import { RemixModal } from "@/components/sections/repository/RemixModal";
import { RepositoryItem } from "@/components/sections/repository/RepositoryItem";

const RepositoryPage = () => {
  const router = useRouter();
  const [remixItem, setRemixItem] = useState<RemixItemType | null>(null);

  const handleConfirmRemix = () => {
    if (remixItem) {
      router.push(
        `/repository/create?remix=true&title=${encodeURIComponent(remixItem.title)}`,
      );
    }
    setRemixItem(null);
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 min-h-full bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <RemixModal
          isOpen={!!remixItem}
          item={remixItem}
          onClose={() => setRemixItem(null)}
          onConfirm={handleConfirmRemix}
        />

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                Resource Repository
              </h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-xs transition-colors duration-300">
                Manage and discover materials.
              </p>
            </div>
            <button
              onClick={() => router.push("/resources/create")}
              className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> Create Resource
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {repositoryListData.map((repo, idx) => (
              <RepositoryItem
                key={idx}
                data={repo}
                onRemix={() =>
                  setRemixItem({ title: repo.title, subject: repo.subject })
                }
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RepositoryPage;
