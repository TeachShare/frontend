import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonRepositoryCard = () => (
  <div className="bg-[#121417] border border-[#1F2226] rounded-xl overflow-hidden group">
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>

    <div className="px-6 py-4 border-t border-[#1F2226] flex items-center justify-between">
      <Skeleton className="h-4 w-16" />
      <div className="flex gap-3">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);
