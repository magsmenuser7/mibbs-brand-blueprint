import React, { useState } from 'react';
import { Gift, ExternalLink, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const GrantAlerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('eligible');
  
  const grants = {
    eligible: [
      {
        id: 1,
        title: 'MSME Branding Subsidy',
        authority: 'Government of Tamil Nadu',
        amount: 'Up to ₹2,00,000',
        deadline: '15 days left',
        coverage: '50% of branding expenses',
        requirements: ['MSME Registration', 'Turnover < 10Cr', 'New branding initiative'],
        status: 'eligible',
        urgency: 'high'
      },
      {
        id: 2,
        title: 'Startup India Marketing Credit',
        authority: 'Department for Promotion of Industry',
        amount: 'Up to ₹50,000',
        deadline: '2 months left',
        coverage: 'Digital marketing expenses',
        requirements: ['DPIIT Recognition', 'Founded < 7 years', 'Tech-enabled business'],
        status: 'eligible',
        urgency: 'medium'
      }
    ],
    applied: [
      {
        id: 3,
        title: 'Export Promotion Scheme',
        authority: 'Ministry of Commerce',
        amount: '₹1,00,000',
        applicationDate: 'Applied 2 weeks ago',
        status: 'under_review',
        trackingId: 'EPS/2024/MB/001234'
      }
    ],
    expired: [
      {
        id: 4,
        title: 'Digital India Startup Scheme',
        authority: 'MeitY',
        amount: '₹75,000',
        expiredDate: '1 week ago',
        status: 'expired',
        nextCycle: 'Next cycle in 6 months'
      }
    ]
  };

  const getStatusIcon = (status: string, urgency?: string) => {
    switch (status) {
      case 'eligible':
        return urgency === 'high' ? 
          <AlertTriangle className="w-5 h-5 text-red-500" /> :
          <Gift className="w-5 h-5 text-green-500" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
      default:
        return <Gift className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string, urgency?: string) => {
    switch (status) {
      case 'eligible':
        return urgency === 'high' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50';
      case 'under_review':
        return 'border-yellow-200 bg-yellow-50';
      case 'expired':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const tabs = [
    { id: 'eligible', label: 'Eligible', count: grants.eligible.length },
    { id: 'applied', label: 'Applied', count: grants.applied.length },
    { id: 'expired', label: 'Missed', count: grants.expired.length }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Grant & Government Scheme Alerts</h3>
          <p className="text-gray-600">Don't leave free money on the table.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Auto-matched to your profile</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Eligible Grants */}
      {activeTab === 'eligible' && (
        <div className="space-y-4">
          {grants.eligible.map((grant) => (
            <div key={grant.id} className={`p-6 rounded-lg border-2 ${getStatusColor(grant.status, grant.urgency)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(grant.status, grant.urgency)}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{grant.title}</h4>
                    <p className="text-sm text-gray-600">{grant.authority}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{grant.amount}</p>
                  <p className={`text-sm font-medium ${
                    grant.urgency === 'high' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {grant.deadline}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Coverage:</p>
                <p className="text-sm text-gray-600">{grant.coverage}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {grant.requirements.map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md border">
                      <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applied Grants */}
      {activeTab === 'applied' && (
        <div className="space-y-4">
          {grants.applied.map((grant) => (
            <div key={grant.id} className={`p-6 rounded-lg border-2 ${getStatusColor(grant.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(grant.status)}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{grant.title}</h4>
                    <p className="text-sm text-gray-600">{grant.authority}</p>
                    <p className="text-xs text-gray-500 mt-1">Tracking ID: {grant.trackingId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{grant.amount}</p>
                  <p className="text-sm text-gray-600">{grant.applicationDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Under Review
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Track Status →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expired Grants */}
      {activeTab === 'expired' && (
        <div className="space-y-4">
          {grants.expired.map((grant) => (
            <div key={grant.id} className={`p-6 rounded-lg border-2 ${getStatusColor(grant.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(grant.status)}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-400">{grant.title}</h4>
                    <p className="text-sm text-gray-500">{grant.authority}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-400">{grant.amount}</p>
                  <p className="text-sm text-gray-500">Expired {grant.expiredDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{grant.nextCycle}</p>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrantAlerts;