"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";

interface Props {
  userEmail: string;
  teacherId?: number | null;
  token?: string | null;
  onSuccess: () => void;
}

export const VerificationForm = ({ userEmail, teacherId, token, onSuccess }: Props) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    // Handle multi-character input (like paste or fast typing)
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        if (pastedCode[i]) newCode[i] = pastedCode[i];
      }
      setCode(newCode);

      // Focus appropriate box
      const nextIndex = Math.min(newCode.findIndex(v => v === ""), 5);
      const focusIndex = nextIndex === -1 ? 5 : nextIndex;
      inputRefs.current[focusIndex]?.focus();
      
      // Auto-submit if complete
      if (newCode.every(v => v !== "")) {
         submitVerification(newCode.join(""));
      }
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if this was the last digit and code is complete
    if (value !== "" && index === 5 && newCode.every(v => v !== "")) {
       submitVerification(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData) handleChange(0, pastedData);
  };

  const submitVerification = async (fullCode: string) => {
    if (isVerifying) return;
    setIsVerifying(true);

    try {
      let finalTeacherId = teacherId;

      // Fallback to cookie if prop is missing (e.g. initial load race condition)
      if (!finalTeacherId && !token) {
        const cookies = document.cookie.split("; ");
        const cookieId = cookies
            .find((row) => row.startsWith("teacher_id="))
            ?.split("=")[1];
        if (cookieId) finalTeacherId = Number(cookieId);
      }

      const response = await api.post("/auth/verify", {
        code: fullCode,
        teacher_id: finalTeacherId,
        token: token
      });

      if (response.status === 200) {
        toast.success("Account verified!");
        onSuccess();
      }
    } catch (error: any) {
      console.error("Verification error: ", error);
      const errorMessage = error.response?.data?.error || "Invalid verification code.";
      toast.error(errorMessage);

      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    
    let finalTeacherId = teacherId;
    if (!finalTeacherId) {
        const cookies = document.cookie.split("; ");
        const cookieId = cookies
            .find((row) => row.startsWith("teacher_id="))
            ?.split("=")[1];
        if (cookieId) finalTeacherId = Number(cookieId);
    }

    try {
      await api.post("/auth/resend-code", {
        teacher_id: finalTeacherId,
      });
      toast.success("A new code has been sent!");
    } catch (error) {
      toast.error("Failed to resend code.");
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-zinc-200 dark:ring-white/5 shadow-inner transition-colors">
        <Mail className="w-6 h-6 text-zinc-500 dark:text-gray-300" />
      </div>

      <h1 className="text-2xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
        Check your email
      </h1>

      <p className="text-sm text-zinc-500 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-300">
        We&apos;ve sent a 6-digit verification code to <br />
        <span className="text-zinc-900 dark:text-white font-medium">{userEmail || "your email"}</span>. <br />
        Enter it below to confirm your account.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); submitVerification(code.join("")); }} className="w-full">
        <div className="flex justify-between gap-2 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={1}
              className="w-12 h-14 text-center text-xl font-semibold bg-zinc-50 dark:bg-[#0d1117] border border-zinc-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-gray-600"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              placeholder="-"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isCodeComplete || isVerifying}
          className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2
            ${
              isCodeComplete && !isVerifying
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-zinc-100 dark:bg-gray-800 text-zinc-400 dark:text-gray-500 cursor-not-allowed"
            }`}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Account"
          )}
        </button>
      </form>

      <div className="mt-8 text-sm text-zinc-500 dark:text-gray-400 flex items-center justify-center gap-1 transition-colors duration-300">
        <span>Didn&apos;t receive the code?</span>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className={`font-bold transition-colors ${
            resendCooldown > 0
              ? "text-zinc-400 dark:text-gray-500 cursor-not-allowed"
              : "text-zinc-900 dark:text-white hover:text-emerald-500"
          }`}
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Now"}
        </button>
      </div>
    </div>
  );
};
