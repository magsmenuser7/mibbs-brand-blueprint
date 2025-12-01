import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Search, Bell, Settings, BarChart3, Users, Shield, TrendingUp, Eye, 
  FileText, Zap, Globe, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, 
  Target, Activity, Menu, X 
} from 'lucide-react';

import BrandGuidelinesScanner from './dashboard/BrandGuidelinesScanner';
import AgencyPulseDashboard from './dashboard/AgencyPulseDashboard';
import BrandOpsuite from './dashboard/BrandOpsSuite';
import SpendImpactAttribution from './dashboard/SpendImpactAttribution';
import ExecutiveDashboard from './dashboard/ExecutiveDashboard';
import VendorEcosystem from './dashboard/VendorEcosystem';
import SecureAccessSystem from './dashboard/SecureAccessSystem';
import BrandMaterialLibrary from './dashboard/BrandMaterialLibrary';
import MIBBSAdvisoryCircle from './dashboard/MIBBSAdvisoryCircle';

const DashboardEnterprises = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'brand-scanner', label: 'Brand Consistency Tracker', icon: <Shield className="w-5 h-5" /> },
    { id: 'agency-pulse', label: 'Agency Performance Tracker', icon: <Activity className="w-5 h-5" /> },
    { id: 'brandops-suite', label: 'Brand Workspace', icon: <Users className="w-5 h-5" /> },
    { id: 'spend-attribution', label: 'Marketing ROI Dashboard', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'executive', label: 'Executive Summary View', icon: <Eye className="w-5 h-5" /> },
    { id: 'vendor-ecosystem', label: 'Verified Vendor Directory', icon: <Globe className="w-5 h-5" /> },
    { id: 'secure-access', label: 'Secure Access System', icon: <Shield className="w-5 h-5" /> },
    { id: 'brand-library', label: 'Brand Material Library', icon: <FileText className="w-5 h-5" /> },
    { id: 'advisory-circle', label: 'MIBBS Advisory Circle', icon: <Users className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'brand-scanner': return <BrandGuidelinesScanner />;
      case 'agency-pulse': return <AgencyPulseDashboard />;
      case 'brandops-suite': return <BrandOpsuite />;
      case 'spend-attribution': return <SpendImpactAttribution />;
      case 'executive': return <ExecutiveDashboard />;
      case 'vendor-ecosystem': return <VendorEcosystem />;
      case 'secure-access': return <SecureAccessSystem />;
      case 'brand-library': return <BrandMaterialLibrary />;
      case 'advisory-circle': return <MIBBSAdvisoryCircle />;
      default: return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-sm border-b px-4 py-4 flex justify-between items-center sticky top-0 z-50">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>

        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Enterprise
        </span>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <Settings className="w-5 h-5 text-gray-600 hidden sm:block" />

          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-gray-700 font-medium"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR (Responsive Drawer) */}
        <aside
          className={`
            fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg
            p-4 transition-transform duration-300 z-40 flex flex-col
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="flex-1 overflow-y-auto mt-16 lg:mt-0 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// ---- Existing Overview Component (unchanged) ----
const OverviewDashboard = () => {
  const stats = [
    { label: 'Total Spend', value: '₹2.4Cr', change: '+12%', icon: <DollarSign className="w-6 h-6" />, color: 'text-green-600' },
    { label: 'Active Agencies', value: '24', change: '+3', icon: <Users className="w-6 h-6" />, color: 'text-blue-600' },
    { label: 'Brand Compliance', value: '94%', change: '+2%', icon: <Shield className="w-6 h-6" />, color: 'text-purple-600' },
    { label: 'ROI Average', value: '3.2x', change: '+0.4x', icon: <TrendingUp className="w-6 h-6" />, color: 'text-pink-600' },
  ];

  const recentActivities = [
    { type: 'approval', message: 'Campaign approval for North region', time: '2 hours ago', status: 'completed' },
    { type: 'alert', message: 'Brand guideline violation detected', time: '4 hours ago', status: 'pending' },
    { type: 'report', message: 'Monthly spend report generated', time: '6 hours ago', status: 'completed' },
    { type: 'agency', message: 'New agency onboarded in South', time: '1 day ago', status: 'completed' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'report': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'agency': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-600">Welcome back! Here's what's happening with your brand operations.</p>

      {/* Stats Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p>{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              <Target className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium">Run Brand Scan</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              <FileText className="w-6 h-6 text-pink-600 mb-2" />
              <p className="text-sm font-medium">Generate Report</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium">Add Agency</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50">
              <Calendar className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium">Schedule Meeting</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEnterprises;
