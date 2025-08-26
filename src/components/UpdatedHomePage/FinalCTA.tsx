import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import navigate, { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
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

  const benefits = [
    "Completely FREE forever",
    "No hidden costs or subscriptions",
    "Connect with local agencies",
    "Track your leadership journey"
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background with gradient waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-bounce delay-700"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Your Journey to Market Leadership
          </h2>
          <h3 className="text-3xl lg:text-5xl font-bold text-orange-500 mb-8">
            Starts Here. Starts Free.
          </h3>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your business idea into a market-leading brand. MIBBS provides strategic guidance, connects you with local agencies, and tracks your progress - all completely free.
          </p>

          {/* Benefits Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-left bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button onClick={() => navigate("/dashboard")} className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-3 hover:scale-110 flex items-center">
              Start Your Journey FREE
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
            </button>
            
            <button onClick={() => navigate("/landing")}  className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-3 hover:scale-110 flex items-center backdrop-blur-sm">
              <Play className="mr-3 w-6 h-6" />
              Join Agency Network
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">FREE</div>
              <div className="text-gray-300">Always & Forever</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">Pan-India</div>
              <div className="text-gray-300">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">∞</div>
              <div className="text-gray-300">Growth Potential</div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className={`mt-12 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg">
              <span className="mr-2">🇮🇳</span>
              Made in India, Built for Indian Businesses
            </div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/20 via-pink-500/10 to-transparent"></div>
    </section>
  );
};

export default FinalCTA;