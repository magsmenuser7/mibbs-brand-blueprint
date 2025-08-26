import React, { useEffect, useRef, useState } from 'react';
import { Building2, Rocket, Users } from 'lucide-react';

const WhoItsFor = () => {
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

  const audiences = [
    {
      icon: Building2,
      title: 'MSMEs & Startups',
      subtitle: 'From scattered spends to structured growth',
      description: 'Get clear direction on where to invest your limited budget for maximum impact and sustainable growth.',
      features: ['Free strategic planning', 'Local agency connections', 'Growth roadmap', 'Progress tracking'],
      color: 'bg-purple-500',
      gradient: 'from-purple-600 to-purple-500'
    },
    {
      icon: Rocket,
      title: 'Growth-Stage Brands',
      subtitle: 'Align budgets with aggressive scaling',
      description: 'Scale efficiently with data-driven budget allocation and access to premium agencies in your area.',
      features: ['Leadership strategies', 'Market positioning', 'Competitive analysis', 'Scale optimization'],
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Agencies & Service Providers',
      subtitle: 'Join our marketplace and grow your business',
      description: 'Connect with businesses in your area who need your expertise and grow your client base.',
      features: ['Free marketplace listing', 'Local client connections', 'Service showcase', 'Growth opportunities'],
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Perfect for <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Every Stage of Growth</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're just starting out or scaling up, MIBBS provides the strategic guidance you need to grow effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 overflow-hidden
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${audience.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="relative z-10">
                    <Icon className="w-12 h-12 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <h3 className="text-2xl font-bold mb-2">{audience.title}</h3>
                    <p className="text-white/90 text-lg font-medium">{audience.subtitle}</p>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {audience.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                    {audience.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${audience.color} rounded-full`}></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className={`group w-full bg-gradient-to-r ${audience.gradient} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-110 transition-all duration-300`}>
                      <span className="group-hover:mr-2 transition-all duration-300">Start Free</span>
                      <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 inline-block">
            <p className="text-purple-700 text-lg font-semibold mb-2">
              🎯 Start growing your business strategically today - completely FREE
            </p>
            <div className="flex justify-center space-x-8 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">FREE</div>
                <div className="text-sm text-purple-600">Always</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Pan-India</div>
                <div className="text-sm text-purple-600">Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">1000+</div>
                <div className="text-sm text-purple-600">Local Agencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;