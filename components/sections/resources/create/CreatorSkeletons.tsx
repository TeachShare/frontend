import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonCreatorWorkspace = () => (
  <div className="p-8 max-w-6xl mx-auto space-y-8">
    {/* Header */}
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>

    <div className="grid grid-cols-12 gap-8 pb-20">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-8 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);
