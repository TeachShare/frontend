import React, { useState } from "react";
import { ArchiveIcon, Trash2, Loader2, AlertTriangle, ShieldAlert } from "lucide-react";
import { TeacherAPI } from "@/lib/teachers";
import { toast } from "react-hot-toast";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export const DangerZone = () => {
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleArchive = async () => {
    setIsArchiving(true);
    try {
      const res = await TeacherAPI.archiveAccount();
      if (res.success) {
        toast.success("Account archived. Redirecting...");
        setTimeout(() => {
          window.location.href = "/auth?view=login";
        }, 2000);
      } else {
        toast.error(res.message || "Failed to archive account");
      }
    } catch (err) {
      toast.error("An error occurred during archiving");
    } finally {
      setIsArchiving(false);
      setIsArchiveModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await TeacherAPI.deleteAccount();
      if (res.success) {
        toast.success("Account deleted permanently.");
        setTimeout(() => {
          window.location.href = "/auth?view=register";
        }, 2000);
      } else {
        toast.error(res.message || "Failed to delete account");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
        <div>
          <h3 className="text-[13px] font-bold text-rose-600 dark:text-rose-500 transition-colors duration-300 flex items-center gap-2">
            <ShieldAlert size={16} /> Danger Zone
          </h3>
          <p className="text-[10px] text-zinc-600 dark:text-zinc-500 mt-1 transition-colors duration-300">
            Adjust with care. Archiving or deleting your account affects shared
            resources across TeachShare.
          </p>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <button 
            onClick={() => setIsArchiveModalOpen(true)}
            className="flex items-center space-x-2 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300"
          >
            <ArchiveIcon size={14} />
            <span>Archive account</span>
          </button>
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-lg shadow-rose-500/10"
          >
            <Trash2 size={14} />
            <span>Delete account</span>
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-600 pt-4 transition-colors duration-300">
        Settings apply across all devices.
      </p>

      {/* Archive Modal */}
      <Modal 
        isOpen={isArchiveModalOpen} 
        onClose={() => setIsArchiveModalOpen(false)}
        title="Archive Account"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-xl">
            <ArchiveIcon className="text-emerald-500 shrink-0" size={20} />
            <div className="space-y-1">
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-400">Taking a break?</p>
              <p className="text-xs text-emerald-700/70 dark:text-emerald-500/60 leading-relaxed">
                Archiving hides your profile and resources from the community but keeps all your data safe. You can restore everything anytime by logging back in.
              </p>
            </div>
          </div>
          
          <ul className="space-y-3 px-1">
            {[
              "Your profile will be hidden from search.",
              "Public resources will be moved to private.",
              "Followers can no longer see your updates.",
              "Restore your account instantly with a single click."
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {text}
              </li>
            ))}
          </ul>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1" 
              onClick={() => setIsArchiveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800" 
              onClick={handleArchive}
              isLoading={isArchiving}
            >
              Archive Now
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 rounded-xl text-rose-600">
            <AlertTriangle className="shrink-0" size={20} />
            <div className="space-y-1">
              <p className="text-sm font-bold">This is permanent</p>
              <p className="text-xs text-rose-600/70 dark:text-rose-500/60 leading-relaxed">
                Once deleted, your profile, resources, quizzes, and all interactions will be wiped from our servers. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest px-1">
              Confirm by typing "DELETE"
            </label>
            <input 
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE..."
              className="w-full p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white font-mono text-center tracking-widest"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger"
              className="flex-1" 
              onClick={handleDelete}
              isLoading={isDeleting}
              disabled={deleteConfirmation !== "DELETE"}
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
