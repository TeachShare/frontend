"use client";
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { useRouter } from "next/navigation";

const toastStyle = {
  style: {
    minWidth: "250px",
    background: "var(--toast-bg, #161b22)",
    color: "var(--toast-text, #fff)",
    border: "1px solid var(--toast-border, #30363d)",
  },
  success: {
    iconTheme: { primary: "#238636", secondary: "#fff" },
  },
};

interface Props {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !username)
      return toast.error("Please fill in all fields");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const first_name = firstName.trim();
      const last_name = lastName.trim();
      const user_name = username.trim().toLowerCase();

      const registerRequest = async () => {
        const res = await api.post("/auth/register", {
          first_name,
          last_name,
          username: user_name,
          email,
          password,
        });

        const data = res.data;
        if (!data.success)
          throw new Error(data.message || "Registration failed");
        return data;
      };

      const data = await toast.promise(
        registerRequest(),
        {
          loading: "Creating your account...",
          success: "Account created! redirecting...",
          error: (err) => `${err.message}`,
        },
        toastStyle,
      );

      if (data.verification_token) {
        router.push(`/verification/${data.verification_token}`);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
            First name
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58]"
              size={16}
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
            Last name
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58]"
              size={16}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
            />
          </div>
        </div>
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
          Username
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58] text-sm font-bold">
            @
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
          Work email
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58]"
            size={16}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@school.edu"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
          />
        </div>
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58]"
              size={16}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide">
            Confirm password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58]"
              size={16}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636]"
            />
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-zinc-300 dark:border-[#30363d] bg-zinc-50 dark:bg-[#0d1117] text-emerald-600 dark:text-[#238636] focus:ring-0"
          />
          <span className="text-[13px] text-zinc-500 dark:text-[#8b949e] group-hover:text-zinc-900 dark:group-hover:text-[#c9d1d9]">
            I agree to the Terms and Privacy Policy
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] dark:hover:bg-[#2ea043] active:scale-[0.98] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 mt-4 text-sm"
      >
        {loading ? "Processing..." : "Create account"}
      </button>

      {/* Divider */}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
        <span className="mx-4 text-zinc-400 dark:text-[#484f58] text-[10px] font-bold uppercase tracking-widest">
          or
        </span>
        <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
      </div>

      <GoogleAuthButton />
    </form>
  );
};
