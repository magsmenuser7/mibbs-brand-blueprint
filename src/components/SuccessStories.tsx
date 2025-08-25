import React from 'react';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      agency: "Creative Minds Studio",
      location: "Mumbai",
      growth: "300% increase in qualified leads",
      testimonial: "MIBBS transformed our lead generation. We went from chasing prospects to having them come to us with real budgets.",
      avatar: "CM",
      rating: 5,
      projects: 24,
      revenue: "₹45L"
    },
    {
      agency: "Brand Builders Co.",
      location: "Bangalore",
      growth: "Reduced proposal time by 70%",
      testimonial: "The proposal builder and direct client access saved us countless hours. We can focus on what we do best - creating great brands.",
      avatar: "BB",
      rating: 5,
      projects: 18,
      revenue: "₹32L"
    },
    {
      agency: "Digital Craft Agency",
      location: "Delhi",
      growth: "85% proposal acceptance rate",
      testimonial: "MIBBS certification gave us credibility. Clients trust us more, and our conversion rates have never been better.",
      avatar: "DC",
      rating: 5,
      projects: 31,
      revenue: "₹67L"
    }
  ];

  return (
    <section id="success-stories" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real agencies, real results. See how MIBBS has transformed businesses like yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fadeInUp stagger-${index + 1}`}>
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 hover:scale-110 transition-transform duration-300">
                  {story.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{story.agency}</h3>
                  <p className="text-gray-600 text-sm">{story.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Growth Metric */}
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold mb-4 hover:scale-105 transition-transform duration-300">
                {story.growth}
              </div>

              {/* Testimonial */}
              <p className="text-gray-600 mb-6 italic">
                "{story.testimonial}"
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-mibbs-primary">{story.projects}</div>
                  <div className="text-sm text-gray-600">Projects Won</div>
                </div>
                <div className="text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-green-600">{story.revenue}</div>
                  <div className="text-sm text-gray-600">Revenue Generated</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp stagger-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-mibbs-primary hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Active Agencies</div>
            </div>
            <div className="hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹2.5Cr+</div>
              <div className="text-gray-600">Budgets Matched</div>
            </div>
            <div className="hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-mibbs-secondary hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-yellow-500 hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fadeInUp stagger-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to write your success story?
          </h3>
          <button className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-8 py-4 rounded-xl hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-pulse-glow">
            Join MIBBS Today
          </button>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-40 right-20 w-24 h-24 bg-mibbs-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default SuccessStories;