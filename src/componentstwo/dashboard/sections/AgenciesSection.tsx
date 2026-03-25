import React, { useState } from 'react';
import {
  Plus,
  Search,
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';

const AgenciesSection: React.FC = () => {
  const [agencies] = useState([
    {
      id: '1',
      name: 'Creative Minds Studio',
      location: 'Mumbai, Maharashtra',
      distance: '5 km',
      rating: 4.8,
      reviews: 127,
      pricing: 'Starts ₹50,000/month',
      specialties: ['Design', 'Digital Marketing', 'Brand Strategy'],
      avgBudgetHandled: '₹2-5 lakhs',
      verified: true,
    },
    {
      id: '2',
      name: 'Digital Impact Agency',
      location: 'Mumbai, Maharashtra',
      distance: '8 km',
      rating: 4.6,
      reviews: 89,
      pricing: 'Starts ₹80,000/month',
      specialties: ['Performance Marketing', 'SEO', 'Analytics'],
      avgBudgetHandled: '₹5-10 lakhs',
      verified: true,
    },
    {
      id: '3',
      name: 'Brand Builders Co.',
      location: 'Mumbai, Maharashtra',
      distance: '12 km',
      rating: 4.9,
      reviews: 156,
      pricing: 'Starts ₹1,20,000/month',
      specialties: ['Full Service', 'Traditional Media', 'Events'],
      avgBudgetHandled: '₹10+ lakhs',
      verified: true,
    },
  ]);

  const handleRaiseRequest = (agencyId: string) => {
    console.log('Raising request for agency:', agencyId);
  };

  return (
    /* ===== FULL WIDTH WRAPPER ===== */
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full space-y-6">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Top Agencies Involved
            </h2>
            <p className="text-gray-600 mt-1">
              Agencies near you that handle budgets like yours
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit">
            <Plus className="w-4 h-4" />
            <span>Find More Agencies</span>
          </button>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search agencies by name, specialty, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ===== AGENCIES LIST ===== */}
        <div className="space-y-6 w-full">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="w-full bg-white rounded-xl shadow-sm border border-gray-200
                         p-6 hover:shadow-md transition-shadow"
            >
              {/* ===== TOP SECTION ===== */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {agency.name.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {agency.name}
                      </h3>
                      {agency.verified && (
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {agency.location} • {agency.distance} away
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{agency.rating}</span>
                      <span className="text-gray-500">
                        ({agency.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {agency.pricing}
                  </p>
                  <p className="text-xs text-gray-500">
                    Avg budget: {agency.avgBudgetHandled}
                  </p>
                </div>
              </div>

              {/* ===== SPECIALTIES ===== */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {agency.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-50 text-blue-700
                                 text-xs font-medium rounded-md"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===== ACTIONS ===== */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleRaiseRequest(agency.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600
                             text-white rounded-lg font-medium
                             hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Raise a Request</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100
                                   text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100
                                   text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100
                                   text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenciesSection;
