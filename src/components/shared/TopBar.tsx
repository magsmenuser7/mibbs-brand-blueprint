import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from "react-router-dom";


interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [notifications] = useState(3);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/agency-login" replace />;
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 animate-slide-down">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:flex items-center ml-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads, proposals..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:border-primary-300"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative transition-all duration-200 hover:scale-110">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full text-xs text-white flex items-center justify-center animate-bounce-gentle">
                {notifications}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-3 animate-fade-in">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-200 hover:ring-primary-300 transition-all duration-200"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;