"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/logos/logo.svg";

// Extracted Components
import { VerificationForm } from "@/components/sections/auth/VerificationForm";
import { VerificationSuccess } from "@/components/sections/auth/VerificationSuccess";

const VerificationPage = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const userEmail = "example@school.edu";

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans flex flex-col relative selection:bg-green-500/30">
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
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to login
          </button>

          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            {isSuccess ? (
              <VerificationSuccess />
            ) : (
              <VerificationForm
                userEmail={userEmail}
                onSuccess={() => setIsSuccess(true)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
