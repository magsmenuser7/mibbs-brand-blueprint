import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Star, Download, Share } from 'lucide-react';
import { indianFestivals } from '../data/indianLocations';

const FestivalCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(8); // August (0-indexed)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const festivals = [
    {
      name: 'Ganesh Chaturthi',
      date: 'Aug 19-29',
      daysLeft: 7,
      ideas: ['Eco-friendly Ganesh promotions', 'Sweet box packaging designs', 'Community celebration posts'],
      priority: 'high'
    },
    {
      name: 'Raksha Bandhan',
      date: 'Aug 30',
      daysLeft: 18,
      ideas: ['Sibling love campaigns', 'Gift bundle offers', 'Family-focused content'],
      priority: 'medium'
    },
    {
      name: 'Independence Day',
      date: 'Aug 15',
      daysLeft: 3,
      ideas: ['Patriotic brand colors', 'Freedom sale campaigns', 'National pride posts'],
      priority: 'urgent'
    }
  ];

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      if (direction === 'prev') {
        return prev === 0 ? 11 : prev - 1;
      } else {
        return prev === 11 ? 0 : prev + 1;
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Festival Marketing Calendar</h3>
          <p className="text-gray-600">Never miss a cultural moment for your brand</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleMonthChange('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-900 min-w-[120px] text-center">
            {monthNames[currentMonth]} 2024
          </span>
          <button 
            onClick={() => handleMonthChange('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Month Highlights */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">This Month's Opportunities</h4>
        <div className="space-y-4">
          {festivals.map((festival, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              festival.priority === 'urgent' ? 'border-red-500 bg-red-50' :
              festival.priority === 'high' ? 'border-orange-500 bg-orange-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{festival.name}</h5>
                  <p className="text-sm text-gray-600">{festival.date}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    festival.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    festival.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {festival.daysLeft} days left
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Campaign Ideas:</p>
                <div className="flex flex-wrap gap-2">
                  {festival.ideas.map((idea, ideaIndex) => (
                    <span key={ideaIndex} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md border">
                      {idea}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Star className="w-3 h-3" />
                  <span>View Templates</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors">
                  <Download className="w-3 h-3" />
                  <span>Download Kit</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors">
                  <Share className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Export Options */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-semibold text-gray-900 mb-1">Export to Your Channels</h5>
            <p className="text-sm text-gray-600">Push campaign ideas directly to your marketing tools</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
              WhatsApp
            </button>
            <button className="px-3 py-2 bg-pink-600 text-white rounded-md text-sm font-medium hover:bg-pink-700 transition-colors">
              Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCalendar;