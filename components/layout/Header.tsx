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
    User as UserIcon,
    BookOpen,
    ArrowRight,
    Shield
    } from "lucide-react";    import { useTheme } from "next-themes";
    import { useUser } from "@/hooks/useUser";
    import { useNotifications } from "@/hooks/useNotifications";
    import Link from "next/link";
    import { useRouter } from "next/navigation";
    import { getAvatarUrl } from "@/lib/utils";
    import { api } from "@/lib/axios";
  interface HeaderProps {
    onMenuClick: () => void;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'remix': return RefreshCw;
      case 'comment': return MessageSquare;
      case 'review': return Star;
      case 'like': return Star; // Or another icon
      case 'download': return Bell; // Or Download if available
      default: return Bell;
    }
  };

  const getIconColorForType = (type: string) => {
    switch (type) {
      case 'remix': return "text-purple-500";
      case 'comment': return "text-blue-500";
      case 'review': return "text-yellow-500";
      case 'like': return "text-rose-500";
      case 'download': return "text-emerald-500";
      default: return "text-zinc-500";
    }
  };

  export const Header = ({ onMenuClick }: HeaderProps) => {
    // 1. ALL HOOKS MUST BE AT THE TOP
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { data: user, isLoading: isUserLoading }: any = useUser();
    const { data: notifData, markRead, markAllRead } = useNotifications();
    const router = useRouter();

    // Search States
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{resources: any[], users: any[]}>({resources: [], users: []});
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const notifications = notifData?.notifications || [];
    const unreadCount = notifData?.unread_count || 0;

    const notifRef = useRef<HTMLDivElement>(null);

    // Use for profile
    const seed = `${user?.id ?? "0"}-${user?.last_name ?? "User"}`;

    useEffect(() => {
      setMounted(true);
      const handleClickOutside = (event: MouseEvent) => {
        if (
          notifRef.current &&
          !notifRef.current.contains(event.target as Node)
        ) {
          setIsNotifOpen(false);
        }
        if (
          searchRef.current &&
          !searchRef.current.contains(event.target as Node)
        ) {
          setShowResults(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Search Handler
    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        if (searchQuery.length >= 2) {
          try {
            setIsSearching(true);
            const res = await api.get(`/resource_collection/search?q=${searchQuery}`);
            if (res.data.success) {
              setSearchResults({
                resources: res.data.resources,
                users: res.data.users
              });
              setShowResults(true);
            }
          } catch (err) {
            console.error("Global search failed", err);
          } finally {
            setIsSearching(false);
          }
        } else {
          setSearchResults({resources: [], users: []});
          setShowResults(false);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // 2. NOW WE CAN SAFELY RETURN EARLY
    if (isUserLoading) {
      return (
        <header className="h-[64px] bg-white dark:bg-[#090a0c] border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="lg:hidden p-2 mr-2">
              <div className="w-5 h-5 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="relative w-full max-w-xl">
               <div className="h-9 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-3 border-l border-zinc-200 dark:border-zinc-800 pl-4 h-8">
                <div className="text-right hidden sm:block space-y-2">
                   <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                   <div className="h-2 w-16 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse ml-auto" />
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
             </div>
          </div>
        </header>
      );
    }

    // 3. Helper functions
    const loadMore = () => {
      // Pagination logic could go here if implemented in useNotifications
      setIsLoadingMore(true);
      setTimeout(() => setIsLoadingMore(false), 1000);
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
          <div className="relative w-full max-w-xl" ref={searchRef}>
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              size={15}
            />
            <input
              type="text"
              placeholder="Search resources or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              className="w-full bg-zinc-100 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-full py-1.5 pl-10 pr-4 text-[13px] text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors"
            />  

            {/* Global Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[110]">
                <div className="max-h-[480px] overflow-y-auto p-2 space-y-4">
                  
                  {/* Resources Section */}
                  <div>
                    <h4 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-50 dark:border-zinc-800/50 mb-1">
                      Resources
                    </h4>
                    {searchResults.resources.length > 0 ? (
                      searchResults.resources.map((res: any, idx: number) => (
                        <button
                          key={`res-${res.collection_id}-${idx}`}
                          onClick={() => {
                            router.push(`/resources/${res.collection_id}-${res.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
                            setShowResults(false);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 rounded-xl transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                            <BookOpen size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 truncate group-hover:text-emerald-500 transition-colors">
                                {res.title}
                              </p>
                              {res.owner_id === user?.id && (
                                <span className="text-[8px] font-black uppercase px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                  Mine
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-zinc-500 uppercase font-medium">
                              {res.subject} • {res.grade}
                            </p>
                          </div>
                          <ArrowRight size={12} className="text-zinc-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))
                    ) : (
                      <p className="px-3 py-4 text-xs text-zinc-500 italic">No resources found matching &quot;{searchQuery}&quot;</p>
                    )}
                  </div>

                  {/* Users Section */}
                  <div>
                    <h4 className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-50 dark:border-zinc-800/50 mb-1">
                      Educators
                    </h4>
                    {searchResults.users.length > 0 ? (
                      searchResults.users.map((teacher: any, idx: number) => (
                        <button
                          key={`user-${teacher.teacher_id}-${idx}`}
                          onClick={() => {
                            router.push(`/profile/${teacher.username || teacher.teacher_id}`);
                            setShowResults(false);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 rounded-xl transition-colors text-left group"
                        >
                          <img
                            src={getAvatarUrl(teacher.profile_image_url, teacher.first_name, teacher.teacher_id, 'avataaars')}
                            className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white"
                            alt=""
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 truncate group-hover:text-blue-500 transition-colors">
                              {teacher.first_name} {teacher.last_name}
                            </p>
                            <p className="text-[10px] text-zinc-500 uppercase font-medium">
                              @{teacher.username || "teacher"} • {teacher.role || "Educator"}
                            </p>
                          </div>
                          <UserIcon size={12} className="text-zinc-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))
                    ) : (
                      <p className="px-3 py-4 text-xs text-zinc-500 italic">No educators found matching &quot;{searchQuery}&quot;</p>
                    )}
                  </div>

                </div>
                
                {isSearching && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-emerald-500" />
                  </div>
                )}
              </div>
            )}
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
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-[#090a0c]"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="fixed inset-x-4 sm:inset-x-auto sm:absolute sm:right-0 top-[70px] sm:top-full sm:mt-2 sm:w-96 bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Notifications
                    </h3>
                    <button 
                      onClick={() => markAllRead.mutate()}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:opacity-80"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-[70vh] sm:max-h-[480px] overflow-y-auto overscroll-contain scrollbar-hide">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notif: any) => {
                        const Icon = getIconForType(notif.type);
                        const iconColor = getIconColorForType(notif.type);
                        return (
                          <div
                            key={notif.id}
                            onClick={() => !notif.is_read && markRead.mutate(notif.id)}
                            className={`flex items-start gap-3 p-4 border-b border-zinc-50 dark:border-zinc-800/30 cursor-pointer transition-colors ${!notif.is_read ? "bg-blue-50/30 dark:bg-blue-500/5" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/20"}`}
                          >
                            <div className="relative shrink-0">
                              <img
                                src={getAvatarUrl(null, notif.user, notif.avatar, 'avataaars')}
                                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                                alt=""
                              />
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-[#121417] rounded-full flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                <Icon size={12} className={iconColor} />
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
                                className={`text-[11px] mt-1 ${!notif.is_read ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-500"}`}
                              >
                                {notif.time}
                              </p>
                            </div>
                            {!notif.is_read && (
                              <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500 rounded-full shrink-0 mt-3" />
                            )}
                          </div>
                        );
                      })
                    )}

                    {notifications.length > 0 && (
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
                    )}
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
            <Link href={`/profile/${user?.username || user?.id}`} className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-zinc-900 dark:text-white leading-none hover:text-emerald-500 transition-colors">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-[#8b949e] font-medium mt-1 uppercase tracking-tighter">
                  {user?.role || "Educator"}
                </p>
                </div>
                <img
                src={getAvatarUrl(user?.profile_image_url, user?.first_name, user?.id, 'avataaars')}
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-emerald-500 transition-colors"
                alt="User"
                />
            </Link>
          </div>
        </div>
      </header>
    );
  };
