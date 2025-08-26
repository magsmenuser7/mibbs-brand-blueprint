import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50/30">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium animate-pulse">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Made in India • Built for Indian Businesses
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Transform Your Business with{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent relative">
                AI-Powered
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded animate-pulse"></div>
              </span>
              Strategic Guidance
            </h1>

            {/* Subtext */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Get personalized budget allocation strategies, connect with local agencies, and track your journey from <strong>idea to brand leader</strong>.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              MIBBS provides strategic guidance to help you make smart decisions about where to invest your budget for maximum growth impact.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/dashboard")} className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center">
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button  onClick={() => navigate("/how-it-works")}  
              className="group border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">63M</div>
                <div className="text-sm text-gray-600">MSMEs in India</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">7.7M</div>
                <div className="text-sm text-gray-600">Digitally Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">1st</div>
                <div className="text-sm text-gray-600">Brand Budgeting AI</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Dashboard Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Brand Budget Overview</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold">₹2.4L</div>
                    <div className="text-sm opacity-90">Monthly Budget</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="text-2xl font-bold">+18%</div>
                    <div className="text-sm opacity-90">ROI Growth</div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Digital Marketing</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Brand Identity</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-5/12 animate-pulse delay-300"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Creation</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/5 animate-pulse delay-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <div className="text-sm font-semibold">+₹45K Saved</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg shadow-lg animate-bounce delay-500">
                <div className="text-sm font-semibold">AI Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;