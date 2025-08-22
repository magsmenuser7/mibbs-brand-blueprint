import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Clock, Target, Star, AlertCircle, CheckCircle, Users } from 'lucide-react';

const AgencyPulseDashboard = () => {
  const [agencies, setAgencies] = useState([
    {
      id: 1,
      name: 'Creative North',
      region: 'North India',
      deliverables: 92,
      timeline: 88,
      budget: 95,
      compliance: 87,
      rating: 4.3,
      status: 'active',
      recentProjects: 12,
      feedback: 'Excellent creative output, minor delays in approvals'
    },
    {
      id: 2,
      name: 'South Media Solutions',
      region: 'South India',
      deliverables: 85,
      timeline: 92,
      budget: 89,
      compliance: 94,
      rating: 4.1,
      status: 'active',
      recentProjects: 8,
      feedback: 'Strong compliance, good timeline management'
    },
    {
      id: 3,
      name: 'East Digital',
      region: 'East India',
      deliverables: 78,
      timeline: 82,
      budget: 76,
      compliance: 81,
      rating: 3.8,
      status: 'warning',
      recentProjects: 6,
      feedback: 'Needs improvement in budget management'
    },
    {
      id: 4,
      name: 'West Creative Hub',
      region: 'West India',
      deliverables: 94,
      timeline: 96,
      budget: 91,
      compliance: 89,
      rating: 4.5,
      status: 'active',
      recentProjects: 15,
      feedback: 'Outstanding performance across all metrics'
    },
    {
      id: 5,
      name: 'Central Brand Works',
      region: 'Central India',
      deliverables: 88,
      timeline: 85,
      budget: 92,
      compliance: 86,
      rating: 4.2,
      status: 'active',
      recentProjects: 10,
      feedback: 'Consistent quality, room for timeline improvement'
    }
  ]);

  const [selectedAgency, setSelectedAgency] = useState(null);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgencies(prev => prev.map(agency => ({
        ...agency,
        deliverables: Math.max(70, Math.min(100, agency.deliverables + (Math.random() - 0.5) * 5)),
        timeline: Math.max(70, Math.min(100, agency.timeline + (Math.random() - 0.5) * 5)),
        budget: Math.max(70, Math.min(100, agency.budget + (Math.random() - 0.5) * 3)),
        compliance: Math.max(70, Math.min(100, agency.compliance + (Math.random() - 0.5) * 2)),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const averageMetrics = {
    deliverables: Math.round(agencies.reduce((sum, agency) => sum + agency.deliverables, 0) / agencies.length),
    timeline: Math.round(agencies.reduce((sum, agency) => sum + agency.timeline, 0) / agencies.length),
    budget: Math.round(agencies.reduce((sum, agency) => sum + agency.budget, 0) / agencies.length),
    compliance: Math.round(agencies.reduce((sum, agency) => sum + agency.compliance, 0) / agencies.length),
    rating: (agencies.reduce((sum, agency) => sum + agency.rating, 0) / agencies.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agency Performance Tracker</h1>
        <p className="text-gray-600 mt-2">Shows how each agency is doing: are they on time, within budget, and on brand?</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Deliverables</p>
              <p className={`text-2xl font-bold mt-2 ${getPerformanceColor(averageMetrics.deliverables).split(' ')[0]}`}>
                {averageMetrics.deliverables}%
              </p>
            </div>
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Timeline</p>
              <p className={`text-2xl font-bold mt-2 ${getPerformanceColor(averageMetrics.timeline).split(' ')[0]}`}>
                {averageMetrics.timeline}%
              </p>
            </div>
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Budget</p>
              <p className={`text-2xl font-bold mt-2 ${getPerformanceColor(averageMetrics.budget).split(' ')[0]}`}>
                {averageMetrics.budget}%
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
              <p className={`text-2xl font-bold mt-2 ${getPerformanceColor(averageMetrics.compliance).split(' ')[0]}`}>
                {averageMetrics.compliance}%
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-pink-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{averageMetrics.rating}</p>
            </div>
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Agency Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Agency Performance Matrix</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliverables</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{agency.name}</div>
                        <div className="text-sm text-gray-500">{agency.recentProjects} projects</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agency.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            agency.deliverables >= 90 ? 'bg-green-500' : 
                            agency.deliverables >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${agency.deliverables}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(agency.deliverables)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            agency.timeline >= 90 ? 'bg-green-500' : 
                            agency.timeline >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${agency.timeline}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(agency.timeline)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            agency.budget >= 90 ? 'bg-green-500' : 
                            agency.budget >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${agency.budget}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(agency.budget)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            agency.compliance >= 90 ? 'bg-green-500' : 
                            agency.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${agency.compliance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.round(agency.compliance)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{agency.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(agency.status)}
                      <span className={`ml-2 text-sm capitalize ${
                        agency.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {agency.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedAgency(agency)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agency Detail Modal */}
      {selectedAgency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedAgency.name}</h3>
                <button 
                  onClick={() => setSelectedAgency(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Region</p>
                  <p className="text-lg text-gray-900">{selectedAgency.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Projects</p>
                  <p className="text-lg text-gray-900">{selectedAgency.recentProjects}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Performance Metrics</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Deliverables</p>
                    <p className="text-2xl font-bold text-purple-600">{Math.round(selectedAgency.deliverables)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-2xl font-bold text-blue-600">{Math.round(selectedAgency.timeline)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-2xl font-bold text-green-600">{Math.round(selectedAgency.budget)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Compliance</p>
                    <p className="text-2xl font-bold text-pink-600">{Math.round(selectedAgency.compliance)}%</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Internal Feedback</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedAgency.feedback}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyPulseDashboard;