import React, { useState } from 'react';
import { UserPlus, Users, Settings, Mail, Eye, Edit, Shield } from 'lucide-react';

const CoFounderZone: React.FC = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('View Only');

  const coFounders = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@business.com',
      role: 'Co-Founder',
      access: 'Admin',
      avatar: 'PS',
      joinedDate: '2 months ago'
    },
    {
      id: 2,
      name: 'Amit Kumar',
      email: 'amit@business.com',
      role: 'Business Manager',
      access: 'Edit',
      avatar: 'AK',
      joinedDate: '1 month ago'
    }
  ];

  const accessLevels = [
    { value: 'View Only', icon: Eye, description: 'Can view dashboard and reports' },
    { value: 'Edit', icon: Edit, description: 'Can make changes and approve decisions' },
    { value: 'Admin', icon: Shield, description: 'Full access including user management' }
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite logic here
    setShowInviteForm(false);
    setEmail('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Co-Founder Zone</h3>
          <p className="text-gray-600">Decisions work better when made together.</p>
        </div>
        <button 
          onClick={() => setShowInviteForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite</span>
        </button>
      </div>

      {showInviteForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Invite Team Member</h4>
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="colleague@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
              <div className="space-y-2">
                {accessLevels.map((level) => {
                  const Icon = level.icon;
                  return (
                    <label key={level.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="access"
                        value={level.value}
                        checked={accessLevel === level.value}
                        onChange={(e) => setAccessLevel(e.target.value)}
                        className="mt-0.5"
                      />
                      <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{level.value}</p>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send Invitation
              </button>
              <button 
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {coFounders.map((founder) => (
          <div key={founder.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{founder.avatar}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{founder.name}</h4>
                <p className="text-sm text-gray-600">{founder.email}</p>
                <p className="text-xs text-gray-500">{founder.role} • Joined {founder.joinedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                founder.access === 'Admin' ? 'bg-red-100 text-red-700' :
                founder.access === 'Edit' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {founder.access}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {coFounders.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No team members yet</p>
          <p className="text-sm text-gray-400">Invite your co-founders and team members to collaborate on brand decisions.</p>
        </div>
      )}
    </div>
  );
};

export default CoFounderZone;