import React from "react";
import { Clock, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivitySnapshotProps {
  posts?: any[];
}

export const ActivitySnapshot = ({ posts = [] }: ActivitySnapshotProps) => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">
        Community activity
      </h3>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.slice(0, 3).map((post, i) => (
            <div
              key={post.id || i}
              className="flex items-start space-x-3 group cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0`}
              />
              <div className="flex-1">
                <p className="text-[12px] text-zinc-700 dark:text-zinc-200 leading-relaxed transition-colors duration-300">
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {post.author.name}
                  </span>{" "}
                  posted in community
                </p>
                <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center font-bold tracking-wider uppercase transition-colors duration-300">
                  <Clock
                    size={10}
                    className="mr-1 text-zinc-400 dark:text-zinc-600"
                  />{" "}
                  {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : "Recently"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-500 italic">No recent activity to show.</p>
        )}

        {/* Keeping a placeholder for draft review if needed, or remove if not useful */}
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/30 mt-6 flex flex-col gap-4 transition-colors duration-300">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic transition-colors duration-300">
          Stay updated with what other educators are sharing.
        </p>
        <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-wider flex items-center group self-end transition-colors duration-300">
          <span>Explore Feed</span>
          <ChevronRight
            size={12}
            className="ml-0.5 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};
