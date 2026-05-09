"use client";
import React, { useState } from "react";
import { Lock, ShieldCheck, Loader2, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { useChangePassword } from "@/hooks/useTeacher";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export const SecuritySection = () => {
  const { data: user, isLoading } = useUser();
  const changePassword = useChangePassword();
  
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [strength, setStrength] = useState({
    score: 0,
    label: "Very Weak",
    color: "bg-zinc-200"
  });

  const isGoogleUser = user?.auth_provider === 'google';

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return setStrength({ score: 0, label: "Very Weak", color: "bg-zinc-200" });
    
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    const colors = ["bg-rose-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-emerald-600"];

    setStrength({
      score: Math.min(score + 1, 5),
      label: labels[score] || "Very Weak",
      color: colors[score] || "bg-zinc-200"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'new_password') {
      calculateStrength(value);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error("New passwords do not match.", {
        icon: <AlertCircle className="text-rose-500" size={20} />,
      });
      return;
    }
    
    if (formData.new_password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        icon: <AlertCircle className="text-rose-500" size={20} />,
      });
      return;
    }

    const toastId = toast.loading("Updating password...");

    changePassword.mutate({
      current_password: formData.current_password,
      new_password: formData.new_password
    }, {
      onSuccess: () => {
        toast.success("Password updated successfully!", {
          id: toastId,
          icon: <CheckCircle2 className="text-emerald-500" size={20} />,
        });
        setFormData({ current_password: "", new_password: "", confirm_password: "" });
        setStrength({ score: 0, label: "Very Weak", color: "bg-zinc-200" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update password. Please check your current password.", {
          id: toastId,
          icon: <AlertCircle className="text-rose-500" size={20} />,
        });
      }
    });
  };

  const passwordsMatch = formData.new_password && formData.confirm_password && formData.new_password === formData.confirm_password;

  return (
    <div className="w-full bg-white dark:bg-[#090a0c] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Account Security</h2>
            <p className="text-[11px] text-zinc-500">Secure your account with a strong password</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-emerald-500" />
          </div>
        ) : isGoogleUser ? (
          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white dark:bg-zinc-800 rounded-full shadow-sm">
              <Lock size={32} className="text-zinc-400" />
            </div>
            <div className="max-w-xs space-y-2">
              <p className="text-sm font-bold text-zinc-900 dark:text-white">Managed by Google</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Your account is secured via Google OAuth. To update your password, please visit your Google Account security settings.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Current Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="password"
                        name="current_password"
                        value={formData.current_password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your current password"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">New Password</label>
                    <div className="relative group">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        required
                        placeholder="At least 8 characters"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                    {formData.new_password && (
                      <div className="space-y-2 pt-1 px-1">
                        <div className="flex gap-1 h-1">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-500 ${i < strength.score ? strength.color : 'bg-zinc-100 dark:bg-zinc-800'}`}
                            />
                          ))}
                        </div>
                        <p className={`text-[10px] font-bold tracking-wide ${strength.score <= 2 ? 'text-rose-500' : strength.score <= 3 ? 'text-orange-500' : 'text-emerald-500'}`}>
                          Strength: {strength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Confirm New Password</label>
                    <div className="relative group">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                        placeholder="Repeat new password"
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 border rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                          passwordsMatch 
                            ? "border-emerald-500/50 focus:ring-emerald-500/20" 
                            : formData.confirm_password && formData.new_password !== formData.confirm_password
                            ? "border-rose-500/50 focus:ring-rose-500/20"
                            : "border-zinc-200 dark:border-zinc-800 focus:ring-blue-500/20 focus:border-blue-500/50"
                        }`}
                      />
                      {passwordsMatch && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in duration-300">
                          <CheckCircle2 size={18} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="emerald"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-[12px] shadow-lg shadow-emerald-500/10"
                    disabled={changePassword.isPending || !formData.current_password || !formData.new_password || !passwordsMatch}
                    isLoading={changePassword.isPending}
                    leftIcon={<Key size={14} />}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 space-y-4 h-full">
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <AlertCircle size={14} className="text-blue-500" />
                  Security Tips
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "Minimum 8 characters", rule: "Length" },
                    { label: "Uppercase & lowercase", rule: "Casing" },
                    { label: "At least one number", rule: "Digits" },
                    { label: "Special characters (!@#$)", rule: "Symbols" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${formData.new_password.length >= 8 && i === 0 ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                      <div>
                        <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 leading-none">{item.rule}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">{item.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-auto">
                  <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                    A strong password helps protect your educational materials and student data from unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
