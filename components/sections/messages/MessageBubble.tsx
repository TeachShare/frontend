import React from "react";
import { MessageBubbleProps } from "@/types/messages";

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, isMe, status }) => (
  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-6`}>
    <div className={`max-w-[80%] p-4 rounded-xl text-[13px] leading-relaxed transition-colors duration-300 ${
      isMe ? "bg-blue-600 text-white border border-blue-700 dark:bg-blue-600/20 dark:text-blue-100 dark:border-blue-500/20 rounded-tr-none" 
           : "bg-white text-zinc-800 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-200 dark:border-zinc-700/30 rounded-tl-none shadow-sm dark:shadow-none"
    }`}>
      {text}
    </div>
    <div className="flex items-center space-x-2 mt-1.5 px-1">
      <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-medium tracking-tight transition-colors duration-300">{time}</span>
      {isMe && status && (
        <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest leading-none transition-colors duration-300">
          • {status}
        </span>
      )}
    </div>
  </div>
);