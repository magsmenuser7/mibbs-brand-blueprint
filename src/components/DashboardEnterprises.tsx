import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Search, 
  Bell, 
  Settings,
  BarChart3,
  Users,
  Shield,
  TrendingUp,
  Eye,
  FileText,
  Zap,
  Globe,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity
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
      case 'brand-scanner':
        return <BrandGuidelinesScanner />;
      case 'agency-pulse':
        return <AgencyPulseDashboard />;
      case 'brandops-suite':
        return <BrandOpsuite />;
      case 'spend-attribution':
        return <SpendImpactAttribution />;
      case 'executive':
        return <ExecutiveDashboard />;
      case 'vendor-ecosystem':
        return <VendorEcosystem />;
      case 'secure-access':
        return <SecureAccessSystem />;
      case 'brand-library':
        return <BrandMaterialLibrary />;
      case 'advisory-circle':
        return <MIBBSAdvisoryCircle />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* <img 
                  src="/src/assets/mibbs 1.png" 
                  alt="MIBBS Logo" 
                  className="w-8 h-8 object-contain"
                /> */}
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Enterprise
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Overview Dashboard Component
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your brand operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Target className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Run Brand Scan</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-6 h-6 text-pink-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Generate Report</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Add Agency</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Schedule Meeting</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEnterprises;