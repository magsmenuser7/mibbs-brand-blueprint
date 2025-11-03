import React, { useEffect, useRef, useState } from 'react';
import { Brain, BarChart3, Bell, TrendingUp } from 'lucide-react';

const Features = () => {
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

  const features = [
    {
      icon: Brain,
      title: 'Strategic Budget Guidance',
      description: 'AI-powered recommendations on where to invest your budget for maximum impact.',
      color: 'bg-gradient-to-r from-purple-600 to-purple-500',
      hoverColor: 'hover:shadow-purple-500/30'
    },
    {
      icon: BarChart3,
      title: 'Location-Based Insights',
      description: 'Tailored strategies for your city, state, and local market conditions.',
      color: 'bg-gradient-to-r from-pink-500 to-pink-400',
      hoverColor: 'hover:shadow-pink-500/30'
    },
    {
      icon: Bell,
      title: 'Agency Marketplace',
      description: 'Connect with verified local agencies for marketing, PR, design, and branding.',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:shadow-purple-500/30'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your journey from startup to brand leader with actionable insights.',
      color: 'bg-gradient-to-r from-indigo-600 to-purple-500',
      hoverColor: 'hover:shadow-purple-500/25'
    }
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 sm:overflow-hidden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Grow Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get strategic guidance, connect with local experts, and track your progress - all in one platform, completely free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 ${feature.hoverColor} cursor-pointer
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/25"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-lg font-semibold animate-pulse">
            🚀 Start your transformation journey - Completely FREE
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;