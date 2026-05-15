"use client";

import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { GeneratorAPI } from '@/lib/generator';
import { api } from '@/lib/axios';

interface GeneratedContent {
  id: number;
  content: string;
  title: string;
  type: string;
  pdf_url?: string;
  subject?: string;
  grade?: string;
}

interface GeneratorContextType {
  results: GeneratedContent[];
  quizzes: any[];
  isGenerating: boolean;
  generate: (data: any) => Promise<void>;
  saveGeneratedQuiz: (data: any) => Promise<any>;
  deleteItem: (id: number) => Promise<void>;
  error: string | null;
  isLoadingHistory: boolean;
  pendingQuiz: any | null;
  setPendingQuiz: (quiz: any | null) => void;
  fetchQuizzes: () => Promise<void>;
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export const GeneratorProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingQuiz, setPendingQuiz] = useState<any | null>(null);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await GeneratorAPI.getHistory();
      if (res.success) {
        setResults(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await api.get('/quizzes/my-quizzes');
      if (res.data.success) {
        setQuizzes(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchQuizzes();
  }, []);

  const generate = async (data: any) => {
    setIsGenerating(true);
    setError(null);
    try {
      if (data.type === 'quiz') {
        const res = await GeneratorAPI.generateQuiz({
          topic: data.objectives,
          grade: data.grade,
          num_questions: data.num_questions,
          question_types: data.question_types
        });
        if (res.success) {
          setPendingQuiz(res.data);
        } else {
          setError(res.message || "Failed to generate quiz");
        }
      } else {
        const res = await GeneratorAPI.generate(data);
        if (res.success) {
          setResults(prev => [res.data, ...prev]);
        } else {
          setError(res.message || "Failed to generate content");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while generating content");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveGeneratedQuiz = async (quizData: any) => {
    try {
      const res = await GeneratorAPI.saveQuiz(quizData);
      if (res.success) {
        setPendingQuiz(null);
        fetchQuizzes();
        return res;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save quiz");
    }
    return null;
  };

  const deleteItem = async (id: number) => {
    try {
      const res = await GeneratorAPI.deleteContent(id);
      if (res.success) {
        setResults(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete content", err);
    }
  };

  return (
    <GeneratorContext.Provider value={{ 
      results, 
      quizzes,
      isGenerating, 
      generate, 
      saveGeneratedQuiz, 
      deleteItem, 
      error, 
      isLoadingHistory,
      pendingQuiz,
      setPendingQuiz,
      fetchQuizzes
    }}>
      {children}
    </GeneratorContext.Provider>
  );
};

export const useGenerator = () => {
  const context = useContext(GeneratorContext);
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorProvider');
  }
  return context;
};
