import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Shield, 
  Users, 
  TrendingUp,
  Eye,
  Target,
  Zap,
  CheckCircle,
  Play,
  MapPin,
  Activity,
  PieChart,
  Settings
} from 'lucide-react';
import HeroAnimation from './HeroAnimation';
import SpendFlowVisualization from './SpendFlowVisualization';
import AgencyPulse from './AgencyPulse';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Enterprise Brand Budgeting Portal",
      description: "Custom questionnaire with advisor review"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Regional Market Segmentation",
      description: "South, North, East, West, Central zones"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Role-based Dashboards",
      description: "For CMO, CFO, CXO with tailored insights"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Agency Tracker",
      description: "Touchpoint spend split and performance"
    }
  ];

  const impacts = [
    "Reduce brand leakage across regions",
    "Increase ROI per rupee spent",
    "Improve vendor performance",
    "Make faster, informed decisions",
    "Strengthen internal alignment across leadership"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-2">
              {/* <img 
                src="/src/assets/mibbs-1.png" 
                alt="MIBBS Logo" 
                className="w-20 h-10 object-contain"
              /> */}
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Enterprise
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/enterprises-login')}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/enterprises-login')}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Request Enterprise Access
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Top Right Buttons */}
          {/* <div className="absolute top-6 right-8 flex items-center space-x-4">
            <button
              onClick={() => navigate('/enterprises-login')}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/enterprises-login')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Request Enterprise Access
            </button>
          </div> */}

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Where India's{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Ambitious Brands
                  </span>{' '}
                  Gain Absolute Control
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Unify your brand vision, regional spend, and agency performance in one intelligent dashboard built for CMOs, CFOs, and CXOs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/enterprises-login')}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Request Enterprise Access</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/enterprises-login')}
                  className="border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Login with Business Email</span>
                </button>
              </div>
            </div>

            {/* Right Side (Hero Animation) */}
            <div className="relative flex justify-center">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>



      {/* Challenge Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            The Challenge Every CMO Knows Too Well
          </h2>
          <div className="space-y-6 text-lg text-gray-600">
            <p className="text-xl font-medium text-gray-800">
              Even iconic brands lose consistency when scaling.
            </p>
            <p>Your product may be national, but your brand is fragmented.</p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="text-red-500 mb-3">
                  <Users className="w-8 h-8 mx-auto" />
                </div>
                <p className="font-medium text-red-700">Different agencies. Different messaging.</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
                <div className="text-orange-500 mb-3">
                  <Eye className="w-8 h-8 mx-auto" />
                </div>
                <p className="font-medium text-orange-700">No control over who's spending where.</p>
              </div>
              <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="text-yellow-600 mb-3">
                  <Activity className="w-8 h-8 mx-auto" />
                </div>
                <p className="font-medium text-yellow-700">Manual reports that arrive too late.</p>
              </div>
            </div>
            
            <p className="text-xl font-bold text-purple-600 mt-12">
              It's time to move from patchwork branding to precision-led BrandOps.
            </p>
          </div>
        </div>
      </section>

      {/* What is MIBBS Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What is MIBBS Enterprise?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              MIBBS Enterprise is the country's first full-stack BrandOps system that gives national brands a single source of truth for brand budgeting, agency coordination, and marketing control all tailored by region, objective, and growth plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CMOs who need clarity</h3>
              <p className="text-gray-600">Complete visibility into brand consistency and performance across all regions</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CFOs who demand visibility</h3>
              <p className="text-gray-600">Real-time spend tracking and ROI attribution across all marketing investments</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CXOs who expect strategic alignment</h3>
              <p className="text-gray-600">Executive dashboards that connect marketing activities to business outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Dashboard Preview
            </h2>
            <p className="text-xl text-gray-600">
              See how MIBBS transforms complex brand operations into clear, actionable insights
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Spend Flow Visualization</h3>
              <p className="text-gray-600 mb-6">
                Watch your marketing investments flow across India in real-time, with intelligent heatmaps showing spend concentration and performance by region.
              </p>
              <SpendFlowVisualization />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Agency Pulse</h3>
              <p className="text-gray-600 mb-6">
                Monitor agency performance with live metrics on deliverables, timelines, and ROI across all your marketing partners.
              </p>
              <AgencyPulse />
            </div>
          </div>
          
          {/* Static Preview Screens */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ticket Management</h4>
              <p className="text-sm text-gray-600">Regional agency requests and approvals</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Brand Compliance</h4>
              <p className="text-sm text-gray-600">Automated brand guideline audits</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Executive Summary</h4>
              <p className="text-sm text-gray-600">CFO dashboard with key metrics</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Attribution Chart</h4>
              <p className="text-sm text-gray-600">Spend to market uplift correlation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What You Get Inside
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Foundational Systems */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-purple-600 mb-6">Foundational Systems</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      activeFeature === index 
                        ? 'bg-purple-50 border-purple-200' 
                        : 'bg-white border-gray-200 hover:border-purple-200'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${activeFeature === index ? 'text-purple-600' : 'text-gray-400'}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Other Categories */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-pink-600">Intelligent Tools</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Brand Cohesion Scanner</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Real-Time Agency Pulse</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Spend-to-Impact Attribution</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">AI Brand Guidelines Enforcement</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-600">Team Collaboration</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">MIBBS BrandOps Suite</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Approval Workflows</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Campaign Calendar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Digital Asset Vault</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-pink-600">Enterprise Add-ons</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Brand Consistency Tracker</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Strategic Council</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Agency Performance Tracker</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Market Entry Benchmarking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Verified Vendor Directory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">MIBBS Advisory Circle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Impact</h2>
            <p className="text-xl text-gray-600">When enterprises use MIBBS, they:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impacts.map((impact, index) => (
              <div key={index} className="flex items-start space-x-3 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Brand Workspace</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-purple-600">
              From command to control this is your national brand cockpit.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Lead, Not Just Manage?
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            MIBBS is not a software. It's a strategic partner for every growth-stage enterprise committed to legacy-grade brand building.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/enterprises-login')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Book Private Demo with Lead Consultant</span>
            </button>
            <button 
              onClick={() => navigate('/enterprises-login')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Request Enterprise Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <img 
                src="/src/assets/mibbs-1.png" 
                alt="MIBBS Logo" 
                className="w-20 h-8 object-contain"
              /> */}
              <span className="text-xl font-bold">Enterprise</span>
            </div>
            <p className="text-gray-400">© 2025 MIBBS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

                <span className="text-sm">MIBBS Advisory Circle</span>

export default LandingPage