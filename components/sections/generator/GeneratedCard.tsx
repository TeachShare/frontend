import React from 'react';
import { Download, X } from 'lucide-react';
import { GeneratedCardProps } from '@/types/generator';

export const GeneratedCard: React.FC<GeneratedCardProps> = ({ id, title, subject, description, tags, type, pdf_url, onDelete }) => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group duration-300 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-zinc-900 dark:text-white font-bold text-[15px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{title}</h4>
        <p className="text-zinc-500 dark:text-zinc-500 text-[12px] mt-1 transition-colors duration-300">{subject}</p>
      </div>
    </div>
    
    <div className="mb-4 flex-1">
      <h5 className="text-zinc-600 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">{type}</h5>
      <p className="text-zinc-700 dark:text-zinc-400 text-[13px] leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>

    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, i) => (
        <span key={i} className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-500 font-medium transition-colors duration-300">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex gap-2 mt-auto">
      {pdf_url ? (
        <a 
          href={pdf_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-[12px] font-bold transition-all border border-blue-200 dark:border-blue-500/20"
        >
          <Download size={14} />
          Download PDF
        </a>
      ) : (
        <button disabled className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 py-2 rounded-lg text-[12px] font-bold cursor-not-allowed">
          <Download size={14} />
          Processing...
        </button>
      )}
      <button 
        onClick={() => onDelete?.(id)}
        className="flex items-center justify-center p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-all border border-red-200 dark:border-red-500/20"
      >
        <X size={16} />
      </button>
    </div>
  </div>
);