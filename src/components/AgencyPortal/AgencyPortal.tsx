import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Certification from './pages/Certification';
import Proposals from './pages/Proposals';
import Credits from './pages/Credits';
import Services from './pages/Services';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Integrations from './pages/Integrations';
import TopBar from '../shared/TopBar';

const AgencyPortal: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/certification" element={<Certification />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/services" element={<Services />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/integrations" element={<Integrations />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgencyPortal;