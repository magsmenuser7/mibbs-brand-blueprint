import React from 'react';
import { CheckCircle, TrendingUp, Users, Target, Download, Share, ArrowRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface BudgetReportProps {
  budgetData: any;
  onContinueToDashboard: () => void;
}

const BudgetReport: React.FC<BudgetReportProps> = ({ budgetData, onContinueToDashboard }) => {
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const mediaChannels = [
    { name: 'Digital Marketing', percentage: 40, amount: budgetData.budget.digital, color: 'bg-blue-500' },
    { name: 'Design & Creative', percentage: 25, amount: budgetData.budget.design, color: 'bg-green-500' },
    { name: 'Traditional Media', percentage: 20, amount: budgetData.budget.traditional, color: 'bg-purple-500' },
    { name: 'Events & PR', percentage: 15, amount: budgetData.budget.events, color: 'bg-orange-500' }
  ];

  const agencyMatches = [
    {
      name: 'Creative Minds Studio',
      location: budgetData.location?.city || 'Your City',
      specialties: ['Design', 'Digital Marketing'],
      rating: 4.8,
      pricing: '₹50,000-80,000/month',
      match: 95
    },
    {
      name: 'Digital Impact Agency',
      location: budgetData.location?.city || 'Your City',
      specialties: ['Performance Marketing', 'SEO'],
      rating: 4.6,
      pricing: '₹60,000-1,00,000/month',
      match: 88
    },
    {
      name: 'Brand Builders Co.',
      location: budgetData.location?.city || 'Your City',
      specialties: ['Brand Strategy', 'Traditional Media'],
      rating: 4.9,
      pricing: '₹80,000-1,50,000/month',
      match: 82
    }
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Brand Budget Report is Ready!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This isn't a template. This is your business logic, decoded.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Budget Breakdown */}
          <div className="lg:col-span-2 space-y-8">
            {/* Total Budget */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Monthly Budget</h2>
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {formatCurrency(budgetData.budget.total)}
                </div>
                <p className="text-gray-600">
                  Based on your {budgetData.monthlyRevenue} revenue and {budgetData.industry} industry
                </p>
              </div>

              {/* Budget Breakdown */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Media Mix</h3>
                {mediaChannels.map((channel, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${channel.color}`} />
                        <span className="font-medium text-gray-900">{channel.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">{formatCurrency(channel.amount)}</span>
                        <span className="text-sm text-gray-500 ml-2">({channel.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-mibbs-gradient transition-all duration-500`}
                        style={{ width: `${channel.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Potential */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Expected ROI Potential</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">3-5x</div>
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                </div>
                <div className="text-center p-6 bg-mibbs-light rounded-xl">
                  <Users className="w-8 h-8 text-mibbs-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-mibbs-primary mb-1">2,500+</div>
                  <div className="text-sm text-gray-600">New Customers</div>
                </div>
                <div className="text-center p-6 bg-pink-50 rounded-xl">
                  <Target className="w-8 h-8 text-mibbs-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold text-mibbs-accent mb-1">40%</div>
                  <div className="text-sm text-gray-600">Brand Recall</div>
                </div>
              </div>
            </div>
          </div>

          {/* Agency Matches */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                MIBBS-Certified Agency Matches
              </h3>
              <div className="space-y-4">
                {agencyMatches.map((agency, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{agency.name}</h4>
                        <p className="text-sm text-gray-600">{agency.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{agency.match}% match</div>
                        <div className="text-xs text-gray-500">★ {agency.rating}</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {agency.specialties.map((specialty, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{agency.pricing}</div>
                    <button className="w-full bg-mibbs-gradient text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                      Connect Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital vs Offline Split */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Digital vs Offline Split</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Digital Channels</span>
                  <span className="font-bold text-mibbs-primary">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-mibbs-gradient h-3 rounded-full" style={{ width: '65%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Offline Channels</span>
                  <span className="font-bold text-mibbs-accent">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-mibbs-accent h-3 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Recommendation:</strong> Start with digital for faster results, then expand to offline channels for broader reach.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to unlock your full dashboard?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with agencies, track your budget, access templates, and start building your brand with confidence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share className="w-4 h-4" />
              <span>Share with Team</span>
            </button>
            <button
              onClick={() => {
                onContinueToDashboard();   // keep your existing state update
                navigate("/cms-dashboard");    // go to dashboard route
              }}
              className="flex items-center space-x-2 px-8 py-3 bg-mibbs-gradient text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Access Full Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetReport;