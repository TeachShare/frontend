import React from "react";
import { ConversationItemProps } from "@/types/messages";

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation, active, onClick,
}) => (
  <div onClick={onClick} className={`p-4 cursor-pointer transition-all border-l-2 ${active ? "bg-blue-50/50 dark:bg-zinc-800/40 border-emerald-500" : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/20"}`}>
    <div className="flex justify-between items-start mb-1">
      <h4 className={`text-[13px] font-bold ${active ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-200"}`}>{conversation.name}</h4>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tighter">
            {conversation.timestamp ? new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
        </span>
        {conversation.unread_count > 0 && (
            <div className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {conversation.unread_count}
            </div>
        )}
      </div>
    </div>
    <p className={`text-[11px] line-clamp-1 leading-relaxed font-medium ${conversation.unread_count > 0 ? "text-zinc-900 dark:text-zinc-300 font-bold" : "text-zinc-500 dark:text-zinc-500"}`}>
      {conversation.last_message}
    </p>
  </div>
);