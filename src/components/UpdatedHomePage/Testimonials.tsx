import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "MIBBS helped me understand exactly where to spend my limited budget. I connected with a great local agency and my business has grown 40% in 6 months.",
      author: "Priya Sharma",
      role: "Founder",
      company: "TechStart Solutions, Mumbai",
      rating: 5,
      savings: "40% business growth"
    },
    {
      quote: "The strategic guidance was exactly what I needed. Instead of guessing where to spend, I now have a clear plan and the right agencies to execute it.",
      author: "Rajesh Kumar",
      role: "Business Owner",
      company: "GrowthCorp, Bangalore",
      rating: 5,
      savings: "₹2.5L saved in 6 months"
    },
    {
      quote: "As an agency, joining MIBBS marketplace has been amazing. I get quality leads from businesses who already understand the value of strategic planning.",
      author: "Meera Patel",
      role: "Creative Director",
      company: "CreativeHub, Delhi",
      rating: 5,
      savings: "3x more quality leads"
    }
  ];

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

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isVisible, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentQuote = testimonials[currentTestimonial];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Real Results from <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Real Users</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are growing smarter with strategic guidance from MIBBS.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background Quote Icon */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-purple-100" />
            
            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(currentQuote.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-800 text-center leading-relaxed mb-8 relative z-10">
              "{currentQuote.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {currentQuote.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <div className="text-xl font-semibold text-gray-800">{currentQuote.author}</div>
                  <div className="text-gray-600">{currentQuote.role}</div>
                  <div className="text-sm text-gray-500">{currentQuote.company}</div>
                </div>
              </div>
              
              {/* Savings Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold">
                <TrendingUp className="w-4 h-4 mr-2" />
                {currentQuote.savings}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-purple-500 hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-purple-500 hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-150 shadow-lg shadow-purple-500/30' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Additional Social Proof */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Join the Leadership Revolution</h3>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">FREE</div>
                <div className="text-gray-300">Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">Pan-India</div>
                <div className="text-gray-300">Coverage</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">1000+</div>
                <div className="text-gray-300">Local Agencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">∞</div>
                <div className="text-gray-300">Growth Potential</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 13 3.293-3.293a1 1 0 011.414 0l6.586 6.586a1 1 0 001.414 0L22 9m0 0l-4 4m4-4v4" />
  </svg>
);

export default Testimonials;