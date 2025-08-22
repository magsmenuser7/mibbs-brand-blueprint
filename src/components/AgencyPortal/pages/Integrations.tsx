import React, { useState } from 'react';
import { 
  Puzzle, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Key,
  Zap,
  Globe,
  Smartphone,
  Camera,
  BarChart3,
  MessageSquare,
  CreditCard
} from 'lucide-react';

const Integrations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const integrations = [
    {
      id: 1,
      name: 'Meta Business Manager',
      description: 'Connect your Facebook and Instagram business accounts for seamless ad management.',
      category: 'Social Media',
      icon: Globe,
      connected: true,
      popular: true,
      features: ['Ad Campaign Management', 'Audience Insights', 'Performance Tracking'],
      setupTime: '5 minutes'
    },
    {
      id: 2,
      name: 'Google Ads',
      description: 'Integrate Google Ads to manage PPC campaigns and track performance.',
      category: 'Advertising',
      icon: BarChart3,
      connected: false,
      popular: true,
      features: ['Campaign Management', 'Keyword Research', 'Performance Analytics'],
      setupTime: '10 minutes'
    },
    {
      id: 3,
      name: 'Canva',
      description: 'Access Canva workspace directly from MIBBS for quick design creation.',
      category: 'Design',
      icon: Camera,
      connected: true,
      popular: false,
      features: ['Template Access', 'Brand Kit Integration', 'Team Collaboration'],
      setupTime: '3 minutes'
    },
    {
      id: 4,
      name: 'WhatsApp Business API',
      description: 'Send automated messages and manage customer communications via WhatsApp.',
      category: 'Communication',
      icon: MessageSquare,
      connected: false,
      popular: true,
      features: ['Automated Messages', 'Customer Support', 'Broadcast Lists'],
      setupTime: '15 minutes'
    },
    {
      id: 5,
      name: 'Google Drive',
      description: 'Store and share project files, proposals, and assets with clients.',
      category: 'Storage',
      icon: Globe,
      connected: true,
      popular: false,
      features: ['File Storage', 'Client Sharing', 'Version Control'],
      setupTime: '2 minutes'
    },
    {
      id: 6,
      name: 'Razorpay',
      description: 'Accept payments from clients and manage invoicing seamlessly.',
      category: 'Payment',
      icon: CreditCard,
      connected: false,
      popular: true,
      features: ['Payment Gateway', 'Invoice Management', 'Subscription Billing'],
      setupTime: '20 minutes'
    },
    {
      id: 7,
      name: 'Trello',
      description: 'Manage projects and collaborate with your team using Trello boards.',
      category: 'Project Management',
      icon: Puzzle,
      connected: false,
      popular: false,
      features: ['Project Boards', 'Task Management', 'Team Collaboration'],
      setupTime: '5 minutes'
    },
    {
      id: 8,
      name: 'Notion',
      description: 'Create and manage project documentation, notes, and knowledge base.',
      category: 'Productivity',
      icon: Globe,
      connected: false,
      popular: false,
      features: ['Documentation', 'Note Taking', 'Knowledge Base'],
      setupTime: '8 minutes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', count: integrations.length },
    { id: 'Social Media', name: 'Social Media', count: integrations.filter(i => i.category === 'Social Media').length },
    { id: 'Advertising', name: 'Advertising', count: integrations.filter(i => i.category === 'Advertising').length },
    { id: 'Design', name: 'Design', count: integrations.filter(i => i.category === 'Design').length },
    { id: 'Communication', name: 'Communication', count: integrations.filter(i => i.category === 'Communication').length },
    { id: 'Payment', name: 'Payment', count: integrations.filter(i => i.category === 'Payment').length }
  ];

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory);

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations Center</h1>
          <p className="text-gray-600">Connect your favorite tools and streamline your workflow.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-green-600">{connectedCount}</span> of {integrations.length} connected
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Request Integration
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
            </div>
            <Puzzle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">{integrations.length - connectedCount}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Popular</p>
              <p className="text-2xl font-bold text-purple-600">{integrations.filter(i => i.popular).length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <integration.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {integration.category}
                      </span>
                      {integration.popular && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {integration.connected ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {integration.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Setup time:</span>
                  <span className="font-medium text-gray-900">{integration.setupTime}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {integration.connected ? (
                  <>
                    <button className="flex-1 bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Connected
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Settings className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Connect
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* API Access */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Need Custom Integration?</h2>
            <p className="text-blue-100 mb-4">
              Use our API to build custom integrations with your existing tools and workflows.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                <Key className="w-4 h-4 mr-2" />
                Get API Key
              </button>
              <button className="border border-blue-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Documentation
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Puzzle className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;