"use client";
import Hero from "@/components/sections/landing/Hero";
import Why from "@/components/sections/landing/Why";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {

  return (
      <div className="min-h-screen bg-[#0f111a] text-[#f0f1f4] font-sans selection:bg-[#72b37d]/30">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Why TeachShare Section */}
      <Why />

      {/* Footer */}
      <Footer />
    </div>
  );
}
