"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/axios";
import { useMetadata } from "@/hooks/useMetadata";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { ResourceHeader } from "@/components/sections/resources/create/ResourceHeader";
import { ResourceForm } from "@/components/sections/resources/create/ResourceForm";
import { ResourceSettingsForm } from "@/components/sections/resources/create/ResourceSettingsForm";
import { RichTextEditor } from "@/components/sections/resources/create/RichTextEditor";
import { FileUploader } from "@/components/sections/resources/create/FileUploader";
import { PublishSidebar } from "@/components/sections/resources/create/PublishSidebar";
import { Loader2, AlertCircle } from "lucide-react";
import { SkeletonCreatorWorkspace } from "@/components/sections/resources/create/CreatorSkeletons";

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

const CreateResourceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Detect Mode: If "edit" exists in URL, we are in Edit Mode
  const editSlug = searchParams.get("edit");
  const isEditMode = !!editSlug;
  const collectionId = editSlug ? editSlug.split("-")[0] : null;

  const { data: metadata, isLoading: isMetadataLoading } = useMetadata();
  const { data: user, isLoading: isUserLoading } = useUser();

  const [isFetchingData, setIsFetchingData] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [resource, setResource] = useState<any>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<any[]>([]);
  const [removedFileUrls, setRemovedFileUrls] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    subject_id: "",
    grade_level_id: "",
    content_type_id: "",
    duration_value: "",
    duration_unit: "Minutes",
    description: "",
    tags: [] as string[],
    version_notes: "",
    allow_remixing: true,
    visibility: "public",
    collaboration_mode: "none",
    student_summary: "",
  });

  // 2. Fetch Data for Edit Mode
  const fetchResourceData = async () => {
    if (!isEditMode || !collectionId) return;
    try {
      setIsFetchingData(true);
      const response = await api.get(
        `/resource_collection/${collectionId}`,
      );

      if (response.data.success) {
        const d = response.data.data;
        setResource(d);

        // Try to parse "Value Unit" back into components
        let val = "";
        let unit = "Minutes";
        if (d.estimate_duration) {
          const parts = d.estimate_duration.split(" ");
          if (parts.length >= 2) {
             val = parts[0];
             unit = parts[1];
          } else {
             val = d.estimate_duration;
          }
        }

        setFormData({
          title: d.title || "",
          subject_id: d.subject_id?.toString() || "",
          grade_level_id: d.grade_level_id?.toString() || "",
          content_type_id: d.content_type_id?.toString() || "",
          duration_value: val,
          duration_unit: unit,
          description: d.description || "",
          tags: d.tags || [],
          version_notes: "",
          allow_remixing: d.allow_remixing ?? true,
          visibility: d.visibility || "public",
          collaboration_mode: d.collaboration_mode || "none",
          student_summary: d.student_summary || "",
        });

        setExistingFiles(d.files || []);
        setCollaborators(d.collaborators || []);
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      alert("Failed to load resource data for editing.");
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchResourceData();
  }, [isEditMode, collectionId]);

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

  const handleAddCollaborator = (teacher: any) => {
    if (!collaborators.some(c => c.teacher_id === teacher.id)) {
      setCollaborators(prev => [...prev, {
        teacher_id: teacher.id,
        name: `${teacher.first_name} ${teacher.last_name}`,
        username: teacher.username,
        role: 'editor'
      }]);
    } else {
      toast.error("Collaborator already added.");
    }
  };

  const handleRemoveCollaborator = (teacherId: number) => {
    setCollaborators(prev => prev.filter(c => c.teacher_id !== teacherId));
  };

  const handleRemoveExistingFile = (url: string) => {
    setExistingFiles(prev => prev.filter(f => f.url !== url));
    setRemovedFileUrls(prev => [...prev, url]);
  };

  const saveResource = async (isPublished: boolean) => {
    // 1. Validation Logic
    if (isPublished) {
      if (
        !formData.title ||
        !formData.subject_id ||
        !formData.grade_level_id ||
        !formData.content_type_id ||
        !formData.duration_value
      ) {
        toast.error(
          "MISSING FIELDS: Please fill all required fields to publish.",
          TOAST_STYLE,
        );
        return;
      }
      if (!formData.description || formData.description === "<p><br></p>") {
        toast.error(
          "CONTENT EMPTY: Please add a description before publishing.",
          TOAST_STYLE,
        );
        return;
      }
    } else if (!formData.title) {
      toast.error("TITLE REQUIRED: Enter a title to save a draft.", TOAST_STYLE);
      return;
    }

    // 2. Prepare Payload
    const combinedDuration = formData.duration_value ? `${formData.duration_value} ${formData.duration_unit}` : "";

    const submitData = new FormData();
    const resourceDataPayload = {
      title: formData.title,
      subject_id: formData.subject_id ? Number(formData.subject_id) : null,
      grade_level_id: formData.grade_level_id
        ? Number(formData.grade_level_id)
        : null,
      content_type_id: formData.content_type_id
        ? Number(formData.content_type_id)
        : null,
      estimate_duration: combinedDuration,
      description: formData.description,
      tags: formData.tags,
      is_published: isPublished,
      allow_remixing: formData.allow_remixing,
      visibility: formData.visibility,
      collaboration_mode: formData.collaboration_mode,
      student_summary: formData.student_summary,
      collaborators: collaborators,
      removed_file_urls: removedFileUrls,
      version_notes:
        formData.version_notes ||
        (isEditMode ? "Revised version" : "Initial upload"),
    };

    submitData.append("resource_data", JSON.stringify(resourceDataPayload));
    attachedFiles.forEach((file) => submitData.append("files", file));

    // 3. The Promise Toast
    const savePromise = isEditMode
      ? api.put(`/resource_collection/${collectionId}`, submitData)
      : api.post("/resource_collection/create_resources", submitData);

    setIsSaving(true);
    toast.promise(
      savePromise,
      {
        loading: isPublished
          ? "Publishing your resource..."
          : "Saving draft snapshot...",
        success: (res) => {
          router.push("/resources");
          return isPublished
            ? `SUCCESS: "${formData.title}" is now LIVE.`
            : `DRAFT SAVED: "${formData.title}" is in your repository.`;
        },
        error: (err) => {
          console.error("Save error:", err.response?.data || err.message);
          return `ERROR: ${err.response?.data?.error || "Failed to process request"}`;
        },
      },
      TOAST_STYLE,
    ).finally(() => {
        setIsSaving(false);
    });
  };

  // 4. Loading States
  if (isMetadataLoading || isFetchingData || isUserLoading) {
    return (
      <Layout>
        <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] min-h-screen overflow-y-auto">
          <SkeletonCreatorWorkspace />
        </main>
      </Layout>
    );
  }

  const isOwner = !isEditMode || (user && resource?.owner_id === user.id);

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          <ResourceHeader
            title={isEditMode ? "Edit Resource" : "Create New Resources"}
            subtitle={
              isEditMode
                ? `Editing: ${formData.title}`
                : "Share your expertise with the teaching community"
            }
            isPublished={resource?.is_published}
          />

          {isEditMode && (
            <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle
                className="text-emerald-600 dark:text-emerald-400 mt-0.5"
                size={18}
              />
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-400">
                  Version History Mode
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-500/80">
                  Saving will create a new version. The previous version will be
                  preserved in the history tab.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-12 gap-8 pb-20">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <ResourceForm
                formData={formData}
                handleChange={handleChange}
                addTag={addTag}
                removeTag={removeTag}
                metadata={metadata}
              />

              <ResourceSettingsForm 
                formData={formData}
                setFormData={setFormData}
                collectionId={collectionId}
                collaborators={collaborators}
                isOwner={isOwner}
                onCollaboratorChange={fetchResourceData}
                onAddCollaborator={handleAddCollaborator}
                onRemoveCollaborator={handleRemoveCollaborator}
              />

              {isEditMode && (
                <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6">
                  <h3 className="text-zinc-900 dark:text-white font-bold text-xs uppercase mb-4 tracking-widest">
                    Version Revision Notes
                  </h3>
                  <input
                    type="text"
                    name="version_notes"
                    value={formData.version_notes}
                    onChange={handleChange}
                    placeholder="e.g., Added the missing rubric and updated the cover image..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              )}

              <RichTextEditor
                value={formData.description}
                onChange={handleEditorChange}
              />

              <FileUploader
                attachedFiles={attachedFiles}
                existingFiles={existingFiles}
                onAddFiles={(files) =>
                  setAttachedFiles((prev) => [...prev, ...files])
                }
                onRemoveFile={(idx) =>
                  setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                }
                onRemoveExistingFile={handleRemoveExistingFile}
              />
            </div>

            {/* Right Column */}
            <PublishSidebar
              onPublish={() => saveResource(true)}
              onSaveDraft={() => saveResource(false)}
              isEdit={isEditMode}
              isSaving={isSaving}
              visibility={formData.visibility}
              isPublished={resource?.is_published}
              studentSummary={formData.student_summary}
              setFormData={setFormData}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

// Exporting with Suspense because of useSearchParams
const CreateResourcePage = () => (
  <Suspense fallback={null}>
    <CreateResourceContent />
  </Suspense>
);

export default CreateResourcePage;
