import React from 'react';
import { TrendingUp, DollarSign, Upload, PieChart } from 'lucide-react';

const SpendTracker: React.FC = () => {
  const spendData = {
    totalBudget: 500000,
    spent: 125000,
    remaining: 375000,
    channels: [
      { name: 'Digital Marketing', spent: 75000, budget: 200000, color: 'bg-blue-500' },
      { name: 'Brand & Creative', spent: 30000, budget: 125000, color: 'bg-green-500' },
      { name: 'Traditional Media', spent: 15000, budget: 100000, color: 'bg-purple-500' },
      { name: 'Events & PR', spent: 5000, budget: 75000, color: 'bg-orange-500' }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Spend Tracker</h2>
          <p className="text-gray-600 mt-1">Track your marketing spend and ROI</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Invoice</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(spendData.totalBudget)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Amount Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(spendData.spent)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(spendData.remaining)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Usage</p>
              <p className="text-2xl font-bold text-gray-900">{((spendData.spent / spendData.totalBudget) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Spend by Channel</h3>
        <div className="space-y-4">
          {spendData.channels.map((channel, index) => {
            const percentage = (channel.spent / channel.budget) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${channel.color}`} />
                    <span className="font-medium text-gray-900">{channel.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(channel.spent)} / {formatCurrency(channel.budget)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${channel.color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(1)}% utilized
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendTracker;