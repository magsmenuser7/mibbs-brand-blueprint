import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Send, 
  Download,
  Calendar,
  Clock,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const Proposals: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const proposals = [
    {
      id: 'P-001',
      title: 'Digital Marketing Package - TechStart Solutions',
      client: 'TechStart Solutions',
      contact: 'Rahul Sharma',
      value: '₹5,00,000',
      status: 'Sent',
      sentDate: '2 days ago',
      validUntil: '12 days',
      services: ['Website Development', 'Digital Marketing', 'SEO'],
      viewCount: 3,
      lastViewed: '6 hours ago'
    },
    {
      id: 'P-002',
      title: 'Brand Identity & Social Media - Fashion Forward',
      client: 'Fashion Forward',
      contact: 'Priya Patel',
      value: '₹3,50,000',
      status: 'Under Review',
      sentDate: '5 days ago',
      validUntil: '9 days',
      services: ['Brand Identity', 'Social Media Marketing', 'Content Creation'],
      viewCount: 8,
      lastViewed: '2 hours ago'
    },
    {
      id: 'P-003',
      title: 'Complete Digital Transformation - Organic Foods',
      client: 'Organic Foods Co.',
      contact: 'Amit Kumar',
      value: '₹7,50,000',
      status: 'Accepted',
      sentDate: '1 week ago',
      validUntil: 'Accepted',
      services: ['Brand Identity', 'Website', 'Digital Marketing', 'Packaging'],
      viewCount: 12,
      lastViewed: '1 day ago'
    },
    {
      id: 'P-004',
      title: 'Fitness App & Marketing - Urban Fitness',
      client: 'Urban Fitness',
      contact: 'Sneha Reddy',
      value: '₹4,25,000',
      status: 'Rejected',
      sentDate: '2 weeks ago',
      validUntil: 'Expired',
      services: ['Mobile App', 'Digital Marketing', 'Social Media'],
      viewCount: 5,
      lastViewed: '1 week ago'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Expired': 'bg-gray-100 text-gray-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Under Review': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proposals & Contracts</h1>
          <p className="text-gray-600">Create, send, and track your business proposals.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Templates
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Proposals</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-yellow-600">6</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₹45L</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Under Review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Clients</option>
            <option value="new">New Clients</option>
            <option value="existing">Existing Clients</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(proposal.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                    <span className="text-sm text-gray-500">#{proposal.id}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">{proposal.client}</span>
                    <span className="mx-2">•</span>
                    <span>{proposal.contact}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proposal.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 ml-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{proposal.value}</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Sent Date</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {proposal.sentDate}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Valid Until</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {proposal.validUntil}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Views</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye className="w-4 h-4 mr-1" />
                    {proposal.viewCount} views
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Last Viewed</h4>
                  <p className="text-sm text-gray-600">{proposal.lastViewed}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {proposal.status === 'Draft' && (
                    <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4 mr-1" />
                      Send Proposal
                    </button>
                  )}
                  {proposal.status === 'Sent' && (
                    <button className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Follow Up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm">
        <div className="text-sm text-gray-600">
          Showing 1 to 4 of 24 proposals
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proposals;