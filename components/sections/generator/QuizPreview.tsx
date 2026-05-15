"use client";

import React, { useState } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Check, Copy, Share2, Save, Trash2, Clock, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";

export const QuizPreview = () => {
  const router = useRouter();
  const { pendingQuiz, setPendingQuiz, saveGeneratedQuiz } = useGenerator();
  const [isSaving, setIsSaving] = useState(false);
  const [savedQuiz, setSavedQuiz] = useState<any>(null);
  const [timeLimit, setTimeLimit] = useState(15);

  if (!pendingQuiz && !savedQuiz) return null;

  const quiz = savedQuiz || pendingQuiz;

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveGeneratedQuiz({
      ...quiz,
      time_limit: timeLimit
    });
    if (result) {
      setSavedQuiz(result);
      toast.success("Quiz saved and live!");
    }
    setIsSaving(false);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/q/${savedQuiz.access_code}`;
    navigator.clipboard.writeText(link);
    toast.success("Quiz link copied to clipboard!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/5">
        
        {/* Header */}
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{quiz.title}</h2>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm max-w-2xl">{quiz.description}</p>
          </div>
          
          {!savedQuiz ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Time Limit (mins)</label>
                <input 
                  type="number" 
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                  className="w-20 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <Button 
                onClick={handleSave} 
                isLoading={isSaving}
                leftIcon={<Save size={18} />}
              >
                Save & Get Link
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Access Code:</span>
                <span className="text-sm font-black text-emerald-700 dark:text-emerald-300 font-mono tracking-tighter">{savedQuiz.access_code}</span>
              </div>
              <Button variant="emerald" onClick={copyLink} leftIcon={<Copy size={16} />}>
                Copy Student Link
              </Button>
            </div>
          )}
        </div>

        {/* Question List */}
        <div className="p-8 space-y-8">
          {quiz.questions.map((q: any, idx: number) => (
            <div key={idx} className="space-y-4 group">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[11px] font-black text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-relaxed">{q.text}</p>
                  
                  {q.type === 'multiple_choice' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options.map((opt: string, optIdx: number) => (
                        <div key={optIdx} className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                          opt === q.correct_answer 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-500'
                        }`}>
                          <span className="opacity-50 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'true_false' && (
                    <div className="flex gap-3">
                      {['True', 'False'].map((opt) => (
                        <div key={opt} className={`px-4 py-2 rounded-lg border text-xs font-black uppercase tracking-widest ${
                          opt === q.correct_answer 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-500'
                        }`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'short_answer' && (
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/60 space-y-2">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sample Correct Answer:</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">"{q.correct_answer}"</p>
                    </div>
                  )}
                </div>
              </div>
              {idx < quiz.questions.length - 1 && <div className="h-px bg-zinc-100 dark:bg-zinc-800/60 ml-10" />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center">
          <button 
            onClick={() => {
              setPendingQuiz(null);
              setSavedQuiz(null);
            }} 
            className="text-[11px] font-black uppercase text-zinc-400 hover:text-rose-500 transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} /> Discard Quiz
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-400">
               <Clock size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">{timeLimit} Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
               <ListChecks size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">{quiz.questions.length} Questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
