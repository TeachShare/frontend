"use client"
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  Users, 
  Archive, 
  Wand2, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Share2, 
  Filter, 
  Calendar,
  Eye,
  FileText,
  Activity,
  Link as LinkIcon,
  Clock,
  Menu,
  X,
  ChevronRight,
  Pencil,
  MoreHorizontal
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';

export interface SidebarItemProps {
  icon: LucideIcon; 
  label: string;                                            
  active?: boolean;                                         
  onClick?: () => void;    
  href: string                                 
}

interface StateCardProps {
    title: string;
    value: string;
    subtext: string;
    trend?: string;
    badge?: string;
}

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-medium' 
        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
    }`}
  >
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

const StatCard = ({ title, value, subtext, trend, badge }: StateCardProps) => (
  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 p-4 lg:p-5 rounded-xl flex flex-col justify-between min-h-[110px] transition-colors duration-300">
    <div className="flex justify-between items-start">
      <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.1em]">{title}</h3>
      {badge && (
        <span className="text-emerald-600 dark:text-emerald-400 text-[9px] font-bold border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/5">
          {badge}
        </span>
      )}
    </div>
    <div className="mt-auto">
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">{value}</div>
        {trend && (
          <span className={`text-[11px] font-bold mb-1 ${trend.startsWith('+') ? 'text-emerald-600 dark:text-emerald-500' : 'text-zinc-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-zinc-500 text-[10px] mt-1 font-medium leading-tight">{subtext}</div>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Mine');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resources = [
    { title: 'Bubble Sort', subtitle: '2nd Year College · 24 cards · 18 questions', subject: 'Dastruc - 22', type: 'Activity', typeIcon: Activity, last: '2 hours ago' },
    { title: 'Integral Calculus', subtitle: '2nd Year College · 10 questions · PDF', subject: 'Intcal - 22', type: 'Worksheet', typeIcon: FileText, last: 'Yesterday - 19:40' },
    { title: 'Group Task: Comparing Presentations', subtitle: 'Tables, graphs, equations · 45 min', subject: 'Freai - 21', type: 'Group task', typeIcon: Users, last: '2 days ago' },
    { title: 'Database 3NF', subtitle: 'Normalization guide · Teacher notes', subject: 'Dbmsys - 31', type: 'Link', typeIcon: LinkIcon, last: '3 days ago' },
  ];

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Dashboard</h1>
              <p className="text-zinc-500 text-[13px] mt-1">At a glance: how your resources are performing and what needs your attention today.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                <Calendar size={14} className="text-zinc-500" />
                <span>Last 30 days</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors duration-300">
                <Filter size={14} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              
              {/* Greeting Card */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 lg:p-8 transition-colors duration-300">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Good afternoon, Xasler!</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-1.5">Here's how your algebra resources are supporting learners across TeachShare today.</p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {['Focus: 1st Year Algebra', 'Planning time: 16:00-18:00', 'Weekly goal: 3 new uploads'].map((tag, idx) => (
                    <span key={idx} className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-md text-[11px] font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 mt-8">
                  <button onClick={() => router.push('/resources')} className="bg-emerald-500 text-white dark:text-zinc-950 font-bold py-2 px-5 rounded-lg flex items-center space-x-2 text-[13px] hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all">
                    <Plus size={18} />
                    <span>New resource</span>
                  </button>
                  <button className="text-zinc-500 dark:text-zinc-400 font-bold px-2 py-2 flex items-center space-x-2 text-[13px] hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <Share2 size={16} />
                    <span>Share with community</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-600 tracking-wider mb-1">Uploads this week</p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">2 / 3 <span className="text-zinc-500 text-xs font-normal ml-1">goal</span></p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/40 transition-colors duration-300">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-600 tracking-wider mb-1">New feedback</p>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">6 <span className="text-zinc-500 text-xs font-normal ml-1">comments</span></p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Resources shared" value="48" subtext="All-time uploads" trend="+6" />
                <StatCard title="Total downloads" value="1.9k" subtext="Compared to last 30 days" trend="+18%" />
                <StatCard title="Achievements" value="7" subtext='"Collaborative Planner" unlocked' badge="New badge" />
                <StatCard title="Community shares" value="23" subtext="Your resources reshared by others" trend="+4" />
              </div>

              {/* Table Section */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
                <div className="p-5 flex flex-col sm:flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800/30 gap-4 transition-colors duration-300">
                  <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Recent resources</h3>
                  <div className="flex bg-zinc-100 dark:bg-zinc-950/60 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800/60 transition-colors duration-300">
                    {['Mine', 'Shared with me', 'Drafts'].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 rounded-md text-[11px] font-bold transition-all ${
                          activeTab === tab 
                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' 
                            : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Last activity</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/20 transition-colors duration-300">
                      {resources.map((item, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.title}</p>
                            <p className="text-[11px] text-zinc-500 mt-0.5">{item.subtitle}</p>
                          </td>
                          <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium">{item.subject}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-1.5 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800/60 w-fit transition-colors duration-300">
                              <item.typeIcon size={12} className="text-zinc-500" />
                              <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">{item.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[11px] text-zinc-500">{item.last}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-3 text-zinc-400 dark:text-zinc-500">
                              <button className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors"><Eye size={15} /></button>
                              <button className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors"><Pencil size={13} /></button>
                              <button className="p-1 hover:text-zinc-900 dark:hover:text-white transition-colors"><Share2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/30 text-center bg-zinc-50 dark:bg-zinc-950/20 transition-colors duration-300">
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-600">
                    Showing activity from the last 7 days. Go to <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold cursor-pointer transition-colors">My Resources</span> for full history.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Teaching Focus */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
                <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">Today's teaching focus</h3>
                
                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Linear equations exit ticket</h4>
                      <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Ready to use</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Period 3 · 13 questions · Shared with 4 colleagues</p>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-[13px] font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">Discussion routine: "Always, Sometimes, Never"</h4>
                      <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ml-2 transition-colors duration-300">Suggested</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Community favorite - 132 saves</p>
                  </div>

                  <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800/30 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Weekly sharing progress</p>
                      <p className="text-[11px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">68% of goal</p>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden transition-colors duration-300">
                      <div className="h-full bg-emerald-500 w-[68%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Snapshot */}
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 transition-colors duration-300">
                <h3 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.1em] mb-5">Activity snapshot</h3>
                
                <div className="space-y-6">
                  {[
                    { dot: 'bg-emerald-500', title: '3 new comments', bold: 'on "Linear Functions Card Sort"', detail: 'From: Rivera (Grade 7), Liu (Grade 8), Parker...', time: '15 min ago' },
                    { dot: 'bg-blue-500', title: 'Your exit ticket was added', bold: 'to a school collection', detail: '"Grade 7 Assessment Bank" · East Ridge Middle School', time: '1 hour ago' },
                    { dot: 'bg-purple-500', title: '2 educators started following you', bold: '', detail: 'Science Math · Across 2 schools', time: 'Today' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3 group cursor-pointer">
                      <div className={`w-2 h-2 rounded-full ${activity.dot} mt-1.5 shrink-0`} />
                      <div className="flex-1">
                        <p className="text-[12px] text-zinc-700 dark:text-zinc-200 leading-relaxed transition-colors duration-300">
                          <span className="font-bold text-zinc-900 dark:text-white">{activity.title}</span> {activity.bold}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">{activity.detail}</p>
                        <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1.5 flex items-center font-bold tracking-wider uppercase transition-colors duration-300">
                          <Clock size={10} className="mr-1 text-zinc-400 dark:text-zinc-600"/> {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 mt-4 flex items-center justify-between gap-3 transition-colors duration-300">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-zinc-900 dark:text-white truncate transition-colors duration-300">Draft resource waiting for review</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate">"Inequalities Card Sort" · In drafts</p>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all active:scale-95 shrink-0">
                      Review
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/30 mt-6 flex flex-col gap-4 transition-colors duration-300">
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-600 italic transition-colors duration-300">These updates are based on your notification settings.</p>
                  <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-wider flex items-center group self-end transition-colors duration-300">
                    <span>Open full activity log</span>
                    <ChevronRight size={12} className="ml-0.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;