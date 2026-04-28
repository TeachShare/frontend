"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { 
  MessageSquare, Heart, Paperclip, MoreHorizontal, 
  Bookmark, X, FolderOpen, Link as LinkIcon,
  Check, ChevronDown, FileText, Share2, CornerDownRight
} from "lucide-react";

interface Attachment {
  id: string;
  resourceId?: string;
  name: string;
  type: 'local' | 'library';
  size: number;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface Post {
  id: number;
  author: { name: string; role: string; avatar: string };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  attachments: Attachment[];
}

const MOCK_RESOURCES = [
  { id: 'res-1', name: 'CS101_Course_Syllabus_v2' },
  { id: 'res-2', name: 'Advanced_React_Lab_Manual' },
  { id: 'res-3', name: 'Anomaly_Detection_Case_Study' },
  { id: 'res-4', name: 'Teaching_Methodology_Guide' },
];

const CommentItem = ({ 
  comment, 
  depth = 0, 
  onReply 
}: { 
  comment: Comment; 
  depth?: number; 
  onReply: (parentId: string, text: string) => void 
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className={`mt-5 ${depth > 0 ? 'ml-8 border-l border-zinc-200 dark:border-zinc-800/80 pl-5' : ''}`}>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm shadow-sm">
          {comment.avatar}
        </div>
        <div className="flex-1">
          <div className="bg-zinc-50/50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[10px] font-black text-zinc-900 dark:text-zinc-200 uppercase tracking-tight">{comment.author}</h4>
              <span className="text-[9px] font-bold text-zinc-400 uppercase">{comment.timestamp}</span>
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
      {comment.replies && comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} onReply={onReply} />
      ))}
    </div>
  );
};

