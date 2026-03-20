import React from 'react';

interface Props {
  enabled: boolean;
  onToggle?: () => void;
}

export const Toggle = ({ enabled, onToggle }: Props) => (
  <div 
    onClick={onToggle}
    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${enabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
  >
    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`} />
  </div>
);