import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  Users, 
  Target,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  FileText,
  Eye
} from 'lucide-react';

const ExecutiveDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    // Simulate data loading
    setDashboardData({
      monthlySpend: {
        current: 24500000,
        previous: 21800000,
        change: 12.4,
        breakdown: [
          { month: 'Jan', amount: 21000000 },
          { month: 'Feb', amount: 19500000 },
          { month: 'Mar', amount: 23000000 },
          { month: 'Apr', amount: 21500000 },
          { month: 'May', amount: 24000000 },
          { month: 'Jun', amount: 24500000 }
        ]
      },
      regionalROI: [
        { region: 'North', roi: 3.8, spend: 8200000, trend: 'up' },
        { region: 'West', roi: 3.5, spend: 5900000, trend: 'up' },
        { region: 'Central', roi: 2.7, spend: 1500000, trend: 'stable' },
        { region: 'South', roi: 2.9, spend: 6800000, trend: 'down' },
        { region: 'East', roi: 2.1, spend: 2100000, trend: 'down' }
      ],
      upcomingCommitments: [
        { 
          id: 1, 
          campaign: 'Diwali Festival Campaign', 
          amount: 15000000, 
          date: '2024-10-15',
          status: 'approved',
          agency: 'Multiple Agencies'
        },
        { 
          id: 2, 
          campaign: 'Winter Collection Launch', 
          amount: 8500000, 
          date: '2024-11-01',
          status: 'pending',
          agency: 'Creative North'
        },
        { 
          id: 3, 
          campaign: 'Year-end Clearance', 
          amount: 6200000, 
          date: '2024-12-01',
          status: 'draft',
          agency: 'West Creative Hub'
        }
      ],
      budgetAlerts: [
        {
          id: 1,
          type: 'overspend',
          message: 'East region 15% over monthly budget',
          severity: 'high',
          amount: 315000,
          region: 'East India'
        },
        {
          id: 2,
          type: 'underspend',
          message: 'Central region 25% under budget utilization',
          severity: 'medium',
          amount: 375000,
          region: 'Central India'
        },
        {
          id: 3,
          type: 'approval_pending',
          message: '3 campaigns awaiting CFO approval',
          severity: 'medium',
          amount: 12500000,
          region: 'Multiple'
        }
      ],
      vendorLockIns: [
        {
          vendor: 'Creative North',
          contract: 'Annual Retainer',
          amount: 36000000,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          autoRenewal: true,
          performance: 'excellent'
        },
        {
          vendor: 'South Media Solutions',
          contract: 'Project Based',
          amount: 18000000,
          startDate: '2024-03-01',
          endDate: '2024-08-31',
          autoRenewal: false,
          performance: 'good'
        }
      ],
      kpiSummary: {
        totalBudget: 120000000,
        spentToDate: 87500000,
        remainingBudget: 32500000,
        averageROI: 3.2,
        activeAgencies: 24,
        activeCampaigns: 18,
        complianceScore: 94
      }
    });
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Executive Summary View</h1>
        <p className="text-gray-600 mt-2">Easy-to-read summary for decision-makers. See monthly spend, region-wise results, upcoming expenses, and risks.</p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(dashboardData.kpiSummary.totalBudget)}
              </p>
              <p className="text-sm text-gray-500 mt-1">FY 2024-25</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Spent to Date</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {formatCurrency(dashboardData.kpiSummary.spentToDate)}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {Math.round((dashboardData.kpiSummary.spentToDate / dashboardData.kpiSummary.totalBudget) * 100)}% utilized
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average ROI</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{dashboardData.kpiSummary.averageROI}x</p>
              <p className="text-sm text-green-600 mt-1">+0.4x vs last quarter</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{dashboardData.kpiSummary.complianceScore}%</p>
              <p className="text-sm text-green-600 mt-1">+2% vs last month</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Monthly Spend Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Spend Trend</h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Current Month:</span>
            <span className="font-semibold text-gray-900">{formatCurrency(dashboardData.monthlySpend.current)}</span>
            <span className={`font-medium ${dashboardData.monthlySpend.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dashboardData.monthlySpend.change > 0 ? '+' : ''}{dashboardData.monthlySpend.change}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {dashboardData.monthlySpend.breakdown.map((month, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div 
                  className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t mx-auto transition-all duration-300"
                  style={{ 
                    width: '40px',
                    height: `${(month.amount / Math.max(...dashboardData.monthlySpend.breakdown.map(m => m.amount))) * 100}px`
                  }}
                ></div>
              </div>
              <p className="text-xs font-medium text-gray-900">{month.month}</p>
              <p className="text-xs text-gray-600">{formatCurrency(month.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regional ROI Estimates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional ROI Estimates</h3>
          <div className="space-y-4">
            {dashboardData.regionalROI.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getTrendIcon(region.trend)}
                  <div>
                    <p className="font-medium text-gray-900">{region.region}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(region.spend)} spend</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    region.roi >= 3.5 ? 'text-green-600' : 
                    region.roi >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {region.roi}x
                  </p>
                  <p className="text-xs text-gray-500">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget Leakage Alerts</h3>
          <div className="space-y-4">
            {dashboardData.budgetAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5" />
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm mt-1">{alert.region} • {formatCurrency(alert.amount)}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Commitments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Commitments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Launch Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.upcomingCommitments.map((commitment) => (
                <tr key={commitment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{commitment.campaign}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(commitment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commitment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commitment.agency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(commitment.status)}`}>
                      {commitment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-4">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Lock-ins */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Vendor Lock-ins & Contracts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {dashboardData.vendorLockIns.map((vendor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{vendor.vendor}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vendor.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                  vendor.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {vendor.performance.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Contract Type:</span>
                  <span className="font-medium">{vendor.contract}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatCurrency(vendor.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Period:</span>
                  <span className="font-medium">{vendor.startDate} - {vendor.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto Renewal:</span>
                  <span className={`font-medium ${vendor.autoRenewal ? 'text-green-600' : 'text-red-600'}`}>
                    {vendor.autoRenewal ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;