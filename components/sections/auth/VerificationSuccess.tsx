import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const VerificationSuccess = () => {
  return (
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
  );
};