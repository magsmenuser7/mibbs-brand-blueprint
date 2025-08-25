import React from 'react';
import { ArrowRight, Star, Users, TrendingUp, Sparkles, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-mibbs-light via-white to-pink-50 pt-16 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-mibbs-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-mibbs-accent/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-mibbs-secondary/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-40 w-8 h-8 bg-mibbs-pink/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-gray-600 animate-fadeInUp">
            <div className="flex items-center hover:scale-105 transition-transform duration-300">
              <Users className="h-4 w-4 mr-2 text-mibbs-primary" />
              <span>500+ Agencies</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              <span>₹2.5Cr+ Budgets Matched</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-300">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              <span>4.8/5 Rating</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp stagger-1">
            Where Branding Budgets
            <span className="bg-gradient-to-r from-mibbs-primary via-mibbs-secondary to-mibbs-accent bg-clip-text text-transparent block animate-gradient relative">
              Become Business
              <Sparkles className="inline-block h-8 w-8 ml-4 text-mibbs-accent animate-pulse" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto animate-fadeInUp stagger-2">
            Your agency doesn't need more noise. It needs meaningful leads, budgets with intent, 
            and a system that respects your craft. That's what MIBBS delivers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fadeInUp stagger-3">
            <button 
              onClick={() => {
                const header = document.querySelector('header');
                if (header) {
                  const getStartedBtn = header.querySelector('[data-register-btn]') as HTMLElement;
                  if (getStartedBtn) {
                    getStartedBtn.click();
                  }
                }
              }}
              className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-8 py-4 rounded-xl hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 flex items-center group animate-pulse-glow"
            >
              <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Create Your Free Profile
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button className="border-2 border-mibbs-primary text-mibbs-primary px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-mibbs-primary hover:to-mibbs-secondary hover:text-white transition-all duration-500 font-semibold text-lg transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
              Create Your Free Profile
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-fadeInUp stagger-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-mibbs-light rounded-xl hover:scale-105 transition-all duration-300 animate-fadeInLeft stagger-1">
                  <div className="text-3xl font-bold text-mibbs-primary mb-2">₹2.5Cr+</div>
                  <div className="text-gray-600">Budgets Matched</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl hover:scale-105 transition-all duration-300 animate-fadeInUp stagger-2">
                  <div className="text-3xl font-bold text-mibbs-secondary mb-2">500+</div>
                  <div className="text-gray-600">Active Agencies</div>
                </div>
                <div className="text-center p-6 bg-pink-50 rounded-xl hover:scale-105 transition-all duration-300 animate-fadeInRight stagger-3">
                  <div className="text-3xl font-bold text-mibbs-accent mb-2">85%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-mibbs-accent to-mibbs-pink rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-mibbs-primary to-mibbs-secondary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;