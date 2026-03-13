"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Files,
  Users,
  Archive,
  Wand2,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Plus,
  Share2,
  Filter,
  Calendar,
  Eye,
  FileText,
  Activity,
  Link as LinkIcon,
  Clock,
  Menu,
  X,
  ChevronRight,
  Pencil,
  MoreHorizontal,
  Pin,
  Trash2,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Check,
  LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// --- Interfaces ---

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  type: string;
  unread: boolean;
}

interface ConversationItemProps extends Omit<Conversation, "id"> {
  active: boolean;
  onClick: () => void;
}

interface MessageBubbleProps {
  text: string;
  time: string;
  isMe: boolean;
  status?: "Sent" | "Delivered" | "Seen";
}

// --- Components ---

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
      active
        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
    }`}
  >
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

const ConversationItem: React.FC<ConversationItemProps> = ({
  name,
  lastMessage,
  active,
  type,
  unread,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`p-4 cursor-pointer transition-all border-l-2 ${
      active
        ? "bg-blue-50/50 dark:bg-zinc-800/40 border-emerald-500"
        : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/20"
    }`}
  >
    <div className="flex justify-between items-start mb-1">
      <h4
        className={`text-[13px] font-bold ${active ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-200"}`}
      >
        {name}
      </h4>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tighter">
          {type}
        </span>
        {unread && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
      </div>
    </div>
    <p
      className={`text-[11px] line-clamp-1 leading-relaxed font-medium ${unread ? "text-zinc-900 dark:text-zinc-300 font-bold" : "text-zinc-500 dark:text-zinc-500"}`}
    >
      {lastMessage}
    </p>
  </div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  time,
  isMe,
  status,
}) => (
  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-6`}>
    <div
      className={`max-w-[80%] p-4 rounded-xl text-[13px] leading-relaxed transition-colors duration-300 ${
        isMe
          ? "bg-blue-600 text-white border border-blue-700 dark:bg-blue-600/20 dark:text-blue-100 dark:border-blue-500/20 rounded-tr-none"
          : "bg-white text-zinc-800 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-200 dark:border-zinc-700/30 rounded-tl-none shadow-sm dark:shadow-none"
      }`}
    >
      {text}
    </div>
    <div className="flex items-center space-x-2 mt-1.5 px-1">
      <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-medium tracking-tight transition-colors duration-300">
        {time}
      </span>
      {isMe && status && (
        <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest leading-none transition-colors duration-300">
          • {status}
        </span>
      )}
    </div>
  </div>
);

const Page = () => {
  const [activeConv, setActiveConv] = useState<string>("Daryl");
  const [message, setMessage] = useState<string>("");

  const conversations: Conversation[] = [
    {
      id: "Daryl",
      name: "Daryl",
      lastMessage: "I added a scaffolded version of the quadratic.",
      type: "Direct • Music",
      unread: true,
    },
    {
      id: "Tinachan",
      name: "Tinachan",
      lastMessage: "Can we polish the design.",
      type: "Group • Planning",
      unread: false,
    },
    {
      id: "Andrea",
      name: "Andrea",
      lastMessage: "Aight!",
      type: "Direct • Coaching",
      unread: false,
    },
    {
      id: "Xasler",
      name: "Xasler",
      lastMessage: '"Uploading the mural reflection prompts now"',
      type: "Group • Design",
      unread: false,
    },
    {
      id: "Nhoj",
      name: "Nhoj",
      lastMessage: "Here's the updated speaking task DB for Unit.",
      type: "Group • Dept",
      unread: false,
    },
    {
      id: "Momoy",
      name: "Momoy",
      lastMessage: "Can we model how the choice board looks?",
      type: "Group • Collab",
      unread: false,
    },
  ];

  const currentConversation = conversations.find((c) => c.id === activeConv);

  return (
    <Layout>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 dark:bg-transparent transition-colors duration-300">
        {/* Messages Layout */}
        <div className="flex-1 flex overflow-hidden p-6 lg:p-8 space-x-6">
          {/* Left Column: List of conversations */}
          <div className="w-80 flex flex-col space-y-4 shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
                Messages
              </h1>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
                  <Filter size={18} />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center space-x-2 transition-all">
                  <Pencil size={14} />
                  <span>New message</span>
                </button>
              </div>
            </div>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-500 -mt-1 font-medium transition-colors duration-300">
              Keep up with collaboration threads and feedback.
            </p>

            <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex-1 flex flex-col overflow-hidden transition-colors duration-300">
              <div className="p-4 space-y-4 shrink-0 border-b border-zinc-100 dark:border-transparent transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                      Conversations
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors duration-300">
                      12 unread
                    </span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors duration-300">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors duration-300"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/40 rounded-lg py-1.5 pl-9 pr-3 text-[12px] focus:outline-none focus:border-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold transition-colors duration-300">
                  <div className="flex space-x-4">
                    <button className="text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1 transition-colors duration-300">
                      All
                    </button>
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 pb-1 transition-colors duration-300">
                      Unread
                    </button>
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 pb-1 transition-colors duration-300">
                      Pinned
                    </button>
                  </div>
                  <span className="text-zinc-400 dark:text-zinc-600 uppercase text-[9px] tracking-widest transition-colors duration-300">
                    Sort: Recent
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/30 scrollbar-hide transition-colors duration-300">
                {conversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    name={conv.name}
                    lastMessage={conv.lastMessage}
                    type={conv.type}
                    active={activeConv === conv.id}
                    unread={conv.unread}
                    onClick={() => setActiveConv(conv.id)}
                  />
                ))}
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border-t border-zinc-200 dark:border-zinc-800/30 shrink-0 transition-colors duration-300">
                <p className="text-[10px] text-zinc-500 dark:text-zinc-500 leading-relaxed italic transition-colors duration-300">
                  Conversations sync across devices. Pin key threads for quick
                  access.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Active Thread */}
          <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden shadow-md dark:shadow-2xl transition-colors duration-300">
            {/* Thread Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/40 flex items-center justify-between bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 transition-colors duration-300">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConv}`}
                    alt="Avatar"
                  />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight transition-colors duration-300">
                    {currentConversation?.name || activeConv}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 font-medium transition-colors duration-300">
                    {currentConversation?.type.split("•")[1] || "Contributor"} •{" "}
                    <span className="text-emerald-600 dark:text-emerald-500">
                      Active now
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                  <Pin size={14} className="text-zinc-500" />
                  <span>Pin</span>
                </button>
                <button className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                  <Files size={14} className="text-zinc-500" />
                  <span>View shared</span>
                </button>
                <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 rounded-lg transition-colors duration-300">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              <div className="flex flex-col items-center mb-10">
                <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
                  Today
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-zinc-500 mb-8 italic transition-colors duration-300">
                  <Files
                    size={12}
                    className="text-emerald-600 dark:text-emerald-500"
                  />
                  <span>Thread: Resource Planning • 6 resources shared</span>
                </div>
              </div>

              <MessageBubble
                isMe={false}
                text="Have you checked the latest updates on the curriculum module?"
                time="09:18"
              />

              <MessageBubble
                isMe={true}
                text="Yes! I just went through the quadratic scaffolds. They look much cleaner now."
                time="09:21"
                status="Seen"
              />

              <MessageBubble
                isMe={false}
                text="Perfect. I will upload some additional tutorials for the beginner group soon."
                time="09:24"
              />

              <MessageBubble
                isMe={true}
                text="That sounds great. Let me know when they are live."
                time="09:27"
                status="Seen"
              />

              {/* Typing Indicator */}
              <div className="flex items-center space-x-3 mt-8">
                <div className="flex space-x-1 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-60"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-30"></div>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic font-medium transition-colors duration-300">
                  {activeConv} is typing...
                </p>
              </div>
            </div>

            {/* Message Input Container */}
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/40 bg-white dark:bg-zinc-900/10 shrink-0 transition-colors duration-300">
              <div className="relative bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl flex flex-col p-2 group focus-within:border-emerald-500/40 dark:focus-within:border-emerald-500/40 transition-colors shadow-inner">
                <div className="flex items-center space-x-2 mb-2 px-2">
                  <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors">
                    <Smile size={18} />
                  </button>
                  <textarea
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setMessage(e.target.value)
                    }
                    placeholder={`Reply to ${activeConv}...`}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] py-1.5 resize-none h-10 overflow-hidden text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 font-medium transition-colors duration-300"
                  />
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-500 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors">
                      <Plus size={18} />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white p-2.5 rounded-lg shadow-md dark:shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95 transition-all">
                      <Send size={18} />
                    </button>
                  </div>
                </div>

                {/* Shortcuts/Quick Chips */}
                <div className="flex items-center justify-between px-2 pt-1 border-t border-zinc-200 dark:border-zinc-800/40 mt-1 transition-colors duration-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mr-1 transition-colors duration-300">
                      Shortcuts:
                    </span>
                    {["/thank", "/share", "/schedule"].map((chip) => (
                      <button
                        key={chip}
                        className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 dark:hover:text-zinc-300 dark:hover:border-zinc-700 transition-colors font-bold shadow-sm dark:shadow-none"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-zinc-400 dark:text-zinc-600 italic font-medium transition-colors duration-300">
                    Private Conversation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;
