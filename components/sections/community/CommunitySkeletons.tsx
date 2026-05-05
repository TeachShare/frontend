import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonPostItem = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden p-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
    <div className="pt-4 flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-800/50">
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-12" />
    </div>
  </div>
);

export const SkeletonEducatorCard = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center space-y-1">
          <Skeleton className="h-4 w-8 mx-auto" />
          <Skeleton className="h-2 w-12 mx-auto" />
        </div>
      ))}
    </div>

    <div className="flex gap-4">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 flex-1 rounded-lg" />
    </div>
  </div>
);
