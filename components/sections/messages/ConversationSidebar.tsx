import React from "react";
import { Search, Filter, Pencil, MoreHorizontal } from "lucide-react";
import { Conversation } from "@/types/messages";
import { ConversationItem } from "./ConversationItem";

interface Props {
  conversations: Conversation[];
  activeConv: string;
  setActiveConv: (id: string) => void;
}

export const ConversationSidebar = ({ conversations, activeConv, setActiveConv }: Props) => {
  const totalUnread = conversations.reduce((acc, curr) => acc + curr.unread_count, 0);

  return (
    <div className="w-80 flex flex-col space-y-4 shrink-0 h-full">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Messages</h1>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
            <Filter size={18} />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center space-x-2 transition-all">
            <Pencil size={14} /> <span>New message</span>
          </button>
        </div>
      </div>
      <p className="text-[12px] text-zinc-500 dark:text-zinc-500 -mt-1 font-medium transition-colors duration-300 shrink-0">
        Keep up with collaboration threads and feedback.
      </p>

      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex-1 flex flex-col overflow-hidden transition-colors duration-300 min-h-0">
        <div className="p-4 space-y-4 shrink-0 border-b border-zinc-100 dark:border-transparent transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[14px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Conversations</span>
              {totalUnread > 0 && (
                <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors duration-300">
                    {totalUnread} unread
                </span>
              )}
            </div>
            <button className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors duration-300" size={14} />
            <input type="text" placeholder="Search messages..." className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/40 rounded-lg py-1.5 pl-9 pr-3 text-[12px] focus:outline-none focus:border-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/30 scrollbar-hide transition-colors duration-300">
          {conversations.length > 0 ? (
            conversations.map((conv) => (
                <ConversationItem
                key={conv.id} 
                conversation={conv}
                active={activeConv === conv.id.toString()} 
                onClick={() => setActiveConv(conv.id.toString())}
                />
            ))
          ) : (
            <div className="p-8 text-center text-[11px] text-zinc-500 italic">
                No active threads. Start a new conversation to collaborate!
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border-t border-zinc-200 dark:border-zinc-800/30 shrink-0 transition-colors duration-300">
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 leading-relaxed italic transition-colors duration-300">
            Conversations sync across devices. Pin key threads for quick access.
          </p>
        </div>
      </div>
    </div>
  );
};
