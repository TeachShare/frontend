"use client";

import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { GeneratorAPI } from '@/lib/generator';

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
  isGenerating: boolean;
  generate: (data: { type: string, subject: string, grade: string, objectives: string }) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  error: string | null;
  isLoadingHistory: boolean;
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export const GeneratorProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchHistory();
  }, []);

  const generate = async (data: { type: string, subject: string, grade: string, objectives: string }) => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await GeneratorAPI.generate(data);
      if (res.success) {
        setResults(prev => [res.data, ...prev]);
      } else {
        setError(res.message || "Failed to generate content");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred while generating content");
    } finally {
      setIsGenerating(false);
    }
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
    <GeneratorContext.Provider value={{ results, isGenerating, generate, deleteItem, error, isLoadingHistory }}>
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
