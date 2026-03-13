"use client";
import React, { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  Bold,
  Italic,
  Heading2,
  CheckCircle2,
  Plus,
  X,
  Upload,
  Database,
  List,
  ListOrdered,
  Link2,
  Quote,
  Code,
  FileUp,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Layout from "@/components/layout/Layout";

const CreateResourcePage = () => {
  const [tags, setTags] = useState([
    "photosynthesis",
    "biology",
    "interactive",
  ]);
  const [tagInput, setTagInput] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
      class: "tiptap focus:outline-none min-h-[120px] p-6 max-w-none text-zinc-900 dark:text-zinc-300 transition-colors duration-300",
      },
    },
  });

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 px-4 lg:px-8 py-6 pb-32 max-w-7xl mx-auto w-full">
          {/* Breadcrumbs & Template Button */}
          <div className="flex items-center justify-between mb-2">
            <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Resource Repository</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
              <span className="text-zinc-800 dark:text-zinc-300">
                Create Resource
              </span>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Draft - Not yet published
              </span>
              <button className="flex items-center gap-2 text-xs border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] px-3 py-1.5 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Start from template
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
            Create a new learning resource
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Design a resource your students can access and other teachers can
            remix from the shared repository.
          </p>

          {/* Banner */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold py-2 px-4 rounded-lg mb-8 flex items-center gap-2 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            Repository - Metadata, content, and files are all required before
            publishing.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white">
                      Resource details
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                      Describe the resource so students and other teachers can
                      find it.
                    </p>
                  </div>
                  <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 px-2 py-1 rounded uppercase font-bold tracking-tighter">
                    Visible to: Students & Community
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Introduction to Photosynthesis - Guided Notes & Slides"
                      className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-700 outline-none transition-all"
                    />
                    <p className="text-[10px] text-rose-500 mt-2 font-bold uppercase tracking-wide">
                      Title is required.
                    </p>
                  </div>

                  {/* Subject & Grade */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 appearance-none outline-none">
                          <option>Science</option>
                          <option>Mathematics</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                        Grade level <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 appearance-none outline-none">
                          <option>4th Year College</option>
                          <option>High School</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Type & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                        Resource type <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 appearance-none outline-none">
                          <option>Lesson plan & slides</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                        Estimated duration{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 45 minutes, 2 class sessions"
                        className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                      />
                      <p className="text-[10px] text-zinc-500 mt-2 italic font-medium">
                        Helps teachers decide where this fits in their units.
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">
                      Tags & topics <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tags like 'photosynthesis', 'biology'..."
                        className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 px-4 text-sm text-zinc-900 dark:text-zinc-100 outline-none pr-12"
                      />
                      <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 cursor-pointer" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-transparent"
                        >
                          {tag}
                          <X
                            className="w-3 h-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                            onClick={() =>
                              setTags(tags.filter((_, idx) => idx !== i))
                            }
                          />
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-3 font-medium">
                      Use 3-8 tags to improve discovery.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tiptap Editor Section */}
              <section className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
                  <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400"
                  >
                    <Italic size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  >
                    <List size={14} /> Bulleted
                  </button>
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleOrderedList().run()
                    }
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  >
                    <ListOrdered size={14} /> Numbered
                  </button>
                  <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 text-[11px] font-bold"
                  >
                    H2
                  </button>
                  <button className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
                    <Link2 size={16} />
                  </button>
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleBlockquote().run()
                    }
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  >
                    <Quote size={14} /> Quote
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  >
                    <Code size={14} /> Code
                  </button>
                </div>
                <EditorContent editor={editor} />
                {!editor?.getHTML() ||
                  (editor?.getHTML() === "<p></p>" && (
                    <div className="px-6 py-4 text-xs text-zinc-500 italic pointer-events-none">
                      Write a clear description, learning objectives, and any
                      facilitation notes...
                    </div>
                  ))}
              </section>

              {/* Attach Files Section */}
              <section className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white">
                      Attach files
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                      Upload materials your students will use in class or at
                      home.
                    </p>
                  </div>
                  <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 px-2 py-1 rounded uppercase font-bold tracking-tighter">
                    Required
                  </span>
                </div>

                <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/20 mb-6 hover:border-emerald-500/40 dark:hover:border-emerald-500/20 transition-all cursor-pointer group">
                  <div className="bg-white dark:bg-[#161b22] p-3 rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform">
                    <FileUp className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1 text-center">
                    Drop files here or click to browse
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                    PPTX, DOC, PDF, PNG, JPEG, WEBP • Max 250 MB per file
                  </p>
                  <button className="mt-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-black uppercase tracking-wider py-2 px-6 rounded-lg transition-all active:scale-95">
                    Choose files
                  </button>
                </div>

                <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mb-6 font-medium italic">
                  Tip: Include both editable (PPTX/Doc) and student-ready (PDF)
                  versions so others can remix easily.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      name: "photosynthesis-slides-v1.pptx",
                      type: "PPTX",
                      size: "3.2 MB",
                      meta: "24 slides",
                      color: "text-orange-500 bg-orange-500/10",
                    },
                    {
                      name: "guided-notes-handout.pdf",
                      type: "PDF",
                      size: "540 KB",
                      meta: "For students",
                      color: "text-rose-500 bg-rose-500/10",
                    },
                  ].map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-xl"
                    >
                      <div
                        className={`${file.color} text-[10px] font-black px-2 py-1 rounded tracking-tighter`}
                      >
                        {file.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">
                          {file.size} · {file.meta}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors uppercase">
                          Replace
                        </button>
                        <button className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-lg hover:bg-rose-500/20 transition-colors uppercase">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-6">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                  Publishing tips
                </span>
                <h4 className="text-[15px] font-bold text-zinc-900 dark:text-white mt-4 mb-2">
                  Make your resource remix-friendly
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed mb-6">
                  Clear structure and multiple file formats help other
                  instructors adapt this for their own context while keeping
                  your authorship visible.
                </p>
                <ul className="text-[11px] space-y-3 font-medium text-zinc-700 dark:text-zinc-400">
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span> Include teacher
                    notes in the description.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span> Upload editable and
                    student-ready versions.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span> Tag by topic,
                    skill, and assessment type.
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 divide-y divide-zinc-100 dark:divide-zinc-800/50">
                <div className="flex justify-between items-center text-xs pb-1">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                    Status
                  </span>
                  <span className="text-zinc-900 dark:text-white font-bold">
                    Draft
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-4">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                    Visibility
                  </span>
                  <span className="text-zinc-900 dark:text-white font-bold">
                    Students & community
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-4">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                    Owner
                  </span>
                  <span className="text-zinc-900 dark:text-white font-bold">
                    You
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-4">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                    Auto-save
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-600 italic">
                    Every 30 seconds
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white mb-2">
                  Student-facing summary
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mb-4 font-medium leading-relaxed">
                  This is what your students will see first in their view of the
                  repository. Keep it short and friendly.
                </p>
                <textarea
                  className="w-full bg-zinc-50 dark:bg-[#0b0e14] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-[13px] italic text-zinc-600 dark:text-zinc-400 leading-relaxed focus:border-zinc-400 dark:focus:border-zinc-700 outline-none h-32 resize-none"
                  defaultValue='"In this lesson, you&apos;ll explore how plants turn light into energy through photosynthesis."'
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <footer className="h-16 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0b0e14]/90 backdrop-blur-md fixed bottom-0 right-0 left-0 lg:left-60 flex items-center justify-between px-8 z-30 transition-all">
          <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest hidden sm:block">
            Unsaved changes • Last saved 2 minutes ago
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-all shadow-sm uppercase tracking-widest">
              Save draft
            </button>
            <button className="flex-1 sm:flex-none px-8 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
              <Database className="w-4 h-4" />
              Publish to repository
            </button>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default CreateResourcePage;
