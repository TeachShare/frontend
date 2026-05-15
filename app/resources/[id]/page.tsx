"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const TOAST_STYLE = {
  style: {
    minWidth: "280px",
    fontSize: "11px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderRadius: "12px",
    background: "#090a0c",
    color: "#fff",
    border: "1px solid #27272a",
    padding: "12px 16px",
  },
  success: {
    duration: 4000,
    iconTheme: { primary: "#10b981", secondary: "#fff" },
  },
  error: {
    duration: 5000,
    iconTheme: { primary: "#f43f5e", secondary: "#fff" },
  },
};

// Sections
import { DetailHeader } from "@/components/sections/resources/detail/DetailHeader";
import { DetailHero } from "@/components/sections/resources/detail/DetailHero";
import { DetailContent } from "@/components/sections/resources/detail/DetailContent";
import { DetailSidebar } from "@/components/sections/resources/detail/DetailSidebar";
import { ReviewSection } from "@/components/sections/resources/detail/ReviewSection";
import { RemixModal } from "@/components/sections/repository/RemixModal";
import { ShareModal } from "@/components/sections/resources/detail/ShareModal";
import { DeleteConfirmationModal } from "@/components/sections/resources/detail/DeleteConfirmationModal";
import { SkeletonResourceDetail } from "@/components/sections/resources/ResourceSkeletons";
import { ProposalReviewSection } from "@/components/sections/resources/detail/ProposalReviewSection";

