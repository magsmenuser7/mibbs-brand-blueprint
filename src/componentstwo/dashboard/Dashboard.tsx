import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import PlanSummary from './sections/PlanSummary';
import SpendTracker from './sections/SpendTracker';
import AgenciesSection from './sections/AgenciesSection';
import GrowthTools from './sections/GrowthTools';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('plans');

  const renderSection = () => {
    switch (activeSection) {
      case 'plans':
        return <PlanSummary />;
      case 'reports':
        return <SpendTracker />;
      case 'agencies':
        return <AgenciesSection />;
      case 'growth-tools':
        return <GrowthTools />;
      case 'payments':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payments & Escrow</h1>
            <p className="text-gray-600">Secure payments with agencies</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>
        );
      default:
        return <PlanSummary />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <div className="flex-1 flex flex-col ml-64">
        <DashboardHeader />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;