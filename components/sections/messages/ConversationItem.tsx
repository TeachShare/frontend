import React from "react";
import { ConversationItemProps } from "@/types/messages";

export const ConversationItem: React.FC<ConversationItemProps> = ({
  name, lastMessage, active, type, unread, onClick,
}) => (
  <div onClick={onClick} className={`p-4 cursor-pointer transition-all border-l-2 ${active ? "bg-blue-50/50 dark:bg-zinc-800/40 border-emerald-500" : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/20"}`}>
    <div className="flex justify-between items-start mb-1">
      <h4 className={`text-[13px] font-bold ${active ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-200"}`}>{name}</h4>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tighter">{type}</span>
        {unread && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
      </div>
    </div>
    <p className={`text-[11px] line-clamp-1 leading-relaxed font-medium ${unread ? "text-zinc-900 dark:text-zinc-300 font-bold" : "text-zinc-500 dark:text-zinc-500"}`}>
      {lastMessage}
    </p>
  </div>
);