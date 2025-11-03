import React, { useEffect, useRef, useState } from 'react';
import { TrendingDown, AlertTriangle, Target, Users, TrendingUp } from 'lucide-react';

const Problem = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ msmes: 0, digital: 0, systems: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { msmes: 63, digital: 7.7, systems: 0 };
    const increments = {
      msmes: targets.msmes / (duration / 50),
      digital: targets.digital / (duration / 50),
      systems: 0
    };

    let currentValues = { msmes: 0, digital: 0, systems: 0 };

    const timer = setInterval(() => {
      currentValues.msmes += increments.msmes;
      currentValues.digital += increments.digital;

      if (currentValues.msmes >= targets.msmes) {
        currentValues.msmes = targets.msmes;
        currentValues.digital = targets.digital;
        clearInterval(timer);
      }

      setCounters({
        msmes: Math.floor(currentValues.msmes),
        digital: parseFloat(currentValues.digital.toFixed(1)),
        systems: 0
      });
    }, 50);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white sm:overflow-hidden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Get Strategic Guidance for Your <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Business Growth Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your business idea into a market-leading brand with strategic budget allocation and local agency connections.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Problems */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl border border-red-100 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-full shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Strategic Budget Planning</h3>
                <p className="text-gray-600">Get AI-powered recommendations on how to allocate your budget across different growth activities for maximum impact.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect with Local Agencies</h3>
                <p className="text-gray-600">Find verified marketing, design, and branding agencies in your city to help execute your growth strategy.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-gray-500 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress</h3>
                <p className="text-gray-600">Monitor your journey from idea to brand leader with clear milestones and actionable next steps.</p>
              </div>
            </div>

            <div className="text-center lg:text-left mt-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">👉 Start your transformation journey today - completely free.</h3>
            </div>
          </div>

          {/* Right: Stats */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-center">Your Growth Opportunity</h3>
              
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-500 mb-2">
                    {counters.msmes}M
                  </div>
                  <p className="text-gray-300 text-lg">MSMEs in India</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-2 rounded"></div>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-500 mb-2">
                    {counters.digital}M
                  </div>
                  <p className="text-gray-300 text-lg">Digitally Active</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-2 rounded"></div>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-red-500 mb-2">
                    FREE
                  </div>
                  <p className="text-gray-300 text-lg">Strategic guidance</p>
                  <p className="text-sm text-green-400 mt-1">Always & Forever</p>
                  <div className="w-24 h-1 bg-green-500 mx-auto mt-2 rounded"></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-orange-500/20 rounded-lg text-center">
                <p className="text-purple-300 font-semibold">Join thousands of businesses already growing with MIBBS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;