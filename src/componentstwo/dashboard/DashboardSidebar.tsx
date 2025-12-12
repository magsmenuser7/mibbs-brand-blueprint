import React from 'react';
import { 
  FileText, 
  BarChart3, 
  Users, 
  Wrench,
  CreditCard,
  Settings,
  Building2
} from 'lucide-react';


import mibbs1 from '../../assets/mibbs-1.png'

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    { id: 'plans', label: 'Budget Plans', icon: FileText },
    { id: 'reports', label: 'Spend Tracker', icon: BarChart3 },
    { id: 'agencies', label: 'Agencies', icon: Users },
    { id: 'growth-tools', label: 'Growth Tools', icon: Wrench },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            {/* <Building2 className="w-5 h-5 text-white bg-mibbs-gradient" /> */}
            {/* <span className="text-white font-bold text-xl">M</span> */}
            <img src={mibbs1} alt="mibbs-logo" />
          </div>
          {/* <span className="text-xl font-bold text-gray-900">MIBBS</span> */}
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-mibbs-light text-mibbs-primary' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-mibbs-primary' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-mibbs-gradient rounded-lg p-4 text-white">
          <h4 className="font-semibold mb-1">Upgrade to Premium</h4>
          <p className="text-sm text-purple-100 mb-3">Unlock advanced features</p>
          <button className="w-full bg-white text-mibbs-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;