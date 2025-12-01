import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  FileText, 
  Calendar, 
  Upload, 
  Download,
  Plus,
  Filter,
  Search,
  Eye,
  MessageSquare
} from 'lucide-react';

const BrandOpsSuite = () => {
  const [activeTab, setActiveTab] = useState('approvals');
  const [selectedApproval, setSelectedApproval] = useState(null);

  const approvals = [
    {
      id: 1,
      title: 'North India Diwali Campaign',
      type: 'Creative',
      agency: 'Creative North',
      region: 'North India',
      status: 'pending',
      priority: 'high',
      submittedBy: 'Rahul Sharma',
      submittedAt: '2 hours ago',
      description: 'Festival campaign creative assets for North India market',
      assets: ['banner_1.jpg', 'banner_2.jpg', 'video_ad.mp4'],
      comments: 2
    },
    {
      id: 2,
      title: 'South Region Budget Approval',
      type: 'Budget',
      agency: 'South Media Solutions',
      region: 'South India',
      status: 'approved',
      priority: 'medium',
      submittedBy: 'Priya Nair',
      submittedAt: '4 hours ago',
      description: 'Q4 budget allocation for South region campaigns',
      assets: ['budget_breakdown.xlsx'],
      comments: 5
    },
    {
      id: 3,
      title: 'West Digital Campaign Launch',
      type: 'Campaign',
      agency: 'West Creative Hub',
      region: 'West India',
      status: 'in_review',
      priority: 'high',
      submittedBy: 'Amit Patel',
      submittedAt: '6 hours ago',
      description: 'Digital campaign launch approval for Mumbai and Pune',
      assets: ['campaign_brief.pdf', 'media_plan.xlsx'],
      comments: 1
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Diwali Festival Campaign',
      region: 'All India',
      startDate: '2024-10-15',
      endDate: '2024-11-15',
      status: 'active',
      budget: '₹2.5Cr',
      agencies: ['Creative North', 'South Media', 'West Hub'],
      progress: 75
    },
    {
      id: 2,
      name: 'Winter Collection Launch',
      region: 'North India',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      status: 'planning',
      budget: '₹1.8Cr',
      agencies: ['Creative North'],
      progress: 25
    }
  ];

  const assets = [
    {
      id: 1,
      name: 'Brand Logo Pack',
      type: 'Logo',
      region: 'All',
      uploadedBy: 'Brand Team',
      uploadedAt: '2024-01-15',
      downloads: 245,
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Diwali Creative Assets',
      type: 'Creative',
      region: 'North',
      uploadedBy: 'Creative North',
      uploadedAt: '2024-10-01',
      downloads: 89,
      size: '15.7 MB'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const tabs = [
    { id: 'approvals', label: 'Approval Workflows', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'campaigns', label: 'Campaign Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'assets', label: 'Digital Asset Vault', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Brand Workspace</h1>
        <p className="text-gray-600 mt-2">A shared space where brands and agencies can work together. Approve designs, budgets, and campaigns easily.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 sm:px-3 border-b-2 font-medium text-sm flex items-center space-x-1 sm:space-x-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Approval Workflows */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search approvals..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Request</span>
            </button>
          </div>

          <div className="grid gap-4">
            {approvals.map((approval) => (
              <div key={approval.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{approval.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(approval.status)}`}>
                        {approval.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(approval.priority)}`}>
                        {approval.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 text-sm text-gray-600">
                      <div><span className="font-medium">Type:</span> {approval.type}</div>
                      <div><span className="font-medium">Agency:</span> {approval.agency}</div>
                      <div><span className="font-medium">Region:</span> {approval.region}</div>
                      <div><span className="font-medium">Submitted:</span> {approval.submittedAt}</div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{approval.description}</p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{approval.assets.length} assets</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{approval.comments} comments</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedApproval(approval)}
                      className="text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaign Calendar */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Campaign Calendar</h2>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </button>
          </div>

          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-sm text-gray-600">
                      <div><span className="font-medium">Region:</span> {campaign.region}</div>
                      <div><span className="font-medium">Budget:</span> {campaign.budget}</div>
                      <div><span className="font-medium">Start:</span> {campaign.startDate}</div>
                      <div><span className="font-medium">End:</span> {campaign.endDate}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-sm text-gray-600">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {campaign.agencies.length} agencies: {campaign.agencies.join(', ')}
                    </span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Digital Asset Vault */}
      {activeTab === 'assets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Digital Asset Vault</h2>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Assets</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-purple-600 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                            <div className="text-sm text-gray-500">{asset.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.type}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.region}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.uploadedBy}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.uploadedAt}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.downloads}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <button className="text-purple-600 hover:text-purple-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Approval Detail Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">{selectedApproval.title}</h3>
              <button 
                onClick={() => setSelectedApproval(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Request Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Type:</span> {selectedApproval.type}</div>
                    <div><span className="font-medium">Agency:</span> {selectedApproval.agency}</div>
                    <div><span className="font-medium">Region:</span> {selectedApproval.region}</div>
                    <div><span className="font-medium">Priority:</span> {selectedApproval.priority}</div>
                    <div><span className="font-medium">Submitted by:</span> {selectedApproval.submittedBy}</div>
                    <div><span className="font-medium">Submitted:</span> {selectedApproval.submittedAt}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Assets ({selectedApproval.assets.length})</h4>
                  <div className="space-y-2">
                    {selectedApproval.assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{asset}</span>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApproval.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Request Changes
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Reject
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandOpsSuite;