const Page = () => {
  const [postText, setPostText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: number, parentId: string | null, text: string) => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      author: "You",
      avatar: "⚡",
      content: text,
      timestamp: "Just now",
      replies: []
    };

    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id !== postId) return post;

      if (!parentId) {
        return { ...post, comments: [...post.comments, newComment] };
      } else {
        const updateReplies = (comments: Comment[]): Comment[] => {
          return comments.map(c => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            if (c.replies) {
              return { ...c, replies: updateReplies(c.replies) };
            }
            return c;
          });
        };
        return { ...post, comments: updateReplies(post.comments) };
      }
    }));

    if (!parentId) setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: { name: "Dr. Aris Thorne", role: "Department Head", avatar: "🎓" },
      content: "I've finalized the new version control standards for our shared teaching materials. Please link the latest repository versions when updating your syllabi.",
      timestamp: "2h ago",
      likes: 18,
      attachments: [{ id: 'att-1', resourceId: 'res-1', name: 'CS101_Course_Syllabus_v2', type: 'library', size: 0 }],
      comments: [
        { 
          id: "c1", 
          author: "Prof. Sarah Miller", 
          avatar: "👩‍🏫", 
          content: "Great update. This will help with departmental consistency.", 
          timestamp: "1h ago",
          replies: []
        }
      ]
    }
  ]);

  const toggleResourceSelection = (res: typeof MOCK_RESOURCES[0]) => {
    setAttachments((prev): Attachment[] => {
      const exists = prev.find(a => a.resourceId === res.id);
      if (exists) return prev.filter(a => a.resourceId !== res.id);
      return [...prev, {
        id: Math.random().toString(36).substring(2, 11),
        resourceId: res.id,
        name: res.name,
        type: 'library',
        size: 0 
      }];
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let currentLocalAttachments = attachments.filter(a => a.type === 'local');
    let currentLocalSize = currentLocalAttachments.reduce((acc, curr) => acc + curr.size, 0);
    let newLocalAttachments: Attachment[] = [];
    
    for (const file of files) {
      if (
        (currentLocalAttachments.length + newLocalAttachments.length) < 3 && 
        (currentLocalSize + file.size) <= 25 * 1024 * 1024
      ) {
        newLocalAttachments.push({
          id: Math.random().toString(36).substring(2, 11),
          name: file.name,
          type: 'local',
          size: file.size
        });
        currentLocalSize += file.size;
      }
    }
    setAttachments(prev => [...prev, ...newLocalAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddPost = () => {
    if (!postText.trim() && attachments.length === 0) return;
    const newPost: Post = {
      id: Date.now(),
      author: { name: "You", role: "Lead Educator", avatar: "⚡" },
      content: postText,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      attachments: attachments
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setAttachments([]);
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090b0d] min-h-screen">
        <div className="max-w-4xl mx-auto w-full min-h-screen flex flex-col pt-10 px-4 sm:px-0">
          
          <div className="mb-10 flex items-end justify-between border-b border-zinc dark:border-zinc-800 pb-8">
            <div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                Community Feed <Share2 size={24} className="text-emerald-500" />
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">
                Centralized Educator Collaboration & Discovery
              </p>
            </div>
          </div>
          
          {/* Post Creation Area */}
          <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-sm shadow-sm mb-8 overflow-visible">
            <div className="p-5">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Announce a department update or share a resource link..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg p-4 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none min-h-[100px] resize-none"
              />
              
              {attachments.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">
                      {att.type === 'library' ? <LinkIcon size={12} className="text-emerald-500" /> : <Paperclip size={12} className="text-zinc-400" />}
                      <span className="text-[10px] font-bold text-zinc-700 dark:text-emerald-400 uppercase tracking-tight">{att.name}</span>
                      <button onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))} className="ml-1 text-zinc-400 hover:text-rose-500 transition-colors"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800/60 relative">
              <div className="flex items-center gap-3">
                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <Paperclip size={16} />
                </button>
                
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-[10px] font-black px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 uppercase tracking-widest hover:border-emerald-500/50 transition-all shadow-sm"
                  >
                    <FolderOpen size={14} className="text-emerald-500" /> Resource Library <ChevronDown size={12} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 bottom-full mb-2 w-72 bg-white dark:bg-[#16191d] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Shared Repositories</p>
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1.5">
                        {MOCK_RESOURCES.map((res) => {
                          const isSelected = !!attachments.find(a => a.resourceId === res.id);
                          return (
                            <button key={res.id} onClick={() => toggleResourceSelection(res)} className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${isSelected ? 'bg-emerald-500/10 text-emerald-500' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}>
                              <div className="flex items-center gap-3">
                                <LinkIcon size={14} className={isSelected ? 'text-emerald-500' : 'text-zinc-400'} />
                                <span className="text-xs font-bold truncate max-w-[180px]">{res.name}</span>
                              </div>
                              {isSelected && <Check size={14} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleAddPost} className="px-6 py-2.5 bg-zinc-900 dark:bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-90 active:scale-95 shadow-md shadow-emerald-500/10">Publish</button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6 pb-20">
            {posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-sm overflow-hidden shadow-sm">
                <div className="p-7 pb-4">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex gap-3.5">
                      <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg shadow-inner">{post.author.avatar}</div>
                      <div>
                        <h3 className="font-black text-zinc-900 dark:text-white text-xs tracking-tight">{post.author.name}</h3>
                        <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">{post.author.role} • {post.timestamp}</p>
                      </div>
                    </div>
                    <MoreHorizontal size={18} className="text-zinc-400 cursor-pointer" />
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-5">{post.content}</p>

                  {post.attachments.length > 0 && (
                    <div className="space-y-2 mb-5">
                      {post.attachments.map((att) => (
                        <div key={att.id} className="flex items-center justify-between p-3.5 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 rounded-lg group transition-colors hover:border-emerald-500/30">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:text-emerald-500 transition-colors">
                              {att.type === 'library' ? <LinkIcon size={14} /> : <FileText size={14} />}
                            </div>
                            <div>
                              <p className="text-[11px] font-black text-zinc-800 dark:text-zinc-200 tracking-tight uppercase">{att.name}</p>
                              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.1em] mt-0.5">{att.type === 'library' ? 'Linked Repository' : 'Direct Upload'}</p>
                            </div>
                          </div>
                          <button className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest hover:underline px-3">{att.type === 'library' ? 'View Resource' : 'Download'}</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800/60">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-zinc-400 hover:text-rose-500 text-[10px] font-black transition-colors"><Heart size={16} /> {post.likes}</button>
                      <button 
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center gap-2 text-[10px] font-black transition-colors ${expandedComments[post.id] ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'}`}
                      >
                        <MessageSquare size={16} /> {post.comments.length}
                        <ChevronDown size={12} className={`transition-transform duration-200 ${expandedComments[post.id] ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <Bookmark size={16} className="text-zinc-400 hover:text-emerald-500 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* Collapsible Comment Section */}
                {expandedComments[post.id] && (
                  <div className="bg-zinc-50/30 dark:bg-zinc-900/10 px-7 py-6 border-t border-zinc-100 dark:border-zinc-800/60 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <h5 className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Discussion Thread</h5>
                      <button onClick={() => toggleComments(post.id)} className="text-[9px] font-black text-zinc-400 hover:text-rose-500 uppercase tracking-widest transition-colors">Close Thread</button>
                    </div>

                    {/* Top-level comment input */}
                    <div className="flex gap-3 mb-8">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-emerald-600 flex items-center justify-center text-sm text-white shadow-md shadow-emerald-500/20">⚡</div>
                      <div className="flex-1 flex gap-2">
                        <input 
                          type="text" 
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id, null, commentInputs[post.id])}
                          placeholder="Add a comment..." 
                          className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500/50"
                        />
                        <button 
                          onClick={() => handleAddComment(post.id, null, commentInputs[post.id])}
                          className="px-4 py-2 bg-zinc-900 dark:bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-transform active:scale-95"
                        >
                          Post
                        </button>
                      </div>
                    </div>

                    {post.comments.length > 0 ? (
                      <div className="space-y-2">
                        {post.comments.map((comment) => (
                          <CommentItem 
                            key={comment.id} 
                            comment={comment} 
                            onReply={(parentId, text) => handleAddComment(post.id, parentId, text)} 
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center py-4">No comments yet. Start the conversation.</p>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;