import React from 'react';
import { TrendingUp, Users, Eye, MousePointer, Share2, Heart, BarChart3, PieChart } from 'lucide-react';

const AnalyticsSection: React.FC = () => {
  const metrics = [
    {
      label: 'Total Reach',
      value: '2.4M',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Engagement Rate',
      value: '8.7%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Click-through Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: MousePointer,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Share Rate',
      value: '1.9%',
      change: '-0.3%',
      trend: 'down',
      icon: Share2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const campaignPerformance = [
    { name: 'Diwali Campaign', reach: 850000, engagement: 9.2, conversions: 234, roi: 340 },
    { name: 'Brand Awareness', reach: 650000, engagement: 7.8, conversions: 189, roi: 280 },
    { name: 'Product Launch', reach: 420000, engagement: 12.1, conversions: 156, roi: 420 },
    { name: 'Festival Series', reach: 380000, engagement: 6.9, conversions: 98, roi: 190 }
  ];

  const audienceData = [
    { age: '18-24', percentage: 25, color: 'bg-blue-500' },
    { age: '25-34', percentage: 35, color: 'bg-green-500' },
    { age: '35-44', percentage: 22, color: 'bg-yellow-500' },
    { age: '45-54', percentage: 12, color: 'bg-purple-500' },
    { age: '55+', percentage: 6, color: 'bg-red-500' }
  ];

  const topContent = [
    {
      title: 'Diwali Special Offer Post',
      type: 'Image',
      reach: 125000,
      engagement: 15.2,
      shares: 890
    },
    {
      title: 'Behind the Scenes Video',
      type: 'Video',
      reach: 98000,
      engagement: 18.7,
      shares: 1200
    },
    {
      title: 'Customer Success Story',
      type: 'Article',
      reach: 76000,
      engagement: 12.4,
      shares: 450
    }
  ];

  return (
    <div className="space-y-6 bg-gray-50 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 py-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">
            Track your brand's performance across all channels
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Campaign Performance</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <span className="text-sm font-medium text-green-600">ROI: {campaign.roi}%</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Reach</p>
                    <p className="font-semibold text-gray-900">{campaign.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Engagement</p>
                    <p className="font-semibold text-gray-900">{campaign.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversions</p>
                    <p className="font-semibold text-gray-900">{campaign.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Audience Demographics</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {audienceData.map((segment, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-900">{segment.age}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${segment.color}`}
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-900 text-right">
                  {segment.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900">Top Performing Content</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 w-full sm:w-auto text-left sm:text-right">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Content</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Shares</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((content, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{content.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {content.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{content.reach.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{content.engagement}%</span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{content.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-900">Best Performing Day</h4>
            </div>
            <p className="text-sm text-green-700">
              Thursdays show 23% higher engagement rates. Consider scheduling important content on this day.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Audience Growth</h4>
            </div>
            <p className="text-sm text-blue-700">
              Your audience has grown by 15% this month, with highest growth in the 25-34 age group.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-900">Content Recommendation</h4>
            </div>
            <p className="text-sm text-purple-700">
              Video content performs 40% better than images. Consider increasing video production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;






// import React from 'react';
// import { TrendingUp, Users, Eye, MousePointer, Share2, Heart, BarChart3, PieChart } from 'lucide-react';

// const AnalyticsSection: React.FC = () => {
//   const metrics = [
//     {
//       label: 'Total Reach',
//       value: '2.4M',
//       change: '+15.3%',
//       trend: 'up',
//       icon: Eye,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       label: 'Engagement Rate',
//       value: '8.7%',
//       change: '+2.1%',
//       trend: 'up',
//       icon: Heart,
//       color: 'text-red-600',
//       bgColor: 'bg-red-50'
//     },
//     {
//       label: 'Click-through Rate',
//       value: '3.2%',
//       change: '+0.8%',
//       trend: 'up',
//       icon: MousePointer,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       label: 'Share Rate',
//       value: '1.9%',
//       change: '-0.3%',
//       trend: 'down',
//       icon: Share2,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     }
//   ];

//   const campaignPerformance = [
//     { name: 'Diwali Campaign', reach: 850000, engagement: 9.2, conversions: 234, roi: 340 },
//     { name: 'Brand Awareness', reach: 650000, engagement: 7.8, conversions: 189, roi: 280 },
//     { name: 'Product Launch', reach: 420000, engagement: 12.1, conversions: 156, roi: 420 },
//     { name: 'Festival Series', reach: 380000, engagement: 6.9, conversions: 98, roi: 190 }
//   ];

//   const audienceData = [
//     { age: '18-24', percentage: 25, color: 'bg-blue-500' },
//     { age: '25-34', percentage: 35, color: 'bg-green-500' },
//     { age: '35-44', percentage: 22, color: 'bg-yellow-500' },
//     { age: '45-54', percentage: 12, color: 'bg-purple-500' },
//     { age: '55+', percentage: 6, color: 'bg-red-500' }
//   ];

//   const topContent = [
//     {
//       title: 'Diwali Special Offer Post',
//       type: 'Image',
//       reach: 125000,
//       engagement: 15.2,
//       shares: 890
//     },
//     {
//       title: 'Behind the Scenes Video',
//       type: 'Video',
//       reach: 98000,
//       engagement: 18.7,
//       shares: 1200
//     },
//     {
//       title: 'Customer Success Story',
//       type: 'Article',
//       reach: 76000,
//       engagement: 12.4,
//       shares: 450
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
//           <p className="text-gray-600 mt-1">Track your brand's performance across all channels</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//             <option>Last 30 days</option>
//             <option>Last 7 days</option>
//             <option>Last 90 days</option>
//             <option>This year</option>
//           </select>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {metrics.map((metric, index) => {
//           const Icon = metric.icon;
//           return (
//             <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-2 rounded-lg ${metric.bgColor}`}>
//                   <Icon className={`w-6 h-6 ${metric.color}`} />
//                 </div>
//                 <span className={`text-sm font-medium ${
//                   metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {metric.change}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
//                 <p className="text-sm text-gray-600">{metric.label}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Campaign Performance */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
//             <BarChart3 className="w-5 h-5 text-gray-400" />
//           </div>
//           <div className="space-y-4">
//             {campaignPerformance.map((campaign, index) => (
//               <div key={index} className="p-4 border border-gray-200 rounded-lg">
//                 <div className="flex items-center justify-between mb-3">
//                   <h4 className="font-medium text-gray-900">{campaign.name}</h4>
//                   <span className="text-sm font-medium text-green-600">ROI: {campaign.roi}%</span>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-500">Reach</p>
//                     <p className="font-semibold text-gray-900">{campaign.reach.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Engagement</p>
//                     <p className="font-semibold text-gray-900">{campaign.engagement}%</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500">Conversions</p>
//                     <p className="font-semibold text-gray-900">{campaign.conversions}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Audience Demographics */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Audience Demographics</h3>
//             <PieChart className="w-5 h-5 text-gray-400" />
//           </div>
//           <div className="space-y-4">
//             {audienceData.map((segment, index) => (
//               <div key={index} className="flex items-center space-x-4">
//                 <div className="w-16 text-sm font-medium text-gray-900">{segment.age}</div>
//                 <div className="flex-1">
//                   <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div 
//                       className={`h-3 rounded-full ${segment.color}`}
//                       style={{ width: `${segment.percentage}%` }}
//                     />
//                   </div>
//                 </div>
//                 <div className="w-12 text-sm font-medium text-gray-900 text-right">
//                   {segment.percentage}%
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Top Performing Content */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
//           <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 font-medium text-gray-900">Content</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-900">Shares</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topContent.map((content, index) => (
//                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4">
//                     <div className="font-medium text-gray-900">{content.title}</div>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                       {content.type}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-gray-900">{content.reach.toLocaleString()}</td>
//                   <td className="py-3 px-4">
//                     <span className="text-green-600 font-medium">{content.engagement}%</span>
//                   </td>
//                   <td className="py-3 px-4 text-gray-900">{content.shares}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Performance Insights */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-4 bg-green-50 rounded-lg">
//             <div className="flex items-center space-x-2 mb-2">
//               <TrendingUp className="w-5 h-5 text-green-600" />
//               <h4 className="font-medium text-green-900">Best Performing Day</h4>
//             </div>
//             <p className="text-sm text-green-700">
//               Thursdays show 23% higher engagement rates. Consider scheduling important content on this day.
//             </p>
//           </div>
          
//           <div className="p-4 bg-blue-50 rounded-lg">
//             <div className="flex items-center space-x-2 mb-2">
//               <Users className="w-5 h-5 text-blue-600" />
//               <h4 className="font-medium text-blue-900">Audience Growth</h4>
//             </div>
//             <p className="text-sm text-blue-700">
//               Your audience has grown by 15% this month, with highest growth in the 25-34 age group.
//             </p>
//           </div>
          
//           <div className="p-4 bg-purple-50 rounded-lg">
//             <div className="flex items-center space-x-2 mb-2">
//               <BarChart3 className="w-5 h-5 text-purple-600" />
//               <h4 className="font-medium text-purple-900">Content Recommendation</h4>
//             </div>
//             <p className="text-sm text-purple-700">
//               Video content performs 40% better than images. Consider increasing video production.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsSection;