"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logos/logo.svg";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"; // Import the theme hook if you want a toggle here!

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-zinc-50 dark:bg-[#0f111a]/90 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200 dark:border-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <Image
              alt="teachshareLogo"
              src={logo}
              width={30}
              height={30}
              className=""
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
            TeachShare
          </span>
        </div>

        {/* Right Side: Links + Auth Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-[#9499a6]">
            <a
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
            >
              Library
            </a>
            <a
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
            >
              Community
            </a>
          </div>

          <div className="flex items-center gap-4 ml-4">
            {/* Optional Theme Toggle for Landing Page */}

            <button
              onClick={() => router.push("/auth?view=login")}
              className="px-5 py-2 text-sm font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-transparent dark:hover:bg-[#1c2128] rounded-lg transition-all text-zinc-900 dark:text-[#f0f1f4]"
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-600 dark:text-[#9499a6]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-50 dark:bg-[#0d1117] p-6 space-y-4 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          <a
            href="#"
            className="block text-zinc-600 dark:text-[#9499a6] hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#"
            className="block text-zinc-600 dark:text-[#9499a6] hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
          >
            Library
          </a>
          <a
            href="#"
            className="block text-zinc-600 dark:text-[#9499a6] hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
          >
            Community
          </a>
          <a
            href="#"
            className="block text-zinc-600 dark:text-[#9499a6] hover:text-zinc-900 dark:hover:text-white transition-colors duration-300"
          >
            Pricing
          </a>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => router.push("/auth?view=login")}
              className="w-full py-3 text-sm font-medium text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth?view=register")}
              className="w-full py-3 text-sm font-medium bg-emerald-600 text-white dark:bg-[#72b37d] dark:text-[#0f111a] rounded-lg"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
