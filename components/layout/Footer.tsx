"use client"
import { Github, Heart, Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-8 bg-[#0f111a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#161b22] rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 bg-[#72b37d] rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-[#161b22] transform rotate-45 rounded-sm"></div>
              </div>
              <span className="text-lg font-bold text-white">TeachShare</span>
            </div>
            <p className="text-[#8b949e] text-xs max-w-sm">
              Empowering educators to share what works and spend more time
              teaching.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-[#21262d] rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-all"
              >
                <Heart size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#21262d] rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#21262d] rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-all"
              >
                <Github size={16} />
              </a>
            </div>
            <div className="flex gap-6 text-xs text-[#8b949e]">
              <a href="#" className="hover:text-[#72b37d] transition-colors">
                About
              </a>
              <a href="#" className="hover:text-[#72b37d] transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-[#72b37d] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[#72b37d] transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1117] rounded-lg py-3 text-center text-[10px] text-[#6a737d] font-medium tracking-wide">
          2025 TeachShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
