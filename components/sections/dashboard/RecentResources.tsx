"use client";
import React, { useState } from "react";
import { Eye, Pencil, Share2, FileText, Activity, Users, Link as LinkIcon, FileJson, LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

const getTypeIcon = (type: string): LucideIcon => {
  const t = type?.toLowerCase() || "";
  if (t.includes("activity")) return Activity;
  if (t.includes("worksheet") || t.includes("pdf") || t.includes("document")) return FileText;
  if (t.includes("group")) return Users;
  if (t.includes("link")) return LinkIcon;
  return FileJson;
};

interface RecentResourcesProps {
  resources?: any[];
}

export const RecentResources = ({ resources = [] }: RecentResourcesProps) => {
  const [activeTab, setActiveTab] = useState("Mine");
  const router = useRouter();

  const filteredResources = resources.filter(res => {
    if (activeTab === "Mine") return true;
    if (activeTab === "Drafts") return !res.is_published;
    if (activeTab === "Shared with me") return false; // Not implemented yet
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
      <div className="p-5 flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800/30 gap-4 transition-colors duration-300">
        <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Recent resources
        </h3>
        <div className="flex bg-zinc-100 dark:bg-zinc-950/60 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800/60 transition-colors duration-300">
          {["Mine", "Drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-md text-[11px] font-bold transition-all ${
                activeTab === tab
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 Last activity">Last activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/20 transition-colors duration-300">
            {filteredResources.length > 0 ? (
              filteredResources.slice(0, 5).map((item, idx) => {
                const Icon = getTypeIcon(item.type);
                return (
                  <tr
                    key={item.collection_id || idx}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {item.grade} · {item.likes} likes
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      {item.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1.5 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800/60 w-fit transition-colors duration-300">
                        <Icon size={12} className="text-zinc-500" />
                        <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
                          {item.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] text-zinc-500">
                      {item.updated_at ? formatDistanceToNow(new Date(item.updated_at), { addSuffix: true }) : "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3 text-zinc-400 dark:text-zinc-500">
                        <button 
                          onClick={() => {
                            const slug = `${item.collection_id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            router.push(`/resources/${slug}`);
                          }}
                          className="p-1 hover:text-blue-500 transition-colors"
                          title="View Resource"
                        >
                          <Eye size={15} />
                        </button>
                        <button 
                          onClick={() => {
                            const slug = `${item.collection_id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                            router.push(`/resources/create?edit=${slug}`);
                          }}
                          className="p-1 hover:text-emerald-500 transition-colors"
                          title="Edit Resource"
                        >
                          <Pencil size={13} />
                        </button>
                        <button className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors" title="Share">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-zinc-500 text-sm italic">
                  No resources found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/30 text-center bg-zinc-50 dark:bg-zinc-950/20 transition-colors duration-300">
        <p className="text-[11px] text-zinc-500 dark:text-zinc-600">
          Showing activity from your recent uploads. Go to{" "}
          <span 
            onClick={() => router.push('/resources')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold cursor-pointer transition-colors"
          >
            My Resources
          </span>{" "}
          for full history.
        </p>
      </div>
    </div>
  );
};
