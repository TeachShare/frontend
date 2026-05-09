import React from 'react';
import { User, Monitor, Bell, ShieldCheck, Lock, Database, LogOut } from 'lucide-react';
import { NavItem } from '@/components/ui/NavItem';

interface Props {
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsSidebar = ({ onLogout, activeTab, onTabChange }: Props) => {
  return (
    <div className="lg:w-64 shrink-0 space-y-4">
      <div className="bg-white dark:bg-[#121417] border border-zinc-200 dark:border-zinc-800/60 rounded-xl p-2 transition-colors duration-300">
        <p className="px-4 py-3 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">Settings overview</p>
        <NavItem 
            onClick={() => onTabChange('profile')} 
            icon={User} 
            label="Profile" 
            status="Primary" 
            active={activeTab === 'profile'} 
        />
        <NavItem 
            onClick={() => onTabChange('appearance')} 
            icon={Monitor} 
            label="Appearance" 
            status="Theme" 
            active={activeTab === 'appearance'} 
        />
        <NavItem 
            onClick={() => onTabChange('notifications')} 
            icon={Bell} 
            label="Notifications" 
            status="3 Channels" 
            active={activeTab === 'notifications'} 
        />
        <NavItem 
            onClick={() => onTabChange('privacy')} 
            icon={ShieldCheck} 
            label="Privacy & visibility" 
            status="Sharing" 
            active={activeTab === 'privacy'} 
        />
        <NavItem 
            onClick={() => onTabChange('security')} 
            icon={Lock} 
            label="Security" 
            status="Password" 
            active={activeTab === 'security'} 
        />
        <div className="mt-4 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 transition-colors duration-300">
          <NavItem onClick={onLogout} icon={LogOut} label="Logout" />
        </div>
      </div>
    </div>
  );
};