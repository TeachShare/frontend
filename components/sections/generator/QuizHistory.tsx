"use client";

import React, { useState, useEffect } from "react";
import { useGenerator } from "@/hooks/useGenerator";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { 
  Copy, 
  Trash2, 
  Users, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Calendar,
  BarChart3,
  Clock
} from "lucide-react";

export const QuizHistory = () => {
  const { quizzes, fetchQuizzes } = useGenerator();
  const [expandedQuiz, setExpandedQuiz] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<Record<number, any[]>>({});
  const [isLoadingAttempts, setIsLoadingAttempts] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const toggleExpand = async (quizId: number) => {
    if (expandedQuiz === quizId) {
      setExpandedQuiz(null);
      return;
    }

    setExpandedQuiz(quizId);
    
    // Fetch attempts if not already loaded
    if (!attempts[quizId]) {
      setIsLoadingAttempts(prev => ({ ...prev, [quizId]: true }));
      try {
        const res = await api.get(`/quizzes/${quizId}/attempts`);
        if (res.data.success) {
          setAttempts(prev => ({ ...prev, [quizId]: res.data.data }));
        }
      } catch (err) {
        toast.error("Failed to load student results");
      } finally {
        setIsLoadingAttempts(prev => ({ ...prev, [quizId]: false }));
      }
    }
  };

  const copyLink = (accessCode: string) => {
    const link = `${window.location.origin}/q/${accessCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Student link copied!");
  };

  const deleteQuiz = async (quizId: number) => {
    if (!confirm("Are you sure? This will delete the quiz and all student results.")) return;
    try {
      const res = await api.delete(`/quizzes/${quizId}`);
      if (res.data.success) {
        toast.success("Quiz deleted");
        fetchQuizzes();
      }
    } catch (err) {
      toast.error("Failed to delete quiz");
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-12 text-center space-y-4">
        <Users className="mx-auto text-zinc-300 dark:text-zinc-700" size={48} />
        <h3 className="text-lg font-bold dark:text-white">No quizzes yet</h3>
        <p className="text-zinc-500 text-sm max-w-xs mx-auto">Generate your first interactive quiz to see student results here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <div key={quiz.quiz_id} className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
          
          {/* Quiz Row */}
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-zinc-900 dark:text-white truncate">{quiz.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${quiz.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-100 text-zinc-400'}`}>
                  {quiz.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-tighter">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(quiz.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {quiz.time_limit || '∞'}m</span>
                <span className="flex items-center gap-1.5 text-emerald-500 font-black tracking-widest">CODE: {quiz.access_code}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => copyLink(quiz.access_code)} className="h-9 gap-2 px-3">
                <Copy size={14} /> Link
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteQuiz(quiz.quiz_id)} className="h-9 px-3 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500">
                <Trash2 size={14} />
              </Button>
              <button 
                onClick={() => toggleExpand(quiz.quiz_id)}
                className={`ml-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedQuiz === quiz.quiz_id ? 'bg-emerald-500 text-white' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600'}`}
              >
                {isLoadingAttempts[quiz.quiz_id] ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : expandedQuiz === quiz.quiz_id ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Results Section */}
          {expandedQuiz === quiz.quiz_id && (
            <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300">
              <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} className="text-emerald-500" />
                  <h4 className="text-[11px] font-black uppercase text-zinc-400 tracking-widest">Student Submissions</h4>
                </div>

                {!attempts[quiz.quiz_id] || attempts[quiz.quiz_id].length === 0 ? (
                  <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800/40">
                    <p className="text-zinc-500 text-xs italic">No students have taken this quiz yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/60">
                          <th className="pb-3 px-2">Student Name</th>
                          <th className="pb-3 px-2">Completed</th>
                          <th className="pb-3 px-2 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attempts[quiz.quiz_id].map((attempt) => (
                          <tr key={attempt.attempt_id} className="text-xs group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                            <td className="py-4 px-2 font-bold text-zinc-700 dark:text-zinc-300">{attempt.student_name}</td>
                            <td className="py-4 px-2 text-zinc-500">{new Date(attempt.completed_at).toLocaleString()}</td>
                            <td className="py-4 px-2 text-right font-black text-emerald-500">
                              {attempt.score} / {attempt.total_points}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
