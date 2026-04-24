import { ChevronDown } from "lucide-react";

export const FilterGroup = ({ label, value, options, onChange }: any) => (
  <div className="flex flex-col gap-1.5 min-w-[140px]">
    <label className="text-[10px] font-bold text-zinc-500 dark:text-[#5C5F66] uppercase tracking-[0.2em] px-1">
      {label}
    </label>
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-[#E1E3E6] focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
      >
       {options.map((opt: any, index: number) => {
        const value = typeof opt === 'object' ? (opt.name || opt.label) : opt;
        
        return (
            <option 
            key={`${value}-${index}`} // Use value + index to guarantee uniqueness
            value={value}
            >
            {value}
            </option>
        );
        })}
      </select>
      <ChevronDown
        size={12}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-emerald-500 transition-colors"
      />
    </div>
  </div>
);
