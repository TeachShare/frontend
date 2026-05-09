"use client";
import React from "react";
import { Plus, Check, Mail, Users } from "lucide-react";
import { Educator } from "@/types/community";
import Link from "next/link";
import { getAvatarUrl } from "@/lib/utils";

import { useToggleFollow } from "@/hooks/useTeacher";

interface EducatorCardProps extends Educator {
    onInvite?: (id: number, name: string) => void;
}

export const EducatorCard = ({
  id,
  username,
  name,
  role,
  avatar,
  resources,
  followers,
  tags,
  specialTags,
  following = false,
  onInvite
}: EducatorCardProps) => {
  const toggleFollow = useToggleFollow();
  const profileLink = `/profile/${username || id}`;

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group duration-300">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <Link href={profileLink}>
                <img
                src={getAvatarUrl(avatar, name, id, 'avataaars')}
                alt={name}
                className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300 cursor-pointer"
                />
            </Link>
            <div>
              <Link href={profileLink}>
                <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
                    {name}
                </h4>
              </Link>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-tight mt-0.5 transition-colors duration-300">
                {role || "Educator"}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleFollow.mutate(id)}
            disabled={toggleFollow.isPending}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 group/btn ${
              following
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-500"
                : "bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/20"
            }`}
          >
            {toggleFollow.isPending ? "..." : (
                following ? (
                    <>
                        <Check size={14} className="group-hover/btn:hidden" /> 
                        <span className="group-hover/btn:hidden">Following</span>
                        <span className="hidden group-hover/btn:inline text-rose-500">Unfollow</span>
                    </>
                ) : (
                    <>
                        <Plus size={14} /> <span>Follow</span>
                    </>
                )
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {specialTags?.map((tag, i) => (
            <span
              key={i}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                tag === "Top contributor"
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/10"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 border border-transparent"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Resources
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{resources}</p>
          </div>
          <div className="text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-lg py-2 transition-colors duration-300">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold tracking-tighter transition-colors duration-300">
              Followers
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 transition-colors duration-300">{followers}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/50 transition-colors duration-300">
        <div className="flex items-center gap-3">
            <Link href={profileLink}>
                <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-300">
                    View profile
                </button>
            </Link>
            <Link href={`${profileLink}?message=true`}>
                <button className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:text-emerald-500 transition-colors duration-300 flex items-center gap-1">
                    <Mail size={12} /> Message
                </button>
            </Link>
        </div>
        <button 
          onClick={() => onInvite?.(id, name)}
          className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1.5"
        >
          <Users size={12} /> Invite to collaborate
        </button>
      </div>
    </div>
  );
};