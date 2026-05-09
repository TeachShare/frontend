"use client"

import { Send, Star, Flag } from "lucide-react";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { ReportModal } from "./ReportModal";

export const ReviewSection = ({ comments, onAddComment }: any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [reportConfig, setReportConfig] = useState<{id: number, type: 'comment'} | null>(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newComment.trim() || rating === 0) return;
    
    onAddComment({
      rating,
      text: newComment,
    });
    
    setNewComment("");
    setRating(0);
  };

  return (
    <section className="bg-white dark:bg-[#111317] border border-zinc-200 dark:border-[#1F2226] rounded-xl p-8 transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-[#8E9196]">Reviews & Feedback</h3>
        <span className="text-[10px] font-bold text-zinc-400 dark:text-[#5C5F66] uppercase">{comments.length} Reviews</span>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center mb-4 space-x-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={18}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer transition-colors ${
                s <= (hoverRating || rating) ? 'text-yellow-500 fill-current' : 'text-zinc-200 dark:text-[#2D3138]'
              }`}
            />
          ))}
          {rating > 0 && <span className="text-[10px] text-zinc-500 ml-2 font-bold uppercase">{rating} / 5</span>}
        </div>
        
        <div className="flex space-x-3">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a review..."
            className="flex-1 bg-zinc-50 dark:bg-[#08090A] border border-zinc-200 dark:border-[#1F2226] rounded-lg px-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim() || rating === 0}
            className="bg-[#00D084] text-black px-4 py-2 rounded-lg hover:bg-[#00BA76] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((c: { id: Key | null | undefined; avatar: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; user: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; rating: number; date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; comment_id: any; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <div key={c.id} className="flex space-x-4 border-t border-zinc-100 dark:border-[#1F2226] pt-6 first:border-0 first:pt-0">
            <div className="w-9 h-9 rounded bg-zinc-50 dark:bg-[#1A1C20] border border-zinc-200 dark:border-[#1F2226] flex items-center justify-center text-zinc-400 dark:text-[#5C5F66] font-bold text-xs shrink-0">
              {c.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{c.user}</span>
                  <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className={s <= c.rating ? "text-yellow-500 fill-current" : "text-zinc-200 dark:text-[#2D3138]"} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-[10px] text-zinc-400 dark:text-[#5C5F66] font-bold">{c.date}</span>
                   <button 
                    onClick={() => setReportConfig({ id: c.comment_id || c.id, type: 'comment' })}
                    className="p-1 text-zinc-300 hover:text-rose-500 transition-colors"
                   >
                     <Flag size={10} />
                   </button>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-[#8E9196] leading-relaxed">&quot;{c.text}&quot;</p>
            </div>
          </div>
        ))}
      </div>

      <ReportModal 
        isOpen={!!reportConfig}
        onClose={() => setReportConfig(null)}
        targetId={reportConfig?.id || 0}
        targetType="comment"
      />
    </section>
  );
};


