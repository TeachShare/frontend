"use client"
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Files, 
  ChevronDown, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading2, 
  Quote, 
  Code,
  FileUp,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

// Tiptap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Sub-component for form fields to keep the main code clean
const FormField = ({ label, required, helpText, children }: { label: string, required?: boolean, helpText?: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1 transition-colors duration-300">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
    {helpText && <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic font-medium transition-colors duration-300">{helpText}</p>}
  </div>
);

// Tiptap Toolbar Button Helper
const ToolbarButton = ({ onClick, isActive, icon: Icon }: { onClick: () => void, isActive: boolean, icon: any }) => (
  <button 
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-1.5 rounded transition-colors ${
      isActive 
        ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
        : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
    }`}
  >
    <Icon size={14} />
  </button>
);

const Page = () => {
  const router = useRouter();
  
  // File Upload State & Refs
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 2. Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert min-h-[200px] w-full bg-transparent p-6 text-xs text-zinc-900 dark:text-zinc-400 focus:outline-none max-w-none transition-colors duration-300 tiptap',
      },
    },
  });

  // 3. Generic Change Handler for standard inputs/selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Logic for adding/removing Tags
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

  // 5. File Upload Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
    // Reset the input value so the same file can be selected again if removed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setAttachedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 6. Publish Handler with Redirect
  const handlePublish = () => {
    if (!formData.title) {
      alert("Please enter a title before publishing.");
      return;
    }
    
    // Simulate API Call (Now including files!)
    console.log("Submitting Data:", formData);
    console.log("Attached Files:", attachedFiles);
    alert(`Successfully published: ${formData.title} with ${attachedFiles.length} files attached.`);
    
    // Redirect back to repository
    router.push('/repository/create');
  };

  return (
    <Layout>
      <main className="flex-1 bg-zinc-50 dark:bg-[#090a0c] overflow-y-auto transition-colors duration-300">
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 text-xs group"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <span>Back to Repository</span>
              </button>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Create a new learning resource</h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">Design a resource your students can access and other teachers can remix.</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
               <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Draft - Not yet published</span>
               <button className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                 <Files size={14} className="text-zinc-400 dark:text-zinc-500" />
                 Start from template
               </button>
            </div>
          </div>

          {/* Progress Banner */}
          <div className="h-6 rounded bg-gradient-to-r from-rose-50 dark:from-rose-500/20 via-orange-50 dark:via-orange-500/20 to-emerald-50 dark:to-emerald-500/20 border border-zinc-200 dark:border-zinc-800/50 flex items-center justify-center transition-colors duration-300">
            <p className="text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] transition-colors duration-300">Repository · Metadata, content, and files are required before publishing</p>
          </div>

          <div className="grid grid-cols-12 gap-8 pb-20">
            {/* Left Column: Form */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">Resource details</h2>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-500 font-bold uppercase border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded transition-colors duration-300">Visible to: Students & community</span>
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
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
                      >
                        <option>Science</option>
                        <option>Mathematics</option>
                        <option>Computer Science</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300" />
                    </div>
                  </FormField>
                  <FormField label="Grade level" required>
                    <div className="relative">
                      <select 
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
                      >
                        <option>Grade 7-8</option>
                        <option>Grade 9-10</option>
                        <option>University</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300" />
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
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-xs text-zinc-900 dark:text-zinc-300 appearance-none focus:outline-none transition-colors duration-300"
                      >
                        <option>Lesson plan & slides</option>
                        <option>Activity</option>
                        <option>Assessment</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 pointer-events-none transition-colors duration-300" />
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
                    {formData.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[10px] rounded flex items-center gap-1 transition-colors duration-300">
                        {t} <X size={10} className="cursor-pointer hover:text-zinc-900 dark:hover:text-white" onClick={() => removeTag(t)} />
                      </span>
                    ))}
                    <div className="flex-1 min-w-[120px]">
                      <input 
                        type="text" 
                        placeholder="Enter tag..." 
                        className="w-full bg-transparent text-xs focus:outline-none ml-1 text-zinc-900 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" 
                        onKeyDown={addTag}
                      />
                    </div>
                  </div>
                </FormField>
              </div>

              {/* TIPTAP Editor Section */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
                {editor && (
                  <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/30 transition-colors duration-300">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} />
                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={List} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={ListOrdered} />
                    <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={Heading2} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={Quote} />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={Code} />
                  </div>
                )}
                
                {/* Ensure the editor content area looks correct */}
                <div onClick={() => editor?.commands.focus()} className="cursor-text">
                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* Upload Section */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white transition-colors duration-300">Attach files</h3>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-widest transition-colors duration-300">Required</span>
                </div>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  multiple 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept=".pptx,.doc,.docx,.pdf,.png,.jpg,.jpeg"
                />

                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-10 text-center space-y-4 cursor-pointer transition-all duration-300 ${
                    isDragging 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' 
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent hover:border-emerald-500/30 dark:hover:border-emerald-500/30'
                  }`}
                >
                  <FileUp size={24} className={`mx-auto transition-colors duration-300 ${isDragging ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-700'}`} />
                  <div>
                    <p className="text-xs text-zinc-900 dark:text-white transition-colors duration-300">Drop files here or click to browse</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mt-1 transition-colors duration-300">PPTX, DOC, PDF, PNG • Max 250 MB</p>
                  </div>
                  <button 
                    type="button" 
                    className="bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-1.5 rounded text-[11px] font-bold border border-zinc-200 dark:border-zinc-700 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 pointer-events-none"
                  >
                    Choose files
                  </button>
                </div>

                {/* File List */}
                {attachedFiles.length > 0 && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    {attachedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-lg group transition-colors duration-300">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Files size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{file.name}</span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-600 shrink-0">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="p-1 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                          title="Remove file"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar info */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-600/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
                <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-colors duration-300">Publishing tips</span>
                <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Make your resource remix-friendly</h4>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-500 leading-relaxed transition-colors duration-300">Clear structure and multiple file formats help other instructors adapt this for their own context.</p>
              </div>

              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl divide-y divide-zinc-200 dark:divide-zinc-800/40 text-[11px] transition-colors duration-300">
                <div className="p-4 flex justify-between"><span className="text-zinc-500 dark:text-zinc-500 font-medium">Status</span><span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">Draft</span></div>
                <div className="p-4 flex justify-between"><span className="text-zinc-500 dark:text-zinc-500 font-medium">Visibility</span><span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">Community</span></div>
                <div className="p-4 flex justify-between"><span className="text-zinc-500 dark:text-zinc-500 font-medium">Owner</span><span className="text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-300">You</span></div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-3 transition-colors duration-300">
                <h4 className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest transition-colors duration-300">Student-facing summary</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 transition-colors duration-300">"In this lesson, you'll explore how plants turn light into energy through photosynthesis."</p>
              </div>

              <div className="pt-6 space-y-3">
                <button 
                  onClick={handlePublish}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20"
                >
                  Publish to repository
                </button>
                <button className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-transparent text-zinc-600 dark:text-zinc-400 py-3 rounded-xl font-bold text-xs hover:bg-zinc-50 dark:hover:text-white transition-colors duration-300">Save draft</button>
                <button 
                  onClick={() => router.back()}
                  className="w-full text-zinc-500 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 py-2 text-[11px] font-bold transition-colors duration-300"
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