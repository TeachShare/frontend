"use client"
import React, { useState, useEffect } from "react";
import { Camera, Trash2, Save } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useUpdateProfile } from "@/hooks/useTeacher";
import Layout from "@/components/layout/Layout";
import toast from "react-hot-toast";

export const ProfileSection = () => {
  const { data: user, isLoading }: any = useUser();
  const updateProfile = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    role: "",
    institution: "",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role || "",
        institution: user.institution || "",
        bio: user.bio || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update profile.");
      }
    });
  };
  
  const seed = `${user?.id ?? "0"}-${user?.last_name ?? "User"}`;

  if(isLoading){
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between transition-colors duration-300">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Profile
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 transition-colors duration-300">
            Let other educators know who you are and how you teach.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleSave}
                disabled={updateProfile.isPending}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
            >
                <Save size={14} />
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
                Public Profile
            </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <p className="text-xs font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Profile photo
          </p>
          <div className="flex items-center space-x-6">
            <img
              src={user?.profile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
              className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm dark:shadow-xl transition-colors duration-300"
              alt="Profile Large"
            />
            <div className="space-y-3">
              <p className="text-[11px] text-zinc-600 dark:text-zinc-500 max-w-sm leading-relaxed transition-colors duration-300">
                A clear, friendly photo helps collaborators recognize you across
                messages and resources.
              </p>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors duration-300">
                  <Camera
                    size={14}
                    className="text-zinc-500 dark:text-zinc-500"
                  />
                  <span>Upload new</span>
                </button>
                <button className="flex items-center space-x-2 text-[11px] font-bold text-rose-600 dark:text-rose-500/70 hover:text-rose-700 dark:hover:text-rose-400 px-2 py-1.5 transition-colors duration-300">
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Full Name</span>
            </label>
            <input
              type="text"
              readOnly
              value={`${user?.first_name} ${user?.last_name}`}
              className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-500 dark:text-zinc-500 cursor-not-allowed transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Email Address</span>
            </label>
            <input
              type="text"
              readOnly
              value={user?.email}
              className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-500 dark:text-zinc-500 cursor-not-allowed transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Mathematics Teacher"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
              School/Organization
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g. Oak Ridge High School"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-colors duration-300"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
              <span>Bio</span>
              <span className="text-[10px] font-normal italic text-zinc-500 dark:text-zinc-600">
                1-2 sentences about your teaching context and what you love
                sharing.
              </span>
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell other educators about yourself..."
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 resize-none transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