const ResourceDetailView = () => {
  const { id } = useParams();
  const router = useRouter();

  // User State
  const { data: user, isLoading: isUserLoading } = useUser();

  // Core States
  const [resource, setResource] = useState<any>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isProcessingProposal, setIsProcessingProposal] = useState(false);

  // Social States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);

  // Modal States
  const [isRemixModalOpen, setIsRemixModalOpen] = useState(false);
  const [isRemixing, setIsRemixing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchResourceDetails = React.useCallback(async () => {
    try {
      const idStr = id as string;
      const collectionId = idStr.split("-")[0];
      
      let version_no = null;
      if (idStr.includes("-v")) {
         const parts = idStr.split("-v");
         if (parts.length > 1) {
            version_no = parts[1];
         }
      }

      const url = version_no 
        ? `/resource_collection/${collectionId}?version_no=${version_no}`
        : `/resource_collection/${collectionId}`;

      const [res, historyRes] = await Promise.all([
        api.get(url),
        api.get(`/resource_collection/${collectionId}/history`)
      ]);
      
      if (res.data.success) {
        const data = res.data.data;
        setResource(data);
        
        setLikesCount(data.likes || 0);
        setIsLiked(data.user_has_liked || false);
        setComments(data.comments || []); 
        
        if (historyRes.data.success) {
          setVersions(historyRes.data.data);
        }
      } else {
        setError("Resource not found.");
      }
    } catch (err) {
      console.error("Failed to fetch resource details", err);
      setError("Failed to load resource data.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchResourceDetails();
  }, [id, fetchResourceDetails]);

  // Social Handlers
  const handleLikeToggle = async () => {
    try {
      const collectionId = (id as string).split("-")[0];
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      await api.post(`/resource_collection/${collectionId}/like`);
    } catch (err) {
      console.error("Like failed", err);
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    }
  };

  const handleAddComment = async (reviewData: { rating: number, text: string }) => {
    try {
      const collectionId = (id as string).split("-")[0];
      const response = await api.post(`/resource_collection/${collectionId}/review`, reviewData);
      if (response.data.success) {
        setComments([response.data.data, ...comments]);
      }
    } catch (err) {
      console.error("Review submission failed", err);
      alert("Failed to post review.");
    }
  };

  // --- REMIX LOGIC ---
  const handleConfirmRemix = async () => {
    if (!resource) return;
    
    try {
      setIsRemixing(true);
      const collectionId = (id as string).split("-")[0];
      
      const response = await api.post(`/resource_collection/remix/${collectionId}`, {
        should_publish: false 
      });

      if (response.data.success) {
        const newId = response.data.collection_id;
        const cleanTitle = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        router.push(`/resources/create?edit=${newId}-${cleanTitle}`);
      }
    } catch (err) {
      console.error("Remix execution error:", err);
      alert("System failed to clone resource lineage.");
    } finally {
      setIsRemixing(false);
      setIsRemixModalOpen(false);
    }
  };

  const handlePublish = async () => {
    if (!resource) return;
    try {
      setIsPublishing(true);
      
      const submitData = new FormData();
      const payload = {
        title: resource.title,
        is_published: true,
        notes: "Published from detail view"
      };
      submitData.append("resource_data", JSON.stringify(payload));

      const collectionId = (id as string).split("-")[0];
      const response = await api.put(`/resource_collection/${collectionId}`, submitData);
      
      if (response.data.success) {
        toast.success("RESOURCE PUBLISHED: Your resource is now live.", TOAST_STYLE);
        setResource({ ...resource, is_published: true });
      }
    } catch (err: any) {
      console.error("Publish error:", err);
      toast.error(`ERROR: ${err.response?.data?.error || "Failed to publish"}`, TOAST_STYLE);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeleteResource = async () => {
    if (!resource || !id) return;

    const collectionId = (id as string).split("-")[0];

    try {
      setIsDeleting(true);
      const response = await api.delete(`/resource_collection/${collectionId}`);
      
      if (response.data.success) {
        toast.success("RESOURCE DELETED: Resource removed from your repository.", TOAST_STYLE);
        router.push("/repository");
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(`ERROR: ${err.response?.data?.error || "Failed to delete resource"}`, TOAST_STYLE);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleApprove = async (versionId?: number) => {
    const targetVersionId = versionId || resource?.version_id;
    if (!targetVersionId) return;
    try {
      setIsProcessingProposal(true);
      const res = await api.post(`/resource_collection/${resource.collection_id}/approve/${targetVersionId}`);
      if (res.data.success) {
        toast.success("Version approved and published!", TOAST_STYLE);
        fetchResourceDetails(); // Refresh everything
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Approval failed", TOAST_STYLE);
    } finally {
      setIsProcessingProposal(false);
    }
  };

  const handleReject = async (versionId?: number) => {
    const targetVersionId = versionId || resource?.version_id;
    if (!targetVersionId) return;
    if (!window.confirm("Are you sure you want to reject these proposed changes? This will delete this version permanently.")) return;
    
    try {
      setIsProcessingProposal(true);
      const res = await api.post(`/resource_collection/${resource.collection_id}/reject/${targetVersionId}`);
      if (res.data.success) {
        toast.success("Proposal rejected and removed.", TOAST_STYLE);
        fetchResourceDetails(); // Refresh everything
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Rejection failed", TOAST_STYLE);
    } finally {
      setIsProcessingProposal(false);
    }
  };

  const isOwner = user && resource?.owner_id === user.id;
  const isCollaborator = user && resource?.collaborators?.some((c: any) => c.teacher_id === user.id && c.role === 'editor');
  const isOpenCollaboration = resource?.collaboration_mode === 'everyone' && !!user;
  const canEdit = isOwner || isCollaborator || isOpenCollaboration;

  // Filter unapproved versions for owner review
  const pendingProposals = isOwner ? versions.filter(v => !v.is_approved) : [];

  if (isLoading || isUserLoading) {
    return (
      <Layout>
        <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] min-h-screen overflow-y-auto">
          <SkeletonResourceDetail />
        </main>
      </Layout>
    );
  }

  if (error || !resource) {
    return (
      <Layout>
        <div className="flex-1 bg-zinc-50 dark:bg-[#090a0c] flex flex-col items-center justify-center space-y-3">
          <span className="text-rose-500 font-bold text-lg">404</span>
          <span className="text-zinc-500 text-sm">{error || "Resource snapshot missing."}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] min-h-screen overflow-y-auto transition-colors duration-300">
        
        {/* Pending Approval Banner for Owner */}
        {isOwner && !resource.is_approved && (
          <div className="bg-amber-500 text-white px-6 py-3 flex items-center justify-between shadow-lg z-20 sticky top-0">
             <div className="flex items-center gap-3">
                <AlertCircle size={20} className="animate-pulse" />
                <div className="flex flex-col">
                   <p className="text-xs font-black uppercase tracking-widest">Pending Review</p>
                   <p className="text-[11px] font-bold opacity-90">Collaborator {resource.version_creator_name} has proposed these changes.</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <Link 
                  href={`/resources/${id}/history/compare?with=${resource.version_no}`}
                  className="text-[10px] font-black uppercase bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all border border-white/30"
                >
                  Review Diff
                </Link>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleReject()}
                  isLoading={isProcessingProposal}
                  leftIcon={<XCircle size={14} />}
                  className="text-white hover:bg-rose-600 hover:border-rose-600 border border-white/30 transition-all"
                >
                  Reject
                </Button>

                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleApprove()}
                  isLoading={isProcessingProposal}
                  leftIcon={<CheckCircle2 size={14} />}
                  className="bg-white text-amber-600 hover:bg-zinc-100 border-none shadow-xl shadow-amber-900/20"
                >
                  Approve & Publish
                </Button>
                </div>
                </div>
                )}

                <RemixModal 
                isOpen={isRemixModalOpen}
                onClose={() => setIsRemixModalOpen(false)}
                item={resource}
                onConfirm={handleConfirmRemix}
                isLoading={isRemixing}
                />

                <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title={resource?.title || ""}
                />

                <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteResource}
                isLoading={isDeleting}
                title={resource?.title || ""}
                />

                <div className="max-w-7xl mx-auto p-6 space-y-6">
                <DetailHeader 
                resource={resource} 
                isOwner={isOwner}
                canEdit={canEdit}
                isPublishing={isPublishing}
                onPublish={handlePublish}
                onDelete={() => setIsDeleteModalOpen(true)}
                onShare={() => setIsShareModalOpen(true)}
                isDeleting={isDeleting}
                />

                <ProposalReviewSection 
                proposals={pendingProposals}
                onApprove={handleApprove}
                onReject={handleReject}
                isProcessing={isProcessingProposal}
                resourceId={id as string}
                />

                <DetailHero resource={resource} />


          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <DetailContent resource={resource} />
              <ReviewSection 
                comments={comments} 
                onAddComment={handleAddComment} 
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <DetailSidebar 
                resource={resource} 
                likesCount={likesCount}
                isLiked={isLiked}
                onLike={handleLikeToggle}
                onRemix={() => setIsRemixModalOpen(true)} 
                onShare={() => setIsShareModalOpen(true)}
                isOwner={isOwner}
                canEdit={canEdit}
                isPublishing={isPublishing}
                onPublish={handlePublish}
                onDelete={() => setIsDeleteModalOpen(true)}
                isDeleting={isDeleting}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ResourceDetailView;
