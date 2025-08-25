import React from 'react';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';

const PricingAgency = () => {
  const plans = [
    {
      name: "Starter",
      credits: "5 Credits",
      price: "₹0",
      leads: "2–3",
      validity: "7 days",
      icon: Zap,
      popular: false,
      features: [
        "Basic lead access",
        "Standard support",
        "Proposal builder",
        "Credit wallet"
      ]
    },
    {
      name: "Growth",
      credits: "10 Credits",
      price: "₹1,999",
      leads: "6–8",
      validity: "30 days",
      icon: Star,
      popular: true,
      features: [
        "Priority lead access",
        "Advanced filters",
        "Proposal templates",
        "Client messaging",
        "Basic analytics"
      ]
    },
    {
      name: "Scale",
      credits: "35 Credits",
      price: "₹4,999",
      leads: "25–28",
      validity: "60 days",
      icon: Crown,
      popular: false,
      features: [
        "Premium lead access",
        "Advanced analytics",
        "Team collaboration",
        "Custom proposals",
        "Priority support",
        "Integration access"
      ]
    },
    {
      name: "Pro",
      credits: "100 Credits",
      price: "₹9,999",
      leads: "80+",
      validity: "90 days",
      icon: Rocket,
      popular: false,
      features: [
        "Unlimited lead access",
        "Advanced AI matching",
        "White-label proposals",
        "Dedicated support",
        "Custom integrations",
        "Enterprise features",
        "Priority certification"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your agency's growth stage. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fadeInUp stagger-${index + 1} ${
                plan.popular ? 'ring-2 ring-mibbs-primary scale-105 animate-pulse-glow' : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mibbs-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-xl mb-4 hover:scale-110 hover:rotate-3 transition-all duration-300 ${
                  plan.popular ? 'bg-mibbs-light text-mibbs-primary' : 'bg-gray-100 text-gray-600'
                }`}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-sm text-gray-500 mb-4">{plan.credits}</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <div className="text-gray-600">
                  <div>{plan.leads} leads</div>
                  <div>{plan.validity} validity</div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white hover:from-mibbs-secondary hover:to-mibbs-accent transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105'
                }`}
              >
                {plan.price === "₹0" ? "Start Free" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeInUp stagger-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-gray-900 mb-2">No cuts from your deals</div>
              <p className="text-gray-600">Keep 100% of your project earnings</p>
            </div>
            <div className="hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-gray-900 mb-2">No expiry on unused credits</div>
              <p className="text-gray-600">Your credits stay active until used</p>
            </div>
            <div className="hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-gray-900 mb-2">Pause, upgrade or top-up anytime</div>
              <p className="text-gray-600">Complete flexibility in your subscription</p>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-mibbs-secondary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default PricingAgency;