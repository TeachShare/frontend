"use client";
import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logos/logo.svg";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [view, setView] = useState<string>("login");
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const toggleView = (target: string) => {
    setView(target);
    setPassword("");
    setConfirmPassword("");
  };

  const handleAuthButton = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (view === "register") {
      if (!fullName) return toast.error("Please enter your full name");
      if (password !== confirmPassword)
        return toast.error("Passwords do not match");
    }

    const toastStyle = {
      style: {
        minWidth: "250px",
        background: "var(--toast-bg, #161b22)", // Fallback used if css vars aren't set
        color: "var(--toast-text, #fff)",
        border: "1px solid var(--toast-border, #30363d)",
      },
      success: {
        iconTheme: { primary: "#238636", secondary: "#fff" },
      },
    };

    setLoading(true);

    try {
      if (view === "login") {
        const loginPromise = fetch("http://localhost:5000/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }).then(async (res) => {
          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error(data.message || "Login failed");
          return data;
        });

        await toast.promise(
          loginPromise,
          {
            loading: "Signing you in...",
            success: () => {
              router.push("/dashboard");
              return "Welcome back!";
            },
            error: (err) => `${err.message}`,
          },
          toastStyle,
        );
      } else {
        const nameParts = fullName.trim().split(" ");
        const first_name = nameParts[0];
        const last_name = nameParts.slice(1).join(" ") || "";

        const registerPromise = fetch(
          "http://localhost:5000/api/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              first_name,
              last_name,
              email,
              password,
            }),
          },
        ).then(async (res) => {
          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error(data.message || "Registration failed");
          return data;
        });

        await toast.promise(
          registerPromise,
          {
            loading: "Creating your account...",
            success: "Account created! You can now login.",
            error: (err) => `${err.message}`,
          },
          toastStyle,
        );

        setView("login");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0d1117] text-zinc-900 dark:text-[#c9d1d9] font-sans selection:bg-emerald-500/30 dark:selection:bg-[#238636]/30 overflow-x-hidden relative flex flex-col transition-colors duration-300">
      {/* Note: React Hot Toast doesn't inherently listen to Next-Themes without custom CSS variables, so it might stay dark unless you inject a wrapper. For a hackathon, letting it stay dark is usually fine! */}
      <Toaster position="top-center" reverseOrder={false} />

      <header className="relative z-10 p-6 md:px-12 flex items-center gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <Image
              alt="teachshareLogo"
              src={logo}
              width={30}
              height={30}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
            TeachShare
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-2 flex flex-col items-center w-full">
        <button
          onClick={() => router.push("/")}
          className="self-start flex items-center gap-2 text-zinc-500 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-white transition-colors mb-6 text-sm group ml-2 md:ml-12"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="font-medium">Back</span>
        </button>

        <div className="w-full max-w-[520px] bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-[#30363d] rounded-[24px] shadow-xl dark:shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500 transition-colors duration-300">
          <div className="bg-zinc-100 dark:bg-[#0d1117] p-1 rounded-xl flex mb-8 border border-zinc-200 dark:border-[#30363d]/50 transition-colors duration-300">
            <button
              disabled={loading}
              onClick={() => toggleView("login")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                view === "login"
                  ? "bg-emerald-600 dark:bg-[#238636] text-white shadow-sm"
                  : "text-zinc-500 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-[#c9d1d9]"
              }`}
            >
              Login
            </button>
            <button
              disabled={loading}
              onClick={() => toggleView("register")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                view === "register"
                  ? "bg-emerald-600 dark:bg-[#238636] text-white shadow-sm"
                  : "text-zinc-500 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-[#c9d1d9]"
              }`}
            >
              Register
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-300">
              {view === "login"
                ? "Welcome back"
                : "Create your teacher account"}
            </h1>
            <p className="text-zinc-500 dark:text-[#8b949e] text-xs leading-relaxed max-w-[90%] transition-colors duration-300">
              {view === "login"
                ? "Sign in to access your lesson repos, exam banks, and shared workspaces."
                : "Set up your workspace to start sharing lesson plans, exam banks, and classroom resources."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleAuthButton}>
            {view === "register" && (
              <div className="">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide transition-colors duration-300">
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58] transition-colors duration-300"
                      size={16}
                    />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter Full Name"
                      className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636] transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide transition-colors duration-300">
                {view === "login" ? "Email" : "Work email"}
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58] transition-colors duration-300"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    view === "login" ? "name@school.edu" : "example@school.edu"
                  }
                  className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636] transition-all"
                />
              </div>
            </div>

            <div
              className={`${view === "register" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-1.5"}`}
            >
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58] transition-colors duration-300"
                    size={16}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      view === "login"
                        ? "Enter your password"
                        : "Create a strong password"
                    }
                    className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636] transition-all"
                  />
                </div>
              </div>

              {view === "register" && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 dark:text-[#8b949e] tracking-wide transition-colors duration-300">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#484f58] transition-colors duration-300"
                      size={16}
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#484f58] focus:outline-none focus:border-emerald-500 dark:focus:border-[#238636] transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-300 dark:border-[#30363d] bg-zinc-50 dark:bg-[#0d1117] text-emerald-600 dark:text-[#238636] focus:ring-0 transition-all cursor-pointer"
                />
                <span className="text-[13px] text-zinc-500 dark:text-[#8b949e] group-hover:text-zinc-900 dark:group-hover:text-[#c9d1d9] transition-colors">
                  {view === "login"
                    ? "Remember me"
                    : "I agree to the Terms and Privacy Policy"}
                </span>
              </label>
              {view === "login" && (
                <button
                  type="button"
                  className="text-[13px] text-blue-600 dark:text-[#58a6ff] hover:text-blue-700 dark:hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-[#238636] dark:hover:bg-[#2ea043] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 dark:shadow-none mt-4 text-sm"
            >
              {loading
                ? "Processing..."
                : view === "login"
                  ? "Login"
                  : "Create account"}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
              <span className="flex-shrink mx-4 text-zinc-400 dark:text-[#484f58] text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">
                or
              </span>
              <div className="flex-grow border-t border-zinc-200 dark:border-[#30363d]"></div>
            </div>

            <button
              type="button"
              className="w-full bg-white dark:bg-[#21262d] border border-zinc-200 dark:border-[#30363d] hover:bg-zinc-50 dark:hover:bg-[#30363d] text-zinc-700 dark:text-[#c9d1d9] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 text-sm shadow-sm dark:shadow-none"
            >
              {/* Added dark mode inversion handler for the Google Logo */}
              <svg
                className="w-4 h-4 dark:fill-white fill-zinc-800 transition-colors duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.42-7.84 5.42-4.83 0-8.76-4.01-8.76-8.94s3.93-8.94 8.76-8.94c2.75 0 4.59 1.17 5.65 2.18l2.58-2.48C18.69 1.45 15.84 0 12.48 0 5.86 0 .5 5.37.5 12s5.36 12 11.98 12c6.91 0 11.5-4.86 11.5-11.7 0-.79-.08-1.39-.18-1.98h-11.32z" />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-[#8b949e] transition-colors duration-300">
              {view === "login" ? (
                <>
                  New to TeachShare?{" "}
                  <button
                    onClick={() => toggleView("register")}
                    className="text-blue-600 dark:text-[#58a6ff] hover:underline font-semibold ml-1"
                  >
                    Create account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => toggleView("login")}
                    className="text-blue-600 dark:text-[#58a6ff] hover:underline font-semibold ml-1"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
