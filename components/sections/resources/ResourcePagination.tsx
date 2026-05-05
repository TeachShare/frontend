import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ResourcePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ResourcePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: ResourcePaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
      <p className="text-[11px] text-zinc-500 font-medium tracking-tight">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-[11px] font-bold shadow-sm transition-colors duration-300 ${
              currentPage === page 
                ? "bg-zinc-900 dark:bg-zinc-800 text-white" 
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic max-w-xs text-center sm:text-right transition-colors duration-300">
        Curate and manage your library to help colleagues find the best
        materials.
      </p>
    </div>
  );
};
