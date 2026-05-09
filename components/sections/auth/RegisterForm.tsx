"use client";
import React, { useState } from "react";
import { Mail, Lock, User, CheckCircle2, AlertCircle } from "lucide-react";
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
    fontSize: "13px",
    fontWeight: "500",
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

  const [strength, setStrength] = useState({
    score: 0,
    label: "Very Weak",
    color: "bg-zinc-200"
  });

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return setStrength({ score: 0, label: "Very Weak", color: "bg-zinc-200" });
    
    if (pass.length >= 8) score++;
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

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    calculateStrength(val);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !username) {
      return toast.error("Please fill in all fields", { icon: <AlertCircle className="text-rose-500" size={18} /> });
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", { icon: <AlertCircle className="text-rose-500" size={18} /> });
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters", { icon: <AlertCircle className="text-rose-500" size={18} /> });
    }

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
          loading: "Creating your workspace...",
          success: "Account created successfully!",
          error: (err) => `${err.message}`,
        },
        toastStyle,
      );

      if (data.verification_token) {
        setTimeout(() => {
          router.push(`/verification/${data.verification_token}`);
        }, 1000);
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <form className="space-y-5" onSubmit={handleRegister}>
      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
            First name
          </label>
          <div className="relative group">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
              size={16}
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
            Last name
          </label>
          <div className="relative group">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
              size={16}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Username
        </label>
        <div className="relative group">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 text-sm font-bold transition-colors">
            @
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Work email
        </label>
        <div className="relative group">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
            size={16}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@school.edu"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Password
        </label>
        <div className="relative group">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
            size={16}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Strong password"
            className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all duration-300"
          />
        </div>
        {password && (
          <div className="space-y-1.5 pt-0.5 px-1">
            <div className="flex gap-1 h-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-full transition-all duration-500 ${i < strength.score ? strength.color : 'bg-zinc-200 dark:bg-[#30363d]'}`}
                />
              ))}
            </div>
            <p className={`text-[9px] font-bold tracking-wide uppercase ${strength.score <= 2 ? 'text-rose-500' : strength.score <= 3 ? 'text-orange-500' : 'text-emerald-500'}`}>
              {strength.label}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide ml-1">
          Confirm password
        </label>
        <div className="relative group">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors"
            size={16}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Match password"
            className={`w-full bg-zinc-50 dark:bg-[#0d1117] border rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:ring-2 transition-all duration-300 ${
              passwordsMatch 
                ? "border-emerald-500/50 focus:ring-emerald-500/10" 
                : confirmPassword && password !== confirmPassword
                ? "border-rose-500/50 focus:ring-rose-500/10"
                : "border-zinc-200 dark:border-[#30363d] focus:ring-emerald-500/10 focus:border-emerald-500/50"
            }`}
          />
          {passwordsMatch && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in duration-300">
              <CheckCircle2 size={18} />
            </div>
          )}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            required
            className="w-4 h-4 rounded border-zinc-300 dark:border-[#30363d] bg-zinc-50 dark:bg-[#0d1117] text-emerald-600 dark:text-[#238636] focus:ring-0 transition-all cursor-pointer"
          />
          <span className="text-[12px] text-zinc-500 dark:text-[#8b949e] group-hover:text-zinc-900 dark:group-hover:text-[#c9d1d9] transition-colors leading-none">
            I agree to the Terms and Privacy Policy
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] dark:hover:bg-[#2ea043] active:scale-[0.98] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 dark:shadow-none mt-2 text-sm"
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
