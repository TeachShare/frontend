"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import Image from "next/image";
import logo from "@/public/logos/logo.svg";
const Page = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  
  // Typed the ref as an array of HTMLInputElement or null
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock user email from previous step
  const userEmail = "example@school.edu";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    
    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);
      
      // Focus last filled input or end
      const lastFilledIndex = newCode.findLastIndex(val => val !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Typed KeyboardEvent specifically for HTMLInputElement
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move back on backspace if current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Typed ClipboardEvent specifically for HTMLInputElement
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handleChange(0, pastedData);
  };

  // Typed FormEvent specifically for HTMLFormElement, made optional because of e?.preventDefault()
  const verifyCode = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      // In a real app, you would redirect here
    }, 1500);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30); // 30 second cooldown
    // Simulate sending new email
    console.log("Resending code to", userEmail);
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans flex flex-col relative selection:bg-green-500/30">
      
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        
        <div className="w-full max-w-[440px]">
          
          {/* Back Button */}
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to login
          </button>

          {/* Verification Card */}
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-8 shadow-2xl">
            
            {isSuccess ? (
              // Success State
              <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Your account has been successfully verified. You will be redirected to your dashboard momentarily.
                </p>
                <div className="w-6 h-6 border-2 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              // Verification Form
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/5 shadow-inner">
                  <Mail className="w-6 h-6 text-gray-300" />
                </div>
                
                <h1 className="text-2xl font-bold mb-3 tracking-tight">Check your email</h1>
                
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  We've sent a 6-digit verification code to <br/>
                  <span className="text-white font-medium">{userEmail}</span>. <br/>
                  Enter it below to confirm your account.
                </p>

                <form onSubmit={verifyCode} className="w-full">
                  {/* OTP Inputs */}
                  <div className="flex justify-between gap-2 mb-8">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isCodeComplete || isVerifying}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
                      ${isCodeComplete && !isVerifying
                        ? 'bg-[#22c55e] hover:bg-[#1ea951] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                        : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Account'
                    )}
                  </button>
                </form>

                {/* Resend Section */}
                <div className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-1">
                  <span>Didn't receive the code?</span>
                  <button 
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className={`font-medium transition-colors ${
                      resendCooldown > 0 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-white hover:text-[#22c55e]'
                    }`}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
}

export default Page;