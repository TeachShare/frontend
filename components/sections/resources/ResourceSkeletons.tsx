import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonResourceDetail = () => (
  <div className="max-w-7xl mx-auto p-6 space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex space-x-3">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>

    {/* Hero */}
    <div className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse relative overflow-hidden p-8 flex flex-col justify-end space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Content */}
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-8 space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/50 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-6">
        {/* Sidebar */}
        <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonResourceCard = () => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 flex flex-col justify-between h-[280px]">
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-48" />
      <div className="flex gap-1.5 pt-2">
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
    <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
      <Skeleton className="h-9 flex-1 rounded-lg" />
      <Skeleton className="h-9 w-12 rounded-lg" />
      <Skeleton className="h-9 w-12 rounded-lg" />
    </div>
  </div>
);
