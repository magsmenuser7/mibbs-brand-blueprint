import { User, ShoppingBag, Briefcase } from 'lucide-react';

export function WhoItsForSection() {
  const personas = [
    {
      icon: User,
      title: 'Small Business Owners',
      location: '📍 Retail shops, Restaurants, Service providers',
      problem: '"I don\'t know how much to spend on marketing each month"',
      solutions: [
        'Tells you exact monthly budget (₹5K - ₹50K range)',
        'Breaks it down by channel (Instagram, Google, etc.)',
        'Connects you to local agencies'
      ],
      proof: {
        quote: 'Saved ₹28,000 in 3 months',
        author: 'Vijay, Bakery Owner, Chennai'
      },
      color: 'purple',
      featured: false
    },
    {
      icon: ShoppingBag,
      title: 'D2C & Online Brands',
      location: '📍 E-commerce, Shopify stores, Instagram sellers',
      problem: '"I\'m spending ₹2L/month but don\'t know if it\'s working"',
      solutions: [
        'Shows you industry benchmarks (top 25%)',
        'Tracks ROI by platform (Meta, Google Ads, etc.)',
        'Predicts when to scale/pause spend'
      ],
      proof: {
        quote: 'Increased ROAS from 2.1x to 3.8x',
        author: 'Priya, Skincare Brand, Bangalore'
      },
      color: 'pink',
      featured: true
    },
    {
      icon: Briefcase,
      title: 'Marketing Agencies',
      location: '📍 Digital agencies, Consultants, Freelancers',
      problem: '"Clients don\'t trust my budget recommendations"',
      solutions: [
        'Generates data-backed proposals in 5 minutes',
        'White-label reports with your branding',
        'Gets you verified on MIBBS marketplace'
      ],
      proof: {
        quote: 'Closed 3 clients in first week',
        author: 'Rajesh, Digital Agency, Hyderabad'
      },
      color: 'blue',
      featured: false
    }
  ];

  const colorClasses = {
    purple: {
      icon: 'bg-purple-100',
      iconColor: 'text-purple-600',
      border: 'border-transparent hover:border-purple-300'
    },
    pink: {
      icon: 'bg-pink-100',
      iconColor: 'text-pink-600',
      border: 'border-purple-300 shadow-lg'
    },
    blue: {
      icon: 'bg-blue-100',
      iconColor: 'text-blue-600',
      border: 'border-transparent hover:border-blue-300'
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Built For Real Indian Businesses Like Yours
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're just starting or scaling fast, MIBBS grows with you
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {personas.map((persona) => {
            const colors = colorClasses[persona.color as keyof typeof colorClasses];
            const Icon = persona.icon;

            return (
              <div
                key={persona.title}
                className={`bg-white rounded-2xl p-8 border-2 ${colors.border} transition-all duration-300 transform hover:-translate-y-2 relative`}
              >
                {/* Featured Badge */}
                {persona.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${colors.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {persona.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-6">
                  {persona.location}
                </p>

                {/* Problem */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                  <strong className="text-sm text-yellow-900 block mb-1">Your Problem:</strong>
                  <p className="text-sm text-gray-900 italic">{persona.problem}</p>
                </div>

                {/* Solutions */}
                <div className="mb-6">
                  <strong className="text-sm text-purple-600 block mb-3">What MIBBS Does:</strong>
                  <ul className="space-y-2">
                    {persona.solutions.map((solution) => (
                      <li key={solution} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors duration-200 mb-4">
                  {persona.featured ? 'Optimize My Spending →' :
                   persona.color === 'blue' ? 'Join As Agency →' : 'Get My Budget Plan →'}
                </button>

                {/* Proof */}
                <div className="pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    <em className="text-purple-600 font-semibold">"{persona.proof.quote}"</em>
                    <br />
                    <span className="text-xs">{persona.proof.author}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance */}
        <div className="text-center p-6 bg-white rounded-xl border-2 border-dashed border-purple-300">
          <p className="text-base text-gray-900">
            👉 <strong>Not sure which one you are?</strong> Start free and MIBBS will guide you.
          </p>
        </div>
      </div>
    </section>
  );
}
