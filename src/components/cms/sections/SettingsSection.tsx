import React, { useState } from 'react';
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const SettingsSection: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: user?.businessName || '',
    website: '',
    industry: 'Technology',
    location: 'Mumbai, Maharashtra',
    bio: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    campaignUpdates: true,
    budgetAlerts: true,
    agencyMessages: true,
    weeklyReports: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      businessName: profileData.businessName,
    });
    // Show success message
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) =>
                      handleProfileUpdate('firstName', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) =>
                      handleProfileUpdate('lastName', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      handleProfileUpdate('email', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      handleProfileUpdate('phone', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={profileData.businessName}
                    onChange={(e) =>
                      handleProfileUpdate('businessName', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) =>
                      handleProfileUpdate('website', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={profileData.industry}
                    onChange={(e) =>
                      handleProfileUpdate('industry', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      handleProfileUpdate('location', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' &&
                          'Receive notifications via email'}
                        {key === 'smsNotifications' &&
                          'Receive notifications via SMS'}
                        {key === 'campaignUpdates' &&
                          'Get updates about your campaigns'}
                        {key === 'budgetAlerts' &&
                          'Alerts when budget thresholds are reached'}
                        {key === 'agencyMessages' &&
                          'Messages from partner agencies'}
                        {key === 'weeklyReports' &&
                          'Weekly performance reports'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Change Password
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Two-Factor Authentication
                  </h4>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Billing Information
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Current Plan: Free
                    </h4>
                    <p className="text-sm text-blue-700">
                      Upgrade to unlock premium features
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>

              <div className="space-y-4 overflow-x-auto">
                <h4 className="font-medium text-gray-900">Payment History</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td
                          className="py-3 px-4 text-gray-600 text-center"
                          colSpan={4}
                        >
                          No payment history available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connected Integrations
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Google Analytics', status: 'connected', icon: '📊' },
                  { name: 'Facebook Ads', status: 'disconnected', icon: '📘' },
                  { name: 'Instagram Business', status: 'connected', icon: '📷' },
                  { name: 'WhatsApp Business', status: 'disconnected', icon: '💬' },
                ].map((integration, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {integration.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {integration.status === 'connected'
                            ? 'Connected and syncing'
                            : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        integration.status === 'connected'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {integration.status === 'connected'
                        ? 'Disconnect'
                        : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Settings
          </h2>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            {renderTabContent()}

            {/* Save Button */}
            {(activeTab === 'profile' || activeTab === 'business') && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;












// import React, { useState } from 'react';
// import { User, Building2, Bell, Shield, CreditCard, Globe, Save, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../../../contexts/AuthContext';

// const SettingsSection: React.FC = () => {
//   const { user, updateUser } = useAuth();
//   const [activeTab, setActiveTab] = useState('profile');
//   const [showPassword, setShowPassword] = useState(false);
  
//   const [profileData, setProfileData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     businessName: user?.businessName || '',
//     website: '',
//     industry: 'Technology',
//     location: 'Mumbai, Maharashtra',
//     bio: ''
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     campaignUpdates: true,
//     budgetAlerts: true,
//     agencyMessages: true,
//     weeklyReports: true
//   });

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'business', label: 'Business', icon: Building2 },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'billing', label: 'Billing', icon: CreditCard },
//     { id: 'integrations', label: 'Integrations', icon: Globe }
//   ];

//   const handleProfileUpdate = (field: string, value: string) => {
//     setProfileData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleNotificationToggle = (setting: string) => {
//     setNotificationSettings(prev => ({
//       ...prev,
//       [setting]: !prev[setting as keyof typeof prev]
//     }));
//   };

//   const handleSave = () => {
//     updateUser({
//       firstName: profileData.firstName,
//       lastName: profileData.lastName,
//       email: profileData.email,
//       phone: profileData.phone,
//       businessName: profileData.businessName
//     });
//     // Show success message
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
//                   <input
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
//                   <input
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     value={profileData.email}
//                     onChange={(e) => handleProfileUpdate('email', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                   <input
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) => handleProfileUpdate('phone', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//               <textarea
//                 value={profileData.bio}
//                 onChange={(e) => handleProfileUpdate('bio', e.target.value)}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Tell us about yourself..."
//               />
//             </div>
//           </div>
//         );

//       case 'business':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
//                   <input
//                     type="text"
//                     value={profileData.businessName}
//                     onChange={(e) => handleProfileUpdate('businessName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
//                   <input
//                     type="url"
//                     value={profileData.website}
//                     onChange={(e) => handleProfileUpdate('website', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="https://yourwebsite.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
//                   <select
//                     value={profileData.industry}
//                     onChange={(e) => handleProfileUpdate('industry', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option>Technology</option>
//                     <option>Healthcare</option>
//                     <option>Finance</option>
//                     <option>Retail</option>
//                     <option>Manufacturing</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                   <input
//                     type="text"
//                     value={profileData.location}
//                     onChange={(e) => handleProfileUpdate('location', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'notifications':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
//               <div className="space-y-4">
//                 {Object.entries(notificationSettings).map(([key, value]) => (
//                   <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <h4 className="font-medium text-gray-900 capitalize">
//                         {key.replace(/([A-Z])/g, ' $1').trim()}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         {key === 'emailNotifications' && 'Receive notifications via email'}
//                         {key === 'smsNotifications' && 'Receive notifications via SMS'}
//                         {key === 'campaignUpdates' && 'Get updates about your campaigns'}
//                         {key === 'budgetAlerts' && 'Alerts when budget thresholds are reached'}
//                         {key === 'agencyMessages' && 'Messages from partner agencies'}
//                         {key === 'weeklyReports' && 'Weekly performance reports'}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleNotificationToggle(key)}
//                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                         value ? 'bg-blue-600' : 'bg-gray-200'
//                       }`}
//                     >
//                       <span
//                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                           value ? 'translate-x-6' : 'translate-x-1'
//                         }`}
//                       />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'security':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
//                       <div className="relative">
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                         >
//                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
//                       <input
//                         type="password"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
//                       <input
//                         type="password"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="border-t pt-6">
//                   <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
//                   <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <p className="font-medium text-gray-900">Enable 2FA</p>
//                       <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
//                     </div>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                       Enable
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'billing':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-medium text-blue-900">Current Plan: Free</h4>
//                     <p className="text-sm text-blue-700">Upgrade to unlock premium features</p>
//                   </div>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                     Upgrade Now
//                   </button>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-900">Payment History</h4>
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
//                         <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
//                         <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
//                         <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-t border-gray-200">
//                         <td className="py-3 px-4 text-gray-600" colSpan={4}>
//                           No payment history available
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'integrations':
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h3>
//               <div className="space-y-4">
//                 {[
//                   { name: 'Google Analytics', status: 'connected', icon: '📊' },
//                   { name: 'Facebook Ads', status: 'disconnected', icon: '📘' },
//                   { name: 'Instagram Business', status: 'connected', icon: '📷' },
//                   { name: 'WhatsApp Business', status: 'disconnected', icon: '💬' }
//                 ].map((integration, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{integration.icon}</span>
//                       <div>
//                         <h4 className="font-medium text-gray-900">{integration.name}</h4>
//                         <p className="text-sm text-gray-600">
//                           {integration.status === 'connected' ? 'Connected and syncing' : 'Not connected'}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                         integration.status === 'connected'
//                           ? 'bg-red-100 text-red-700 hover:bg-red-200'
//                           : 'bg-blue-600 text-white hover:bg-blue-700'
//                       }`}
//                     >
//                       {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
//           <p className="text-gray-600 mt-1">Manage your account and preferences</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//             <nav className="space-y-2">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
//                       activeTab === tab.id
//                         ? 'bg-blue-50 text-blue-700'
//                         : 'text-gray-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     <Icon className="w-4 h-4" />
//                     <span className="font-medium">{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             {renderTabContent()}
            
//             {/* Save Button */}
//             {(activeTab === 'profile' || activeTab === 'business') && (
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={handleSave}
//                   className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Save className="w-4 h-4" />
//                   <span>Save Changes</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsSection;