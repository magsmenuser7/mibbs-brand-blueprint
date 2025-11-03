import React, { useEffect, useRef, useState } from 'react';
import { BarChart, TrendingUp, Users, Target, Bell, Shield } from 'lucide-react';

const ProductPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: BarChart, text: 'AI allocation engine' },
    { icon: TrendingUp, text: 'Benchmarks by industry & growth phase' },
    { icon: Target, text: 'ROI tracking + alerts' },
    { icon: Users, text: 'Multi-user roles with audit trail' }
  ];

  const dashboardTabs = [
    { label: 'Overview', active: true },
    { label: 'Allocations', active: false },
    { label: 'Analytics', active: false },
    { label: 'Alerts', active: false }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white sm:overflow-hidden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Your Leadership Journey <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Monitor your transformation from business to brand leader, track strategic implementations, and connect with local agencies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Dashboard Mockup */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white text-sm">MIBBS Dashboard</div>
                <div className="w-8"></div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-6 mb-6 border-b border-gray-700">
                {dashboardTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      activeTab === index 
                        ? 'text-purple-500 border-b-2 border-purple-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                {/* Top KPIs */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold">₹2.4L</div>
                    <div className="text-sm opacity-90">Monthly Budget</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white">
                    <div className="text-2xl font-bold">+22%</div>
                    <div className="text-sm opacity-90">ROI Growth</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                    <div className="text-2xl font-bold">₹45K</div>
                    <div className="text-sm opacity-90">Saved This Month</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-semibold">Plan vs Actual</h4>
                    <div className="text-green-400 text-sm font-semibold">94% Efficiency</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Digital Marketing</span>
                        <span className="text-white">₹1.44L / ₹1.50L</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-11/12 animate-pulse"></div>
                        </div>
                        <div className="text-green-400 text-xs">96%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Content Creation</span>
                        <span className="text-white">₹48K / ₹60K</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-4/5 animate-pulse delay-300"></div>
                        </div>
                        <div className="text-yellow-400 text-xs">80%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Brand Identity</span>
                        <span className="text-white">₹38K / ₹36K</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full w-full animate-pulse delay-700"></div>
                        </div>
                        <div className="text-red-400 text-xs">106%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Bell className="w-4 h-4 mr-2" />
                    Recent Alerts
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-orange-500/20 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                      <span className="text-orange-300 text-sm">Brand Identity budget exceeded by 6%</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-purple-500/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                      <span className="text-purple-300 text-sm">Brand Identity budget exceeded by 6%</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-green-500/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-300 text-sm">ROI target achieved 2 weeks early</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
              <div className="text-sm font-semibold">AI Optimized</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg shadow-lg animate-bounce delay-1000">
              <div className="text-sm font-semibold">Real-time Data</div>
            </div>
          </div>

          {/* Right: Features List */}
          <div className={`space-y-8 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.text}</h4>
                    <p className="text-gray-600">
                      {index === 0 && "Advanced algorithms analyze your business data to suggest optimal budget allocation across channels."}
                      {index === 1 && "Compare your spending patterns with industry leaders and similar businesses in your segment."}
                      {index === 2 && "Get instant notifications when campaigns underperform or exceed expectations."}
                      {index === 3 && "Collaborate with your team while maintaining complete audit trails and permission controls."}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
              <h4 className="text-xl font-semibold mb-2">🚀 Ready to see it in action?</h4>
              <p className="mb-4 opacity-90">Get a personalized demo of how MIBBS can transform your brand budgeting.</p>
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all transform hover:-translate-y-1">
                Schedule Demo
              </button>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white shadow-xl">
              <h4 className="text-xl font-semibold mb-2">🚀 Ready to start your journey?</h4>
              <p className="mb-4 opacity-90">Begin your transformation to market leadership - completely free, forever.</p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all transform hover:-translate-y-1">
                Start Free Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;