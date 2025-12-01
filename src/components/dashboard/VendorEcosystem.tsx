import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  FileText, 
  Shield,
  Plus,
  Eye,
  MessageSquare,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';

const VendorEcosystem = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'creative', name: 'Creative Agencies' },
    { id: 'digital', name: 'Digital Marketing' },
    { id: 'events', name: 'Event Management' },
    { id: 'influencer', name: 'Influencer Marketing' },
    { id: 'pr', name: 'Public Relations' },
    { id: 'outdoor', name: 'Outdoor Advertising' },
    { id: 'production', name: 'Video Production' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'kolkata', name: 'Kolkata' },
    { id: 'pune', name: 'Pune' },
    { id: 'hyderabad', name: 'Hyderabad' }
  ];

  const vendors = [
    {
      id: 1,
      name: 'Creative North Studios',
      category: 'creative',
      location: 'Delhi',
      rating: 4.8,
      reviews: 24,
      verified: true,
      specialties: ['Brand Identity', 'Campaign Creative', 'Digital Assets'],
      experience: '8+ years',
      teamSize: '25-50',
      pricing: '₹5-15L per project',
      portfolio: 'Available',
      lastProject: '2 months ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Digital Dynamics',
      category: 'digital',
      location: 'Mumbai',
      rating: 4.6,
      reviews: 18,
      verified: true,
      specialties: ['Social Media', 'Performance Marketing', 'SEO'],
      experience: '5+ years',
      teamSize: '15-25',
      pricing: '₹2-8L per project',
      portfolio: 'Available',
      lastProject: '1 month ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Event Masters',
      category: 'events',
      location: 'Bangalore',
      rating: 4.4,
      reviews: 31,
      verified: true,
      specialties: ['Corporate Events', 'Product Launches', 'Conferences'],
      experience: '10+ years',
      teamSize: '50+',
      pricing: '₹10-50L per event',
      portfolio: 'Available',
      lastProject: '3 weeks ago',
      status: 'active'
    },
    {
      id: 4,
      name: 'Influence Connect',
      category: 'influencer',
      location: 'Mumbai',
      rating: 4.2,
      reviews: 15,
      verified: false,
      specialties: ['Micro Influencers', 'Celebrity Management', 'Content Creation'],
      experience: '3+ years',
      teamSize: '10-15',
      pricing: '₹1-5L per campaign',
      portfolio: 'Available',
      lastProject: '1 week ago',
      status: 'new'
    }
  ];

  const rfps = [
    {
      id: 1,
      title: 'Diwali Campaign Creative Development',
      category: 'creative',
      budget: '₹15-20L',
      deadline: '2024-10-20',
      location: 'Pan India',
      status: 'open',
      responses: 8,
      description: 'Looking for creative agency to develop Diwali campaign assets across digital and traditional media'
    },
    {
      id: 2,
      title: 'Product Launch Event - Mumbai',
      category: 'events',
      budget: '₹25-30L',
      deadline: '2024-11-15',
      location: 'Mumbai',
      status: 'evaluation',
      responses: 12,
      description: 'Premium product launch event for 500+ attendees at a 5-star venue'
    },
    {
      id: 3,
      title: 'Influencer Marketing Campaign',
      category: 'influencer',
      budget: '₹8-12L',
      deadline: '2024-10-25',
      location: 'Delhi, Mumbai',
      status: 'closed',
      responses: 15,
      description: 'Micro-influencer campaign targeting millennials in metro cities'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'open': return 'bg-green-100 text-green-800';
      case 'evaluation': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const categoryMatch = selectedCategory === 'all' || vendor.category === selectedCategory;
    const locationMatch = selectedLocation === 'all' || vendor.location.toLowerCase().includes(selectedLocation);
    return categoryMatch && locationMatch;
  });

  const tabs = [
    { id: 'directory', label: 'Vendor Directory', icon: <Globe className="w-4 h-4" /> },
    { id: 'rfp', label: 'RFP Management', icon: <FileText className="w-4 h-4" /> },
    { id: 'onboarding', label: 'Onboarding', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Verified Vendor Directory</h1>
        <p className="text-gray-600 mt-2">Trusted list of agencies across India for quick onboarding. Helps you scale fast without worrying about quality.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-2 lg:space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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

      {/* Vendor Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Vendor Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{vendor.location}</span>
                        {vendor.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(vendor.status)}`}>
                    {vendor.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-gray-500">({vendor.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{vendor.experience}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">{vendor.teamSize}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pricing:</span>
                    <span className="font-medium">{vendor.pricing}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded text-sm font-medium hover:shadow-lg transition-all duration-300">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RFP Management */}
      {activeTab === 'rfp' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">RFP Management</h2>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create RFP</span>
            </button>
          </div>

          <div className="grid gap-6">
            {rfps.map((rfp) => (
              <div key={rfp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{rfp.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(rfp.status)}`}>
                        {rfp.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Category:</span> {categories.find(c => c.id === rfp.category)?.name}
                      </div>
                      <div>
                        <span className="font-medium">Budget:</span> {rfp.budget}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span> {rfp.deadline}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {rfp.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{rfp.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{rfp.responses} responses</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Onboarding */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vendor Onboarding Workflows</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline the process of bringing new vendors into your ecosystem with automated workflows, 
              document collection, and compliance verification.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Document Collection</h3>
                <p className="text-sm text-gray-600">Automated collection of legal documents, certifications, and portfolio samples</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <Shield className="w-8 h-8 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">NDA Auto-Share</h3>
                <p className="text-sm text-gray-600">Automatic NDA generation and sharing with digital signature capabilities</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Verification Process</h3>
                <p className="text-sm text-gray-600">Multi-step verification including background checks and reference validation</p>
              </div>
            </div>
            
            <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Start Onboarding Process
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorEcosystem;