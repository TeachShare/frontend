import React from "react";
import { MessageBubbleProps } from "@/types/messages";
import { FileIcon, Download } from "lucide-react";

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  const isImage = message.file_type?.startsWith('image/');

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-6`}>
      <div className={`max-w-[80%] p-4 rounded-xl text-[13px] leading-relaxed transition-colors duration-300 ${
        isMe ? "bg-blue-600 text-white border border-blue-700 dark:bg-blue-600/20 dark:text-blue-100 dark:border-blue-500/20 rounded-tr-none" 
             : "bg-white text-zinc-800 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-200 dark:border-zinc-700/30 rounded-tl-none shadow-sm dark:shadow-none"
      }`}>
        {message.file_url && (
          <div className="mb-3">
            {isImage ? (
              <a href={message.file_url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={message.file_url} 
                  alt={message.file_name} 
                  className="rounded-lg max-h-60 w-auto object-contain bg-zinc-100 dark:bg-zinc-900"
                />
              </a>
            ) : (
              <a 
                href={message.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  isMe ? "bg-blue-700/50 border-blue-400/30 text-white" 
                       : "bg-zinc-100 border-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300"
                }`}
              >
                <div className={`p-2 rounded-md ${isMe ? "bg-blue-800" : "bg-white dark:bg-zinc-800"}`}>
                  <FileIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{message.file_name}</p>
                  <p className="text-[10px] opacity-70">Click to download</p>
                </div>
                <Download size={16} className="shrink-0" />
              </a>
            )}
          </div>
        )}
        {message.content && <p>{message.content}</p>}
      </div>
      <div className="flex items-center space-x-2 mt-1.5 px-1">
        <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-medium tracking-tight transition-colors duration-300">
            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {isMe && message.is_read && (
          <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest leading-none transition-colors duration-300">
            • Seen
          </span>
        )}
      </div>
    </div>
  );
};