"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Paperclip,
  X,
  FolderOpen,
  ChevronDown,
  Link as LinkIcon,
  Check,
  Loader2,
} from "lucide-react";
import { Attachment } from "@/types/community";
import { useMyResources } from "@/hooks/useResources";
import { Button } from "@/components/ui/Button";

interface PostCreatorProps {
  onPublish: (content: string, attachments: Attachment[]) => void;
  isPublishing?: boolean;
}

export const PostCreator = ({ onPublish, isPublishing = false }: PostCreatorProps) => {
  const [postText, setPostText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: resourcesResponse, isLoading: isLoadingResources } =
    useMyResources();
  const myResources = resourcesResponse?.resources || [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleResourceSelection = (res: any) => {
    setAttachments((prev) => {
      const resourceIdStr = String(res.id);

      if (prev.find((a) => a.resourceId === resourceIdStr)) {
        return prev.filter((a) => a.resourceId !== resourceIdStr);
      }

      const formattedName = `${resourceIdStr}-${(res.title || res.name || "resource")
        .toLowerCase()
        .replace(/\s+/g, "-")}`;

      return [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 11),
          resourceId: resourceIdStr,
          name: formattedName,
          type: "library",
          size: 0,
        },
      ];
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let currentLocalAttachments = attachments.filter((a) => a.type === "local");
    let currentLocalSize = currentLocalAttachments.reduce(
      (acc, curr) => acc + curr.size,
      0,
    );
    let newLocalAttachments: Attachment[] = [];

    for (const file of files) {
      if (
        currentLocalAttachments.length + newLocalAttachments.length < 3 &&
        currentLocalSize + file.size <= 25 * 1024 * 1024
      ) {
        newLocalAttachments.push({
          id: Math.random().toString(36).substring(2, 11),
          name: file.name,
          type: "local",
          size: file.size,
        });
        currentLocalSize += file.size;
      }
    }
    setAttachments((prev) => [...prev, ...newLocalAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePublish = () => {
    if (!postText.trim() && attachments.length === 0) return;
    onPublish(postText, attachments);
    setPostText("");
    setAttachments([]);
  };

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-sm shadow-sm mb-8 overflow-visible">
      <div className="p-5">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Announce a department update or share a resource link..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg p-4 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none min-h-[100px] resize-none"
        />

        {attachments.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20"
              >
                {att.type === "library" ? (
                  <LinkIcon size={12} className="text-emerald-500" />
                ) : (
                  <Paperclip size={12} className="text-zinc-400" />
                )}
                <span className="text-[10px] font-bold text-zinc-700 dark:text-emerald-400 uppercase tracking-tight">
                  {att.name}
                </span>
                <button
                  onClick={() =>
                    setAttachments((prev) =>
                      prev.filter((a) => a.id !== att.id),
                    )
                  }
                  className="ml-1 text-zinc-400 hover:text-rose-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800/60 relative">
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <Paperclip size={16} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[10px] font-black px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 uppercase tracking-widest hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <FolderOpen size={14} className="text-emerald-500" /> Resource
              Library{" "}
              <ChevronDown
                size={12}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-72 bg-white dark:bg-[#16191d] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                    Shared Repositories
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto p-1.5">
                  {isLoadingResources ? (
                    <div className="flex justify-center py-6 text-emerald-500">
                      <Loader2 className="animate-spin" size={20} />
                    </div>
                  ) : myResources.length === 0 ? (
                    <p className="text-center text-xs text-zinc-500 py-4">
                      No resources found.
                    </p>
                  ) : (
                    myResources.map((res: any, index: number) => {
                      const realId = res.id || res.collection_id || res.resource_id || index;
                      const realTitle = res.title || res.name || "Untitled Resource";
                      
                      const isSelected = !!attachments.find(
                        (a) => a.resourceId === String(realId)
                      );

                      return (
                        <button
                          key={realId}
                          onClick={() =>
                            toggleResourceSelection({
                              ...res,
                              id: realId,
                              title: realTitle,
                            })
                          }
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                            isSelected
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <LinkIcon
                              size={14}
                              className={
                                isSelected ? "text-emerald-500" : "text-zinc-400"
                              }
                            />
                            <span className="text-xs font-bold truncate max-w-[180px]">
                              {realTitle}
                            </span>
                          </div>
                          {isSelected && <Check size={14} />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={handlePublish}
          variant="emerald"
          size="md"
          isLoading={isPublishing}
          className="px-6 py-2.5 tracking-[0.2em]"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};