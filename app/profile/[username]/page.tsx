"use client";
import React, { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  Download, 
  Heart, 
  Mail, 
  CheckCircle,
  Clock,
  GraduationCap,
  MoreVertical,
  Edit2,
  Activity as ActivityIcon,
  Loader2,
  Flag
} from 'lucide-react';
import Layout from "@/components/layout/Layout";
import { useTeacherProfile, useTeacherResources, useToggleFollow, useTeacherActivity } from "@/hooks/useTeacher";
import { useUser } from "@/hooks/useUser";
import { SkeletonProfileHeader, SkeletonProfileResourceCard } from "@/components/sections/profile/ProfileSkeletons";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getAvatarUrl } from "@/lib/utils";
import { ReportModal } from "@/components/sections/resources/detail/ReportModal";

  const UsersIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );

  const ActivityItem = ({ activity }: any) => {
  const router = useRouter();
  const dateStr = activity.created_at ? formatDistanceToNow(parseISO(activity.created_at), { addSuffix: true }) : "recently";

  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121212] transition-all">
      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
        <ActivityIcon size={18} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="text-zinc-900 dark:text-white font-medium text-sm">
            {activity.description}
          </p>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{dateStr}</span>
        </div>
        {activity.collection_id && (
          <button 
            onClick={() => router.push(`/resources/${activity.collection_id}`)}
            className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Resource →
          </button>
        )}
      </div>
    </div>
  );
  };

