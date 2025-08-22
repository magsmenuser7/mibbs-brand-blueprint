import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('leads');

  const metrics = {
    totalLeads: 47,
    convertedLeads: 15,
    proposalsSent: 23,
    revenue: 1250000,
    avgResponseTime: '2.4h',
    clientSatisfaction: 4.8
  };

  const chartData = [
    { month: 'Jan', leads: 12, conversions: 4, revenue: 180000 },
    { month: 'Feb', leads: 18, conversions: 6, revenue: 270000 },
    { month: 'Mar', leads: 15, conversions: 5, revenue: 225000 },
    { month: 'Apr', leads: 22, conversions: 8, revenue: 360000 },
    { month: 'May', leads: 28, conversions: 10, revenue: 450000 },
    { month: 'Jun', leads: 25, conversions: 9, revenue: 405000 }
  ];

  const topServices = [
    { name: 'Digital Marketing Strategy', leads: 18, conversions: 7, revenue: 450000 },
    { name: 'Website Development', leads: 15, conversions: 5, revenue: 375000 },
    { name: 'Brand Identity Design', leads: 12, conversions: 4, revenue: 180000 },
    { name: 'Social Media Management', leads: 8, conversions: 3, revenue: 120000 }
  ];

  const industryBreakdown = [
    { industry: 'Technology', percentage: 35, leads: 16, color: 'bg-blue-500' },
    { industry: 'E-commerce', percentage: 25, leads: 12, color: 'bg-green-500' },
    { industry: 'Healthcare', percentage: 20, leads: 9, color: 'bg-purple-500' },
    { industry: 'Fashion', percentage: 12, leads: 6, color: 'bg-pink-500' },
    { industry: 'Others', percentage: 8, leads: 4, color: 'bg-gray-500' }
  ];

  const recentActivity = [
    { type: 'lead', message: 'New lead from TechStart Solutions', time: '2 hours ago', icon: Users },
    { type: 'proposal', message: 'Proposal sent to Fashion Forward', time: '4 hours ago', icon: MessageSquare },
    { type: 'conversion', message: 'Organic Foods Co. accepted proposal', time: '1 day ago', icon: CheckCircle },
    { type: 'meeting', message: 'Meeting scheduled with Urban Fitness', time: '2 days ago', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track your performance and business insights.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-green-600">{metrics.convertedLeads}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Proposals</p>
              <p className="text-2xl font-bold text-purple-600">{metrics.proposalsSent}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(metrics.revenue / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.avgResponseTime}</p>
            </div>
            <Clock className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.clientSatisfaction}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="leads">Leads</option>
              <option value="conversions">Conversions</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => {
              const value = selectedMetric === 'leads' ? data.leads : 
                           selectedMetric === 'conversions' ? data.conversions : 
                           data.revenue / 10000;
              const maxValue = Math.max(...chartData.map(d => 
                selectedMetric === 'leads' ? d.leads : 
                selectedMetric === 'conversions' ? d.conversions : 
                d.revenue / 10000
              ));
              const height = (value / maxValue) * 200;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${height}px` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Industry Breakdown</h2>
          <div className="space-y-4">
            {industryBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.industry}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Services</h2>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{service.leads} leads</span>
                    <span>{service.conversions} conversions</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{(service.revenue / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-green-600">
                    {Math.round((service.conversions / service.leads) * 100)}% conversion
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'lead' ? 'bg-blue-100' :
                  activity.type === 'proposal' ? 'bg-purple-100' :
                  activity.type === 'conversion' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  <activity.icon className={`w-4 h-4 ${
                    activity.type === 'lead' ? 'text-blue-600' :
                    activity.type === 'proposal' ? 'text-purple-600' :
                    activity.type === 'conversion' ? 'text-green-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;