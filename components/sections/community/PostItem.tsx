"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Heart,
  MoreHorizontal,
  Bookmark,
  ChevronDown,
  Link as LinkIcon,
  Loader2,
  Flag,
} from "lucide-react";
import { Post } from "@/types/community";
import { CommentItem } from "./CommentItem";
import { ReportModal } from "../resources/detail/ReportModal";
import {
  useComments,
  useToggleLike,
  useAddComment,
} from "@/hooks/useCommunity";
import Image from "next/image";
import Link from "next/link";
import { getAvatarUrl } from "@/lib/utils";

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Hook into our React Query logic
  const toggleLikeMutation = useToggleLike();
  const addCommentMutation = useAddComment();

  // ✅ INTEGRATED: This will only fetch when isExpanded is true
  const { data: commentsData, isFetching: isFetchingComments } = useComments(
    post.id,
    isExpanded,
  );

  const handleAddComment = (parentId: string | null = null, text: string) => {
    if (!text.trim()) return;
    addCommentMutation.mutate(
      { postId: post.id, content: text, parentId },
      {
        onSuccess: () => {
          if (!parentId) setCommentInput("");
        },
      },
    );
  };

  console.log(post)
  return (
    <article className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-sm overflow-hidden shadow-sm">
      <div className="p-7 pb-4">
        {/* Author Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex gap-3.5">
            <Link href={`/profile/${post.author.username || post.author.id}`} className="flex gap-3.5">
                <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg shadow-inner cursor-pointer hover:border-emerald-500/50 transition-colors">
                <Image
                    src={getAvatarUrl(post.author.avatar, post.author.name, post.author.id)}
                    width={40}
                    height={40}
                    alt={post.author.name}
                    className="w-full h-full rounded-lg object-cover"
                />
                </div>
                <div>
                <h3 className="font-black text-zinc-900 dark:text-white text-xs tracking-tight hover:text-emerald-500 transition-colors cursor-pointer">
                    {post.author.name}
                </h3>
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                    {new Date(post.created_at).toLocaleDateString()}
                </p>
                </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="p-1 text-zinc-300 hover:text-rose-500 transition-colors"
              title="Report Post"
            >
              <Flag size={14} />
            </button>
            <MoreHorizontal size={18} className="text-zinc-400 cursor-pointer" />
          </div>
        </div>

        {/* Post Content */}
        <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-5">
          {post.content}
        </p>

        {/* Linked Resource Display */}
        {post.linked_resource && (
          <div className="space-y-2 mb-5">
            <Link href={`/resources/${post.linked_resource.id}-${post.linked_resource.title}`} className="flex items-center justify-between p-3.5 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-lg group transition-colors hover:border-emerald-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm text-emerald-500 transition-colors">
                  <LinkIcon size={14} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-zinc-800 dark:text-zinc-200 tracking-tight uppercase">
                    {post.linked_resource.title}
                  </p>
                  <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.1em] mt-0.5">
                    Linked Repository
                  </p>
                </div>
              </div>
              <button className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest hover:underline px-3">
                View Resource
              </button>
            </Link>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-6">
            <button
              onClick={() => toggleLikeMutation.mutate(post.id)}
              disabled={toggleLikeMutation.isPending}
              className={`flex items-center gap-2 text-[10px] font-black transition-colors ${post.engagement.user_has_liked ? "text-rose-500" : "text-zinc-400 hover:text-rose-500"}`}
            >
              <Heart
                size={16}
                fill={post.engagement.user_has_liked ? "currentColor" : "none"}
              />
              {post.engagement.likes_count}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-2 text-[10px] font-black transition-colors ${isExpanded ? "text-emerald-500" : "text-zinc-400 hover:text-emerald-500"}`}
            >
              <MessageSquare size={16} /> {post.engagement.comments_count}
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <Bookmark
            size={16}
            className="text-zinc-400 hover:text-emerald-500 transition-colors cursor-pointer"
          />
        </div>
      </div>

      {/* Expanded Comments Section */}
      {isExpanded && (
        <div className="bg-zinc-50/30 dark:bg-zinc-900/10 px-7 py-6 border-t border-zinc-100 dark:border-zinc-800/60">
          {/* Top-Level Comment Input */}
          <div className="flex gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-emerald-600 flex items-center justify-center text-sm text-white shadow-md shadow-emerald-500/20">
              ⚡
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleAddComment(null, commentInput)
                }
                disabled={addCommentMutation.isPending}
                placeholder="Add a comment..."
                className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-xs focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleAddComment(null, commentInput)}
                disabled={addCommentMutation.isPending}
                className="px-4 py-2 bg-zinc-900 dark:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest disabled:opacity-50"
              >
                {addCommentMutation.isPending && !commentInput ? "..." : "Post"}
              </button>
            </div>
          </div>

          {/* Render Comment Tree from React Query Data */}
          {/* ✅ INTEGRATED: Using isFetchingComments here */}
          {isFetchingComments ? (
            <div className="flex justify-center py-4 text-zinc-400">
              <Loader2 className="animate-spin" size={16} />
            </div>
          ) : commentsData?.comments && commentsData.comments.length > 0 ? (
            <div className="space-y-2">
              {commentsData.comments.map((comment: any) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={(parentId, text) => handleAddComment(parentId, text)}
                />
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center py-4">
              No comments yet. Start the conversation.
            </p>
          )}
        </div>
      )}
      
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={post.id}
        targetType="post"
      />
    </article>
  );
};
