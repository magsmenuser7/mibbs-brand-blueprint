import React from 'react';
import { Award, CheckCircle, Star, TrendingUp, Users, Zap } from 'lucide-react';

const Certification = () => {
  const benefits = [
    {
      icon: Award,
      title: "Verified Badge",
      description: "Stand out with our trust mark"
    },
    {
      icon: TrendingUp,
      title: "Priority in Listings",
      description: "Appear first in search results"
    },
    {
      icon: Users,
      title: "Access to High-Value Clients",
      description: "Connect with premium brands"
    },
    {
      icon: Star,
      title: "Weekly Feature in MIBBS Stories",
      description: "Get highlighted to our community"
    },
    {
      icon: Zap,
      title: "Early Invites for Brand RFPs",
      description: "First access to big opportunities"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fadeInLeft">
            <div className="inline-flex items-center bg-mibbs-light text-mibbs-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 hover:scale-105 transition-transform duration-300">
              <Award className="h-4 w-4 mr-2" />
              MIBBS Certification
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              One-time Fee: <span className="text-mibbs-primary">₹499</span>
            </h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Get Certified</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Trust isn't built with a logo. It's built with standards. That's why MIBBS certification 
                exists to spotlight agencies that deliver, consistently.
              </p>
            </div>

            <button className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-8 py-4 rounded-xl hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-pulse-glow">
              Apply for Certification
            </button>
          </div>

          {/* Right Content - Benefits */}
          <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 animate-fadeInRight">
            <h4 className="text-2xl font-bold text-gray-900 mb-8">Certified agencies get:</h4>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className={`flex items-start hover:scale-105 transition-all duration-300 animate-fadeInUp stagger-${index + 1}`}>
                  <div className="bg-mibbs-light text-mibbs-primary p-2 rounded-lg mr-4 flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">{benefit.title}</h5>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-mibbs-primary">95%</div>
                  <div className="text-sm text-gray-600">Certification Rate</div>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-green-600">3x</div>
                  <div className="text-sm text-gray-600">More Leads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-mibbs-secondary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default Certification;