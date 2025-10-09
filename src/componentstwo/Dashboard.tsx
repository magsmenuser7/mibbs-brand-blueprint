import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';
import Sidebar from './Sidebar';
import WelcomeSection from './WelcomeSection';
import BrandHealthScore from './BrandHealthScore';
import AgencyDiscovery from './AgencyDiscovery';
import CoFounderZone from './CoFounderZone';
import BudgetTracker from './BudgetTracker';
import FestivalCalendar from './FestivalCalendar';
import GrantAlerts from './GrantAlerts';
import LegalChecklist from './LegalChecklist';
import Footer from './Footer';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Update page title based on active section
    const sectionTitles: Record<string, string> = {
      home: 'Dashboard Home',
      budget: 'Budget Report',
      agencies: 'Find Agencies',
      tools: 'Brand Tools',
      legal: 'Legal Compliance',
      training: 'Training',
      account: 'My Account',
      support: 'Support'
    };
    
    document.title = `${sectionTitles[activeSection] || 'Dashboard'} - MIBBS`;
  }, [activeSection]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <WelcomeSection />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BrandHealthScore />
              <CoFounderZone />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <AgencyDiscovery />
              </div>
              <div>
                <FestivalCalendar />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BudgetTracker />
              <div className="space-y-8">
                <GrantAlerts />
              </div>
            </div>
            
            <LegalChecklist />
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Budget & ROI Report</h1>
              <p className="text-gray-600">Detailed analysis of your brand spending and returns</p>
            </div>
            <BudgetTracker />
          </div>
        );
      case 'agencies':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect with Agencies</h1>
              <p className="text-gray-600">Find and work with certified MIBBS partner agencies</p>
            </div>
            <AgencyDiscovery />
          </div>
        );
      case 'tools':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Brand Tools</h1>
              <p className="text-gray-600">Tools and resources to build your brand</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BrandHealthScore />
              <FestivalCalendar />
            </div>
          </div>
        );
      case 'legal':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal & Compliance</h1>
              <p className="text-gray-600">Protect your brand legally and ensure compliance</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LegalChecklist />
              <GrantAlerts />
            </div>
          </div>
        );
      case 'training':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Training & Templates</h1>
              <p className="text-gray-600">Learn and grow with expert resources</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder training content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Positioning</h3>
                <p className="text-gray-600 text-sm mb-4">Learn how to position your brand in the market</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;