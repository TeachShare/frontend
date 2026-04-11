"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

// Extracted Components
import { SettingsHeader } from '@/components/sections/settings/SettingsHeader';
import { QuickStats } from '@/components/sections/settings/QuickStats';
import { SettingsSidebar } from '@/components/sections/settings/SettingsSidebar';
import { ProfileSection } from '@/components/sections/settings/ProfileSection';
import { PreferencesSection } from '@/components/sections/settings/PreferencesSection';
import { DangerZone } from '@/components/sections/settings/DangerZone';

const SettingsPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/auth?view=login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-[#090a0c] transition-colors duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <SettingsHeader />
            <QuickStats />

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Settings Nav Sidebar */}
              <SettingsSidebar onLogout={handleLogout} />

              {/* Main Settings Form Area */}
              <div className="flex-1 space-y-6">
                
                {/* Active Tab Content (Currently hardcoded to Profile & Prefs) */}
                <ProfileSection />
                <PreferencesSection />
                <DangerZone />

              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SettingsPage;