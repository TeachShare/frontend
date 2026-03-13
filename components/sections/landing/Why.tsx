"use client";
import { BarChart2, Calendar, GitFork, Users } from "lucide-react";

const Why = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0d1117] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 border-2 border-zinc-100 dark:border-[#1A1E24] p-8 md:p-18 rounded-2xl transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white transition-colors duration-300">
            Why TeachShare?
          </h2>
          <p className="text-zinc-600 dark:text-[#8b949e] max-w-2xl mx-auto transition-colors duration-300">
            Purpose-built tools to organize, share, and evolve your teaching
            resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BarChart2 size={20} />,
              title: "Resource Library",
              desc: "Store lesson plans, slides, and handouts in structured collections.",
            },
            {
              icon: <Calendar size={20} />,
              title: "Planner Templates",
              desc: "Reuse weekly planners and course maps across classes and semesters.",
            },
            {
              icon: <Users size={20} />,
              title: "Collaborative Workspaces",
              desc: "Invite co-teachers, departments, or entire schools to co-own resources.",
            },
            {
              icon: <GitFork size={20} />,
              title: "Versioned Updates",
              desc: "Track every change, fork materials, and roll back when you need to.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-zinc-50 dark:bg-[#161b22] border border-zinc-100 dark:border-transparent rounded-xl text-left transition-all hover:shadow-md dark:hover:shadow-none duration-300"
            >
              <div className="text-emerald-600 dark:text-[#72b37d] mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold mb-3 text-zinc-900 dark:text-[#f0f1f4] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-[#8b949e] text-sm leading-relaxed transition-colors duration-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
