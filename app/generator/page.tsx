"use client"
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  Users, 
  Archive, 
  Wand2, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Share2, 
  Filter, 
  Calendar,
  Eye,
  FileText,
  Activity,
  Link as LinkIcon,
  Clock,
  Menu,
  X,
  ChevronRight,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  Download,
  Trash2,
  Lightbulb,
  ClipboardList,
  Sparkles,
  AlertCircle,
  LucideIcon
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface ContentTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

interface GeneratedCardProps {
  title: string;
  subject: string;
  description: string;
  tags: string[];
  type: string;
}

type ContentType = 'lesson' | 'strategy' | 'classroom';
type ViewMode = 'generator' | 'results';

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-medium' 
        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
    }`}
  >
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

const ContentTypeCard: React.FC<ContentTypeCardProps> = ({ icon: Icon, title, description, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex-1 min-w-[280px] p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-blue-50 dark:bg-[#1a1d21] border-blue-200 dark:border-blue-500/50 ring-1 ring-blue-500/20' 
        : 'bg-white dark:bg-[#121417] border-zinc-200 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg transition-colors duration-300 ${active ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500'}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-zinc-900 dark:text-white font-bold text-[14px] transition-colors duration-300">{title}</h3>
        <p className="text-zinc-500 dark:text-zinc-500 text-[12px] mt-1 leading-relaxed transition-colors duration-300">{description}</p>
      </div>
    </div>
  </div>
);

const GeneratedCard: React.FC<GeneratedCardProps> = ({ title, subject, description, tags, type }) => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-zinc-900 dark:text-white font-bold text-[15px] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{title}</h4>
        <p className="text-zinc-500 dark:text-zinc-500 text-[12px] mt-1 transition-colors duration-300">{subject}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <h5 className="text-zinc-600 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">{type}</h5>
      <p className="text-zinc-700 dark:text-zinc-400 text-[13px] leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>

    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, i) => (
        <span key={i} className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-500 font-medium transition-colors duration-300">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex gap-2 mt-auto">
      <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-[12px] font-bold transition-all border border-blue-200 dark:border-blue-500/20">
        <Download size={14} />
        Download
      </button>
      <button className="flex items-center justify-center p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-all border border-red-200 dark:border-red-500/20">
        <X size={16} />
      </button>
    </div>
  </div>
);

const Page = () => {
  const [selectedType, setSelectedType] = useState<ContentType>('classroom');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeView, setActiveView] = useState<ViewMode>('generator');
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState<string>('Computer Science');
  const [grade, setGrade] = useState<string>('University');
  const [objectives, setObjectives] = useState<string>('');

  const handleGenerate = () => {
    if (!objectives || !subject || !grade) {
        setError("Subject, Grade Level, and Learning Goals/Objectives are required to generate content.");
        return;
    }
    setError(null);
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setActiveView('results');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
     
        {/* Dynamic Page Content */}
        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">AI Content Generator</h1>
              <p className="text-zinc-600 dark:text-zinc-500 text-[14px] mt-2 leading-relaxed transition-colors duration-300">
                Generate customized lesson plans, teaching strategies, and classroom materials powered by AI.
              </p>
            </div>
            <div className="flex bg-zinc-200/50 dark:bg-zinc-900/40 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800/60 self-start transition-colors duration-300">
              <button 
                onClick={() => setActiveView('generator')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeView === 'generator' 
                    ? 'bg-emerald-500 text-white dark:text-zinc-950 shadow-lg shadow-emerald-500/10' 
                    : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                }`}
              >
                <Wand2 size={14} />
                Generate Content
              </button>
              <button 
                onClick={() => setActiveView('results')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeView === 'results' 
                    ? 'bg-emerald-500 text-white dark:text-zinc-950 shadow-lg shadow-emerald-500/10' 
                    : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                }`}
              >
                <Sparkles size={14} />
                My Generated (2)
              </button>
            </div>
          </div>

          {activeView === 'generator' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Type Selection */}
              <div className="flex flex-wrap gap-4">
                <ContentTypeCard 
                    icon={ClipboardList} 
                    title="Lesson Plan" 
                    description="Complete lesson structure with objectives materials, and activities." 
                    active={selectedType === 'lesson'} 
                    onClick={() => setSelectedType('lesson')}
                />
                <ContentTypeCard 
                    icon={Lightbulb} 
                    title="Teaching Strategy" 
                    description="Innovative approaches and engagement techniques for your class." 
                    active={selectedType === 'strategy'} 
                    onClick={() => setSelectedType('strategy')}
                />
                <ContentTypeCard 
                    icon={FileText} 
                    title="Classroom Material" 
                    description="Worksheets, assessments, and activity sheets tailored to your goals." 
                    active={selectedType === 'classroom'} 
                    onClick={() => setSelectedType('classroom')}
                />
              </div>

              {/* Input Form */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-8 space-y-8 relative overflow-hidden transition-colors duration-300">
                <div className="relative z-10">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">Content Details</h2>
                  <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1 transition-colors duration-300">Provide information to customize your generated content.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
                        Subject <span className="text-red-500 ml-1 font-black">*</span>
                      </label>
                      <div className="relative">
                        <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300"
                        >
                            <option>Computer Science</option>
                            <option>Mathematics</option>
                            <option>Physics</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors duration-300" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
                        Grade Level <span className="text-red-500 ml-1 font-black">*</span>
                      </label>
                      <div className="relative">
                        <select 
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 transition-colors duration-300"
                        >
                            <option>University</option>
                            <option>High School</option>
                            <option>Middle School</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center transition-colors duration-300">
                      Learning Goals/Objectives <span className="text-red-500 ml-1 font-black">*</span>
                    </label>
                    <textarea 
                      placeholder="Introduce students to software engineering basics and guide them through creating a simple, real-world project."
                      value={objectives}
                      onChange={(e) => setObjectives(e.target.value)}
                      rows={5}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500/30 text-zinc-900 dark:text-zinc-300 resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700 leading-relaxed transition-colors duration-300"
                    />
                  </div>

                  <div className="mt-8 space-y-4">
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className={`w-full py-3.5 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-3 ${
                        isGenerating 
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed' 
                        : 'bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 active:scale-[0.99] shadow-lg shadow-emerald-500/5'
                      }`}
                    >
                      {isGenerating ? <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={18} />}
                      Generate Content with AI
                    </button>

                    {isGenerating && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-center text-zinc-500 dark:text-zinc-500 text-[11px] font-medium italic transition-colors duration-300">
                          Generating 2 classroom materials based on your objectives...
                        </p>
                      </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-500 text-[12px] font-bold bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 animate-in shake-in duration-200 transition-colors duration-300">
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}
                  </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Your Generated Content</h2>
                   <p className="text-zinc-600 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">View and manage all AI-generated lesson plans, strategies, and classroom materials.</p>
                </div>
                <button 
                  onClick={() => setActiveView('generator')}
                  className="bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-xl border border-blue-200 dark:border-blue-500/20 text-[13px] font-bold flex items-center gap-2 transition-all duration-300"
                >
                  <Wand2 size={16} />
                  Generate More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GeneratedCard 
                   title="Classroom Material - Computer Science (University)"
                   subject="Computer Science · University"
                   type="Worksheet Structure"
                   description="Warm-up questions reviewing software engineering concepts followed by a guided mini-project checklist and reflection prompts."
                   tags={["Warm-up", "Project-based", "University"]}
                />
                <GeneratedCard 
                   title="Introduction to Algebra - Lesson Plan"
                   subject="Mathematics · Grade 9"
                   type="Lesson Objectives"
                   description="Students will identify and solve linear equations using balance models and real-world word problems."
                   tags={["Lesson plan", "Formative check", "9th grade"]}
                />
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 border-dashed text-center transition-colors duration-300">
                 <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <Plus size={24} className="text-zinc-500 dark:text-zinc-600 transition-colors duration-300" />
                 </div>
                 <h4 className="text-zinc-700 dark:text-zinc-400 font-bold transition-colors duration-300">Need something else?</h4>
                 <p className="text-zinc-500 dark:text-zinc-600 text-sm mt-1 max-w-sm mx-auto transition-colors duration-300">Use the AI Generator to create more custom resources for your classes in seconds.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default Page;