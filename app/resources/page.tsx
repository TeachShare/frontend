"use client";
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { api } from '@/lib/axios'; // Make sure this path is correct based on your setup

// Components
import { ResourceHeader } from '@/components/sections/resources/ResourceHeader';
import { ResourceToolbar } from '@/components/sections/resources/ResourceToolbar';
import { ResourceCard } from '@/components/sections/resources/ResourceCard';
import { ResourcePagination } from '@/components/sections/resources/ResourcePagination';
import { SkeletonResourceCard } from '@/components/sections/resources/ResourceSkeletons';
import { Button } from '@/components/ui/Button';
import { Plus, Grid, List, Trash2, Shield, ShieldOff, Check, X, Loader2, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Resource {
  collection_id: number;
  owner_id: number;
  title: string;
  category: string;
  type: string;
  grade: string;
  tags: string[];
  downloads: number;
  likes: number;
  weekly_likes: number;
  visibility: string;
  is_published: boolean;
  is_collaborator: boolean;
  updated_at: string;
}

const MyResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedId] = useState<number[]>([]);
  const [isBulkActing, setIsBulkActing] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    grade: "",
    content_type: "",
    status: "all",
    sort_by: "newest"
  })

  const [page, setPage] = useState(1);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<'delete' | 'make_private' | 'make_public' | null>(null);

  const fetchMyResources = React.useCallback(async (currentFilters: typeof filters, currentPage: number) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('sort_by', currentFilters.sort_by);
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.subject) params.append('subject_id', currentFilters.subject);
      if (currentFilters.grade) params.append('grade_level_id', currentFilters.grade);
      if (currentFilters.content_type) params.append('content_type_id', currentFilters.content_type);
      if (currentFilters.status !== 'all') params.append('status', currentFilters.status);

      const response = await api.get(`/resource_collection/my-resources?${params.toString()}`);
      if (response.data.success) {
        setResources(response.data.resources);
        setPagination({
          currentPage: response.data.current_page,
          totalPages: response.data.total_pages
        });
      }
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMyResources(filters, page);
    }, filters.search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [filters, page, fetchMyResources]);

  const toggleSelect = (id: number) => {
    setSelectedId(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkAction = async (action: 'delete' | 'make_private' | 'make_public') => {
    if (action === 'delete' && !showBulkConfirm) {
      setBulkActionType('delete');
      setShowBulkConfirm(true);
      return;
    }

    // Close modal immediately upon confirmation to show processing state
    setShowBulkConfirm(false);
    setBulkActionType(null);

    try {
      setIsBulkActing(true);
      const res = await api.post('/resource_collection/bulk-action', {
        action,
        collection_ids: selectedIds
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setSelectedId([]);
        fetchMyResources(filters, page);
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: string } } };
      toast.error(apiError.response?.data?.error || "Bulk action failed");
      // If it failed, we don't necessarily want to reopen the modal, 
      // but the user can try again from the bulk bar.
    } finally {
      setIsBulkActing(false);
    }
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300 relative">
        
        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[50] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-4 duration-300 border border-zinc-800/50 dark:border-zinc-200">
             <div className="flex items-center gap-2 border-r border-zinc-700 dark:border-zinc-200 pr-6">
                <span className="bg-emerald-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{selectedIds.length}</span>
                <span className="text-xs font-bold uppercase tracking-wider">Selected</span>
             </div>
             
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleBulkAction('make_public')}
                  className="p-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl transition-colors group relative"
                  title="Make Public"
                >
                  <Shield size={18} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Make Public</span>
                </button>
                <button 
                  onClick={() => handleBulkAction('make_private')}
                  className="p-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl transition-colors group relative"
                  title="Make Private"
                >
                  <ShieldOff size={18} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Make Private</span>
                </button>
                <button 
                  onClick={() => handleBulkAction('delete')}
                  className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-xl transition-colors group relative"
                  title="Delete Selected"
                >
                  <Trash2 size={18} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Delete All</span>
                </button>
             </div>

             <button 
               onClick={() => setSelectedId([])}
               className="ml-2 p-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg transition-colors"
             >
                <X size={16} />
             </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <ResourceHeader />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex-1">
                <ResourceToolbar filters={filters} setFilters={setFilters}/>
             </div>
             <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-xl shrink-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  <Grid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  <List size={16} />
                </button>
             </div>
          </div>

          {isLoading ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20" : "space-y-3 pb-20"}>
              {[...Array(6)].map((_, i) => <SkeletonResourceCard key={i} />)}
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 bg-white dark:bg-[#121417] border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl animate-in fade-in duration-500">
               <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-300">
                  <BookOpen size={40} />
               </div>
               <div className="text-center max-w-sm">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Your Repository is Empty</h3>
                  <p className="text-sm text-zinc-500 mt-2">Start building your teaching library by creating your first resource to share with other educators.</p>
               </div>
               <div className="flex justify-center">
                  <Button variant="emerald" onClick={() => router.push('/resources/create')} leftIcon={<Plus size={16} />}>
                    Create Resource
                  </Button>
               </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20" : "space-y-3 pb-20"}>
              {resources.map((res, i) => (
                <div key={res.collection_id || i} className="relative group/card">
                  <button 
                    onClick={() => toggleSelect(res.collection_id)}
                    className={`absolute -top-2 -left-2 z-20 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedIds.includes(res.collection_id) 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-transparent group-hover/card:border-emerald-500/50'
                    }`}
                  >
                    <Check size={12} strokeWidth={4} />
                  </button>
                  <ResourceCard
                    {...res}
                    likes={res.likes ?? 0}
                    downloads={res.downloads ?? 0}
                    weekly_likes={res.weekly_likes}
                    is_selected={selectedIds.includes(res.collection_id)}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}

          {resources.length > 0 && (
            <ResourcePagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}

        </div>

        {isBulkActing && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] flex items-center justify-center">
             <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                <Loader2 className="animate-spin text-emerald-500" />
                <span className="font-bold text-sm">Processing batch actions...</span>
             </div>
          </div>
        )}

        {/* Custom Bulk Confirm Modal */}
        {showBulkConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#090a0c] w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl text-rose-600">
                  <Trash2 size={28} />
                </div>
                <button 
                  onClick={() => { setShowBulkConfirm(false); setBulkActionType(null); }} 
                  className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Delete {selectedIds.length} Resources?</h2>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  You are about to permanently delete <span className="font-bold text-zinc-900 dark:text-zinc-300">{selectedIds.length}</span> resources. This action will wipe all associated files and version history for these items. This cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  disabled={isBulkActing}
                  onClick={() => { setShowBulkConfirm(false); setBulkActionType(null); }}
                  className="flex-1 py-3.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleBulkAction('delete')}
                  disabled={isBulkActing}
                  className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 disabled:opacity-50"
                >
                  {isBulkActing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {isBulkActing ? "Deleting..." : "Delete All"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default MyResourcesPage;