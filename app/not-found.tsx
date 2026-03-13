import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0d1117] flex flex-col items-center justify-center p-6 transition-colors duration-300">
      
      <div className="w-full max-w-md bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-[#30363d] rounded-[24px] shadow-xl dark:shadow-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500 transition-colors duration-300">
        
        {/* Icon Container */}
        <div className="w-16 h-16 bg-zinc-100 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
          <FileQuestion className="text-zinc-400 dark:text-[#8b949e] w-8 h-8" />
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
          404
        </h1>
        <h2 className="text-lg font-bold text-zinc-700 dark:text-[#c9d1d9] mb-3 transition-colors duration-300">
          Page off-syllabus
        </h2>
        <p className="text-sm text-zinc-500 dark:text-[#8b949e] leading-relaxed mb-8 transition-colors duration-300">
          We couldn't find the resource or page you were looking for. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/dashboard"
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] dark:hover:bg-[#2ea043] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 dark:shadow-none flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} />
            Return to Dashboard
          </Link>
          
          <Link 
            href="/repository"
            className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#21262d] border border-transparent dark:border-[#30363d] dark:hover:bg-[#30363d] text-zinc-900 dark:text-[#c9d1d9] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
          >
            <Search size={16} />
            Browse Repository
          </Link>
        </div>

      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-emerald-500/5 dark:bg-[#72b37d]/5 blur-[100px] rounded-full pointer-events-none -z-10 transition-colors duration-300"></div>
      
    </div>
  );
}