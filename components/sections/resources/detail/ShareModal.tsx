"use client";
import React, { useState } from "react";
import { X, Copy, Check, Twitter, Facebook, Link2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal = ({ isOpen, onClose, title }: Props) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    let url = "";
    const text = encodeURIComponent(`Check out this resource on TeachShare: ${title}`);
    const encodedUrl = encodeURIComponent(shareUrl);

    if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
    } else if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }

    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
              Share Resource
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Resource Link
              </p>
              <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <Link2 size={16} className="text-zinc-400 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="bg-transparent border-none focus:ring-0 text-xs text-zinc-600 dark:text-zinc-400 truncate w-full"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shrink-0"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialShare("twitter")}
                className="flex items-center justify-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              >
                <Twitter size={16} className="text-blue-400" />
                Twitter
              </button>
              <button
                onClick={() => handleSocialShare("facebook")}
                className="flex items-center justify-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              >
                <Facebook size={16} className="text-blue-600" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
