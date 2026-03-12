"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Files, 
  ChevronDown, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading2, 
  Link, 
  Quote, 
  Code,
  FileUp,
  X,
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

// Sub-component for form fields to keep the main code clean
const FormField = ({ label, required, helpText, children }: { label: string, required?: boolean, helpText?: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    {helpText && <p className="text-[10px] text-zinc-600 italic font-medium">{helpText}</p>}
  </div>
);

const Page = () => {
  const router = useRouter();

  // 1. Centralized Form State
  const [formData, setFormData] = useState({
    title: "",
    subject: "Science",
    gradeLevel: "Grade 7-8",
    resourceType: "Lesson plan & slides",
    duration: "",
    description: "",
    tags: ['photosynthesis', 'biology', 'interactive']
  });

  // 2. Generic Change Handler for inputs/selects/textareas
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Logic for adding/removing Tags
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim().toLowerCase();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      e.currentTarget.value = "";
    }
  };

  // 4. Publish Handler with Redirect
  const handlePublish = () => {
    if (!formData.title) {
      alert("Please enter a title before publishing.");
      return;
    }
    
    // Simulate API Call
    console.log("Submitting Data to TeachShare API:", formData);
    alert(`Successfully published: ${formData.title}`);
    
    // Redirect back to repository
    router.push('/repository/create');
    
  };

  return (
    <Layout>
      <main className="flex-1 bg-[#090a0c] overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-xs group"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <span>Back to Repository</span>
              </button>
              <h1 className="text-2xl font-bold text-white tracking-tight">Create a new learning resource</h1>
              <p className="text-zinc-500 text-[13px] mt-1">Design a resource your students can access and other teachers can remix.</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
               <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Draft - Not yet published</span>
               <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-zinc-800">
                 <Files size={14} className="text-zinc-500" />
                 Start from template
               </button>
            </div>
          </div>

          {/* Progress Banner */}
          <div className="h-6 rounded bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-emerald-500/20 border border-zinc-800/50 flex items-center justify-center">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Repository · Metadata, content, and files are required before publishing</p>
          </div>

          <div className="grid grid-cols-12 gap-8 pb-20">
            {/* Left Column: Form */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              <div className="bg-[#121417] border border-zinc-800/60 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-sm font-bold text-white">Resource details</h2>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase border border-zinc-800 px-2 py-0.5 rounded">Visible to: Students & community</span>
                </div>

                <FormField label="Title" required helpText="Title is required.">
                    <input 
                      name="title"
                      value={formData.title} 
                      onChange={handleChange}
                      type="text" 
                      placeholder="e.g. Introduction to Photosynthesis..." 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/30" 
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Subject" required>
                    <div className="relative">
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 appearance-none focus:outline-none"
                      >
                        <option>Science</option>
                        <option>Mathematics</option>
                        <option>Computer Science</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                    </div>
                  </FormField>
                  <FormField label="Grade level" required>
                    <div className="relative">
                      <select 
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 appearance-none focus:outline-none"
                      >
                        <option>Grade 7-8</option>
                        <option>Grade 9-10</option>
                        <option>University</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                    </div>
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Resource type" required>
                     <div className="relative">
                      <select 
                        name="resourceType"
                        value={formData.resourceType}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 appearance-none focus:outline-none"
                      >
                        <option>Lesson plan & slides</option>
                        <option>Activity</option>
                        <option>Assessment</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                    </div>
                  </FormField>
                  <FormField label="Estimated duration">
                    <input 
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      type="text" 
                      placeholder="e.g. 45 minutes" 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none" 
                    />
                  </FormField>
                </div>

                <FormField label="Tags & topics">
                  <div className="flex flex-wrap gap-2 p-2 bg-zinc-950 border border-zinc-800 rounded-lg">
                    {formData.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded flex items-center gap-1">
                        {t} <X size={10} className="cursor-pointer hover:text-white" onClick={() => removeTag(t)} />
                      </span>
                    ))}
                    <input 
                      type="text" 
                      placeholder="Enter tag..." 
                      className="bg-transparent text-xs focus:outline-none ml-1 flex-1" 
                      onKeyDown={addTag}
                    />
                  </div>
                </FormField>
              </div>

              {/* Editor Section */}
              <div className="bg-[#121417] border border-zinc-800/60 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-zinc-800/60 bg-zinc-900/30">
                  {[Bold, Italic, List, ListOrdered, Heading2, Link, Quote, Code].map((Icon, i) => (
                    <button key={i} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"><Icon size={14} /></button>
                  ))}
                </div>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8} 
                  className="w-full bg-transparent p-6 text-xs text-zinc-400 focus:outline-none resize-none placeholder:italic" 
                  placeholder="Write a clear description, learning objectives..." 
                />
              </div>

              {/* Upload Section */}
              <div className="bg-[#121417] border border-zinc-800/60 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white">Attach files</h3>
                  <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Required</span>
                </div>
                <div className="border-2 border-dashed border-zinc-800 rounded-xl p-10 text-center space-y-4 hover:border-emerald-500/30 transition-colors cursor-pointer">
                  <FileUp size={24} className="mx-auto text-zinc-700" />
                  <div>
                    <p className="text-xs text-white">Drop files here or click to browse</p>
                    <p className="text-[10px] text-zinc-600 mt-1">PPTX, DOC, PDF, PNG • Max 250 MB</p>
                  </div>
                  <button className="bg-zinc-800 text-zinc-300 px-4 py-1.5 rounded text-[11px] font-bold border border-zinc-700">Choose files</button>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar info */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-blue-600/5 border border-blue-500/10 rounded-xl p-6 space-y-4">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Publishing tips</span>
                <h4 className="text-[13px] font-bold text-white">Make your resource remix-friendly</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">Clear structure and multiple file formats help other instructors adapt this for their own context.</p>
              </div>

              <div className="bg-[#121417] border border-zinc-800/60 rounded-xl divide-y divide-zinc-800/40 text-[11px]">
                <div className="p-4 flex justify-between"><span className="text-zinc-500 font-medium">Status</span><span className="text-zinc-300 font-bold">Draft</span></div>
                <div className="p-4 flex justify-between"><span className="text-zinc-500 font-medium">Visibility</span><span className="text-zinc-300 font-bold">Community</span></div>
                <div className="p-4 flex justify-between"><span className="text-zinc-500 font-medium">Owner</span><span className="text-zinc-300 font-bold">You</span></div>
              </div>

              <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-6 space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Student-facing summary</h4>
                <p className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-zinc-700 pl-4">"In this lesson, you'll explore how plants turn light into energy through photosynthesis."</p>
              </div>

              <div className="pt-6 space-y-3">
                <button 
                  onClick={handlePublish}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/20"
                >
                  Publish to repository
                </button>
                <button className="w-full bg-zinc-900 text-zinc-400 py-3 rounded-xl font-bold text-xs hover:text-white transition-colors">Save draft</button>
                <button 
                  onClick={() => router.back()}
                  className="w-full text-zinc-600 hover:text-rose-500 py-2 text-[11px] font-bold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;