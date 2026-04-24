"use client"

import { Send, Star } from "lucide-react";
import { useState } from "react";

export const ReviewSection = ({ comments, onAddComment }: any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");

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
    <section className="bg-[#111317] border border-[#1F2226] rounded-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E9196]">Reviews & Feedback</h3>
        <span className="text-[10px] font-bold text-[#5C5F66] uppercase">{comments.length} Reviews</span>
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
                s <= (hoverRating || rating) ? 'text-yellow-500 fill-current' : 'text-[#2D3138]'
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
            className="flex-1 bg-[#08090A] border border-[#1F2226] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
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
        {comments.map((c) => (
          <div key={c.id} className="flex space-x-4 border-t border-[#1F2226] pt-6 first:border-0 first:pt-0">
            <div className="w-9 h-9 rounded bg-[#1A1C20] border border-[#1F2226] flex items-center justify-center text-[#5C5F66] font-bold text-xs shrink-0">
              {c.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white">{c.user}</span>
                  <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className={s <= c.rating ? "text-yellow-500 fill-current" : "text-[#2D3138]"} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-[#5C5F66] font-bold">{c.date}</span>
              </div>
              <p className="text-xs text-[#8E9196] leading-relaxed">"{c.text}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


