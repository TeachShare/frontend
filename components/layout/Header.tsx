  "use client";
  import React, { useEffect, useState, useRef } from "react";
  import {
    Search,
    Bell,
    Settings,
    Menu,
    RefreshCw,
    MessageSquare,
    Star,
    Loader2,
  } from "lucide-react";
  import { useTheme } from "next-themes";
  import { useUser } from "@/hooks/useUser";

  interface HeaderProps {
    onMenuClick: () => void;
  }

  export const Header = ({ onMenuClick }: HeaderProps) => {
    // 1. ALL HOOKS MUST BE AT THE TOP
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { data: user, isLoading, isError }: any = useUser();
    const notifRef = useRef<HTMLDivElement>(null);

    // Use for profile
    const seed = `${user?.teacher_info?.id ?? "0"}-${user?.teacher_info?.last_name ?? "Xasler"}`;
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        user: "Maria Santos",
        avatar: "Maria",
        action: "remixed your resource",
        target: "Algebra Fundamentals",
        time: "10m ago",
        icon: RefreshCw,
        iconColor: "text-purple-500",
        unread: true,
      },
      {
        id: 2,
        user: "David Chen",
        avatar: "David",
        action: "commented on",
        target: "Biology Lab Safety",
        time: "1h ago",
        icon: MessageSquare,
        iconColor: "text-blue-500",
        unread: true,
      },
      {
        id: 3,
        user: "Priya Singh",
        avatar: "Priya",
        action: "left a 5-star review on",
        target: "History Timeline Project",
        time: "2h ago",
        icon: Star,
        iconColor: "text-yellow-500",
        unread: false,
      },
    ]);

    useEffect(() => {
      setMounted(true);
      const handleClickOutside = (event: MouseEvent) => {
        if (
          notifRef.current &&
          !notifRef.current.contains(event.target as Node)
        ) {
          setIsNotifOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 2. NOW WE CAN SAFELY RETURN EARLY
    if (isLoading) {
      return (
        <header className="h-[64px] bg-white dark:bg-[#090a0c] border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between px-4 lg:px-8"></header>
      );
    }

    // 3. Helper functions
    const loadMore = () => {
      if (isLoadingMore) return;
      setIsLoadingMore(true);
      setTimeout(() => {
        const moreNotifs = [
          {
            id: Date.now(),
            user: "Teacher Bot",
            avatar: "Bot",
            action: "shared a collection with you",
            target: "Unit 4 Quiz Bank",
            time: "5h ago",
            icon: MessageSquare,
            iconColor: "text-emerald-500",
            unread: false,
          },
          {
            id: Date.now() + 1,
            user: "Alex Martinez",
            avatar: "Alex",
            action: "started following you",
            target: "",
            time: "Yesterday",
            icon: Star,
            iconColor: "text-blue-400",
            unread: false,
          },
        ];
        setNotifications((prev) => [...prev, ...moreNotifs]);
        setIsLoadingMore(false);
      }, 800);
    };

    const isDark = mounted ? resolvedTheme === "dark" : true;

    const toggleTheme = () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
      <header className="h-[64px] bg-white dark:bg-[#090a0c] border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between px-4 lg:px-8 shrink-0 transition-colors duration-300 relative z-50">
        <div className="flex items-center flex-1 max-w-2xl">
          <button
            onClick={onMenuClick}
            className="p-2 mr-2 text-zinc-500 dark:text-zinc-400 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="relative w-full max-w-xl">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              size={15}
            />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-full py-1.5 pl-10 pr-4 text-[13px] text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          <div className="flex items-center space-x-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-1.5 rounded-lg transition-colors ${isNotifOpen ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-[#090a0c]"></span>
              </button>

              {isNotifOpen && (
                <div className="fixed inset-x-4 sm:inset-x-auto sm:absolute sm:right-0 top-[70px] sm:top-full sm:mt-2 sm:w-96 bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Notifications
                    </h3>
                    <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:opacity-80">
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-[70vh] sm:max-h-[480px] overflow-y-auto overscroll-contain scrollbar-hide">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex items-start gap-3 p-4 border-b border-zinc-50 dark:border-zinc-800/30 cursor-pointer transition-colors ${notif.unread ? "bg-blue-50/30 dark:bg-blue-500/5" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/20"}`}
                      >
                        <div className="relative shrink-0">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.avatar}`}
                            className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                            alt=""
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-[#121417] rounded-full flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <notif.icon size={12} className={notif.iconColor} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-sm leading-snug text-zinc-700 dark:text-zinc-300">
                            <span className="font-bold text-zinc-900 dark:text-white">
                              {notif.user}
                            </span>{" "}
                            {notif.action}
                            {notif.target && (
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200 ml-1">
                                &quot;{notif.target}&quot;
                              </span>
                            )}
                          </p>
                          <p
                            className={`text-[11px] mt-1 ${notif.unread ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-500"}`}
                          >
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full shrink-0 mt-3" />
                        )}
                      </div>
                    ))}

                    <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/10">
                      <button
                        onClick={loadMore}
                        disabled={isLoadingMore}
                        className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                      >
                        {isLoadingMore ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          "See older notifications"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Settings size={18} />
            </button>

            <div
              onClick={toggleTheme}
              className={`w-10 h-5 rounded-full relative ml-2 cursor-pointer border transition-colors duration-300 ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-zinc-200 border-zinc-300"}`}
            >
              <div
                className={`absolute top-[3px] w-3 h-3 rounded-full transition-all duration-300 ${isDark ? "right-1 bg-emerald-500" : "left-1 bg-zinc-500"}`}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-3 border-l border-zinc-200 dark:border-zinc-800 pl-4 h-8 transition-colors">
            <div className="text-right hidden sm:block">
              {/* Added optional chaining here so it doesn't crash if user is null */}
              <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none">
                {user?.teacher_info?.last_name || "Teacher"}
              </p>
              <p className="text-[10px] text-zinc-500 font-medium mt-1">
                Software Instructor
              </p>
            </div>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
              alt="User"
            />
          </div>
        </div>
      </header>
    );
  };
