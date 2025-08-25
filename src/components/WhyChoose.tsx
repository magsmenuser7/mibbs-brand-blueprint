import React from 'react';
import { Target, MapPin, MessageCircle, DollarSign, Shield, Zap, TrendingUp } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      icon: Target,
      title: "Every Lead is Real",
      description: "We only show you brands that have gone through our AI-powered budgeting tool. Which means their intent is strong and spend is planned.",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Leads by Pincode and Category",
      description: "Hyper-local visibility, not just a city name. Whether you're in Indore or Coimbatore, we bring you the right match.",
      color: "green"
    },
    {
      icon: MessageCircle,
      title: "Direct Access, No Gatekeeping",
      description: "Message brand owners directly. No middle layers. No commission.",
      color: "purple"
    },
    {
      icon: DollarSign,
      title: "Your Prices, Their Budget",
      description: "When businesses budget on MIBBS, your packages are factored in. You're not adjusting to them—they're aligning to you.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-mibbs-light text-mibbs-primary",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-pink-100 text-mibbs-accent"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Agencies Choose MIBBS
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            You didn't start an agency to chase cold leads or send 40 proposals with no reply. 
            You started to solve real problems, build brands, and grow with intention. 
            MIBBS was built with that same belief.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className={`bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 animate-fadeInUp stagger-${index + 1}`}>
              <div className={`inline-flex p-3 rounded-xl ${getColorClasses(feature.color)} mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-300`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="bg-gradient-to-r from-mibbs-primary via-mibbs-secondary to-mibbs-accent rounded-2xl p-8 md:p-12 text-white animate-gradient hover:shadow-2xl transition-all duration-500 animate-fadeInUp stagger-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
              <Shield className="h-12 w-12 mb-4 opacity-90 group-hover:rotate-12 transition-transform duration-300" />
              <h4 className="text-xl font-semibold mb-2">No Commission</h4>
              <p className="opacity-90">Keep 100% of your earnings</p>
            </div>
            <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
              <Zap className="h-12 w-12 mb-4 opacity-90 group-hover:rotate-12 transition-transform duration-300" />
              <h4 className="text-xl font-semibold mb-2">Instant Proposals</h4>
              <p className="opacity-90">Send proposals in seconds</p>
            </div>
            <div className="flex flex-col items-center group hover:scale-105 transition-all duration-300">
              <Target className="h-12 w-12 mb-4 opacity-90 group-hover:rotate-12 transition-transform duration-300" />
              <h4 className="text-xl font-semibold mb-2">Quality Leads</h4>
              <p className="opacity-90">Pre-verified and budget-ready</p>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-16 h-16 bg-mibbs-accent/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-12 h-12 bg-mibbs-primary/10 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
    </section>
  );
};

export default WhyChoose;