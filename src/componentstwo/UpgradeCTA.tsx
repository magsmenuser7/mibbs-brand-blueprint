import React from 'react';
import { Crown, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';

const UpgradeCTA: React.FC = () => {
  const premiumFeatures = [
    { icon: BarChart3, text: 'Deeper Analytics & Benchmarks' },
    { icon: Users, text: 'Team Sharing & Collaboration' },
    { icon: Zap, text: 'AI-Powered Recommendations' },
    { icon: Crown, text: 'Priority Support & Consultation' }
  ];

  return (
    <div className="bg-gradient-to-br from-mibbs-primary to-mibbs-secondary rounded-xl shadow-sm border border-mibbs-light p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Upgrade to Premium</h3>
            <p className="text-purple-100">Unlock advanced features</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">₹999</div>
          <div className="text-purple-100 text-sm">per month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {premiumFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-center space-x-2">
              <Icon className="w-4 h-4 text-purple-200" />
              <span className="text-sm text-purple-100">{feature.text}</span>
            </div>
          );
        })}
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-white text-mibbs-primary px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
          <span>Start Free Trial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="px-4 py-3 border border-white border-opacity-30 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
          Learn More
        </button>
      </div>

      <p className="text-xs text-purple-200 mt-3 text-center">
        7-day free trial • Cancel anytime • Trusted by 8,000+ MSMEs
      </p>
    </div>
  );
};

export default UpgradeCTA;