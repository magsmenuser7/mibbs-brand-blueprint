import React from 'react';
import { TrendingUp, Eye, MessageCircle, Shield, FileText } from 'lucide-react';

const BrandHealthScore: React.FC = () => {
  const scoreItems = [
    { label: 'Visual Consistency', score: 8, max: 10, icon: Eye, color: 'text-green-600' },
    { label: 'Digital Presence', score: 5, max: 10, icon: TrendingUp, color: 'text-yellow-600' },
    { label: 'Audience Engagement', score: 6, max: 10, icon: MessageCircle, color: 'text-blue-600' },
    { label: 'Trust & Reputation', score: 3, max: 10, icon: Shield, color: 'text-red-600' },
    { label: 'Legal Coverage', score: 0, max: 1, icon: FileText, color: 'text-orange-600', status: 'Trademark pending' }
  ];

  const overallScore = 72;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Brand Health Score</h3>
          <p className="text-gray-600">Know where you stand, and what to fix.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{overallScore}/100</div>
          <div className="text-sm text-gray-500">Overall Score</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {scoreItems.map((item, index) => {
          const Icon = item.icon;
          const percentage = item.max === 1 ? (item.score * 100) : (item.score / item.max) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <span className="text-sm text-gray-600">
                    {item.status || `${item.score}/${item.max}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 80 ? 'bg-green-500' :
                      percentage >= 60 ? 'bg-yellow-500' :
                      percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        → Improve Score
      </button>
    </div>
  );
};

export default BrandHealthScore;