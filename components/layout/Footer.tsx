"use client";
import { Github, Heart, Linkedin } from "lucide-react";
import React from "react";
import logo from "@/public/logos/logo.svg"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="pt-20 pb-8 bg-zinc-50 dark:bg-[#0f111a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-transparent rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-300">
          <div className="space-y-4 text-center md:text-left">
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
            <p className="text-zinc-600 dark:text-[#8b949e] text-xs max-w-sm transition-colors duration-300">
              Empowering educators to share what works and spend more time
              teaching.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-zinc-100 dark:bg-[#21262d] rounded hover:bg-zinc-200 dark:hover:bg-[#30363d] text-zinc-600 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
              >
                <Heart size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-100 dark:bg-[#21262d] rounded hover:bg-zinc-200 dark:hover:bg-[#30363d] text-zinc-600 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-100 dark:bg-[#21262d] rounded hover:bg-zinc-200 dark:hover:bg-[#30363d] text-zinc-600 dark:text-[#8b949e] hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
              >
                <Github size={16} />
              </a>
            </div>
            <div className="flex gap-6 text-xs text-zinc-600 dark:text-[#8b949e] transition-colors duration-300">
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                About
              </a>
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                Help
              </a>
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">
                Privacy
              </a>
            </div>
          </div>
        </div>

        <div className="bg-zinc-200/50 dark:bg-[#0d1117] rounded-lg py-3 text-center text-[10px] text-zinc-500 dark:text-[#6a737d] font-medium tracking-wide transition-colors duration-300">
          2026 TeachShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;