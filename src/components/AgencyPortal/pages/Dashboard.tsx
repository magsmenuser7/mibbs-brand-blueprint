import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  CreditCard, 
  Award,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      name: 'Active Leads',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      name: 'Proposals Sent',
      value: '18',
      change: '+8%',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      name: 'Available Credits',
      value: '156',
      change: '-5%',
      changeType: 'decrease',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-accent-500 to-accent-600'
    },
    {
      name: 'Conversion Rate',
      value: '32%',
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    }
  ];

  const recentLeads = [
    {
      id: 1,
      company: 'TechStart Solutions',
      contact: 'Rahul Sharma',
      industry: 'Technology',
      location: 'Mumbai, MH',
      budget: '₹5,00,000',
      stage: 'New',
      distance: '2.3 km'
    },
    {
      id: 2,
      company: 'Fashion Forward',
      contact: 'Priya Patel',
      industry: 'Fashion',
      location: 'Pune, MH',
      budget: '₹3,50,000',
      stage: 'Contacted',
      distance: '15.7 km'
    },
    {
      id: 3,
      company: 'Organic Foods Co.',
      contact: 'Amit Kumar',
      industry: 'Food & Beverage',
      location: 'Delhi, DL',
      budget: '₹7,50,000',
      stage: 'Proposal Sent',
      distance: '8.2 km'
    }
  ];

  const tasks = [
    { id: 1, task: 'Follow up with TechStart Solutions', priority: 'high', due: '2h ago' },
    { id: 2, task: 'Submit proposal for Fashion Forward', priority: 'medium', due: 'Today' },
    { id: 3, task: 'Upload certification documents', priority: 'low', due: 'Tomorrow' },
    { id: 4, task: 'Review contract terms with Organic Foods Co.', priority: 'high', due: '1d ago' }
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your agency.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-accent-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} animate-float`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50/50 to-accent-50/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors duration-200">
                View All
              </button>
            </div>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="p-4 text-sm font-medium text-gray-500">Company</th>
                    <th className="p-4 text-sm font-medium text-gray-500">Industry</th>
                    <th className="p-4 text-sm font-medium text-gray-500">Budget</th>
                    <th className="p-4 text-sm font-medium text-gray-500">Stage</th>
                    <th className="p-4 text-sm font-medium text-gray-500">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-accent-50/30 transition-all duration-200">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{lead.company}</p>
                          <p className="text-sm text-gray-500">{lead.contact}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{lead.industry}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">{lead.budget}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          lead.stage === 'New' ? 'bg-primary-100 text-primary-800' :
                          lead.stage === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-accent-100 text-accent-800'
                        }`}>
                          {lead.stage}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lead.distance}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tasks & Certification Status */}
        <div className="space-y-6">
          {/* Certification Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Certification</h2>
              <Award className="w-5 h-5 text-primary-600 animate-pulse-soft" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full animate-bounce-gentle">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tier</span>
                <span className="text-sm font-medium text-gray-900">Premium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Renewal</span>
                <span className="text-sm text-gray-600">245 days</span>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-accent-50/30 p-2 rounded-lg transition-all duration-200">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'high' ? 'bg-accent-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{task.due}</span>
                    </div>
                  </div>
                  {task.due.includes('ago') && (
                    <AlertCircle className="w-4 h-4 text-accent-500 animate-pulse-soft" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;