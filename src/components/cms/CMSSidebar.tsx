import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2
} from 'lucide-react';

interface CMSSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const CMSSidebar: React.FC<CMSSidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  collapsed, 
  onToggleCollapse 
}) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'agencies', label: 'Agencies', icon: Users },
    { id: 'budget', label: 'Budget & ROI', icon: DollarSign },
    { id: 'content', label: 'Content Hub', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          // <div className="flex items-center space-x-3">
          //   <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
          //     <Building2 className="w-5 h-5 text-white" />
          //   </div>
          //   <span className="text-xl font-bold text-gray-900">MIBBS</span>
          // </div>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-3xl font-bold">MIBBS</span>
            </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-0">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-mibbs-light text-mibbs-primary shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-mibbs-primary' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade Section */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 mt-5">
          <div className="bg-mibbs-gradient rounded-lg p-4 text-white">
            <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
            <p className="text-sm text-purple-100 mb-3">Unlock advanced features</p>
            <button className="w-full bg-white text-mibbs-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSSidebar;