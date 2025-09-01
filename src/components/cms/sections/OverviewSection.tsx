
import React from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const OverviewSection: React.FC = () => {
  // Get user's budget data from localStorage
  const savedBudget = localStorage.getItem("mibbs_budget");
  const budgetData = savedBudget ? JSON.parse(savedBudget) : null;

  // Calculate actual values or show zeros for new users
  const totalBudget = budgetData?.budget?.total || 0;
  const activeCampaigns = budgetData ? 8 : 0;
  const partnerAgencies = budgetData ? 3 : 0;
  const brandScore = budgetData ? 72 : 0;

  const stats = [
    {
      label: "Total Budget",
      value:
        totalBudget > 0
          ? `₹${totalBudget.toLocaleString("en-IN")}`
          : "₹0",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Campaigns",
      value: activeCampaigns.toString(),
      change: "+2",
      trend: "up",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Partner Agencies",
      value: partnerAgencies.toString(),
      change: "+1",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Brand Health Score",
      value: brandScore > 0 ? `${brandScore}/100` : "0/100",
      change: "+5",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "campaign",
      title: "Meta Ads Campaign launched",
      description: "Diwali Festival Campaign went live",
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "agency",
      title: "New proposal received",
      description: "Creative Minds Studio sent branding proposal",
      time: "4 hours ago",
      status: "pending",
      icon: Clock,
    },
    {
      id: 3,
      type: "budget",
      title: "Budget alert",
      description: "Digital marketing budget 80% utilized",
      time: "1 day ago",
      status: "warning",
      icon: AlertCircle,
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Review Instagram content calendar",
      dueDate: "Today",
      priority: "high",
      agency: "Social Media Pro",
    },
    {
      id: 2,
      title: "Approve logo variations",
      dueDate: "Tomorrow",
      priority: "medium",
      agency: "Design Studio",
    },
    {
      id: 3,
      title: "Festival campaign planning meeting",
      dueDate: "Oct 25",
      priority: "high",
      agency: "Creative Minds",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Your brand&apos;s performance at a glance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
            New Campaign
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span
                  className={`text-xs md:text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Recent Activities
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={`p-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100"
                        : activity.status === "warning"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600"
                          : activity.status === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Upcoming Tasks
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.agency}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {task.dueDate}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Schedule Campaign</h4>
            <p className="text-sm text-gray-600">
              Plan your next marketing campaign
            </p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Find Agencies</h4>
            <p className="text-sm text-gray-600">
              Connect with new partner agencies
            </p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center">
            <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600">
              Check your brand performance
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;














// import React from 'react';
// import { TrendingUp, Users, DollarSign, Target, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// const OverviewSection: React.FC = () => {
//   // Get user's budget data from localStorage
//   const savedBudget = localStorage.getItem('mibbs_budget');
//   const budgetData = savedBudget ? JSON.parse(savedBudget) : null;
  
//   // Calculate actual values or show zeros for new users
//   const totalBudget = budgetData?.budget?.total || 0;
//   const activeCampaigns = budgetData ? 8 : 0;
//   const partnerAgencies = budgetData ? 3 : 0;
//   const brandScore = budgetData ? 72 : 0;

//   const stats = [
//     {
//       label: 'Total Budget',
//       value: totalBudget > 0 ? `₹${totalBudget.toLocaleString('en-IN')}` : '₹0',
//       change: '+12%',
//       trend: 'up',
//       icon: DollarSign,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       label: 'Active Campaigns',
//       value: activeCampaigns.toString(),
//       change: '+2',
//       trend: 'up',
//       icon: Target,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       label: 'Partner Agencies',
//       value: partnerAgencies.toString(),
//       change: '+1',
//       trend: 'up',
//       icon: Users,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     },
//     {
//       label: 'Brand Health Score',
//       value: brandScore > 0 ? `${brandScore}/100` : '0/100',
//       change: '+5',
//       trend: 'up',
//       icon: TrendingUp,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50'
//     }
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       type: 'campaign',
//       title: 'Meta Ads Campaign launched',
//       description: 'Diwali Festival Campaign went live',
//       time: '2 hours ago',
//       status: 'success',
//       icon: CheckCircle
//     },
//     {
//       id: 2,
//       type: 'agency',
//       title: 'New proposal received',
//       description: 'Creative Minds Studio sent branding proposal',
//       time: '4 hours ago',
//       status: 'pending',
//       icon: Clock
//     },
//     {
//       id: 3,
//       type: 'budget',
//       title: 'Budget alert',
//       description: 'Digital marketing budget 80% utilized',
//       time: '1 day ago',
//       status: 'warning',
//       icon: AlertCircle
//     }
//   ];

//   const upcomingTasks = [
//     {
//       id: 1,
//       title: 'Review Instagram content calendar',
//       dueDate: 'Today',
//       priority: 'high',
//       agency: 'Social Media Pro'
//     },
//     {
//       id: 2,
//       title: 'Approve logo variations',
//       dueDate: 'Tomorrow',
//       priority: 'medium',
//       agency: 'Design Studio'
//     },
//     {
//       id: 3,
//       title: 'Festival campaign planning meeting',
//       dueDate: 'Oct 25',
//       priority: 'high',
//       agency: 'Creative Minds'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
//           <p className="text-gray-600 mt-1">Your brand's performance at a glance</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             New Campaign
//           </button>
//           <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-2 rounded-lg ${stat.bgColor}`}>
//                   <Icon className={`w-6 h-6 ${stat.color}`} />
//                 </div>
//                 <span className={`text-sm font-medium ${
//                   stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {stat.change}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activities */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
//           </div>
//           <div className="space-y-4">
//             {recentActivities.map((activity) => {
//               const Icon = activity.icon;
//               return (
//                 <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                   <div className={`p-2 rounded-full ${
//                     activity.status === 'success' ? 'bg-green-100' :
//                     activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
//                   }`}>
//                     <Icon className={`w-4 h-4 ${
//                       activity.status === 'success' ? 'text-green-600' :
//                       activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
//                     }`} />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-medium text-gray-900">{activity.title}</h4>
//                     <p className="text-sm text-gray-600">{activity.description}</p>
//                     <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Upcoming Tasks */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700">View Calendar</button>
//           </div>
//           <div className="space-y-4">
//             {upcomingTasks.map((task) => (
//               <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900">{task.title}</h4>
//                   <p className="text-sm text-gray-600">{task.agency}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">{task.dueDate}</p>
//                   <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                     task.priority === 'high' ? 'bg-red-100 text-red-800' :
//                     task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-green-100 text-green-800'
//                   }`}>
//                     {task.priority}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
//             <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//             <h4 className="font-medium text-gray-900">Schedule Campaign</h4>
//             <p className="text-sm text-gray-600">Plan your next marketing campaign</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center">
//             <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//             <h4 className="font-medium text-gray-900">Find Agencies</h4>
//             <p className="text-sm text-gray-600">Connect with new partner agencies</p>
//           </button>
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center">
//             <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//             <h4 className="font-medium text-gray-900">View Analytics</h4>
//             <p className="text-sm text-gray-600">Check your brand performance</p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewSection;