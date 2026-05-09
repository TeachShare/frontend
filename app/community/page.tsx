"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Share2, Loader2, Users } from "lucide-react";
import { Attachment, Post } from "@/types/community";
import { PostCreator } from "@/components/sections/community/PostCreator";
import { PostItem } from "@/components/sections/community/PostItem";
import { EducatorCard } from "@/components/sections/community/EducatorCard";
import { InviteModal } from "@/components/sections/community/InviteModal";
import { useFeed, useCreatePost } from "@/hooks/useCommunity"; 
import { useTeachers } from "@/hooks/useTeacher";
import { SkeletonPostItem, SkeletonEducatorCard } from "@/components/sections/community/CommunitySkeletons";

const Page = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover'>('feed');
  const [educatorsPage, setEducatorsPage] = useState(1);
  const [allEducators, setAllEducators] = useState<any[]>([]);
  const [inviteConfig, setInviteConfig] = useState<{id: number, name: string} | null>(null);
  
  const { data: feedData, isLoading: feedLoading, isError: feedError } = useFeed(1);
  const { data: teachersRes, isLoading: teachersLoading, isFetching: teachersFetching } = useTeachers(educatorsPage);
  const createPostMutation = useCreatePost();

  React.useEffect(() => {
    if (teachersRes?.teachers) {
      if (educatorsPage === 1) {
        setAllEducators(teachersRes.teachers);
      } else {
        setAllEducators(prev => {
          const newTeachers = teachersRes.teachers.filter(
            (nt: any) => !prev.some(pt => pt.id === nt.id)
          );
          return [...prev, ...newTeachers];
        });
      }
    }
  }, [teachersRes, educatorsPage]);

  const handleAddPost = async (content: string, attachments: Attachment[]) => {
    const libraryAtt = attachments.find(a => a.type === 'library');
    createPostMutation.mutate({ 
      content, 
      linkedResourceId: libraryAtt?.resourceId 
    });
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090b0d] min-h-screen">
        <div className="max-w-4xl mx-auto w-full min-h-screen flex flex-col pt-10 px-4 sm:px-0">
          
          <div className="mb-8 flex items-end justify-between border-b border-zinc dark:border-zinc-800 pb-4">
            <div className="flex gap-8">
                <button 
                    onClick={() => setActiveTab('feed')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'feed' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
                >
                    Community Feed
                    {activeTab === 'feed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                </button>
                <button 
                    onClick={() => setActiveTab('discover')}
                    className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'discover' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
                >
                    Discover Educators
                    {activeTab === 'discover' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                </button>
            </div>
            <div className="pb-4">
                {activeTab === 'feed' ? <Share2 size={20} className="text-emerald-500" /> : <Users size={20} className="text-emerald-500" />}
            </div>
          </div>
          
          {activeTab === 'feed' ? (
              <>
                <PostCreator onPublish={handleAddPost} isPublishing={createPostMutation.isPending} />
                <div className="space-y-6 pb-20">
                    {feedLoading ? (
                      [...Array(3)].map((_, i) => <SkeletonPostItem key={i} />)
                    ) : feedError ? (
                    <p className="text-center text-rose-500 py-10">Failed to load feed.</p>
                    ) : (
                    feedData?.posts.map((post: Post) => (
                        <PostItem key={post.id} post={post} />
                    ))
                    )}
                </div>
              </>
          ) : (
              <div className="space-y-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allEducators.length > 0 ? (
                        allEducators.map((teacher: any) => (
                            <EducatorCard 
                                key={teacher.id}
                                id={teacher.id}
                                name={`${teacher.first_name} ${teacher.last_name}`}
                                role={teacher.role}
                                avatar={teacher.profile_image_url}
                                resources={teacher.stats.resources.toString()}
                                followers={teacher.stats.followers.toString()}
                                tags={teacher.tags || []}
                                specialTags={teacher.is_verified ? ["Verified"] : []}
                                following={teacher.is_following}
                                onInvite={(id, name) => setInviteConfig({ id, name })}
                            />
                        ))
                    ) : !teachersLoading && (
                        <div className="col-span-2 flex flex-col items-center justify-center py-32 text-zinc-500/50">
                            <Users size={48} className="mb-4 opacity-20" />
                            <p className="italic text-sm">No educators to discover right now.</p>
                        </div>
                    )}
                    
                    {teachersLoading && educatorsPage === 1 && (
                        [...Array(4)].map((_, i) => <SkeletonEducatorCard key={i} />)
                    )}
                </div>

                {teachersRes?.has_next && (
                    <div className="flex justify-center pt-8">
                        <button 
                            onClick={() => setEducatorsPage(prev => prev + 1)}
                            disabled={teachersFetching}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-3 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {teachersFetching && <Loader2 size={16} className="animate-spin" />}
                            {teachersFetching ? "Loading..." : "Load More Educators"}
                        </button>
                    </div>
                )}
              </div>
          )}
        </div>

        <InviteModal 
          isOpen={!!inviteConfig}
          onClose={() => setInviteConfig(null)}
          teacherId={inviteConfig?.id || 0}
          teacherName={inviteConfig?.name || ""}
        />
      </main>
    </Layout>
  );
};

export default Page;
