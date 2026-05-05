import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonProfileHeader = () => (
  <div className="rounded-2xl overflow-hidden border border-[#1f2937] bg-[#121212] mb-8">
    <div className="h-40 bg-zinc-800 animate-pulse" />
    
    <div className="px-8 pb-8 -mt-12 relative flex flex-col md:flex-row items-end gap-6">
      <Skeleton className="w-32 h-32 rounded-3xl border-4 border-[#121212] shrink-0" />
      <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>

    <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-8">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonProfileResourceCard = () => (
  <div className="rounded-2xl border border-[#1f2937] bg-[#121212] p-5 space-y-4">
    <div className="flex justify-between items-start">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
      </div>
      <Skeleton className="h-4 w-4" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-3 w-32" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16 rounded-lg" />
      <Skeleton className="h-5 w-16 rounded-lg" />
    </div>
    <div className="pt-4 border-t border-white/5 flex justify-between">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-32" />
    </div>
    <div className="grid grid-cols-2 gap-3 pt-2">
      <Skeleton className="h-10 rounded-xl" />
      <Skeleton className="h-10 rounded-xl" />
    </div>
  </div>
);
