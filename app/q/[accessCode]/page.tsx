"use client";

import React, { useState, useEffect, use } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Loader2, Timer, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

interface Question {
  question_id: number;
  question_text: string;
  question_type: string;
  options: string[] | null;
  points: number;
}

interface QuizData {
  title: string;
  description: string;
  time_limit: number | null;
  questions: Question[];
}

export default function StudentQuizPage({ params: paramsPromise }: { params: Promise<{ accessCode: string }> }) {
  const params = use(paramsPromise);
  const accessCode = params.accessCode;

  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [studentName, setStudentName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; total_points: number } | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/public/${accessCode}`);
        if (res.data.success) {
          // Shuffling questions as per plan
          const shuffledQuestions = [...res.data.data.questions].sort(() => Math.random() - 0.5);
          setQuiz({ ...res.data.data, questions: shuffledQuestions });
          if (res.data.data.time_limit) {
            setTimeLeft(res.data.data.time_limit * 60);
          }
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load quiz");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [accessCode]);

  useEffect(() => {
    if (quizStarted && timeLeft !== null && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [quizStarted, timeLeft, isSubmitted]);

  const handleStart = () => {
    if (!studentName.trim()) {
      toast.error("Please enter your name to start");
      return;
    }
    setQuizStarted(true);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    try {
      const payload = {
        student_name: studentName,
        answers: Object.entries(answers).map(([id, ans]) => ({
          question_id: parseInt(id),
          student_answer: ans
        }))
      };
      const res = await api.post(`/quizzes/public/${accessCode}/submit`, payload);
      if (res.data.success) {
        setResult({
          score: res.data.score,
          total_points: res.data.total_points
        });
        setIsSubmitted(true);
        toast.success("Quiz submitted successfully!");
      }
    } catch (err: any) {
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center p-4">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-md w-full text-center space-y-4">
          <AlertCircle className="mx-auto text-zinc-400" size={48} />
          <h1 className="text-xl font-bold dark:text-white">Quiz Not Found</h1>
          <p className="text-zinc-500 text-sm">This quiz might be inactive or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold dark:text-white">Quiz Completed!</h1>
            <p className="text-zinc-500">Thank you, {studentName}. Your response has been recorded.</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-1">Your Score</p>
            <p className="text-3xl font-black text-emerald-500">{result.score} / {result.total_points}</p>
          </div>
          <p className="text-xs text-zinc-500">You can now close this window.</p>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#090a0c] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-md w-full space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold dark:text-white">{quiz.title}</h1>
            <p className="text-zinc-500 text-sm">{quiz.description}</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Questions</p>
              <p className="text-lg font-bold dark:text-white">{quiz.questions.length}</p>
            </div>
            <div className="flex-1 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Time Limit</p>
              <p className="text-lg font-bold dark:text-white">{quiz.time_limit ? `${quiz.time_limit}m` : "None"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-400 px-1">Your Full Name</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
          </div>

          <Button className="w-full py-6 text-lg font-bold" onClick={handleStart}>
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#090a0c] flex flex-col items-center p-4 md:p-8">
      <div className="max-w-3xl w-full flex flex-col gap-4 md:gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span className="text-xs md:text-sm font-bold dark:text-white truncate pr-2">{quiz.title}</span>
          </div>
          
          {timeLeft !== null && (
            <div className={`flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg border shrink-0 ${timeLeft < 60 ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 animate-pulse' : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
              <Timer size={14} className="md:w-4 md:h-4" />
              <span className="font-mono font-bold text-sm md:text-lg">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="h-1 md:h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 md:space-y-8 min-h-[350px] md:min-h-[400px] flex flex-col">
          <h2 className="text-lg md:text-2xl font-bold dark:text-white leading-tight">
            {currentQuestion.question_text}
          </h2>

          <div className="flex-1 space-y-2 md:space-y-3">
            {currentQuestion.question_type === 'short_answer' ? (
              <textarea 
                value={answers[currentQuestion.question_id] || ""}
                onChange={(e) => handleAnswerChange(currentQuestion.question_id, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-32 md:h-40 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white resize-none text-sm md:text-base"
              />
            ) : (
              currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerChange(currentQuestion.question_id, option)}
                  className={`w-full p-3 md:p-4 text-left rounded-xl border transition-all flex items-center justify-between group ${
                    answers[currentQuestion.question_id] === option
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-medium text-sm md:text-base">{option}</span>
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    answers[currentQuestion.question_id] === option
                      ? 'bg-white border-white text-emerald-500'
                      : 'border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500/50'
                  }`}>
                    {answers[currentQuestion.question_id] === option && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full" />}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="pt-4 md:pt-6 flex justify-end">
            <Button 
              size="lg" 
              className="w-full md:w-auto px-8 py-5 md:py-6 rounded-xl font-bold"
              onClick={handleNext}
              disabled={!answers[currentQuestion.question_id] || isSubmitting}
              isLoading={isSubmitting}
              rightIcon={<ChevronRight size={18} />}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-xs">
          Pro-Tip: Answers are auto-saved. Don't refresh the page!
        </p>
      </div>
    </div>
  );
}
