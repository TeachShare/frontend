"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

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
import { SkeletonResourceDetail } from "@/components/sections/resources/ResourceSkeletons";

const ResourceDetailView = () => {
  const { id } = useParams();
  const router = useRouter();

  // User State
  const { data: user, isLoading: isUserLoading } = useUser();

  // Core States
  const [resource, setResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Social States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);

  // Remix States
  const [isRemixModalOpen, setIsRemixModalOpen] = useState(false);
  const [isRemixing, setIsRemixing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchResourceDetails = async () => {
      try {
        const idStr = id as string;
        const collectionId = idStr.split("-")[0];
        
        // Detect version_no from slug like "10-v1"
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

        const response = await api.get(url);
        
        if (response.data.success) {
          const data = response.data.data;
          setResource(data);
          
          setLikesCount(data.likes || 0);
          setIsLiked(data.user_has_liked || false);
          setComments(data.comments || []); 
        } else {
          setError("Resource not found.");
        }
      } catch (err) {
        console.error("Failed to fetch resource details", err);
        setError("Failed to load resource data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResourceDetails();
  }, [id]);

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
    const confirmDelete = window.confirm("PERMANENT ACTION: Are you sure you want to wipe this resource and all its version history permanently?");
    
    if (!confirmDelete) return;

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
    }
  };

  const isOwner = user && resource?.owner_id === user.id;
  const isCollaborator = user && resource?.collaborators?.some((c: any) => c.teacher_id === user.id && c.role === 'editor');
  const canEdit = isOwner || isCollaborator;

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
        
        <RemixModal 
          isOpen={isRemixModalOpen}
          onClose={() => setIsRemixModalOpen(false)}
          item={resource}
          onConfirm={handleConfirmRemix}
          isLoading={isRemixing}
        />

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <DetailHeader 
            resource={resource} 
            isOwner={isOwner}
            canEdit={canEdit}
            isPublishing={isPublishing}
            onPublish={handlePublish}
            onDelete={handleDeleteResource}
            isDeleting={isDeleting}
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
                isOwner={isOwner}
                canEdit={canEdit}
                isPublishing={isPublishing}
                onPublish={handlePublish}
                onDelete={handleDeleteResource}
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
