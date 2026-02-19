"use client"
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#72b37d]/10 text-[#72b37d] text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-[#72b37d] rounded-full"></span>
            For teachers, by teachers
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            Share. Plan. <br />
            <span className="text-[#f0f1f4]">Teach Better.</span>
          </h1>

          <p className="text-[#9499a6] text-lg md:text-xl max-w-xl leading-relaxed">
            TeachShare is your GitHub-inspired hub for lesson plans,
            assessments, and classroom tools. Discover, remix, and iterate on
            resources built by educators across various education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="px-8 py-3 bg-[#72b37d] text-[#0f111a] font-bold rounded-lg hover:bg-[#86c691] transition-all">
              Get Started Free
            </button>
            <button className="px-8 py-3 bg-[#1c2128] text-[#f0f1f4] font-bold rounded-lg hover:bg-[#252b33] transition-all">
              Browse Resources
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#6a737d]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#238636]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#1b4721]"></div>
            </div>
            <p>Connect, Share, and Discover the Best Teaching Resources</p>
          </div>
        </div>

        {/* Interactive Card UI */}
        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="absolute -inset-10 bg-[#72b37d]/5 blur-3xl rounded-full"></div>
          <div className="relative bg-[#161b22] rounded-xl shadow-2xl overflow-hidden p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[#9499a6] text-sm">
                <span className="font-semibold text-[#f0f1f4]">teachshare</span>{" "}
                / classroom-resources
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded text-[#6a737d] uppercase tracking-wider">
                Public workspace
              </span>
            </div>

            <div className="flex gap-2 mb-8">
              {["Lesson Plan Repo", "Exam Bank", "Student Planners"].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-3 py-1 rounded ${i === 0 ? "bg-[#1f6feb]/20 text-[#58a6ff]" : "bg-[#21262d] text-[#c9d1d9]"}`}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            <div className="space-y-5">
              {[
                {
                  title: "Algebra Linear Functions",
                  desc: "24 forks · 8 updates",
                  meta: "Grade 9 / Math",
                  progress: "w-[85%]",
                  color: "bg-[#238636]",
                  sub: "Last updated 2d ago",
                },
                {
                  title: "Database Management",
                  desc: "15 forks · Versioned",
                  meta: "Project / Rubrics",
                  progress: "w-[60%]",
                  color: "bg-[#238636]",
                  sub: "Co-owned by 4 teachers",
                },
                {
                  title: "First-Year Seminar Planner",
                  desc: "12 forks · Live sync",
                  meta: "University / Planner",
                  progress: "w-[40%]",
                  color: "bg-[#238636]",
                  sub: "Shared with 3 campuses",
                },
              ].map((item, i) => (
                <div key={i} className="group cursor-default pt-4 first:pt-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-[#58a6ff] hover:underline cursor-pointer">
                      {item.title}
                    </h4>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-[#6a737d]">
                        {item.meta}
                      </span>
                      <span className="text-[10px] text-[#484f58]">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8b949e] mb-2">{item.desc}</p>
                  <div className="h-1 w-full bg-[#21262d] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} ${item.progress}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
