import React from 'react';
import { TrendingUp, Clock, Users, Calendar, CreditCard } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  // Sample data for the dashboard
  const totalBudget = 150000;
  const budgetSpent = 36000;
  const activeAgencies = 2;
  const brandScore = 72;

  const quickStats = [
    { 
      icon: TrendingUp, 
      label: 'Brand Health Score', 
      value: `${brandScore}/100`, 
      action: 'View Report',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: CreditCard, 
      label: 'Budget Spent', 
      value: `₹${budgetSpent.toLocaleString('en-IN')} this month`, 
      action: 'Track ROI',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: Users, 
      label: 'Active Agencies', 
      value: activeAgencies.toString(), 
      action: 'View Engagements',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: Calendar, 
      label: 'Upcoming Festival', 
      value: 'Ganesh Chaturthi (7 days left)', 
      action: 'Plan Campaign',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      icon: CreditCard, 
      label: 'MIBBS Credits Left', 
      value: '1', 
      action: 'Buy More',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Rajesh — Ready to build with purpose today?
        </h1>
        <p className="text-gray-600">Here's what's happening with your brand today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div 
              key={index} 
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
              
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group-hover:underline">
                {stat.action} →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeSection;