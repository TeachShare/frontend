"use client";
import React, { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { GoogleAuthButton } from "./GoogleAuthButton";

const toastStyle = {
  style: {
    minWidth: "250px",
    background: "var(--toast-bg, #161b22)",
    color: "var(--toast-text, #fff)",
    border: "1px solid var(--toast-border, #30363d)",
    fontSize: "13px",
    fontWeight: "500",
  },
  success: {
    iconTheme: { primary: "#238636", secondary: "#fff" },
  },
};

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields", { icon: <AlertCircle className="text-rose-500" size={18} /> });
    }

    setLoading(true);
    try {
      const loginPromise = api.post("/auth/login", { email, password }).then((res) => {
        const data = res.data;
        if (!data.success) throw new Error(data.message || "Login failed");
        return data;
      });

      await toast.promise(
        loginPromise,
        {
          loading: "Signing you in...",
          success: (data) => {
          
            if(!data.is_verified && data.verification_token){
                router.push(`/verification/${data.verification_token}`);
                return "Please verify your account to continue."
            }

            router.push("/dashboard");
            return "Welcome back!";
          },
          error: (err) => `${err.message}`,
        },
        toastStyle
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Work email
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="name@school.edu"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Password
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 dark:border-[#30363d] bg-zinc-50 dark:bg-[#0d1117] text-emerald-600 dark:text-[#238636] focus:ring-0 transition-all cursor-pointer" />
          <span className="text-[13px] text-zinc-500 dark:text-[#8b949e] group-hover:text-zinc-900 dark:group-hover:text-[#c9d1d9] transition-colors">
            Remember me
          </span>
        </label>
        <button type="button" className="text-[13px] text-blue-600 dark:text-[#58a6ff] hover:text-blue-700 dark:hover:text-white transition-colors">
          Forgot password?
        </button>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] dark:hover:bg-[#2ea043] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 dark:shadow-none mt-4 text-sm">
        {loading ? "Signing you in..." : "Login"}
      </button>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
        <span className="flex-shrink mx-4 text-zinc-400 dark:text-[#484f58] text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">or</span>
        <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
      </div>

      <GoogleAuthButton />
    </form>
  );
};
