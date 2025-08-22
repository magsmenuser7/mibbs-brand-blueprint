import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  Edit, 
  Eye, 
  EyeOff, 
  Star,
  DollarSign,
  Users,
  TrendingUp,
  Save,
  X
} from 'lucide-react';

const Services: React.FC = () => {
  const [editingService, setEditingService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      name: 'Digital Marketing Strategy',
      category: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategy including SEO, SEM, and social media planning.',
      priceRange: '₹25,000 - ₹1,00,000',
      minPrice: 25000,
      maxPrice: 100000,
      duration: '2-4 weeks',
      active: true,
      featured: true,
      industries: ['Technology', 'E-commerce', 'Healthcare'],
      deliverables: ['Strategy Document', 'Campaign Calendar', 'KPI Framework'],
      leads: 12,
      conversions: 4
    },
    {
      id: 2,
      name: 'Website Development',
      category: 'Web Development',
      description: 'Custom website development with responsive design and modern technologies.',
      priceRange: '₹50,000 - ₹5,00,000',
      minPrice: 50000,
      maxPrice: 500000,
      duration: '4-12 weeks',
      active: true,
      featured: false,
      industries: ['All Industries'],
      deliverables: ['Responsive Website', 'CMS Integration', 'SEO Optimization'],
      leads: 18,
      conversions: 7
    },
    {
      id: 3,
      name: 'Brand Identity Design',
      category: 'Design',
      description: 'Complete brand identity including logo, color palette, typography, and brand guidelines.',
      priceRange: '₹15,000 - ₹75,000',
      minPrice: 15000,
      maxPrice: 75000,
      duration: '2-6 weeks',
      active: true,
      featured: true,
      industries: ['Fashion', 'Food & Beverage', 'Technology'],
      deliverables: ['Logo Design', 'Brand Guidelines', 'Stationery Design'],
      leads: 8,
      conversions: 3
    },
    {
      id: 4,
      name: 'Social Media Management',
      category: 'Social Media',
      description: 'End-to-end social media management including content creation and community management.',
      priceRange: '₹20,000 - ₹80,000',
      minPrice: 20000,
      maxPrice: 80000,
      duration: 'Ongoing',
      active: false,
      featured: false,
      industries: ['Fashion', 'Food & Beverage', 'Lifestyle'],
      deliverables: ['Content Calendar', 'Daily Posts', 'Monthly Reports'],
      leads: 5,
      conversions: 1
    }
  ];

  const categories = [
    'Digital Marketing',
    'Web Development',
    'Design',
    'Social Media',
    'Content Marketing',
    'SEO',
    'PPC Advertising',
    'Video Production'
  ];

  const industries = [
    'Technology',
    'E-commerce',
    'Healthcare',
    'Fashion',
    'Food & Beverage',
    'Education',
    'Real Estate',
    'Finance',
    'Lifestyle',
    'All Industries'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Configure and manage your service offerings and pricing.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Import Services
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      {/* Service Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-green-600">{services.filter(s => s.active).length}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{services.reduce((sum, s) => sum + s.leads, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((services.reduce((sum, s) => sum + s.conversions, 0) / services.reduce((sum, s) => sum + s.leads, 0)) * 100)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    {service.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    {service.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                    <span className="font-semibold text-gray-900">{service.priceRange}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.industries.slice(0, 2).map((industry, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {industry}
                      </span>
                    ))}
                    {service.industries.length > 2 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{service.industries.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Performance</h4>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{service.leads} leads</span>
                    <span className="text-sm text-green-600">{service.conversions} conversions</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Deliverables</h4>
                  <p className="text-sm text-gray-600">{service.deliverables.length} items</p>
                </div>
              </div>

              {editingService === service.id && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Name
                      </label>
                      <input
                        type="text"
                        defaultValue={service.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        defaultValue={service.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={service.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Price (₹)
                      </label>
                      <input
                        type="number"
                        defaultValue={service.minPrice}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Price (₹)
                      </label>
                      <input
                        type="number"
                        defaultValue={service.maxPrice}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setEditingService(null)}
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;