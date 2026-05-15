"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Share2, History, Edit3, ArrowLeft, Globe, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  resource: any;
  isOwner?: boolean;
  canEdit?: boolean;
  isPublishing?: boolean;
  onPublish?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  isDeleting?: boolean;
}

export const DetailHeader = ({ resource, isOwner = false, canEdit = false, isPublishing = false, onPublish, onDelete, onShare, isDeleting = false }: Props) => {
  const router = useRouter();

  const isDraft = !resource.is_published;

  const handleEdit = () => {
    const slug = `${resource.collection_id}-${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/create?edit=${slug}`);
  };

  const handleVersionHistory = () => {
    const slug = `${resource.collection_id}-${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    router.push(`/resources/${slug}/history`);
  };

  return (
    <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-widest transition-colors duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => router.back()} 
          className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1"
        >
          <ArrowLeft size={12}/> Back
        </button>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-300 transition-colors duration-300">
            {isDraft ? "Draft View" : "View Resource"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Share is visible to everyone */}
        <Button variant="ghost" size="sm" onClick={onShare} leftIcon={<Share2 size={14}/>}>
          Share
        </Button>

        {/* Conditional Rendering based on permissions */}
        {(isOwner || canEdit) && (
          <>
            <Button variant="ghost" size="sm" onClick={handleVersionHistory} leftIcon={<History size={14}/>}>
              History
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleEdit} leftIcon={<Edit3 size={14}/>}>
              Edit
            </Button>

            {isOwner && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDelete} 
                isLoading={isDeleting}
                leftIcon={<Trash2 size={14}/>}
                className="text-rose-500 border-rose-500/30 hover:bg-rose-500 hover:text-white dark:hover:text-zinc-950 transition-all"
              >
                Delete
              </Button>
            )}

            {isDraft && (
              <Button 
                variant="emerald" 
                size="sm" 
                onClick={onPublish} 
                isLoading={isPublishing}
                leftIcon={<Globe size={14}/>}
                className="shadow-emerald-500/10"
              >
                Publish Now
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};