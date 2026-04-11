"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Share2, History, Edit3, ArrowLeft, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export const DetailHeader = ({ resource }: { resource: any }) => {
  const router = useRouter();

  // Fetching current teacher info from your custom hook
  const { data: user, isLoading, isError }: any = useUser();
  
  console.log(resource, user)
  // 1. Safety Check: If we are still fetching the user, show a small loader or placeholder
  // This prevents "Cannot read property teacher_id of undefined"
  if (isLoading) {
    return (
      <div className="flex items-center justify-end h-8">
        <Loader2 className="animate-spin text-zinc-400" size={14} />
      </div>
    );
  }

  // 2. Ownership Logic: Check if current teacher matches resource creator
  const isOwner = user && resource.owner_id === user.id;

  const handleEdit = () => {
    const slug = `${resource.collection_id}-${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/create?edit=${slug}`);
  };

  const handleVersionHistory = () => {
    const slug = `${resource.collection_id}-${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/${slug}/history`);
  };

  return (
    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-widest transition-colors duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.back()} 
          className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1"
        >
          <ArrowLeft size={12}/> Back
        </button>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-300 transition-colors duration-300">View Resource</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Share is visible to everyone */}
        <button className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300">
          <Share2 size={14}/> Share
        </button>

        {/* 3. Conditional Rendering based on ownership */}
        {isOwner && (
          <>
            <button 
              onClick={handleVersionHistory} 
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
            >
              <History size={14}/> Version History
            </button>
            <button 
              onClick={handleEdit} 
              className="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-emerald-200 dark:hover:bg-emerald-500/20 transition-all duration-300"
            >
              <Edit3 size={14}/> Edit Resource
            </button>
          </>
        )}
      </div>
    </div>
  );
};