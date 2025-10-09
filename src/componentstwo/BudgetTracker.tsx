import React from 'react';
import { TrendingUp, Upload, PieChart, Target, DollarSign, Activity } from 'lucide-react';

const BudgetTracker: React.FC = () => {
  // Sample budget data
  const totalBudget = 150000;
  const budgetSpent = 36000;
  const budgetRemaining = 114000;
  
  const budgetData = {
    allocated: totalBudget,
    used: budgetSpent,
    remaining: budgetRemaining,
    channels: [
      { 
        name: 'Meta Ads', 
      spent: 20000, 
      leads: 120, 
        color: 'bg-blue-500' 
      },
      { 
        name: 'Print Media', 
      spent: 8000, 
      leads: 45, 
        color: 'bg-green-500' 
      },
      { 
        name: 'Influencer', 
      spent: 8000, 
      leads: 80, 
        color: 'bg-purple-500' 
      }
    ],
    recentTransactions: [
      { 
        id: 1, 
        type: 'Creative Minds Studio',
        agency: 'Creative Minds Studio', 
        amount: 25000, 
        date: '2 days ago', 
        status: 'completed' 
      },
      { 
        id: 2, 
        type: 'Brand Builders Co.',
        agency: 'Brand Builders Co.', 
        amount: 15000, 
        date: '1 week ago', 
        status: 'completed' 
      }
    ]
  };

  const usagePercentage = (budgetSpent / totalBudget) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Budget & ROI Tracker</h3>
          <p className="text-gray-600">Track what you've spent and what you got</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Invoice</span>
        </button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Allocated</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{budgetData.allocated.toLocaleString()}</p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">Used</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{budgetData.used.toLocaleString()}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Remaining</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{budgetData.remaining.toLocaleString()}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Total Leads</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{budgetData.channels.reduce((sum, channel) => sum + channel.leads, 0)}</p>
        </div>
      </div>

      {/* Budget Usage Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Budget Usage</span>
          <span className="text-sm text-gray-600">{usagePercentage.toFixed(1)}% used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Channel Performance</h4>
        <div className="space-y-4">
          {budgetData.channels.map((channel, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${channel.color}`} />
                <div>
                  <p className="font-medium text-gray-900">{channel.name}</p>
                  <p className="text-sm text-gray-600">₹{channel.spent.toLocaleString()} spent</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{channel.leads} leads</p>
                <p className="text-sm text-gray-600">₹{Math.round(channel.spent / channel.leads)} per lead</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h4>
        <div className="space-y-3">
          {budgetData.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{transaction.type}</p>
                <p className="text-sm text-gray-600">{transaction.agency} • {transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;