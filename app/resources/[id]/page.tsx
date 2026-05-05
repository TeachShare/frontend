"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";

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

  // Core States
  const [resource, setResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        const collectionId = (id as string).split("-")[0];
        const response = await api.get(`/resource_collection/${collectionId}`);
        
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
      
      // We pass should_publish: false so the user can edit their remix 
      // in the creator before it goes live on the community repo
      const response = await api.post(`/resource_collection/remix/${collectionId}`, {
        should_publish: false 
      });

      if (response.data.success) {
        const newId = response.data.collection_id;
        const cleanTitle = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Redirect to the edit mode of the new collection
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

  if (isLoading) {
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
        
        {/* REMIX MODAL INTEGRATION */}
        <RemixModal 
          isOpen={isRemixModalOpen}
          onClose={() => setIsRemixModalOpen(false)}
          item={resource}
          onConfirm={handleConfirmRemix}
          isLoading={isRemixing}
        />

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <DetailHeader resource={resource} />
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
                // TRIGGER: Opens the modal from the sidebar button
                onRemix={() =>  (true)} 
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ResourceDetailView;