"use client";
import React, { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logos/logo.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

import { LoginForm } from "@/components/sections/auth/LoginForm";
import { RegisterForm } from "@/components/sections/auth/RegisterForm";
import { ForgotPasswordForm } from "@/components/sections/auth/ForgotPasswordForm";

const AuthContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view") || "login";
  const error = searchParams.get("error");

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      // Clean up error from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");
      const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [error, searchParams]);

  // Update URL when user clicks toggle
  const handleToggle = (newView: string) => {
    router.replace(`/auth?view=${newView}`);
  };

  const renderTitle = () => {
    if (currentView === "register") return "Create your teacher account";
    if (currentView === "forgot-password") return "Forgot your password?";
    return "Welcome back";
  };

  const renderSubtitle = () => {
    if (currentView === "register") return "Set up your workspace to start sharing lesson plans, exam banks, and classroom resources.";
    if (currentView === "forgot-password") return "No worries! Enter your email and we'll help you get back into your account.";
    return "Sign in to access your lesson repos, exam banks, and shared workspaces.";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0d1117] text-zinc-900 dark:text-[#c9d1d9] font-sans selection:bg-emerald-500/30 dark:selection:bg-[#238636]/30 overflow-x-hidden relative flex flex-col transition-colors duration-300">
      <Toaster position="top-center" reverseOrder={false} />

      <header className="relative z-10 p-6 md:px-12 flex items-center gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <Image alt="teachshareLogo" src={logo} width={30} height={30} />
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
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>

        <div className="w-full max-w-[520px] bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-[#30363d] rounded-[24px] shadow-xl dark:shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500 transition-colors duration-300">
          
          {/* View Toggles - Hidden in Forgot Password mode */}
          {currentView !== "forgot-password" && (
            <div className="bg-zinc-100 dark:bg-[#0d1117] p-1 rounded-xl flex mb-8 border border-zinc-200 dark:border-[#30363d]/50 transition-colors duration-300">
              <button
                onClick={() => handleToggle("login")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                  currentView === "login" ? "bg-emerald-600 dark:bg-[#238636] text-white shadow-sm" : "text-zinc-500 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-[#c9d1d9]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleToggle("register")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                  currentView === "register" ? "bg-emerald-600 dark:bg-[#238636] text-white shadow-sm" : "text-zinc-500 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-[#c9d1d9]"
                }`}
              >
                Register
              </button>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-300">
              {renderTitle()}
            </h1>
            <p className="text-zinc-500 dark:text-[#8b949e] text-xs leading-relaxed max-w-[90%] transition-colors duration-300">
              {renderSubtitle()}
            </p>
          </div>

          {/* Conditional Form Rendering */}
          {currentView === "login" && (
            <LoginForm onForgotPassword={() => handleToggle("forgot-password")} />
          )}
          {currentView === "register" && (
            <RegisterForm onSuccess={() => handleToggle("login")} />
          )}
          {currentView === "forgot-password" && (
            <ForgotPasswordForm onBack={() => handleToggle("login")} />
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-[#8b949e] transition-colors duration-300">
              {currentView === "login" ? (
                <>
                  New to TeachShare?{" "}
                  <button onClick={() => handleToggle("register")} className="text-blue-600 dark:text-[#58a6ff] hover:underline font-semibold ml-1">
                    Create account
                  </button>
                </>
              ) : currentView === "register" ? (
                <>
                  Already have an account?{" "}
                  <button onClick={() => handleToggle("login")} className="text-blue-600 dark:text-[#58a6ff] hover:underline font-semibold ml-1">
                    Log in
                  </button>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-[#0d1117]" />}>
      <AuthContent />
    </Suspense>
  );
}