import React from 'react';
import { ContentTypeCardProps } from '@/types/generator';

export const ContentTypeCard: React.FC<ContentTypeCardProps> = ({ icon: Icon, title, description, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex-1 min-w-[280px] p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-blue-50 dark:bg-[#1a1d21] border-blue-200 dark:border-blue-500/50 ring-1 ring-blue-500/20' 
        : 'bg-white dark:bg-[#121417] border-zinc-200 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg transition-colors duration-300 ${active ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500'}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-zinc-900 dark:text-white font-bold text-[14px] transition-colors duration-300">{title}</h3>
        <p className="text-zinc-500 dark:text-zinc-500 text-[12px] mt-1 leading-relaxed transition-colors duration-300">{description}</p>
      </div>
    </div>
  </div>
);