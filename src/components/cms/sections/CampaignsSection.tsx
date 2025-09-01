import React, { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Play,
  Pause,
  BarChart3,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Campaign } from "../../../types";

const CampaignsSection: React.FC = () => {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Diwali Festival Campaign",
      type: "Social Media",
      status: "active",
      budget: 500000,
      spent: 320000,
      startDate: "2024-10-15",
      endDate: "2024-11-05",
      metrics: {
        impressions: 125000,
        clicks: 3200,
        conversions: 89,
        ctr: 2.56,
        cpc: 100,
      },
    },
    {
      id: "2",
      name: "Brand Awareness Drive",
      type: "Google Ads",
      status: "active",
      budget: 750000,
      spent: 450000,
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      metrics: {
        impressions: 89000,
        clicks: 2100,
        conversions: 156,
        ctr: 2.36,
        cpc: 214.3,
      },
    },
    {
      id: "3",
      name: "Product Launch Teaser",
      type: "Influencer",
      status: "completed",
      budget: 250000,
      spent: 250000,
      startDate: "2024-09-15",
      endDate: "2024-09-30",
      metrics: {
        impressions: 45000,
        clicks: 890,
        conversions: 34,
        ctr: 1.98,
        cpc: 280.9,
      },
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />;
      case "paused":
        return <Pause className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Campaigns
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage and track your marketing campaigns
          </p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredCampaigns.length} campaigns found
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {campaign.name}
                </h3>
                <p className="text-sm text-gray-600">{campaign.type}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {getStatusIcon(campaign.status)}
                  <span className="capitalize">{campaign.status}</span>
                </span>
              </div>
            </div>

            {/* Budget Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Budget Usage
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  ₹{campaign.spent.toLocaleString()} / ₹
                  {campaign.budget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (campaign.spent / campaign.budget) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Impressions</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.metrics.impressions.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Clicks</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.metrics.clicks.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CTR</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.metrics.ctr}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Conversions</p>
                <p className="text-sm font-semibold text-gray-900">
                  {campaign.metrics.conversions}
                </p>
              </div>
            </div>

            {/* Campaign Duration */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Campaign Period</p>
              <p className="text-sm text-gray-900">
                {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                {new Date(campaign.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No campaigns found
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first campaign to start tracking performance"}
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignsSection;



















// import React, { useState } from 'react';
// import { Plus, Filter, Search, Play, Pause, BarChart3, Edit, Trash2, Eye } from 'lucide-react';
// import { Campaign } from '../../../types';

// const CampaignsSection: React.FC = () => {
//   const [campaigns] = useState<Campaign[]>([
//     {
//       id: '1',
//       name: 'Diwali Festival Campaign',
//       type: 'Social Media',
//       status: 'active',
//       budget: 500000,
//       spent: 320000,
//       startDate: '2024-10-15',
//       endDate: '2024-11-05',
//       metrics: {
//         impressions: 125000,
//         clicks: 3200,
//         conversions: 89,
//         ctr: 2.56,
//         cpc: 100
//       }
//     },
//     {
//       id: '2',
//       name: 'Brand Awareness Drive',
//       type: 'Google Ads',
//       status: 'active',
//       budget: 750000,
//       spent: 450000,
//       startDate: '2024-10-01',
//       endDate: '2024-12-31',
//       metrics: {
//         impressions: 89000,
//         clicks: 2100,
//         conversions: 156,
//         ctr: 2.36,
//         cpc: 214.3
//       }
//     },
//     {
//       id: '3',
//       name: 'Product Launch Teaser',
//       type: 'Influencer',
//       status: 'completed',
//       budget: 250000,
//       spent: 250000,
//       startDate: '2024-09-15',
//       endDate: '2024-09-30',
//       metrics: {
//         impressions: 45000,
//         clicks: 890,
//         conversions: 34,
//         ctr: 1.98,
//         cpc: 280.9
//       }
//     }
//   ]);

//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCampaigns = campaigns.filter(campaign => {
//     const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
//     const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'paused':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       case 'draft':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'active':
//         return <Play className="w-3 h-3" />;
//       case 'paused':
//         return <Pause className="w-3 h-3" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Campaigns</h2>
//           <p className="text-gray-600 mt-1">Manage and track your marketing campaigns</p>
//         </div>
//         <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//           <Plus className="w-4 h-4" />
//           <span>New Campaign</span>
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between space-x-4">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search campaigns..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//               />
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <Filter className="w-4 h-4 text-gray-400" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="paused">Paused</option>
//                 <option value="completed">Completed</option>
//                 <option value="draft">Draft</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="text-sm text-gray-600">
//             {filteredCampaigns.length} campaigns found
//           </div>
//         </div>
//       </div>

//       {/* Campaigns Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredCampaigns.map((campaign) => (
//           <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
//                 <p className="text-sm text-gray-600">{campaign.type}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
//                   {getStatusIcon(campaign.status)}
//                   <span className="capitalize">{campaign.status}</span>
//                 </span>
//               </div>
//             </div>

//             {/* Budget Progress */}
//             <div className="mb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-700">Budget Usage</span>
//                 <span className="text-sm text-gray-600">
//                   ₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
//                 />
//               </div>
//             </div>

//             {/* Metrics */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <p className="text-xs text-gray-500">Impressions</p>
//                 <p className="text-sm font-semibold text-gray-900">{campaign.metrics.impressions.toLocaleString()}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Clicks</p>
//                 <p className="text-sm font-semibold text-gray-900">{campaign.metrics.clicks.toLocaleString()}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">CTR</p>
//                 <p className="text-sm font-semibold text-gray-900">{campaign.metrics.ctr}%</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Conversions</p>
//                 <p className="text-sm font-semibold text-gray-900">{campaign.metrics.conversions}</p>
//               </div>
//             </div>

//             {/* Campaign Duration */}
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-xs text-gray-500 mb-1">Campaign Period</p>
//               <p className="text-sm text-gray-900">
//                 {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//               <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                 <BarChart3 className="w-4 h-4" />
//                 <span className="text-sm">Analytics</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredCampaigns.length === 0 && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <BarChart3 className="w-8 h-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
//           <p className="text-gray-600 mb-6">
//             {searchTerm || filterStatus !== 'all' 
//               ? 'Try adjusting your search or filters' 
//               : 'Create your first campaign to start tracking performance'
//             }
//           </p>
//           <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Create Campaign
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CampaignsSection;