"use client";
import React from "react";
import { CheckCircle2, XCircle, Clock, User, ArrowRightLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Props {
  proposals: any[];
  onApprove: (versionId: number) => void;
  onReject: (versionId: number) => void;
  isProcessing: boolean;
  resourceId: string;
}

export const ProposalReviewSection = ({ proposals, onApprove, onReject, isProcessing, resourceId }: Props) => {
  if (proposals.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#121417] border border-amber-200 dark:border-amber-900/30 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-amber-50 dark:bg-amber-500/5 px-6 py-4 border-b border-amber-100 dark:border-amber-900/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <AlertCircle size={18} />
          <h3 className="text-sm font-bold uppercase tracking-widest">Pending Collaborator Proposals</h3>
        </div>
        <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
          {proposals.length} Action Needed
        </span>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
        {proposals.map((p) => (
          <div key={p.version_id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Proposal Info */}
              <div className="col-span-12 lg:col-span-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">Version {p.version_no}</span>
                  <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                    <User size={12} /> {p.author}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                    <Clock size={12} /> {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
                   &quot;{p.notes || "No revision notes provided for this proposal."}&quot;
                </p>
              </div>

              {/* Actions */}
              <div className="col-span-12 lg:col-span-6 flex items-center justify-end gap-3">
                <Link 
                  href={`/resources/${resourceId}/history/compare?with=${p.version_no}`}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl text-[11px] font-bold uppercase hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800"
                >
                  <ArrowRightLeft size={14} /> Review Changes
                </Link>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onReject(p.version_id)}
                  isLoading={isProcessing}
                  leftIcon={<XCircle size={14} />}
                  className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-500/20"
                >
                  Reject
                </Button>

                <Button 
                  variant="emerald" 
                  size="sm" 
                  onClick={() => onApprove(p.version_id)}
                  isLoading={isProcessing}
                  leftIcon={<CheckCircle2 size={14} />}
                  className="shadow-emerald-500/20"
                >
                  Approve & Publish
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
