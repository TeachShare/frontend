"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUser } from "@/hooks/useUser";
import { RestoreAccountLayout } from "./RestoreAccountLayout";
import { useQueryClient } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { data: user, isLoading } = useUser();
  const queryClient = useQueryClient();

  const handleRestoreComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  };

  if (user?.is_archived) {
    return <RestoreAccountLayout onRestore={handleRestoreComplete} />;
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#090a0c] text-zinc-900 dark:text-zinc-200 font-sans overflow-hidden transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
             <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
             </div>
          ) : children}
        </main>
      </div>
    </div>
  );
}