const TabButton = ({ active, onClick, label, count }: any) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-1 text-sm font-semibold transition-all relative ${active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
  >
    <div className="flex items-center gap-2">
      {label}
      {count && <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${active ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-white/10 text-zinc-500 dark:text-gray-400'}`}>{count}</span>}
    </div>
    {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
  </button>
);


const ResourceCard = ({ resource }: any) => (
  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121212] p-5 flex flex-col group hover:scale-[1.01] transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
          {resource.is_published ? 'Published' : 'Draft'}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
          {resource.type}
        </span>
      </div>
      <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><MoreVertical size={18} /></button>
    </div>

    <h3 className="text-xl font-bold mb-1 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors cursor-pointer">{resource.title}</h3>
    <p className="text-sm text-zinc-500 mb-4">{resource.category} • {resource.grade}</p>

    <div className="flex flex-wrap gap-2 mb-6">
      {resource.tags?.map((tag: string) => (
        <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-gray-400 border border-zinc-200 dark:border-white/5">#{tag}</span>
      ))}
    </div>

    <div className="mt-auto border-t border-zinc-100 dark:border-white/5 pt-4 flex items-center justify-between text-xs text-zinc-500">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1"><Download size={14} /> {resource.downloads || 0}</span>
        <span className="flex items-center gap-1"><Heart size={14} /> {resource.likes || 0}</span>
      </div>
      <div className="flex items-center gap-1"><Clock size={14} /> Updated {new Date(resource.updated_at).toLocaleDateString()}</div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3">
       <button className="py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2">
         View Resource
       </button>
       <button 
         disabled={!resource.allow_remixing}
         className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
           !resource.allow_remixing
           ? "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed"
           : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5"
         }`}
       >
         {!resource.allow_remixing ? "Remix Disabled" : "Clone"}
       </button>
    </div>
  </div>
);

const ProfileContent = () => {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
    
    const [activeTab, setActiveTab] = useState('resources');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const { data: profileResponse, isLoading: profileLoading } = useTeacherProfile(username);
    const teacherData = profileResponse?.data;
    const teacherId = teacherData?.id;

    const { data: resourcesResponse, isLoading: resourcesLoading } = useTeacherResources(teacherId);
    const { data: activityResponse, isLoading: activityLoading } = useTeacherActivity(teacherId);
    const { data: currentUser } = useUser();
    const toggleFollow = useToggleFollow();

    const isOwnProfile = currentUser?.id === teacherId;
    const resources = resourcesResponse?.data.resources || [];
    const activities = activityResponse?.activities || [];

    if (profileLoading) {
        return (
            <main className="flex-1 p-8 transition-colors duration-300">
                <div className="max-w-6xl mx-auto">
                    <SkeletonProfileHeader />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(2)].map((_, i) => <SkeletonProfileResourceCard key={i} />)}
                    </div>
                </div>
            </main>
        );
    }

    if (!teacherData) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Educator not found</h2>
                <p className="text-zinc-500 dark:text-gray-500">The profile you are looking for does not exist.</p>
            </div>
        );
    }

    const stats = [
        { label: "Resources", count: teacherData.stats?.resources || 0, icon: <BookOpen size={18} /> },
        { label: "Downloads", count: "0", icon: <Download size={18} /> },
        { label: "Followers", count: teacherData.stats?.followers || 0, icon: <UsersIcon size={18} /> },
        { label: "Following", count: teacherData.stats?.following || 0, icon: <UsersIcon size={18} /> }
    ];

    const seed = `${teacherData.id}-${teacherData.last_name}`;

    return (
        <main className="flex-1 p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* PROFILE HEADER CARD */}
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121212] mb-8 transition-colors duration-300">
                    <div className="h-40 bg-gradient-to-r from-emerald-900/40 via-blue-900/40 to-purple-900/40 relative">
                        {isOwnProfile && (
                            <button className="absolute bottom-4 right-4 bg-white/20 dark:bg-black/40 backdrop-blur-md p-2 rounded-lg text-sm border border-white/20 dark:border-white/10 text-white hover:bg-white/30 dark:hover:bg-black/60 transition-all flex items-center gap-2">
                                <Edit2 size={14} /> Edit Cover
                            </button>
                        )}
                    </div>
                    
                    <div className="px-8 pb-8 -mt-12 relative flex flex-col md:flex-row items-end gap-6">
                        <div className="relative">
                            <img 
                                src={getAvatarUrl(teacherData.profile_image_url, teacherData.first_name, teacherData.id, 'avataaars')}
                                className="w-32 h-32 rounded-3xl border-4 border-white dark:border-[#121212] object-cover shadow-2xl bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300" 
                                alt="Profile"
                            />
                            {teacherData.is_verified && (
                                <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-1 border-2 border-white dark:border-black">
                                    <CheckCircle size={16} className="text-white dark:text-black" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{teacherData.first_name} {teacherData.last_name}</h1>
                                <p className="text-emerald-600 dark:text-emerald-400 font-medium">{teacherData.role || "Educator"}</p>
                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0">
                                {!isOwnProfile && (
                                    <>
                                        <button 
                                            onClick={() => setIsReportModalOpen(true)}
                                            className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"
                                            title="Report Profile"
                                        >
                                          <Flag size={18} />
                                        </button>
                                        <button 
                                            onClick={() => router.push(`/messages?partnerId=${teacherId}`)}
                                            className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                                        >
                                            <Mail size={18} /> Message
                                        </button>
                                        <button 
                                            onClick={() => toggleFollow.mutate(teacherData.id)}
                                            disabled={toggleFollow.isPending}
                                            className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 group min-w-[120px] justify-center ${
                                                teacherData.is_following 
                                                ? "bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-rose-500/10 hover:border-rose-500/50 hover:text-rose-500" 
                                                : "bg-blue-600 hover:bg-blue-500 text-white"
                                            }`}
                                        >
                                            {toggleFollow.isPending ? "..." : (
                                                teacherData.is_following ? (
                                                    <>
                                                        <span className="group-hover:hidden">Following</span>
                                                        <span className="hidden group-hover:inline">Unfollow</span>
                                                    </>
                                                ) : "Follow"
                                            )}
                                        </button>
                                    </>
                                )}
                                {isOwnProfile && (
                                    <button className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all">
                                        <Edit2 size={18} /> Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <p className="text-zinc-500 dark:text-gray-400 leading-relaxed text-lg italic">
                                {teacherData.bio ? `"${teacherData.bio}"` : "No bio provided."}
                            </p>
                            
                            <div className="flex flex-wrap gap-y-4 gap-x-8">
                                <div className="flex items-center gap-2 text-zinc-600 dark:text-gray-300">
                                    <GraduationCap size={18} className="text-emerald-600 dark:text-emerald-500" />
                                    <span>{teacherData.institution || "Independent Educator"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600 dark:text-gray-300">
                                    <Clock size={18} className="text-emerald-600 dark:text-emerald-500" />
                                    <span>Joined {new Date(teacherData.joined_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.05] flex flex-col items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-all">
                                    <div className="text-emerald-600 dark:text-emerald-500 mb-1">{stat.icon}</div>
                                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{stat.count}</span>
                                    <span className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TABS & RESOURCES GRID */}
                <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-8">
                        <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} label="Resources" count={resources?.length && resources.length.toString()} />
                        <TabButton active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} label="Collections" />
                        <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} label="Activity" />
                    </div>
                </div>

                {activeTab === 'resources' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resourcesLoading ? (
                            [...Array(2)].map((_, i) => <SkeletonProfileResourceCard key={i} />)
                        ) : resources.length > 0 ? (
                            resources.map((resource: any) => (
                                <ResourceCard key={resource.collection_id} {...resource} />
                            ))
                        ) : (
                            <div className="col-span-2 py-12 text-center text-zinc-500 dark:text-gray-500">No public resources found.</div>
                        )}
                    </div>
                )}
                {activeTab === 'activity' && (
                    <div className="space-y-4">
                        {activityLoading ? (
                            <div className="text-center py-12">
                                <Loader2 size={24} className="animate-spin mx-auto text-emerald-500" />
                            </div>
                        ) : activities.length > 0 ? (
                            activities.map((activity: any) => (
                                <ActivityItem key={activity.id} activity={activity} />
                            ))
                        ) : (
                            <div className="py-12 text-center text-zinc-500 dark:text-gray-500">No recent activity found.</div>
                        )}
                    </div>
                )}
            </div>

            <ReportModal 
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={teacherId}
                targetType="teacher"
            />
        </main>
    );
};

const EducatorProfile = () => {
    return (
        <Layout>
            <Suspense fallback={
                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <SkeletonProfileHeader />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[...Array(2)].map((_, i) => <SkeletonProfileResourceCard key={i} />)}
                        </div>
                    </div>
                </main>
            }>
                <ProfileContent />
            </Suspense>
        </Layout>
    );
};

export default EducatorProfile;
