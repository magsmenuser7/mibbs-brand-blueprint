import React from 'react';
import { 
  Inbox, 
  MessageCircle, 
  FileText, 
  Wallet, 
  Settings, 
  BarChart3, 
  Award,
  Zap,
  Users,
  TrendingUp,
  Star,
  Target
} from 'lucide-react';

const DashboardAgency = () => {
  const features = [
    {
      icon: Inbox,
      title: "Live Lead Inbox",
      description: "Pre-filtered and verified leads ready for your review",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Client Chatbox",
      description: "Built-in secure messaging with potential clients",
      color: "green"
    },
    {
      icon: FileText,
      title: "Proposal Builder",
      description: "Branded, fast, frictionless proposal creation",
      color: "purple"
    },
    {
      icon: Wallet,
      title: "Credit Wallet",
      description: "View, top-up, and manage your credits easily",
      color: "orange"
    },
    {
      icon: Settings,
      title: "Service Manager",
      description: "Publish your offerings by category and expertise",
      color: "red"
    },
    {
      icon: BarChart3,
      title: "Insights Tab",
      description: "Lead source, conversion stats, and feedback analytics",
      color: "indigo"
    },
    {
      icon: Award,
      title: "Certification Tracker",
      description: "Apply or renew your certification in one tap",
      color: "yellow"
    },
    {
      icon: Zap,
      title: "Integrations",
      description: "Canva, Meta and Google integrations for seamless workflow",
      color: "pink"
    }
  ];

  const extraBenefits = [
    {
      icon: TrendingUp,
      title: "AI Rank Score",
      description: "Know where you stand among peers"
    },
    {
      icon: Star,
      title: "Verified Client Feedback",
      description: "Testimonials auto-collected post-project"
    },
    {
      icon: BarChart3,
      title: "B2B Trend Insights",
      description: "Weekly demand snapshot by industry"
    },
    {
      icon: FileText,
      title: "Training Vault",
      description: "Templates, pitch decks, pricing strategy modules"
    },
    {
      icon: Users,
      title: "Team Access",
      description: "Assign leads to team members"
    },
    {
      icon: Target,
      title: "Brand Match Index",
      description: "Smart pairing with brands aligned to your niche"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-mibbs-light text-mibbs-primary",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-pink-100 text-mibbs-accent",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600",
      yellow: "bg-yellow-100 text-yellow-600",
      pink: "bg-pink-100 text-pink-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="dashboard-preview" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your MIBBS Agency Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A command centre for your growth, designed for real agency workflows.
          </p>
        </div>

        {/* Main Dashboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className={`bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 animate-fadeInUp stagger-${(index % 4) + 1}`}>
              <div className={`inline-flex p-3 rounded-lg ${getColorClasses(feature.color)} mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Extra Benefits Section */}
        <div className="bg-gradient-to-br from-mibbs-light to-pink-50 rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-500 animate-fadeInUp stagger-3">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Extra Benefits for MIBBS Certified Agencies
            </h3>
            <p className="text-xl text-gray-600">
              These aren't gimmicks. They're growth levers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {extraBenefits.map((benefit, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fadeInUp stagger-${(index % 3) + 1}`}>
                <div className="flex items-start">
                  <div className="bg-mibbs-light text-mibbs-primary p-2 rounded-lg mr-4 flex-shrink-0 hover:scale-110 hover:rotate-3 transition-all duration-300">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Premium Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fadeInLeft stagger-1">
              <div className="text-2xl font-bold text-mibbs-primary mb-2">Enterprise RFP Early Access</div>
              <p className="text-gray-600 text-sm">Be the first in line for big-budget brands</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fadeInUp stagger-2">
              <div className="text-2xl font-bold text-green-600 mb-2">Marketplace Badge</div>
              <p className="text-gray-600 text-sm">Be visible when brands shortlist top vendors</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fadeInRight stagger-3">
              <div className="text-2xl font-bold text-mibbs-secondary mb-2">Ad Credit Giveaways</div>
              <p className="text-gray-600 text-sm">Top performers win credits monthly</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fadeInUp stagger-4">
          <button className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-8 py-4 rounded-xl hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-pulse-glow">
            Explore Dashboard Demo
          </button>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-mibbs-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
      </div>
    </section>
  );
};

export default DashboardAgency;