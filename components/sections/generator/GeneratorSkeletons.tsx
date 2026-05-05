import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonGeneratedCard = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden p-6 space-y-4">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-6 w-16 rounded" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-12 rounded" />
      <Skeleton className="h-6 w-12 rounded" />
    </div>
    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex gap-3">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-10 rounded-lg" />
    </div>
  </div>
);
