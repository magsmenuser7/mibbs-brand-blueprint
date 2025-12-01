export function BenefitsSection() {
  const benefits = [
    {
      icon: '📊',
      title: 'Personalized Budget Plan',
      description: 'See exactly where your money should go for the highest impact. Clear splits across all marketing channels.',
      tags: ['AI-optimized', 'Industry-specific'],
      gradient: 'from-purple-100 to-white',
      border: 'border-purple-200',
      tagBg: 'bg-white border-purple-200 text-purple-600'
    },
    {
      icon: '📍',
      title: 'Local Market Insights',
      description: 'Your plan is based on real data from your state, city, and category. Know what works in your area.',
      tags: ['Pincode-level', 'Regional trends'],
      gradient: 'from-pink-100 to-white',
      border: 'border-pink-200',
      tagBg: 'bg-white border-pink-200 text-pink-600'
    },
    {
      icon: '✓',
      title: 'Verified Agency Matches',
      description: 'Find trusted agencies near you for design, marketing, branding, and content. No more risky decisions.',
      tags: ['Verified only', 'Real reviews'],
      gradient: 'from-green-100 to-white',
      border: 'border-green-200',
      tagBg: 'bg-white border-green-200 text-green-600'
    },
    {
      icon: '🎯',
      title: 'Growth Roadmap',
      description: 'Know what to do first, next, and later. Clear steps with no confusion. Track your progress month by month.',
      tags: ['Step-by-step', 'Progress tracking'],
      gradient: 'from-blue-100 to-white',
      border: 'border-blue-200',
      tagBg: 'bg-white border-blue-200 text-blue-600'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
            What You Get
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Everything You Need to Grow Confidently
          </h2>
          <p className="text-lg text-gray-600">
            Four guarantees that make MIBBS different from anything else
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${benefit.gradient} border-2 ${benefit.border} rounded-2xl p-8 relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-default`}
            >
              {/* Background Icon */}
              <div className="absolute -top-5 -right-5 text-9xl opacity-5">
                {benefit.icon}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 relative z-10">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 relative z-10">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed mb-5 relative z-10">
                {benefit.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {benefit.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${benefit.tagBg} border px-3 py-1.5 rounded-full text-xs font-semibold`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-200">
          <p className="text-xl md:text-2xl font-semibold text-gray-700 italic">
            "Your business. Your city. Your plan."
          </p>
        </div>
      </div>
    </section>
  );
}
