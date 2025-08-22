import React, { useState } from 'react';
import { Plus, Search, Star, MapPin, MessageCircle, Phone, Mail, Filter, Users } from 'lucide-react';
import { Agency } from '../../../types';

const AgenciesSection: React.FC = () => {
  const [agencies] = useState<Agency[]>([
    {
      id: '1',
      name: 'Creative Minds Studio',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      reviews: 127,
      pricing: 'Starts ₹50,000/month',
      experience: '15 brands in your category',
      languages: ['Hindi', 'English', 'Marathi'],
      specialties: ['Design', 'Digital Marketing', 'Brand Strategy'],
      portfolio: ['Brand A', 'Brand B', 'Brand C'],
      verified: true
    },
    {
      id: '2',
      name: 'Digital Impact Agency',
      location: 'Bangalore, Karnataka',
      rating: 4.6,
      reviews: 89,
      pricing: 'Starts ₹80,000/month',
      experience: '23 brands in your category',
      languages: ['English', 'Hindi', 'Kannada'],
      specialties: ['Digital Marketing', 'Performance Marketing', 'SEO'],
      portfolio: ['Brand D', 'Brand E'],
      verified: true
    },
    {
      id: '3',
      name: 'Brand Builders Co.',
      location: 'Delhi, NCR',
      rating: 4.9,
      reviews: 156,
      pricing: 'Starts ₹1,20,000/month',
      experience: '31 brands in your category',
      languages: ['English', 'Hindi', 'Punjabi'],
      specialties: ['Brand Strategy', 'Traditional Marketing', 'Events'],
      portfolio: ['Brand F', 'Brand G', 'Brand H', 'Brand I'],
      verified: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['all', 'Design', 'Digital Marketing', 'Brand Strategy', 'Performance Marketing', 'SEO', 'Traditional Marketing', 'Events'];

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || agency.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Partner Agencies</h2>
          <p className="text-gray-600 mt-1">Manage relationships with your marketing partners</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Find New Agency</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredAgencies.length} agencies found
          </div>
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAgencies.map((agency) => (
          <div key={agency.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{agency.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{agency.name}</h3>
                    {agency.verified && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
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
            </div>

            {/* Pricing and Experience */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{agency.pricing}</p>
                  <p className="text-xs text-gray-600">{agency.experience}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Portfolio</p>
                  <p className="text-sm font-medium text-gray-900">{agency.portfolio.length} brands</p>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {agency.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Languages</p>
              <p className="text-sm text-gray-700">{agency.languages.join(', ')}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Users className="w-4 h-4" />
                <span>View Profile</span>
              </button>
              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgencies.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No agencies found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedSpecialty !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Start by finding agencies that match your needs'
            }
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Find Agencies
          </button>
        </div>
      )}
    </div>
  );
};

export default AgenciesSection;