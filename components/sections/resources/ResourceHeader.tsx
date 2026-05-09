import React from "react";
import { Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export const ResourceHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          My Resources
        </h1>
        <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">
          Upload, organize, and refine the materials you share with other
          educators.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Eye size={14} className="text-zinc-500" />}
        >
          Saved views
        </Button>
        <Button
          onClick={() => router.push("/resources/create")}
          variant="emerald-outline"
          size="sm"
          leftIcon={<Plus size={14} />}
        >
          Upload New
        </Button>
      </div>
    </div>
  );
};

