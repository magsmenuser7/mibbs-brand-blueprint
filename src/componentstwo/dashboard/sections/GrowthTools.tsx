import React, { useState } from 'react';
import { Zap, Gift, Shield, TrendingUp, Calendar } from 'lucide-react';

const GrowthTools: React.FC = () => {
  const tools = [
    {
      id: 'schemes',
      title: 'Government Benefits',
      description: 'MSME schemes and subsidies',
      icon: Gift,
      color: 'from-green-500 to-emerald-600',
      premium: false
    },
    {
      id: 'trademark',
      title: 'Brand Protection',
      description: 'Trademark and legal tools',
      icon: Shield,
      color: 'from-purple-500 to-violet-600',
      premium: true
    },
    {
      id: 'sales',
      title: 'Sales Tracker',
      description: 'Daily sales and profit tracking',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      premium: true
    },
    {
      id: 'festival',
      title: 'Festival Calendar',
      description: 'Seasonal marketing opportunities',
      icon: Calendar,
      color: 'from-orange-500 to-red-600',
      premium: false
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Business Plus Tools</h2>
        <p className="text-gray-600 mt-1">Growth checklist, creatives brief, templates</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {tool.premium && (
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <button
                onClick={openModal}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  tool.premium 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {tool.premium ? 'Upgrade to Access' : 'Explore Tool'}
              </button>
            </div>
          );
        })}
      </div>
      {/* Responsive Large Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4 py-5">
          <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 px-8 py-10 relative flex flex-col items-center">
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 text-2xl text-gray-400 hover:text-gray-700"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 flex items-center justify-center shadow">
                <Zap className="w-9 h-9 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Coming soon</h2>
              <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                This feature will be available shortly.<br className="hidden md:inline" />
                Stay tuned for exciting updates!
              </p>
              {/* <button
                onClick={closeModal}
                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthTools;
