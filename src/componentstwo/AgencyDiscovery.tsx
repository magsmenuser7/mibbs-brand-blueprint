import React, { useState } from 'react';
import { MapPin, Star, Filter, MessageCircle, FileText, Phone } from 'lucide-react';

const AgencyDiscovery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Design', 'Digital', 'Performance', 'Retail', 'ATL/BTL'];
  
  const agencies = [
    {
      id: 1,
      name: 'Creative Minds Studio',
      location: 'Mumbai, 400001',
      rating: 4.8,
      reviews: 127,
      pricing: 'Starts ₹50,000/month',
      experience: '15 brands in your category',
      languages: ['Hindi', 'English', 'Marathi'],
      specialties: ['Design', 'Digital']
    },
    {
      id: 2,
      name: 'Digital Impact Agency',
      location: 'Mumbai, 400012',
      rating: 4.6,
      reviews: 89,
      pricing: 'Starts ₹80,000/month',
      experience: '23 brands in your category',
      languages: ['English', 'Hindi'],
      specialties: ['Digital', 'Performance']
    },
    {
      id: 3,
      name: 'Brand Builders Co.',
      location: 'Mumbai, 400013',
      rating: 4.9,
      reviews: 156,
      pricing: 'Starts ₹1,20,000/month',
      experience: '31 brands in your category',
      languages: ['English', 'Hindi', 'Gujarati'],
      specialties: ['Design', 'Retail', 'ATL/BTL']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Connect with Agencies Near You</h3>
          <p className="text-gray-600">Find certified MIBBS partners in your city.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {agencies.map((agency) => (
          <div key={agency.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{agency.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{agency.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{agency.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-medium">{agency.rating}</span>
                      <span className="text-gray-500">({agency.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{agency.pricing}</p>
                <p className="text-xs text-gray-500">{agency.experience}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {agency.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Languages:</p>
              <p className="text-sm text-gray-700">{agency.languages.join(', ')}</p>
            </div>

            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <span>View Profile</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <FileText className="w-4 h-4" />
                <span>Request Proposal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyDiscovery;