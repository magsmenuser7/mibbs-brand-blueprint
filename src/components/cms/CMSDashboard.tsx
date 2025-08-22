import React, { useState } from 'react';
import CMSSidebar from './CMSSidebar';
import CMSHeader from './CMSHeader';
import OverviewSection from './sections/OverviewSection';
import CampaignsSection from './sections/CampaignsSection';
import AgenciesSection from './sections/AgenciesSection';
import BudgetSection from './sections/BudgetSection';
import ContentSection from './sections/ContentSection';
import AnalyticsSection from './sections/AnalyticsSection';
import SettingsSection from './sections/SettingsSection';

const CMSDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'campaigns':
        return <CampaignsSection />;
      case 'agencies':
        return <AgenciesSection />;
      case 'budget':
        return <BudgetSection />;
      case 'content':
        return <ContentSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CMSSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <CMSHeader />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMSDashboard;