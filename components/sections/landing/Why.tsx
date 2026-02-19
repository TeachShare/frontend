"use client"
import { BarChart2, Calendar, GitFork, Users } from 'lucide-react'

const Why = () => {
  return (
     <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6 border-2 border-[#1A1E24]  p-18 rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Why TeachShare?</h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">
              Purpose-built tools to organize, share, and evolve your teaching resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BarChart2 size={20} />, title: "Resource Library", desc: "Store lesson plans, slides, and handouts in structured collections." },
              { icon: <Calendar size={20} />, title: "Planner Templates", desc: "Reuse weekly planners and course maps across classes and semesters." },
              { icon: <Users size={20} />, title: "Collaborative Workspaces", desc: "Invite co-teachers, departments, or entire schools to co-own resources." },
              { icon: <GitFork size={20} />, title: "Versioned Updates", desc: "Track every change, fork materials, and roll back when you need to." }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-[#161b22] rounded-xl text-left transition-all">
                <div className="text-[#72b37d] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold mb-3 text-[#f0f1f4]">{feature.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Why