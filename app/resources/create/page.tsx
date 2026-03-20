"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

// Extracted Types
import { ResourceFormData } from "@/types/resources";

import { ResourceHeader } from "@/components/sections/resources/create/ResourceHeader";
import { ResourceForm } from "@/components/sections/resources/create/ResourceForm";
import { RichTextEditor } from "@/components/sections/resources/create/RichTextEditor";
import { FileUploader } from "@/components/sections/resources/create/FileUploader";
import { PublishSidebar } from "@/components/sections/resources/create/PublishSidebar";

const CreateResourcePage = () => {
  const router = useRouter();
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<ResourceFormData>({
    title: "",
    subject: "Science",
    gradeLevel: "Grade 7-8",
    resourceType: "Lesson plan & slides",
    duration: "",
    description: "",
    tags: ["photosynthesis", "biology", "interactive"],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (html: string) => {
    setFormData((prev) => ({ ...prev, description: html }));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim().toLowerCase();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handlePublish = () => {
    if (!formData.title)
      return alert("Please enter a title before publishing.");
    console.log("Submitting Data:", formData);
    console.log("Attached Files:", attachedFiles);
    alert(
      `Successfully published: ${formData.title} with ${attachedFiles.length} files attached.`,
    );
    router.push("/repository");
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          <ResourceHeader />

          <div className="grid grid-cols-12 gap-8 pb-20">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <ResourceForm
                formData={formData}
                handleChange={handleChange}
                addTag={addTag}
                removeTag={removeTag}
              />

              <RichTextEditor
                value={formData.description}
                onChange={handleEditorChange}
              />

              <FileUploader
                attachedFiles={attachedFiles}
                onAddFiles={(files) =>
                  setAttachedFiles((prev) => [...prev, ...files])
                }
                onRemoveFile={(idx) =>
                  setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                }
              />
            </div>

            {/* Right Column */}
            <PublishSidebar onPublish={handlePublish} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CreateResourcePage;
