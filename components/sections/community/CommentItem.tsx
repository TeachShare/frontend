"use client";
import React, { useState } from "react";
import { CornerDownRight, Flag } from "lucide-react";
import { Comment } from "@/types/community";
import Image from "next/image";
import { getAvatarUrl } from "@/lib/utils";
import { ReportModal } from "../resources/detail/ReportModal";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onReply: (parentId: string, text: string) => void;
}

export const CommentItem = ({ comment, depth = 0, onReply }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  console.log(comment)

  return (
    <div className={`mt-5 ${depth > 0 ? 'ml-8 border-l border-zinc-200 dark:border-zinc-800/80 pl-5' : ''}`}>
      <div className="flex gap-3">
        {/* ✅ FIXED: Now uses comment.author.avatar */}
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm shadow-sm">
         <Image 
            src={getAvatarUrl(comment.author.avatar, comment.author.name, comment.author.id)}  
            width={32} 
            height={32} 
            alt={comment.author.name} 
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="bg-zinc-50/50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40">
            <div className="flex items-center justify-between mb-1">
              {/* ✅ FIXED: Now uses comment.author.name */}
              <h4 className="text-[10px] font-black text-zinc-900 dark:text-zinc-200 uppercase tracking-tight">
                {comment.author.name}
              </h4>
              {/* ✅ FIXED: Now uses comment.created_at instead of timestamp */}
              <span className="text-[9px] font-bold text-zinc-400 uppercase">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2 ml-1">
            <button className="text-[9px] font-black text-zinc-400 hover:text-emerald-500 uppercase tracking-widest transition-colors">Like</button>
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="text-[9px] font-black text-zinc-400 hover:text-emerald-500 uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              <CornerDownRight size={10} /> {isReplying ? "Cancel" : "Reply"}
            </button>
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="text-[9px] font-black text-zinc-400 hover:text-rose-500 uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              <Flag size={10} /> Report
            </button>
          </div>

          {isReplying && (
            <div className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <input 
                autoFocus
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitReply()}
                placeholder="Write a reply..." 
                className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500/50"
              />
              <button 
                onClick={handleSubmitReply}
                className="px-3 py-1.5 bg-zinc-900 dark:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Recursive Replies */}
      {comment.replies && comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
      ))}

      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={Number(comment.id)}
        targetType="post_comment"
      />
    </div>
  );
};