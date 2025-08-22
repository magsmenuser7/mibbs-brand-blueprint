import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  History, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';

const Credits: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const creditStats = {
    available: 156,
    used: 44,
    purchased: 200,
    conversionRate: 32
  };

  const transactions = [
    {
      id: 'T-001',
      type: 'purchase',
      amount: 100,
      description: 'Credit purchase - Premium Package',
      date: '2024-01-15',
      status: 'completed',
      method: 'Razorpay'
    },
    {
      id: 'T-002',
      type: 'usage',
      amount: -5,
      description: 'Lead contact - TechStart Solutions',
      date: '2024-01-14',
      status: 'completed',
      leadId: 'L-001'
    },
    {
      id: 'T-003',
      type: 'usage',
      amount: -3,
      description: 'Proposal view - Fashion Forward',
      date: '2024-01-14',
      status: 'completed',
      leadId: 'L-002'
    },
    {
      id: 'T-004',
      type: 'purchase',
      amount: 50,
      description: 'Credit purchase - Starter Package',
      date: '2024-01-10',
      status: 'completed',
      method: 'UPI'
    },
    {
      id: 'T-005',
      type: 'refund',
      amount: 10,
      description: 'Refund - Unused lead credits',
      date: '2024-01-08',
      status: 'completed',
      method: 'Wallet'
    }
  ];

  const packages = [
    {
      name: 'Starter',
      credits: 50,
      price: 2500,
      popular: false,
      features: ['Basic lead access', 'Standard support', '30-day validity']
    },
    {
      name: 'Professional',
      credits: 100,
      price: 4500,
      popular: true,
      features: ['Priority lead access', 'Premium support', '60-day validity', 'Analytics dashboard']
    },
    {
      name: 'Enterprise',
      credits: 250,
      price: 10000,
      popular: false,
      features: ['Unlimited lead access', 'Dedicated support', '90-day validity', 'Advanced analytics', 'API access']
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case 'usage': return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'refund': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      default: return <CreditCard className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-600';
      case 'usage': return 'text-red-600';
      case 'refund': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credits Wallet</h1>
          <p className="text-gray-600">Manage your credits and purchase additional packages.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Buy Credits
          </button>
        </div>
      </div>

      {/* Credit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Available Credits</p>
              <p className="text-3xl font-bold">{creditStats.available}</p>
            </div>
            <Wallet className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Used This Month</p>
              <p className="text-2xl font-bold text-gray-900">{creditStats.used}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Purchased</p>
              <p className="text-2xl font-bold text-gray-900">{creditStats.purchased}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{creditStats.conversionRate}%</p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Credit Packages */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Credit Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div key={index} className={`relative border-2 rounded-xl p-6 ${
              pkg.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">for {pkg.credits} credits</span>
                </div>
                <p className="text-sm text-gray-600">₹{(pkg.price / pkg.credits).toFixed(0)} per credit</p>
              </div>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                pkg.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Purchase Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="p-6 text-sm font-medium text-gray-500">Transaction</th>
                <th className="p-6 text-sm font-medium text-gray-500">Type</th>
                <th className="p-6 text-sm font-medium text-gray-500">Amount</th>
                <th className="p-6 text-sm font-medium text-gray-500">Date</th>
                <th className="p-6 text-sm font-medium text-gray-500">Method</th>
                <th className="p-6 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">#{transaction.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="capitalize text-sm text-gray-600">{transaction.type}</span>
                  </td>
                  <td className="p-6">
                    <span className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} credits
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6 text-sm text-gray-600">
                    {transaction.method || '-'}
                  </td>
                  <td className="p-6">
                    <span className="inline-flex px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Credits;