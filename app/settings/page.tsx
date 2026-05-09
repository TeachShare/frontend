"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

// Extracted Components
import { SettingsHeader } from '@/components/sections/settings/SettingsHeader';
import { QuickStats } from '@/components/sections/settings/QuickStats';
import { SettingsSidebar } from '@/components/sections/settings/SettingsSidebar';
import { ProfileSection } from '@/components/sections/settings/ProfileSection';
import { PreferencesSection } from '@/components/sections/settings/PreferencesSection';
import { SecuritySection } from '@/components/sections/settings/SecuritySection';
import { PrivacySection } from '@/components/sections/settings/PrivacySection';
import { DangerZone } from '@/components/sections/settings/DangerZone';

const SettingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      // Use window.location for a full reload to clear all memory state (React Query, etc.)
      window.location.href = '/auth?view=login';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
            <>
                <ProfileSection />
                <DangerZone />
            </>
        );
      case 'appearance':
      case 'notifications':
        return <PreferencesSection />;
      case 'security':
        return <SecuritySection />;
      case 'privacy':
        return <PrivacySection />;
      default:
        return <ProfileSection />;
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
              <SettingsSidebar 
                onLogout={handleLogout} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              {/* Main Settings Form Area */}
              <div className="flex-1 space-y-6 pb-20">
                {renderContent()}
              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SettingsPage;