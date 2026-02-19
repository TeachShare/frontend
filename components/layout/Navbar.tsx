"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logos/logo.svg"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-[#0f111a]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8  rounded flex items-center justify-center">
           <Image alt="teachshareLogo" src={logo} width={30}  height={30}/>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            TeachShare
          </span>
        </div>

        {/* Right Side: Links + Auth Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium text-[#9499a6]">
            <a href="#" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Library
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Community
            </a>    
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="px-5 py-2 text-sm font-medium hover:bg-[#1c2128] rounded-lg transition-all text-[#f0f1f4]">
              Login
            </button>
            <button className="px-5 py-2 text-sm font-medium bg-[#72b37d] text-[#0f111a] rounded-lg hover:bg-[#86c691] transition-all shadow-lg shadow-[#72b37d]/5">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#9499a6]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0d1117] p-6 space-y-4">
          <a href="#" className="block text-[#9499a6] hover:text-white">
            Features
          </a>
          <a href="#" className="block text-[#9499a6] hover:text-white">
            Library
          </a>
          <a href="#" className="block text-[#9499a6] hover:text-white">
            Community
          </a>
          <a href="#" className="block text-[#9499a6] hover:text-white">
            Pricing
          </a>
          <button className="w-full py-3 text-sm font-medium text-white">
            Login
          </button>
          <button className="w-full py-3 text-sm font-medium bg-[#72b37d] text-[#0f111a] rounded-lg">
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
