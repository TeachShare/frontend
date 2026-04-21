"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Props {
  userEmail: string;
  onSuccess: () => void;
}

export const VerificationForm = ({ userEmail, onSuccess }: Props) => {
  const router = useRouter();
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
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((val) => val !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
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
    const pastedData = e.clipboardData.getData("text");
    handleChange(0, pastedData);
  };

  const verifyCode = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;

    setIsVerifying(true);

    try {
      const cookies = document.cookie.split("; ");
      const teacherId = cookies
        .find((row) => row.startsWith("teacher_id="))
        ?.split("=")[1];

      if (!teacherId) {
        toast.error("Session missing. Please log in again.");
        return;
      }

      const response = await api.post("/auth/verify", {
        code: fullCode,
        teacher_id: teacherId,
      });

      if (response.status === 200) {
        toast.success("Account verified successfully!");
        document.cookie = "is_verified=true; path=/";

        router.push("/dashboard")
        onSuccess();
      }
    } catch (error: any) {
      console.error("Verification error: ", error);
      const errorMessage =
        error.response?.data?.error || "Invalid code. Please try again.";
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
    const cookies = document.cookie.split("; ");
    const teacherId = cookies
        .find((row) => row.startsWith("teacher_id="))
        ?.split("=")[1];


    try {
      const response = await api.post("/auth/resend-code", {
        teacher_id: teacherId,
      });

      if (response.status === 200) {
        toast.success("A new code has been sent!");
      }
    } catch (error) {
      toast.error("Failed to resend code.");
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/5 shadow-inner">
        <Mail className="w-6 h-6 text-gray-300" />
      </div>

      <h1 className="text-2xl font-bold mb-3 tracking-tight">
        Check your email
      </h1>

      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        We&apos;ve sent a 6-digit verification code to <br />
        <span className="text-white font-medium">{userEmail}</span>. <br />
        Enter it below to confirm your account.
      </p>

      <form onSubmit={verifyCode} className="w-full">
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
              maxLength={6}
              className="w-12 h-14 text-center text-xl font-semibold bg-[#0d1117] border border-gray-700 rounded-lg focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all text-white placeholder-gray-600"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              placeholder="0"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isCodeComplete || isVerifying}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${
              isCodeComplete && !isVerifying
                ? "bg-[#22c55e] hover:bg-[#1ea951] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                : "bg-gray-800 text-gray-400 cursor-not-allowed"
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

      <div className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-1">
        <span>Didn&apos;t receive the code?</span>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className={`font-medium transition-colors ${
            resendCooldown > 0
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:text-[#22c55e]"
          }`}
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
        </button>
      </div>
    </div>
  );
};
