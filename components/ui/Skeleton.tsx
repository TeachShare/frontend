import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded ${className}`}
    />
  );
};
