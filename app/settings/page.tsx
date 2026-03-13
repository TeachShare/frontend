"use client"
import React, { useState } from 'react';
import { 
  Files, 
  LayoutDashboard,
  Users, 
  Archive, 
  Wand2, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  ChevronDown, 
  User,
  Monitor,
  ShieldCheck,
  Lock,
  Database,
  LogOut,
  Camera,
  RotateCcw,
  Save,
  Trash2,
  Archive as ArchiveIcon,
  Circle
} from 'lucide-react';
import { SidebarItemProps } from '../dashboard/page'; // Verify path in your project
import { LucideIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: SidebarItemProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active 
        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium' 
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
    }`}
  >
    <Icon size={18} />
    <span className="text-[13px]">{label}</span>
  </div>
);

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  status?: string;
  onClick?: () => void,
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, onClick, status, active = false }: NavItemProps) => (
  <div 
    onClick={onClick} 
    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-300 ${
      active 
        ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-900 dark:text-white' 
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
    }`}
  >
    <div className="flex items-center space-x-3">
      <Icon size={18} />
      <span className="text-[13px] font-medium">{label}</span>
    </div>
    {status && <span className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase font-bold tracking-wider">{status}</span>}
  </div>
);

const Toggle = ({ enabled }: { enabled: boolean }) => (
  <div className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${enabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`} />
  </div>
);

const Page = () => {
  const router = useRouter();

  const handleLogout = async() => {
       await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
       });

       router.push('/login');
  }

  return (
    <Layout>
  
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">Settings</h1>
                <p className="text-zinc-500 dark:text-zinc-500 text-[13px] mt-1 transition-colors duration-300">Manage your profile, appearance, notifications, and how TeachShare works for your classroom.</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-bold transition-colors duration-300">
                  <RotateCcw size={14} />
                  <span>Reset changes</span>
                </button>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md dark:shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 transition-all duration-300">
                  <Save size={14} />
                  <span>Save settings</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 transition-colors duration-300">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1 transition-colors duration-300">Plan</p>
                <p className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Teacher · Free</p>
              </div>
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 transition-colors duration-300">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1 transition-colors duration-300">Storage used</p>
                <p className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">2.4 GB of 10 GB</p>
              </div>
              <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-4 transition-colors duration-300">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-1 transition-colors duration-300">Last updated</p>
                <p className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Just now</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Nav */}
              <div className="lg:w-64 shrink-0 space-y-4">
                <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2 transition-colors duration-300">
                  <p className="px-4 py-3 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Settings overview</p>
                  <NavItem icon={User} label="Profile" status="Primary" active />
                  <NavItem icon={Monitor} label="Appearance" status="Theme" />
                  <NavItem icon={Bell} label="Notifications" status="3 Channels" />
                  <NavItem icon={ShieldCheck} label="Privacy & visibility" status="Sharing" />
                  <NavItem icon={Lock} label="Security" status="Password" />
                  <NavItem icon={Database} label="Data & exports" status="Backups" />
                  <div className="mt-4 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 transition-colors duration-300">
                    <NavItem onClick={handleLogout}  icon={LogOut} label="Logout" />
                  </div>
                </div>
              </div>

              {/* Settings Detail Area */}
              <div className="flex-1 space-y-6">
                <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-colors duration-300">
                  <div className="p-6 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between transition-colors duration-300">
                    <div>
                      <h2 className="text-base font-bold text-zinc-900 dark:text-white transition-colors duration-300">Profile</h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 transition-colors duration-300">Let other educators know who you are and how you teach.</p>
                    </div>
                    <button className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">
                      Public educator profile
                    </button>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Profile Photo Section */}
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white transition-colors duration-300">Profile photo</p>
                      <div className="flex items-center space-x-6">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Xasler" 
                          className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm dark:shadow-xl transition-colors duration-300" 
                          alt="Profile Large" 
                        />
                        <div className="space-y-3">
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-500 max-w-sm leading-relaxed transition-colors duration-300">
                            A clear, friendly photo helps collaborators recognize you across messages and resources.
                          </p>
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors duration-300">
                              <Camera size={14} className="text-zinc-500 dark:text-zinc-500" />
                              <span>Upload new</span>
                            </button>
                            <button className="flex items-center space-x-2 text-[11px] font-bold text-rose-600 dark:text-rose-500/70 hover:text-rose-700 dark:hover:text-rose-400 px-2 py-1.5 transition-colors duration-300">
                              <Trash2 size={14} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
                          <span>Full name</span>
                          <span className="text-[10px] font-normal uppercase text-zinc-500 dark:text-zinc-600">Visible on shared resources</span>
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Xasler Bou" 
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
                          <span>Preferred name</span>
                          <span className="text-[10px] font-normal uppercase italic text-zinc-500 dark:text-zinc-600">Optional</span>
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Xasler" 
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">Role</label>
                        <input 
                          type="text" 
                          defaultValue="Software Instructor" 
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 transition-colors duration-300">School/Organization</label>
                        <input 
                          type="text" 
                          defaultValue="University of Cebu - Main Campus" 
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-300"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-zinc-600 dark:text-zinc-500 flex justify-between transition-colors duration-300">
                          <span>Bio</span>
                          <span className="text-[10px] font-normal italic text-zinc-500 dark:text-zinc-600">1-2 sentences about your teaching context and what you love sharing.</span>
                        </label>
                        <textarea 
                          rows={3}
                          defaultValue="Designing low-floor, high-ceiling tasks for middle school algebra learners. Passionate about discourse routines and multilingual supports." 
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-[13px] text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30 resize-none transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-sections: Appearance & Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Appearance</h3>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Choose how TeachShare looks on your devices.</p>
                      </div>
                      <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-500 px-2 py-0.5 rounded uppercase font-bold transition-colors duration-300">Synced with system</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Dark mode</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Optimized for evening planning and low-light environments</p>
                        </div>
                        <Toggle enabled={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">High contrast surfaces</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Increase card contrast and text clarity across the app</p>
                        </div>
                        <Toggle enabled={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Compact layout</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Show more rows and threads on larger displays</p>
                        </div>
                        <Toggle enabled={false} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-6 space-y-6 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[13px] font-bold text-zinc-900 dark:text-white transition-colors duration-300">Notifications</h3>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Decide when TeachShare should tap you on the shoulder.</p>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[9px] font-bold text-amber-600 dark:text-amber-500/80 uppercase transition-colors duration-300">
                        <Circle size={8} fill="currentColor" />
                        <span>Quiet hours 21:00-08:00</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Channels</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Email</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Daily summary of new comments, followers, and key updates.</p>
                        </div>
                        <Toggle enabled={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[12px] font-medium text-zinc-900 dark:text-zinc-300 transition-colors duration-300">Push</p>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 transition-colors duration-300">Real-time alerts for messages and shared resource mentions.</p>
                        </div>
                        <Toggle enabled={true} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-xl p-6 space-y-4 transition-colors duration-300">
                  <div>
                    <h3 className="text-[13px] font-bold text-rose-600 dark:text-rose-500 transition-colors duration-300">Danger Zone</h3>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-500 mt-1 transition-colors duration-300">Adjust with care. Archiving or deleting your account affects shared resources across TeachShare.</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 italic transition-colors duration-300">You will be asked to confirm and optionally transfer ownership of shared collections before any permanent changes are made.</p>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                    <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-300">
                      <ArchiveIcon size={14} />
                      <span>Archive account</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-300">
                      <Trash2 size={14} />
                      <span>Delete account</span>
                    </button>
                  </div>
                </div>

                <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-600 pt-4 transition-colors duration-300">
                  Settings are saved to your profile and apply across devices. You can export a copy of your data anytime from Data & exports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;