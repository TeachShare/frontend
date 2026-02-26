"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  School, 
  ChevronDown 
} from 'lucide-react';
import Image from "next/image";
import logo from "@/public/logos/logo.svg"
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [view, setView] = useState<string>('login');
  const toggleView = (target: string) => setView(target);


  const hanleAuthButton = () => {
      if(view === 'login'){
         router.push('/dashboard')
      }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#238636]/30 overflow-x-hidden relative flex flex-col">
      
   
      {/* Header Logo */}
      <header className="relative z-10 p-6 md:px-12 flex items-center gap-2">
      <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8  rounded flex items-center justify-center">
           <Image alt="teachshareLogo" src={logo} width={30}  height={30}/>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            TeachShare
          </span>
        </div>

      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-2 flex flex-col items-center w-full">
        {/* Back Navigation */}
        <button className="self-start flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-6 text-sm group ml-2 md:ml-12">
          <ArrowLeft size={16} />
          <span className="font-medium">Back</span>
        </button>

        {/* The Central Auth Card - Rounded corners adjusted to match reference */}
        <div className="w-full max-w-[520px] bg-[#161b22] border border-[#30363d] rounded-[24px] shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Top Segmented Toggle - Wider pill shape from reference */}
          <div className="bg-[#0d1117] p-1 rounded-xl flex mb-8 border border-[#30363d]/50">
            <button 
              onClick={() => toggleView('login')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                view === 'login' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => toggleView('register')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                view === 'register' ? 'bg-[#238636] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Headings */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {view === 'login' ? 'Welcome back' : 'Create your teacher account'}
            </h1>
            <p className="text-[#8b949e] text-xs leading-relaxed max-w-[90%]">
              {view === 'login' 
                ? 'Sign in to access your lesson repos, exam banks, and shared workspaces.' 
                : 'Set up your workspace to start sharing lesson plans, exam banks, and classroom resources.'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {view === 'register' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                    <input 
                      type="text" 
                      placeholder="Enter Full Name" 
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#484f58] focus:outline-none focus:border-[#238636] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                    <select className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-[#238636] cursor-pointer">
                      <option value="">Select Role</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Administrator</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] pointer-events-none" size={14} />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">
                {view === 'login' ? 'Email' : 'Work email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                <input 
                  type="email" 
                  placeholder={view === 'login' ? "name@school.edu" : "example@school.edu"}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#484f58] focus:outline-none focus:border-[#238636] transition-all"
                />
              </div>
            </div>

            {view === 'register' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">School or institution</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                  <input 
                    type="text" 
                    placeholder="e.g. Lakeside High School" 
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#484f58] focus:outline-none focus:border-[#238636] transition-all"
                  />
                </div>
              </div>
            )}

            <div className={`${view === 'register' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-1.5'}`}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                  <input 
                    type="password" 
                    placeholder={view === 'login' ? "Enter your password" : "Create a strong password"}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#484f58] focus:outline-none focus:border-[#238636] transition-all"
                  />
                </div>
              </div>

              {view === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#8b949e] tracking-wide">Confirm password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" size={16} />
                    <input 
                      type="password" 
                      placeholder="Re-enter password" 
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-[#484f58] focus:outline-none focus:border-[#238636] transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[#30363d] bg-[#0d1117] text-[#238636] focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                />
                <span className="text-[13px] text-[#8b949e] group-hover:text-[#c9d1d9] transition-colors">
                  {view === 'login' ? 'Remember me' : 'I agree to the Terms and Privacy Policy'}
                </span>
              </label>
              {view === 'login' && (
                <button type="button" className="text-[13px] text-[#58a6ff] hover:text-white transition-colors">
                  Forgot password?
                </button>
              )}
            </div>

            {view === 'register' && (
              <p className="text-[10px] text-[#484f58] leading-tight">
                By creating an account you confirm you're an educator and consent to TeachShare contacting you about product updates. <button type="button" className="text-[#8b949e] hover:underline">Learn more</button>
              </p>
            )}

            {/* GitHub Green Submit Button */}
            <button 
              type="submit"
              onClick={hanleAuthButton}
              className="w-full bg-[#238636] hover:bg-[#2ea043] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4 text-sm"
            >
              {view === 'login' ? 'Login' : 'Create account'}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#30363d]"></div>
              <span className="flex-shrink mx-4 text-[#484f58] text-[10px] font-bold uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-[#30363d]"></div>
            </div>

            {/* OAuth Button */}
            <button 
              type="button"
              className="w-full bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.42-7.84 5.42-4.83 0-8.76-4.01-8.76-8.94s3.93-8.94 8.76-8.94c2.75 0 4.59 1.17 5.65 2.18l2.58-2.48C18.69 1.45 15.84 0 12.48 0 5.86 0 .5 5.37.5 12s5.36 12 11.98 12c6.91 0 11.5-4.86 11.5-11.7 0-.79-.08-1.39-.18-1.98h-11.32z" />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Bottom Redirect */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#8b949e]">
              {view === 'login' ? (
                <>New to TeachShare? <button onClick={() => setView('register')} className="text-[#58a6ff] hover:underline font-semibold ml-1">Create a brandnew account</button></>
              ) : (
                <>Already have an account? <button onClick={() => setView('login')} className="text-[#58a6ff] hover:underline font-semibold ml-1">Log in</button></>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page