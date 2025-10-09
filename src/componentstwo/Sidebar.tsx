import React from 'react';
import { 
  Home, 
  PieChart, 
  Users, 
  Wrench, 
  FileCheck, 
  BookOpen, 
  User, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'budget', label: 'My Budgeting Report', icon: PieChart },
    { id: 'agencies', label: 'Connect with Agencies', icon: Users },
    { id: 'tools', label: 'Brand Tools', icon: Wrench },
    { id: 'legal', label: 'Legal & Compliance', icon: FileCheck },
    { id: 'training', label: 'Training & Templates', icon: BookOpen },
    { id: 'account', label: 'My Account', icon: User },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold text-gray-900">MIBBS</span>
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
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-mibbs-light text-mibbs-primary shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-mibbs-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                    isActive ? 'text-mibbs-primary rotate-90' : 'text-gray-300 group-hover:text-gray-500'
                  }`} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-mibbs-gradient rounded-lg p-4 text-white">
          <h4 className="font-semibold mb-1">Upgrade to Premium</h4>
          <p className="text-sm text-purple-100 mb-3">Unlock AI-powered features</p>
          <button className="w-full bg-white text-mibbs-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;