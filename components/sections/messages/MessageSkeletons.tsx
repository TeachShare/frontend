import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonConversationItem = () => (
  <div className="flex items-center space-x-3 p-3">
    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2 w-10" />
      </div>
      <Skeleton className="h-3 w-full" />
    </div>
  </div>
);

export const SkeletonActiveThread = () => (
  <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden">
    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
    </div>
    
    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className={`space-y-1 max-w-[70%]`}>
            <Skeleton className={`h-10 w-48 rounded-2xl ${i % 2 === 0 ? 'rounded-tl-none' : 'rounded-tr-none'}`} />
            <Skeleton className="h-2 w-10" />
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50">
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  </div>
);
