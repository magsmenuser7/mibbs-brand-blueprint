import React from 'react';
import { UserPlus, Award, Target, Send, BarChart3 } from 'lucide-react';

const HowItWorksAgency = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Tell us what you do, your pricing, your geography.",
      color: "blue"
    },
    {
      icon: Award,
      title: "Get Certified",
      description: "Elevate trust. Win better mandates.",
      color: "green"
    },
    {
      icon: Target,
      title: "Receive Leads",
      description: "From real businesses with real budgets.",
      color: "purple"
    },
    {
      icon: Send,
      title: "Send Proposals Instantly",
      description: "Use our builder or upload your own.",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Track Results",
      description: "See pitch-to-win ratios and improve.",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-mibbs-light text-mibbs-primary border-mibbs-primary",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-pink-100 text-mibbs-accent border-mibbs-pink",
      red: "bg-red-100 text-red-600 border-red-200"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works (For Agencies)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, streamlined process designed to get you from signup to your first quality lead in minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-mibbs-primary via-mibbs-secondary to-mibbs-accent transform -translate-y-1/2 animate-gradient"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className={`relative animate-fadeInUp stagger-${index + 1}`}>
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 text-center relative z-10 transform hover:-translate-y-3 hover:scale-105 group">
                  <div className={`inline-flex p-4 rounded-xl border-2 ${getColorClasses(step.color)} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20 animate-pulse-glow">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fadeInUp stagger-5">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to transform your agency growth?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of agencies already growing with MIBBS
            </p>
            <button className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-8 py-4 rounded-xl hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-pulse-glow">
              Start Your Free Profile
            </button>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-40 left-20 w-20 h-20 bg-mibbs-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-16 h-16 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default HowItWorksAgency;