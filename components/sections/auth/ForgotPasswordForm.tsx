"use client";
import React, { useState } from "react";
import { Mail, Lock, AlertCircle, ArrowLeft, Key } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.data.success) {
        toast.success(res.data.message);
        setStep("otp");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) return toast.error("Please fill in all fields");

    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        email,
        code: otp,
        new_password: newPassword
      });
      if (res.data.success) {
        toast.success(res.data.message);
        onBack(); // Go back to login
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <button 
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-[#30363d] text-zinc-500 dark:text-[#8b949e] transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {step === "email" ? "Reset password" : "Confirm new password"}
        </h2>
      </div>

      {step === "email" ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <p className="text-xs text-zinc-500 dark:text-[#8b949e] leading-relaxed">
            Enter your email address and we&apos;ll send you a verification code to reset your password.
          </p>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
              Account email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                required
                className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 text-sm mt-4"
          >
            {loading ? "Sending..." : "Send reset code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyAndReset} className="space-y-4">
          <p className="text-xs text-zinc-500 dark:text-[#8b949e] leading-relaxed">
            We&apos;ve sent a code to <span className="text-zinc-900 dark:text-white font-semibold">{email}</span>. 
            Enter it below along with your new password.
          </p>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
              Verification Code
            </label>
            <div className="relative group">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                required
                className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 tracking-[0.2em] font-mono transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
              New Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 text-sm mt-4"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};
