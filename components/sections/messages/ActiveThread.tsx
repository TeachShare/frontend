"use client";
import React, { useState, useEffect, useRef } from "react";
import { Files, Pin, Trash2, Smile, Paperclip, Plus, Send, Loader2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { useThread } from "@/hooks/useMessages";
import { useUser } from "@/hooks/useUser";
import { Message } from "@/types/messages";

interface Props {
  conversation?: any;
  sendMessage: (receiverId: number, content: string) => void;
}

export const ActiveThread = ({ conversation, sendMessage }: Props) => {
  const [text, setText] = useState<string>("");
  const { data: threadRes, isLoading } = useThread(conversation?.id);
  const { data: user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = threadRes?.data || [];

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !conversation?.id) return;
    sendMessage(conversation.id, text);
    setText("");
  };

  if (!conversation) return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-zinc-50 dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl h-full">
        <h3 className="text-lg font-bold">Select a conversation</h3>
        <p>Pick a colleague to start collaborating</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-md dark:shadow-2xl transition-colors duration-300 h-full">
      {/* Thread Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/40 flex items-center justify-between bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 transition-colors duration-300">
            <img src={conversation.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.id}`} alt="Avatar" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight transition-colors duration-300">{conversation.name}</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 font-medium transition-colors duration-300">
              <span className="text-emerald-600 dark:text-emerald-500">Active now</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
            <Pin size={18} />
          </button>
          <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-2 scrollbar-hide min-h-0">
        {isLoading ? (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        ) : messages.length > 0 ? (
            messages.map((msg) => (
                <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    isMe={msg.sender_id === user?.id} 
                />
            ))
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 italic">
                <p>No messages yet. Send a friendly wave! 👋</p>
            </div>
        )}
      </div>

      {/* Message Input Container */}
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/40 bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
        <div className="relative bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex flex-col p-2 group focus-within:border-emerald-500/40 dark:focus-within:border-emerald-500/40 transition-colors shadow-inner">
          <div className="flex items-center space-x-2 mb-2 px-2">
            <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"><Smile size={18} /></button>
            <textarea
              value={text} 
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                  }
              }}
              placeholder={`Reply to ${conversation.name}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] py-1.5 resize-none h-10 overflow-hidden text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 font-medium transition-colors duration-300"
            />
            <div className="flex items-center space-x-1">
              <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"><Paperclip size={18} /></button>
              <button 
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white p-2.5 rounded-lg shadow-md dark:shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95 transition-all"
              >
                  <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
