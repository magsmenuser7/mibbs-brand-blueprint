import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Folder,
  Image,
  Video,
  File,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  Star,
  AlertTriangle
} from 'lucide-react';

const BrandMaterialLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories = [
    { id: 'all', name: 'All Materials', icon: <Folder className="w-4 h-4" /> },
    { id: 'guidelines', name: 'Brand Guidelines', icon: <FileText className="w-4 h-4" /> },
    { id: 'logos', name: 'Logos & Assets', icon: <Image className="w-4 h-4" /> },
    { id: 'templates', name: 'Templates', icon: <File className="w-4 h-4" /> },
    { id: 'videos', name: 'Video Assets', icon: <Video className="w-4 h-4" /> },
    { id: 'campaigns', name: 'Campaign Materials', icon: <Star className="w-4 h-4" /> }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'east', name: 'East India' },
    { id: 'west', name: 'West India' },
    { id: 'central', name: 'Central India' }
  ];

  const brandMaterials = [
    {
      id: 1,
      name: 'Brand Guidelines 2024',
      category: 'guidelines',
      type: 'PDF',
      size: '15.2 MB',
      uploadedBy: 'Brand Team',
      uploadedAt: '2024-01-15',
      region: 'All',
      downloads: 245,
      status: 'approved',
      version: '2.1',
      description: 'Complete brand guidelines including logo usage, colors, typography'
    },
    {
      id: 2,
      name: 'Primary Logo Pack',
      category: 'logos',
      type: 'ZIP',
      size: '8.7 MB',
      uploadedBy: 'Design Team',
      uploadedAt: '2024-02-01',
      region: 'All',
      downloads: 189,
      status: 'approved',
      version: '1.0',
      description: 'All logo variations in different formats (PNG, SVG, EPS)'
    },
    {
      id: 3,
      name: 'Diwali Campaign Creative',
      category: 'campaigns',
      type: 'ZIP',
      size: '45.3 MB',
      uploadedBy: 'Creative North',
      uploadedAt: '2024-10-01',
      region: 'North',
      downloads: 89,
      status: 'pending',
      version: '1.0',
      description: 'Festival campaign assets for North India market'
    },
    {
      id: 4,
      name: 'Social Media Templates',
      category: 'templates',
      type: 'PSD',
      size: '23.1 MB',
      uploadedBy: 'Digital Team',
      uploadedAt: '2024-09-15',
      region: 'All',
      downloads: 156,
      status: 'approved',
      version: '1.2',
      description: 'Instagram, Facebook, LinkedIn post templates'
    },
    {
      id: 5,
      name: 'Product Launch Video',
      category: 'videos',
      type: 'MP4',
      size: '125.8 MB',
      uploadedBy: 'South Media Solutions',
      uploadedAt: '2024-09-20',
      region: 'South',
      downloads: 67,
      status: 'review',
      version: '1.0',
      description: '30-second product launch video for South region'
    }
  ];

  const uploadHistory = [
    {
      id: 1,
      action: 'Uploaded',
      file: 'Diwali Campaign Creative',
      user: 'Rahul Sharma',
      agency: 'Creative North',
      region: 'North India',
      timestamp: '2 hours ago',
      status: 'pending_approval'
    },
    {
      id: 2,
      action: 'Approved',
      file: 'Social Media Templates',
      user: 'Priya Nair',
      agency: 'Brand Team',
      region: 'All Regions',
      timestamp: '4 hours ago',
      status: 'approved'
    },
    {
      id: 3,
      action: 'Downloaded',
      file: 'Brand Guidelines 2024',
      user: 'Amit Patel',
      agency: 'West Creative Hub',
      region: 'West India',
      timestamp: '6 hours ago',
      status: 'downloaded'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'downloaded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'zip': return <Folder className="w-8 h-8 text-yellow-500" />;
      case 'psd': return <Image className="w-8 h-8 text-blue-500" />;
      case 'mp4': return <Video className="w-8 h-8 text-purple-500" />;
      default: return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const filteredMaterials = brandMaterials.filter(material => {
    const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || material.region === selectedRegion || material.region === 'All';
    return categoryMatch && regionMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Brand Material Library</h1>
        <p className="text-gray-600 mt-2">Upload your brand guidelines, logos, and templates in one place. Agencies can download approved materials easily.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">1,247</p>
              <p className="text-sm text-green-600 mt-1">+23 this month</p>
            </div>
            <Folder className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">3,456</p>
              <p className="text-sm text-green-600 mt-1">+156 this week</p>
            </div>
            <Download className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">8</p>
              <p className="text-sm text-gray-500 mt-1">Needs review</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-pink-600 mt-2">2.4 GB</p>
              <p className="text-sm text-gray-500 mt-1">of 10 GB</p>
            </div>
            <FileText className="w-8 h-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Filters and Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 ">
        <div className="flex flex-col lg:flex-row  items-center justify-between mb-6">
          <div className="flex flex-col lg:flex-row items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search materials..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-6 mt-6"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-6"
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload Materials</span>
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(material.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{material.name}</h3>
                  <p className="text-sm text-gray-600">{material.type} • {material.size}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(material.status)}`}>
                {material.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{material.description}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-between">
                <span>Uploaded by:</span>
                <span className="font-medium">{material.uploadedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Region:</span>
                <span className="font-medium">{material.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Downloads:</span>
                <span className="font-medium">{material.downloads}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Version:</span>
                <span className="font-medium">v{material.version}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload History & Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload History & Tracking</h3>
        <p className="text-gray-600 mb-4">Every creative, ad, or copy uploaded by an agency is tracked. Shows who uploaded what, from which region, and when. Approval trail ensures accountability.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uploadHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.file}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{entry.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.agency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{entry.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(entry.status)}`}>
                      {entry.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accountability Features */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accountability Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-600">Approval Trail</h4>
            </div>
            <p className="text-sm text-gray-700">Clear record of who approved what and when. Full accountability for all decisions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Complete Tracking</h4>
            </div>
            <p className="text-sm text-gray-700">Track every upload, download, and modification. Know exactly who did what.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-600">Issue Resolution</h4>
            </div>
            <p className="text-sm text-gray-700">If something goes wrong, it's clear who approved and who delivered.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMaterialLibrary;