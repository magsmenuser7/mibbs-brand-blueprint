import React, { useState } from 'react';
import { BarChart3, TrendingUp, Eye, Package, MapPin, AlertCircle, RefreshCw, Filter } from 'lucide-react';

const ProductVisualizationSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const productMetrics = {
    totalProducts: 1245,
    trackingAccuracy: 98.2,
    platformsCovered: 8,
    realTimeUpdates: true
  };

  const platformData = [
    { name: 'Amazon', products: 450, views: 125000, sales: 89, compliance: 96 },
    { name: 'Flipkart', products: 380, views: 98000, sales: 67, compliance: 94 },
    { name: 'Own Website', products: 280, views: 45000, sales: 45, compliance: 100 },
    { name: 'Instagram Shop', products: 135, views: 78000, sales: 32, compliance: 92 }
  ];

  const categoryPerformance = [
    { category: 'Silk Sarees', performance: 94, trend: 'up', sales: 234 },
    { category: 'Designer Blouses', performance: 87, trend: 'up', sales: 156 },
    { category: 'Cotton Sarees', performance: 82, trend: 'down', sales: 198 },
    { category: 'Accessories', performance: 76, trend: 'up', sales: 89 }
  ];

  const complianceIssues = [
    { platform: 'Amazon', issue: 'Missing product description', severity: 'medium' },
    { platform: 'Flipkart', issue: 'Image quality below standard', severity: 'low' },
    { platform: 'Instagram', issue: 'Hashtag limit exceeded', severity: 'low' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Product Visualization Dashboard</h3>
          <p className="text-gray-600">Real-time tracking across all platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Updates</span>
          </div>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Products Tracked</p>
              <p className="text-2xl font-bold text-gray-900">{productMetrics.totalProducts.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tracking Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{productMetrics.trackingAccuracy}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Platforms</p>
              <p className="text-2xl font-bold text-gray-900">{productMetrics.platformsCovered}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-gray-900">{complianceIssues.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="amazon">Amazon</option>
            <option value="flipkart">Flipkart</option>
            <option value="website">Own Website</option>
            <option value="instagram">Instagram</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="sarees">Sarees</option>
            <option value="blouses">Blouses</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h4>
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">{platform.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    platform.compliance >= 95 ? 'bg-green-100 text-green-800' : 
                    platform.compliance >= 90 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {platform.compliance}% compliant
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Products</p>
                    <p className="font-semibold text-gray-900">{platform.products}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Views</p>
                    <p className="font-semibold text-gray-900">{platform.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sales</p>
                    <p className="font-semibold text-gray-900">{platform.sales}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h4>
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">{category.category}</h5>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${category.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-semibold text-gray-900">{category.performance}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Sales this month</span>
                  <span className="font-semibold text-gray-900">{category.sales}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.performance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Issues */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">Compliance Issues</h4>
        <div className="space-y-3">
          {complianceIssues.map((issue, index) => (
            <div key={index} className={`p-4 border-l-4 rounded-lg ${getSeverityColor(issue.severity)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">{issue.platform}</h5>
                  <p className="text-sm text-gray-600">{issue.issue}</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Fix Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductVisualizationSection;