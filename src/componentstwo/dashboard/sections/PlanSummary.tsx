import React from 'react';
import { FileText, Download, Eye, PieChart, TrendingUp } from 'lucide-react';
import { IndustryData } from '../../../data/industryData';

const PlanSummary: React.FC = () => {
  const savedPlan = localStorage.getItem('mibbs_saved_plan');
  const budgetData = savedPlan ? JSON.parse(savedPlan) : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // New formula: 5% of monthly revenue for monthly budget, annualizes for annual.
  const monthlyBudget = (budgetData?.monthlyRevenue || 0) * 0.05;
  const annualBudget = monthlyBudget * 12;

  if (!budgetData) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Budget Plans</h2>
          <p className="text-gray-600 mt-1">Saved plans and drafts</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved plans yet</h3>
          <p className="text-gray-600 mb-6">Complete your assessment to generate your first budget plan</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create New Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Budget Plans</h2>
        <p className="text-gray-600 mt-1">Your saved budget plans and performance</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Current Budget Plan</h3>
            <p className="text-gray-600">Generated for {budgetData.industry} business</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Full Plan</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Annual Budget</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(annualBudget)}</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <PieChart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Monthly Average</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyBudget)}</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Industry</p>
            <p className="text-lg font-bold text-gray-900">{budgetData.industry}</p>
          </div>
        </div>

        {/* Industry Details */}
        {budgetData.industryDetails && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {budgetData.industryDetails.name} Industry Benchmarks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Industry Standard</h5>
                <p className="text-lg font-bold text-blue-600">
                  {budgetData.industryDetails.marketingSpendRange} of Revenue
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Recommended Channels</h5>
                <div className="flex flex-wrap gap-1">
                  {budgetData.industryDetails.channels.map((channel: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Focus Areas</h5>
                <div className="space-y-1">
                  {budgetData.industryDetails.parameters.map((param: string, index: number) => (
                    <div key={index} className="text-xs text-gray-700">• {param}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Channel Allocations */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Budget Allocation by Channel</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetData.allocations.map((allocation: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{allocation.channel}</h5>
                  <span className="text-sm font-semibold text-mibbs-primary">{allocation.percent}%</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(allocation.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
