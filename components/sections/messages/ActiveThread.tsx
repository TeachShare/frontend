"use client";
import React, { useState } from "react";
import { Files, Pin, Trash2, Smile, Paperclip, Plus, Send } from "lucide-react";
import { Conversation } from "@/types/messages";
import { MessageBubble } from "./MessageBubble";

interface Props {
  conversation?: Conversation;
}

export const ActiveThread = ({ conversation }: Props) => {
  const [message, setMessage] = useState<string>("");

  if (!conversation) return <div className="flex-1 flex items-center justify-center">Select a conversation</div>;

  return (
    <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-md dark:shadow-2xl transition-colors duration-300">
      {/* Thread Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/40 flex items-center justify-between bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 transition-colors duration-300">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.id}`} alt="Avatar" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight transition-colors duration-300">{conversation.name}</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 font-medium transition-colors duration-300">
              {conversation.type.split("•")[1] || "Contributor"} • <span className="text-emerald-600 dark:text-emerald-500">Active now</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
            <Pin size={14} className="text-zinc-500" /> <span>Pin</span>
          </button>
          <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
            <Files size={14} className="text-zinc-500" /> <span>View shared</span>
          </button>
          <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 rounded-lg transition-colors duration-300">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        <div className="flex flex-col items-center mb-10">
          <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 shadow-sm dark:shadow-none transition-colors duration-300">Today</div>
          <div className="flex items-center space-x-2 text-[11px] text-zinc-500 mb-8 italic transition-colors duration-300">
            <Files size={12} className="text-emerald-600 dark:text-emerald-500" />
            <span>Thread: Resource Planning • 6 resources shared</span>
          </div>
        </div>

        <MessageBubble isMe={false} text="Have you checked the latest updates on the curriculum module?" time="09:18" />
        <MessageBubble isMe={true} text="Yes! I just went through the quadratic scaffolds. They look much cleaner now." time="09:21" status="Seen" />
        <MessageBubble isMe={false} text="Perfect. I will upload some additional tutorials for the beginner group soon." time="09:24" />
        <MessageBubble isMe={true} text="That sounds great. Let me know when they are live." time="09:27" status="Seen" />

        {/* Typing Indicator */}
        <div className="flex items-center space-x-3 mt-8">
          <div className="flex space-x-1 animate-pulse">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-60"></div>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-30"></div>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic font-medium transition-colors duration-300">{conversation.name} is typing...</p>
        </div>
      </div>

      {/* Message Input Container */}
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/40 bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
        <div className="relative bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex flex-col p-2 group focus-within:border-emerald-500/40 dark:focus-within:border-emerald-500/40 transition-colors shadow-inner">
          <div className="flex items-center space-x-2 mb-2 px-2">
            <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"><Smile size={18} /></button>
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={`Reply to ${conversation.name}...`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] py-1.5 resize-none h-10 overflow-hidden text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 font-medium transition-colors duration-300"
            />
            <div className="flex items-center space-x-1">
              <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"><Paperclip size={18} /></button>
              <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"><Plus size={18} /></button>
              <button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white p-2.5 rounded-lg shadow-md dark:shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95 transition-all"><Send size={18} /></button>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 pt-1 border-t border-zinc-200 dark:border-zinc-800/40 mt-1 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mr-1 transition-colors duration-300">Shortcuts:</span>
              {["/thank", "/share", "/schedule"].map((chip) => (
                <button key={chip} className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 dark:hover:text-zinc-300 dark:hover:border-zinc-700 transition-colors font-bold shadow-sm dark:shadow-none">{chip}</button>
              ))}
            </div>
            <p className="text-[9px] text-zinc-400 dark:text-zinc-600 italic font-medium transition-colors duration-300">Private Conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
};