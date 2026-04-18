"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios"; // Adjust path if needed

// Sections
import { DetailHeader } from "@/components/sections/resources/detail/DetailHeader";
import { DetailHero } from "@/components/sections/resources/detail/DetailHero";
import { DetailContent } from "@/components/sections/resources/detail/DetailContent";
import { DetailSidebar } from "@/components/sections/resources/detail/DetailSidebar";

const ResourceDetailView = () => {
  const { id } = useParams();
  
  const [resource, setResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchResourceDetails = async () => {
      try {
        // Extract the integer ID from the slug (e.g., "12-algebra-fundamentals" -> "12")
        const collectionId = (id as string).split("-")[0];

        // Fetch from the Flask backend route we just made
        const response = await api.get(`/resource_collection/${collectionId}`);
        
        if (response.data.success) {
          setResource(response.data.data);
          console.log(response.data.data)
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

  // Handle Loading State
  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center">
          <span className="text-zinc-500 font-bold animate-pulse text-sm">Loading resource details...</span>
        </div>
      </Layout>
    );
  }

  // Handle Error State
  if (error || !resource) {
    return (
      <Layout>
        <div className="flex-1 bg-zinc-50 dark:bg-[#090a0c] flex flex-col items-center justify-center space-y-3">
          <span className="text-rose-500 font-bold text-lg">404</span>
          <span className="text-zinc-500 text-sm">{error || "Could not find this resource."}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] min-h-screen overflow-y-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <DetailHeader resource={resource} />

          {/* Pass the live fetched data into your components! */}
          <DetailHero resource={resource} />

          <div className="grid grid-cols-12 gap-8 min-h-screen">
            <DetailContent resource={resource} />
            <DetailSidebar resource={resource} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ResourceDetailView;