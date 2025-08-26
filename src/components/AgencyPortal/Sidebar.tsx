import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  FileText, 
  CreditCard, 
  Settings,
  BarChart3,
  MessageSquare,
  Puzzle,
  X,
  Building2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/agency', icon: LayoutDashboard },
  { name: 'Leads', href: '/agency/leads', icon: Users },
  { name: 'Certification', href: '/agency/certification', icon: Award },
  { name: 'Proposals', href: '/agency/proposals', icon: FileText },
  { name: 'Credits', href: '/agency/credits', icon: CreditCard },
  { name: 'Services', href: '/agency/services', icon: Settings },
  { name: 'Analytics', href: '/agency/analytics', icon: BarChart3 },
  { name: 'Messages', href: '/agency/messages', icon: MessageSquare },
  { name: 'Integrations', href: '/agency/integrations', icon: Puzzle },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static backdrop-blur-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-accent-50">
          {/* <div className="flex items-center">
            <div className="p-1 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">MIBBS</span>
          </div> */}

          <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-3xl font-bold">MIBBS</span>
            </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1 animate-slide-down">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-[1.02]
                    ${isActive
                      ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gradient-to-r from-primary-25 to-accent-25">
          <div className="flex items-center">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center animate-pulse-soft">
              <Building2 className="w-4 h-4 text-primary-600" />
            </div> */}

            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Agency Portal</p>
              <p className="text-xs text-gray-500">v2.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;