import React, { useState } from 'react';
import { TrendingUp, DollarSign, Package, AlertCircle, Plus, Calendar } from 'lucide-react';

const SalesTracker: React.FC = () => {
  const [todaySales, setTodaySales] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const salesData = {
    today: {
      sales: 25000,
      profit: 8500,
      margin: 34,
      transactions: 15
    },
    week: {
      sales: 175000,
      profit: 59500,
      margin: 34,
      transactions: 105
    },
    month: {
      sales: 750000,
      profit: 255000,
      margin: 34,
      transactions: 450
    }
  };

  const stockAlerts = [
    { product: 'Premium Sarees', stock: 5, critical: true },
    { product: 'Designer Blouses', stock: 12, critical: false },
    { product: 'Silk Scarves', stock: 3, critical: true },
  ];

  const recentSales = [
    { time: '2:30 PM', item: 'Banarasi Saree', amount: 8500, profit: 2890 },
    { time: '1:15 PM', item: 'Designer Blouse', amount: 3200, profit: 1088 },
    { time: '11:45 AM', item: 'Silk Dupatta', amount: 1500, profit: 510 },
    { time: '10:20 AM', item: 'Cotton Saree', amount: 2800, profit: 952 },
  ];

  const handleAddSale = () => {
    if (todaySales) {
      // In real implementation, this would add to database
      console.log('Adding sale:', todaySales);
      setTodaySales('');
    }
  };

  const currentData = salesData[selectedPeriod as keyof typeof salesData];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Sales & Profit Tracker</h3>
          <p className="text-gray-600">Monitor your daily performance and margins</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Sync E-commerce
          </button>
        </div>
      </div>

      {/* Quick Add Sale */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Quick Add Sale</h4>
        <div className="flex space-x-3">
          <input
            type="number"
            placeholder="Enter sale amount (₹)"
            value={todaySales}
            onChange={(e) => setTodaySales(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddSale}
            disabled={!todaySales}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sale</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sales</p>
              <p className="text-2xl font-bold text-gray-900">₹{currentData.sales.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">+12% vs last {selectedPeriod}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Profit</p>
              <p className="text-2xl font-bold text-gray-900">₹{currentData.profit.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium">{currentData.margin}% margin</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{currentData.transactions}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">₹{Math.round(currentData.sales / currentData.transactions).toLocaleString()} avg</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{stockAlerts.filter(item => item.critical).length}</p>
            </div>
          </div>
          <div className="text-sm text-orange-600 font-medium">Items low in stock</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Recent Sales</h4>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">{sale.item}</h5>
                  <p className="text-sm text-gray-600">{sale.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{sale.amount.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+₹{sale.profit} profit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Stock Alerts</h4>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {stockAlerts.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                item.critical ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{item.product}</h5>
                    <p className={`text-sm ${item.critical ? 'text-red-600' : 'text-yellow-600'}`}>
                      {item.stock} units remaining
                    </p>
                  </div>
                  <button className={`px-3 py-1 rounded-md text-sm font-medium ${
                    item.critical 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  } transition-colors`}>
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Manage Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesTracker;