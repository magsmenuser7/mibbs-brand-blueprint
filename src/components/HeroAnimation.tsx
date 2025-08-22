import React, { useEffect, useState } from 'react';
import { MapPin, TrendingUp, Users, CheckCircle } from 'lucide-react';

const HeroAnimation = () => {
  const [activeRegion, setActiveRegion] = useState(0);
  const [spendBars, setSpendBars] = useState([0, 0, 0, 0, 0]);
  const [agencyStatus, setAgencyStatus] = useState([false, false, false, false]);

  const regions = [
    { name: 'North', color: 'bg-purple-500', position: 'top-20 left-32' },
    { name: 'West', color: 'bg-pink-500', position: 'top-32 left-16' },
    { name: 'Central', color: 'bg-purple-400', position: 'top-40 left-40' },
    { name: 'East', color: 'bg-pink-400', position: 'top-48 left-56' },
    { name: 'South', color: 'bg-purple-600', position: 'top-64 left-36' }
  ];

  useEffect(() => {
    // Animate regions lighting up
    const regionInterval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 1000);

    // Animate spend bars rising
    const spendInterval = setInterval(() => {
      setSpendBars(prev => prev.map(() => Math.random() * 100));
    }, 2000);

    // Animate agency approvals
    const agencyInterval = setInterval(() => {
      setAgencyStatus(prev => prev.map(() => Math.random() > 0.5));
    }, 1500);

    return () => {
      clearInterval(regionInterval);
      clearInterval(spendInterval);
      clearInterval(agencyInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden">
      {/* India Map Representation */}
      <div className="absolute inset-0 p-8">
        <div className="relative w-full h-full">
          {/* Map outline */}
          <div className="absolute inset-4 border-2 border-dashed border-purple-300 rounded-lg opacity-30"></div>
          
          {/* Regions */}
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`absolute w-4 h-4 rounded-full transition-all duration-500 ${region.position} ${
                activeRegion === index 
                  ? `${region.color} scale-150 shadow-lg` 
                  : 'bg-gray-300 scale-100'
              }`}
            >
              <div className={`absolute -top-6 -left-4 text-xs font-medium transition-opacity ${
                activeRegion === index ? 'opacity-100' : 'opacity-0'
              }`}>
                {region.name}
              </div>
              {activeRegion === index && (
                <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-75"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Spend Bars */}
      <div className="absolute bottom-4 left-4 flex items-end space-x-2">
        {spendBars.map((height, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-6 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-1000"
              style={{ height: `${Math.max(height, 20)}px` }}
            ></div>
            <div className="text-xs text-gray-600 mt-1">R{index + 1}</div>
          </div>
        ))}
      </div>

      {/* Agency Status */}
      <div className="absolute top-4 right-4 space-y-2">
        {agencyStatus.map((approved, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${approved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-gray-600">Agency {index + 1}</span>
            {approved && <CheckCircle className="w-3 h-3 text-green-500" />}
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
          <TrendingUp className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-medium">Live Tracking</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
          <Users className="w-4 h-4 text-pink-600" />
          <span className="text-xs font-medium">Multi-Agency</span>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;