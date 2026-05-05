import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonStatCard = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 p-4 lg:p-5 rounded-xl flex flex-col justify-between min-h-[110px]">
    <Skeleton className="h-3 w-24 mb-4" />
    <div className="mt-auto">
      <div className="flex items-end justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-8 mb-1" />
      </div>
      <Skeleton className="h-3 w-32 mt-2" />
    </div>
  </div>
);

export const SkeletonGreetingCard = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 lg:p-8">
    <Skeleton className="h-8 w-64 mb-2" />
    <Skeleton className="h-4 w-48 mb-6" />
    <div className="flex gap-2 mb-8">
      <Skeleton className="h-6 w-24 rounded-md" />
      <Skeleton className="h-6 w-32 rounded-md" />
    </div>
    <div className="flex space-x-4">
      <Skeleton className="h-10 w-36 rounded-lg" />
      <Skeleton className="h-10 w-36 rounded-lg" />
    </div>
  </div>
);

export const SkeletonRecentResources = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden">
    <div className="p-5 flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800/30 gap-4">
      <Skeleton className="h-5 w-32" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
    </div>
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonTeachingFocus = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6">
    <Skeleton className="h-3 w-32 mb-6" />
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800/30">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonActivitySnapshot = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6">
    <Skeleton className="h-3 w-32 mb-6" />
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start space-x-3">
          <Skeleton className="w-2 h-2 rounded-full mt-1.5 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-2 w-24" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
