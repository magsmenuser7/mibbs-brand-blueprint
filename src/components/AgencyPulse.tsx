import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, Target, Star } from 'lucide-react';

const AgencyPulse = () => {
  const [agencies, setAgencies] = useState([
    { name: 'Agency North', deliverables: 85, timeline: 92, roi: 78, rating: 4.2 },
    { name: 'Agency West', deliverables: 92, timeline: 88, roi: 85, rating: 4.5 },
    { name: 'Agency South', deliverables: 78, timeline: 95, roi: 82, rating: 4.1 },
    { name: 'Agency East', deliverables: 88, timeline: 82, roi: 90, rating: 4.3 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgencies(prev => prev.map(agency => ({
        ...agency,
        deliverables: Math.max(60, Math.min(100, agency.deliverables + (Math.random() - 0.5) * 10)),
        timeline: Math.max(60, Math.min(100, agency.timeline + (Math.random() - 0.5) * 10)),
        roi: Math.max(60, Math.min(100, agency.roi + (Math.random() - 0.5) * 10)),
        rating: Math.max(3.5, Math.min(5, agency.rating + (Math.random() - 0.5) * 0.2)),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getBarColor = (value) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 80) return 'bg-yellow-500';
    if (value >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full h-64 bg-white rounded-xl border border-gray-200 p-4 overflow-hidden">
      <div className="space-y-3">
        {agencies.map((agency, index) => (
          <div key={agency.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{agency.name}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">{agency.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Deliverables */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-gray-600">Deliverables</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(agency.deliverables)}`}
                    style={{ width: `${agency.deliverables}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{Math.round(agency.deliverables)}%</span>
              </div>

              {/* Timeline */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-pink-500" />
                  <span className="text-xs text-gray-600">Timeline</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(agency.timeline)}`}
                    style={{ width: `${agency.timeline}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{Math.round(agency.timeline)}%</span>
              </div>

              {/* ROI */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600">ROI</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(agency.roi)}`}
                    style={{ width: `${agency.roi}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{Math.round(agency.roi)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyPulse;