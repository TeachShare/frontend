"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import logo from "@/public/logos/logo.svg";
import { api } from "@/lib/axios";

// Extracted Components
import { VerificationForm } from "@/components/sections/auth/VerificationForm";

const VerificationSuccess = () => {
  return (
    <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Email Verified!</h2>
      <p className="text-zinc-500 dark:text-gray-400 text-sm mb-8">
        Your account has been successfully verified. You will be redirected to your dashboard momentarily.
      </p>
      <div className="w-6 h-6 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const VerificationPage = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchInfo = async () => {
      try {
        const response = await api.get(`/auth/verification-info/${token}`);
        if (response.data.success) {
          setUserEmail(response.data.data.email);
          setTeacherId(response.data.data.id);
          if (response.data.data.is_verified) {
             handleSuccess();
          }
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "Invalid verification link");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [token]);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0f1115] text-zinc-900 dark:text-white font-sans flex flex-col relative selection:bg-green-500/30 transition-colors duration-300">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[440px]">
          {!isSuccess && (
            <button
                onClick={() => router.push("/auth?view=login")}
                className="self-start flex items-center gap-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6 group"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Back to login</span>
            </button>
          )}

          <div className="bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
            {loading ? (
              <div className="py-12 flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-sm text-zinc-500 dark:text-gray-400 font-medium tracking-tight">Verifying link session...</p>
              </div>
            ) : error ? (
              <div className="text-center py-6">
                <div className="text-rose-500 font-bold mb-2 uppercase tracking-widest text-xs">Error</div>
                <p className="text-sm text-zinc-600 dark:text-gray-400">{error}</p>
                <button 
                  onClick={() => router.push("/auth?view=login")}
                  className="mt-6 text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:underline"
                >
                   Go to Login
                </button>
              </div>
            ) : isSuccess ? (
              <VerificationSuccess />
            ) : (
              <VerificationForm
                userEmail={userEmail}
                teacherId={teacherId}
                token={token}
                onSuccess={handleSuccess}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
