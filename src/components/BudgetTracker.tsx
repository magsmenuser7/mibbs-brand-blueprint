import React from 'react';
import { TrendingUp, Upload, PieChart, Target, DollarSign, Activity } from 'lucide-react';

const BudgetTracker: React.FC = () => {
  // Get user's budget data from localStorage
  const savedBudget = localStorage.getItem('mibbs_budget');
  const userBudgetData = savedBudget ? JSON.parse(savedBudget) : null;
  
  // Use user's actual budget or show zeros for new users
  const budgetData = {
    allocated: userBudgetData?.budget?.total || 0,
    used: userBudgetData ? Math.round(userBudgetData.budget.total * 0.24) : 0,
    remaining: userBudgetData ? Math.round(userBudgetData.budget.total * 0.76) : 0,
    channels: [
      { 
        name: 'Meta Ads', 
        spent: userBudgetData ? Math.round(userBudgetData.budget.digital * 0.4) : 0, 
        leads: userBudgetData ? 120 : 0, 
        color: 'bg-blue-500' 
      },
      { 
        name: 'Print Media', 
        spent: userBudgetData ? Math.round(userBudgetData.budget.traditional * 0.3) : 0, 
        leads: userBudgetData ? 45 : 0, 
        color: 'bg-green-500' 
      },
      { 
        name: 'Influencer', 
        spent: userBudgetData ? Math.round(userBudgetData.budget.digital * 0.2) : 0, 
        leads: userBudgetData ? 80 : 0, 
        color: 'bg-purple-500' 
      }
    ],
    recentTransactions: [
      { 
        id: 1, 
        agency: 'Creative Minds Studio', 
        amount: userBudgetData ? 80000 : 0, 
        type: 'Meta Ads Campaign', 
        date: '2 days ago', 
        status: 'completed' 
      },
      { 
        id: 2, 
        agency: 'Brand Builders Co.', 
        amount: userBudgetData ? 40000 : 0, 
        type: 'Logo Design', 
        date: '1 week ago', 
        status: 'completed' 
      }
    ]
  };

  const usagePercentage = (budgetData.used / budgetData.allocated) * 100;

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