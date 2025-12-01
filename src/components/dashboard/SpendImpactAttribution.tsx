import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Target, BarChart3, MapPin, Calendar } from 'lucide-react';

const SpendImpactAttribution = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [attributionData, setAttributionData] = useState(null);

  const timeframes = [
    { id: '1month', label: 'Last Month' },
    { id: '3months', label: 'Last 3 Months' },
    { id: '6months', label: 'Last 6 Months' },
    { id: '1year', label: 'Last Year' }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'east', name: 'East India' },
    { id: 'west', name: 'West India' },
    { id: 'central', name: 'Central India' }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = () => {
      setAttributionData({
        totalSpend: 24500000,
        totalROI: 3.2,
        marketUplift: 18.5,
        brandSearchTrends: 24.3,
        regionalData: [
          { region: 'North India', spend: 8200000, roi: 3.8, uplift: 22.1, searchTrends: 28.5, topCampaigns: ['Diwali Campaign', 'Winter Collection'] },
          { region: 'South India', spend: 6800000, roi: 2.9, uplift: 16.8, searchTrends: 21.2, topCampaigns: ['Regional Festival', 'Product Launch'] },
          { region: 'West India', spend: 5900000, roi: 3.5, uplift: 19.3, searchTrends: 26.1, topCampaigns: ['Mumbai Metro', 'Digital Push'] },
          { region: 'East India', spend: 2100000, roi: 2.1, uplift: 12.4, searchTrends: 15.8, topCampaigns: ['Durga Puja Special'] },
          { region: 'Central India', spend: 1500000, roi: 2.7, uplift: 14.9, searchTrends: 18.3, topCampaigns: ['Rural Connect'] }
        ],
        spendBreakdown: [
          { category: 'Digital', amount: 9800000, percentage: 40, roi: 4.2 },
          { category: 'TV', amount: 7350000, percentage: 30, roi: 2.8 },
          { category: 'Print', amount: 3675000, percentage: 15, roi: 2.1 },
          { category: 'Outdoor', amount: 2450000, percentage: 10, roi: 1.9 },
          { category: 'Radio', amount: 1225000, percentage: 5, roi: 2.3 }
        ],
        monthlyTrends: [
          { month: 'Jan', spend: 2100000, uplift: 15.2, searches: 18500 },
          { month: 'Feb', spend: 1950000, uplift: 14.8, searches: 17200 },
          { month: 'Mar', spend: 2300000, uplift: 17.1, searches: 21300 },
          { month: 'Apr', spend: 2150000, uplift: 16.3, searches: 19800 },
          { month: 'May', spend: 2400000, uplift: 18.9, searches: 23100 },
          { month: 'Jun', spend: 2200000, uplift: 17.5, searches: 20900 }
        ]
      });
    };
    loadData();
  }, [selectedTimeframe, selectedRegion]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getROIColor = (roi) => {
    if (roi >= 3.5) return 'text-green-600';
    if (roi >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!attributionData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing ROI Dashboard</h1>
          <p className="text-gray-600 mt-2">Analyze ad spend vs outcomes: ROI, search trends, and regional performance.</p>
        </div>
        <div className="flex sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {timeframes.map(tf => <option key={tf.id} value={tf.id}>{tf.label}</option>)}
          </select>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spend</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(attributionData.totalSpend)}</p>
            <p className="text-sm text-green-600 mt-1">+12% vs last period</p>
          </div>
          <DollarSign className="w-8 h-8 text-purple-600" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average ROI</p>
            <p className={`text-2xl font-bold mt-2 ${getROIColor(attributionData.totalROI)}`}>{attributionData.totalROI}x</p>
            <p className="text-sm text-green-600 mt-1">+0.4x vs last period</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Market Uplift</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{attributionData.marketUplift}%</p>
            <p className="text-sm text-green-600 mt-1">+2.3% vs last period</p>
          </div>
          <BarChart3 className="w-8 h-8 text-blue-600" />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Brand Search Trends</p>
            <p className="text-2xl font-bold text-pink-600 mt-2">+{attributionData.brandSearchTrends}%</p>
            <p className="text-sm text-green-600 mt-1">+5.1% vs last period</p>
          </div>
          <Target className="w-8 h-8 text-pink-600" />
        </div>
      </div>

      {/* Regional Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Spend</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Market Uplift</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Search Trends</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Top Campaigns</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attributionData.regionalData.map((region, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" /> {region.region}
                </td>
                <td className="px-4 py-2">{formatCurrency(region.spend)}</td>
                <td className={`px-4 py-2 ${getROIColor(region.roi)}`}>{region.roi}x</td>
                <td className="px-4 py-2">+{region.uplift}%</td>
                <td className="px-4 py-2">+{region.searchTrends}%</td>
                <td className="px-4 py-2">{region.topCampaigns.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spend Breakdown & Monthly Trends */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend Breakdown by Channel</h3>
          <div className="space-y-4">
            {attributionData.spendBreakdown.map((ch, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{ch.category}</span>
                  <span className={`text-sm font-medium ${getROIColor(ch.roi)}`}>{ch.roi}x ROI</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${ch.percentage}%` }}></div>
                </div>
                <div className="text-xs text-gray-500">{ch.percentage}% of total spend ({formatCurrency(ch.amount)})</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance Trends</h3>
          <div className="space-y-2">
            {attributionData.monthlyTrends.map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1 sm:mb-0"><Calendar className="w-4 h-4 text-purple-600"/> {m.month}</div>
                <div className="flex gap-4 text-sm">
                  <span>Spend: <b>{formatCurrency(m.spend)}</b></span>
                  <span>Uplift: <b className="text-blue-600">+{m.uplift}%</b></span>
                  <span>Searches: <b className="text-pink-600">{m.searches.toLocaleString()}</b></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attribution Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Attribution Insights</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-2">Best Performing Region</h4>
            <p className="text-sm text-gray-700">North India shows highest ROI at 3.8x with strong digital performance</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-pink-600 mb-2">Channel Optimization</h4>
            <p className="text-sm text-gray-700">Digital channels delivering 4.2x ROI, consider reallocating from traditional media</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-600 mb-2">Growth Opportunity</h4>
            <p className="text-sm text-gray-700">East region underperforming - potential for 40% improvement with targeted campaigns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendImpactAttribution;
