import React, { useEffect, useRef, useState } from 'react';
import { Search, Settings, TrendingUp, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Auto-animate through steps
          const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
          }, 3000);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Input Your Vision',
      description: 'Tell us about your business idea, current stage, location, and budget.',
      icon: Search,
      visual: (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-semibold mb-4">Business Profile</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Stage: Growing Business</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Location: Mumbai, Maharashtra</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Budget: ₹2.5L/month</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'Get Your Strategy',
      description: 'MIBBS creates your personalized roadmap with budget allocation and local agency recommendations.',
      icon: Settings,
      visual: (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-semibold mb-4">Strategic Plan</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Brand Building</span>
              <span className="font-semibold">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full w-3/5"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Marketing</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Operations</span>
              <span className="font-semibold">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-1/6"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'Execute & Grow',
      description: 'Implement your strategy, track progress, and evolve from business to brand leader.',
      icon: TrendingUp,
      visual: (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-semibold mb-4">Leadership Journey</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">Brand</div>
              <div className="text-xs text-green-600">Status</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <div className="text-xs text-blue-600">Progress</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Market Position</span>
            <span className="text-green-600 font-semibold">Rising</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef}  className="py-20 bg-white sm:overflow-hidden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Your Journey to Market Leadership in <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">3 Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MIBBS guides you through every stage of growth, from initial idea to becoming a market leader in your segment.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Content */}
                <div className={`space-y-6 ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-gradient-to-r from-purple-600 to-pink-500 scale-125 shadow-xl shadow-purple-500/30' : 'bg-gray-200'
                    }`}>
                      <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className={`text-6xl font-bold transition-colors duration-500 ${
                      isActive ? 'bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent' : 'text-gray-300'
                    }`}>
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-800">{step.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>

                  {index < steps.length - 1 && (
                    <div className="flex items-center space-x-2 text-purple-500">
                      <span className="text-sm font-semibold">Next Step</span>
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}>
                  <div className={`transform transition-all duration-1000 ${
                    isActive ? 'scale-110 shadow-2xl shadow-purple-500/20' : 'scale-95 shadow-lg'
                  }`}>
                    {step.visual}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeStep === index ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-150 shadow-lg shadow-purple-500/30' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;