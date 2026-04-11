"use client";
import React from "react";
import { ChevronDown, X } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { ResourceFormData } from "@/types/resources"; // *See note below about updating this!*

// 1. Define the shape of the metadata coming from the backend
interface MetadataOption {
  id: number;
  name: string;
}

interface Metadata {
  subjects: MetadataOption[];
  grade_levels: MetadataOption[];
  content_types: MetadataOption[];
}

interface Props {
  formData: any; // Temporarily any, or update ResourceFormData in your types file
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  addTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
  metadata: Metadata; // 2. Add metadata to your props
}

export const ResourceForm = ({
  formData,
  handleChange,
  addTag,
  removeTag,
  metadata,
}: Props) => {
  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
      <div className="flex justify-between items-start">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">
          Resource details
        </h2>
        <span className="text-[9px] text-zinc-500 dark:text-zinc-500 font-bold uppercase border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded transition-colors duration-300">
          Visible to: Students & community
        </span>
      </div>

      <FormField label="Title" required helpText="Title is required.">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Introduction to Photosynthesis..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="Subject" required>
          <div className="relative">
            {/* 3. Update name and value to use subject_id */}
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
            >
              <option value="" disabled>Select a subject...</option>
              {metadata?.subjects?.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300"
            />
          </div>
        </FormField>
        
        <FormField label="Grade level" required>
          <div className="relative">
            {/* 4. Update name and value to use grade_level_id */}
            <select
              name="grade_level_id"
              value={formData.grade_level_id}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
            >
              <option value="" disabled>Select a grade level...</option>
              {metadata?.grade_levels?.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300"
            />
          </div>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="Resource type" required>
          <div className="relative">
            {/* 5. Update name and value to use content_type_id */}
            <select
              name="content_type_id"
              value={formData.content_type_id}
              onChange={handleChange}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
            >
              <option value="" disabled>Select a resource type...</option>
              {metadata?.content_types?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300"
            />
          </div>
        </FormField>
        
        <FormField label="Estimated duration">
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 45 minutes"
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 focus:outline-none transition-colors duration-300"
          />
        </FormField>
      </div>

      <FormField label="Tags & topics">
        <div className="flex flex-wrap gap-2 p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors duration-300">
          {formData.tags.map((t: string) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[10px] rounded flex items-center gap-1 transition-colors duration-300"
            >
              {t}{" "}
              <X
                size={10}
                className="cursor-pointer hover:text-zinc-900 dark:hover:text-white"
                onClick={() => removeTag(t)}
              />
            </span>
          ))}
          <div className="flex-1 min-w-[120px]">
            <input
              type="text"
              placeholder="Enter tag..."
              onKeyDown={addTag}
              className="w-full bg-transparent text-xs focus:outline-none ml-1 text-zinc-900 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>
      </FormField>
    </div>
  );
};