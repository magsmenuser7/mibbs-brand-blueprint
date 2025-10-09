import React from 'react';
import { CheckCircle, XCircle, Clock, ExternalLink, Shield, FileText } from 'lucide-react';

const LegalChecklist: React.FC = () => {
  const legalItems = [
    {
      id: 1,
      item: 'Brand Name Search',
      status: 'completed',
      description: 'Verified availability across trademark databases',
      actionText: 'View Report',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      item: 'Logo Trademark',
      status: 'pending',
      description: 'File trademark application for brand logo',
      actionText: 'Start Application',
      estimate: '₹8,000 - ₹12,000'
    },
    {
      id: 3,
      item: 'Domain Claimed',
      status: 'completed',
      description: 'Primary domain registered and secured',
      actionText: 'Manage Domain',
      lastUpdated: '1 week ago'
    },
    {
      id: 4,
      item: 'GST-linked Billing',
      status: 'completed',
      description: 'Business registered for GST with proper invoicing',
      actionText: 'View GST Details',
      lastUpdated: '3 days ago'
    },
    {
      id: 5,
      item: 'FSSAI License',
      status: 'not_applicable',
      description: 'Food business license (if applicable)',
      actionText: 'Check Requirements',
      note: 'Not required for your business type'
    },
    {
      id: 6,
      item: 'Copyright Protection',
      status: 'in_progress',
      description: 'Protect creative content and marketing materials',
      actionText: 'Continue Setup',
      progress: 60
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'not_applicable':
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'pending':
        return 'border-red-200 bg-red-50';
      case 'in_progress':
        return 'border-yellow-200 bg-yellow-50';
      case 'not_applicable':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const completedItems = legalItems.filter(item => item.status === 'completed').length;
  const totalApplicableItems = legalItems.filter(item => item.status !== 'not_applicable').length;
  const completionPercentage = Math.round((completedItems / totalApplicableItems) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Legal Checklist for Branding</h3>
          <p className="text-gray-600">Protect your brand legally before scaling</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{completionPercentage}%</div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">Legal Protection Status</h4>
          <span className="text-sm text-gray-600">{completedItems} of {totalApplicableItems} complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <Shield className="w-4 h-4" />
            <span>Connect with IP Lawyers</span>
          </button>
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700">
            <FileText className="w-4 h-4" />
            <span>Download Checklist PDF</span>
          </button>
        </div>
      </div>

      {/* Legal Items List */}
      <div className="space-y-4">
        {legalItems.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg border-2 ${getStatusColor(item.status)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    item.status === 'not_applicable' ? 'text-gray-500' : 'text-gray-900'
                  }`}>
                    {item.item}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    item.status === 'not_applicable' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                  {item.note && (
                    <p className="text-xs text-gray-500 mt-1 italic">{item.note}</p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                {item.estimate && (
                  <span className="text-sm font-medium text-gray-700">{item.estimate}</span>
                )}
                {item.lastUpdated && (
                  <span className="text-xs text-gray-500">{item.lastUpdated}</span>
                )}
              </div>
            </div>

            {item.status === 'in_progress' && item.progress && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs text-gray-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {item.status !== 'not_applicable' && (
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.status === 'completed' 
                      ? 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
                      : item.status === 'pending'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}>
                    {item.status === 'completed' && <ExternalLink className="w-3 h-3" />}
                    <span>{item.actionText}</span>
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {item.status === 'completed' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Complete
                  </span>
                )}
                {item.status === 'pending' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ⚠ Action Required
                  </span>
                )}
                {item.status === 'in_progress' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ⏳ In Progress
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalChecklist;