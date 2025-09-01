import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Upload, Download, PieChart } from 'lucide-react';

const BudgetSection: React.FC = () => {
  const savedBudget = localStorage.getItem('mibbs_budget');
  const userBudgetData = savedBudget ? JSON.parse(savedBudget) : null;

  const budgetData = {
    total: userBudgetData?.budget?.total || 0,
    spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.64) : 0,
    remaining: userBudgetData ? Math.round(userBudgetData.budget.total * 0.36) : 0,
    categories: [
      { name: 'Digital Marketing', allocated: userBudgetData?.budget?.digital || 0, spent: userBudgetData ? Math.round(userBudgetData.budget.digital * 0.7) : 0, color: 'bg-blue-500' },
      { name: 'Design & Creative', allocated: userBudgetData?.budget?.design || 0, spent: userBudgetData ? Math.round(userBudgetData.budget.design * 0.72) : 0, color: 'bg-green-500' },
      { name: 'Traditional Media', allocated: userBudgetData?.budget?.traditional || 0, spent: userBudgetData ? Math.round(userBudgetData.budget.traditional * 0.6) : 0, color: 'bg-purple-500' },
      { name: 'Events & Activations', allocated: userBudgetData?.budget?.events || 0, spent: userBudgetData ? Math.round(userBudgetData.budget.events * 0.4) : 0, color: 'bg-orange-500' }
    ],
    monthlyTrend: [
      { month: 'Jan', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.09) : 0 },
      { month: 'Feb', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.11) : 0 },
      { month: 'Mar', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.124) : 0 },
      { month: 'Apr', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.096) : 0 },
      { month: 'May', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.14) : 0 },
      { month: 'Jun', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.16) : 0 },
      { month: 'Jul', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.064) : 0 }
    ]
  };

  const recentTransactions = [
    { id: 1, description: 'Meta Ads Campaign - Diwali', agency: 'Digital Impact Agency', amount: userBudgetData ? 35000 : 0, date: '2024-10-20', category: 'Digital Marketing', status: 'completed' },
    { id: 2, description: 'Logo Design & Brand Guidelines', agency: 'Creative Minds Studio', amount: userBudgetData ? 25000 : 0, date: '2024-10-18', category: 'Design & Creative', status: 'completed' },
    { id: 3, description: 'Influencer Collaboration', agency: 'Brand Builders Co.', amount: userBudgetData ? 18000 : 0, date: '2024-10-15', category: 'Digital Marketing', status: 'pending' }
  ];

  const spentPercentage = budgetData.total > 0 ? (budgetData.spent / budgetData.total) * 100 : 0;

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Budget & ROI</h2>
          <p className="text-gray-600 mt-1">Track your marketing spend and return on investment</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
            <Upload className="w-4 h-4" />
            <span>Upload Invoice</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Budget', value: `₹${budgetData.total.toLocaleString()}`, icon: <DollarSign className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Amount Spent', value: `₹${budgetData.spent.toLocaleString()}`, icon: <TrendingDown className="w-6 h-6 text-red-600" />, bg: 'bg-red-50' },
          { label: 'Remaining', value: `₹${budgetData.remaining.toLocaleString()}`, icon: <TrendingUp className="w-6 h-6 text-green-600" />, bg: 'bg-green-50' },
          { label: 'Usage', value: `${spentPercentage.toFixed(1)}%`, icon: <PieChart className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50' }
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2 ${card.bg} rounded-lg`}>{card.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Budget Utilization</h3>
          <span className="text-sm text-gray-600">{spentPercentage.toFixed(1)}% of total budget used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300" style={{ width: `${spentPercentage}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget by Category</h3>
          <div className="space-y-4">
            {budgetData.categories.map((category, index) => {
              const categoryPercentage = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${category.color}`} />
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                      ₹{category.spent.toLocaleString('en-IN')} / ₹{category.allocated.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-300 ${category.color}`} style={{ width: `${Math.min(categoryPercentage, 100)}%` }} />
                  </div>
                  <div className="text-xs text-gray-500">{categoryPercentage.toFixed(1)}% utilized</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  <p className="text-sm text-gray-600">{transaction.agency}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                    <span className="text-gray-500">{transaction.date}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{transaction.category}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-3 sm:mt-0">
                  <p className="font-bold text-gray-900">₹{transaction.amount.toLocaleString('en-IN')}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Spending Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
        <div className="flex items-end space-x-4 h-64 overflow-x-auto">
          {budgetData.monthlyTrend.map((month, index) => {
            const maxSpend = Math.max(...budgetData.monthlyTrend.map(m => m.spent));
            const height = maxSpend > 0 ? (month.spent / maxSpend) * 200 : 0;
            return (
              <div key={index} className="flex-1 min-w-[60px] flex flex-col items-center">
                <div className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600" style={{ height: `${height}px` }} />
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-900">₹{month.spent.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">{month.month}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetSection;















// import React from 'react';
// import { DollarSign, TrendingUp, TrendingDown, Upload, Download, PieChart } from 'lucide-react';

// const BudgetSection: React.FC = () => {
//   // Get user's budget data from localStorage
//   const savedBudget = localStorage.getItem('mibbs_budget');
//   const userBudgetData = savedBudget ? JSON.parse(savedBudget) : null;
  
//   // Use user's actual budget or show zeros for new users
//   const budgetData = {
//     total: userBudgetData?.budget?.total || 0,
//     spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.64) : 0,
//     remaining: userBudgetData ? Math.round(userBudgetData.budget.total * 0.36) : 0,
//     categories: [
//       { 
//         name: 'Digital Marketing', 
//         allocated: userBudgetData?.budget?.digital || 0, 
//         spent: userBudgetData ? Math.round(userBudgetData.budget.digital * 0.7) : 0, 
//         color: 'bg-blue-500' 
//       },
//       { 
//         name: 'Design & Creative', 
//         allocated: userBudgetData?.budget?.design || 0, 
//         spent: userBudgetData ? Math.round(userBudgetData.budget.design * 0.72) : 0, 
//         color: 'bg-green-500' 
//       },
//       { 
//         name: 'Traditional Media', 
//         allocated: userBudgetData?.budget?.traditional || 0, 
//         spent: userBudgetData ? Math.round(userBudgetData.budget.traditional * 0.6) : 0, 
//         color: 'bg-purple-500' 
//       },
//       { 
//         name: 'Events & Activations', 
//         allocated: userBudgetData?.budget?.events || 0, 
//         spent: userBudgetData ? Math.round(userBudgetData.budget.events * 0.4) : 0, 
//         color: 'bg-orange-500' 
//       }
//     ],
//     monthlyTrend: [
//       { month: 'Jan', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.09) : 0 },
//       { month: 'Feb', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.11) : 0 },
//       { month: 'Mar', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.124) : 0 },
//       { month: 'Apr', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.096) : 0 },
//       { month: 'May', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.14) : 0 },
//       { month: 'Jun', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.16) : 0 },
//       { month: 'Jul', spent: userBudgetData ? Math.round(userBudgetData.budget.total * 0.064) : 0 }
//     ]
//   };

//   const recentTransactions = [
//     {
//       id: 1,
//       description: 'Meta Ads Campaign - Diwali',
//       agency: 'Digital Impact Agency',
//       amount: userBudgetData ? 35000 : 0,
//       date: '2024-10-20',
//       category: 'Digital Marketing',
//       status: 'completed'
//     },
//     {
//       id: 2,
//       description: 'Logo Design & Brand Guidelines',
//       agency: 'Creative Minds Studio',
//       amount: userBudgetData ? 25000 : 0,
//       date: '2024-10-18',
//       category: 'Design & Creative',
//       status: 'completed'
//     },
//     {
//       id: 3,
//       description: 'Influencer Collaboration',
//       agency: 'Brand Builders Co.',
//       amount: userBudgetData ? 18000 : 0,
//       date: '2024-10-15',
//       category: 'Digital Marketing',
//       status: 'pending'
//     }
//   ];

//   const spentPercentage = (budgetData.spent / budgetData.total) * 100;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Budget & ROI</h2>
//           <p className="text-gray-600 mt-1">Track your marketing spend and return on investment</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//             <Upload className="w-4 h-4" />
//             <span>Upload Invoice</span>
//           </button>
//           <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             <Download className="w-4 h-4" />
//             <span>Export Report</span>
//           </button>
//         </div>
//       </div>

//       {/* Budget Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <DollarSign className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Budget</p>
//               <p className="text-2xl font-bold text-gray-900">₹{budgetData.total.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-red-50 rounded-lg">
//               <TrendingDown className="w-6 h-6 text-red-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-600">Amount Spent</p>
//               <p className="text-2xl font-bold text-gray-900">₹{budgetData.spent.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-green-50 rounded-lg">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-600">Remaining</p>
//               <p className="text-2xl font-bold text-gray-900">₹{budgetData.remaining.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3 mb-4">
//             <div className="p-2 bg-purple-50 rounded-lg">
//               <PieChart className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-600">Usage</p>
//               <p className="text-2xl font-bold text-gray-900">{spentPercentage.toFixed(1)}%</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Budget Progress */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Budget Utilization</h3>
//           <span className="text-sm text-gray-600">{spentPercentage.toFixed(1)}% of total budget used</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
//           <div 
//             className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300"
//             style={{ width: `${spentPercentage}%` }}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Category Breakdown */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget by Category</h3>
//           <div className="space-y-4">
//             {budgetData.categories.map((category, index) => {
//               const categoryPercentage = (category.spent / category.allocated) * 100;
//               return (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-4 h-4 rounded-full ${category.color}`} />
//                       <span className="font-medium text-gray-900">{category.name}</span>
//                     </div>
//                     <span className="text-sm text-gray-600">
//                       ₹{category.spent.toLocaleString('en-IN')} / ₹{category.allocated.toLocaleString('en-IN')}
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className={`h-2 rounded-full transition-all duration-300 ${category.color}`}
//                       style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
//                     />
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {categoryPercentage.toFixed(1)}% utilized
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
//           </div>
//           <div className="space-y-4">
//             {recentTransactions.map((transaction) => (
//               <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900">{transaction.description}</h4>
//                   <p className="text-sm text-gray-600">{transaction.agency}</p>
//                   <div className="flex items-center space-x-4 mt-1">
//                     <span className="text-xs text-gray-500">{transaction.date}</span>
//                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
//                       {transaction.category}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-gray-900">₹{transaction.amount.toLocaleString('en-IN')}</p>
//                   <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                     transaction.status === 'completed' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {transaction.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Monthly Spending Trend */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
//         <div className="flex items-end space-x-4 h-64">
//           {budgetData.monthlyTrend.map((month, index) => {
//             const maxSpend = Math.max(...budgetData.monthlyTrend.map(m => m.spent));
//             const height = (month.spent / maxSpend) * 200;
//             return (
//               <div key={index} className="flex-1 flex flex-col items-center">
//                 <div 
//                   className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
//                   style={{ height: `${height}px` }}
//                 />
//                 <div className="mt-2 text-center">
//                   <p className="text-xs font-medium text-gray-900">₹{month.spent.toLocaleString('en-IN')}</p>
//                   <p className="text-xs text-gray-500">{month.month}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetSection;