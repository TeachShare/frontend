import { StatCardProps } from "@/types/community";

export const StatCard = ({ title, value, subtext, trend, badge }: StatCardProps) => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 p-4 lg:p-5 rounded-xl flex flex-col justify-between min-h-[110px] transition-colors duration-300">
    <div className="flex justify-between items-start">
      <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.1em]">{title}</h3>
      {badge && (
        <span className="text-emerald-600 dark:text-emerald-400 text-[9px] font-bold border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/5">
          {badge}
        </span>
      )}
    </div>
    <div className="mt-auto">
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">{value}</div>
        {trend && (
          <span className={`text-[11px] font-bold mb-1 ${trend.startsWith('+') ? 'text-emerald-600 dark:text-emerald-500' : 'text-zinc-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-zinc-500 text-[10px] mt-1 font-medium leading-tight">{subtext}</div>
    </div>
  </div>
);

