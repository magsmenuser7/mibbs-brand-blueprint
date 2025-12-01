export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[10%] left-[-10%] w-72 h-72 rounded-full bg-purple-100/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            How MIBBS Works – In 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600">
            From confusion to clarity in less than 5 minutes
          </p>
        </div>

        {/* Step 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 md:p-10 border-2 border-purple-200 shadow-xl relative">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  {['Industry Type', 'Your City', 'Monthly Budget'].map((label) => (
                    <div key={label}>
                      <div className="text-xs text-gray-600 mb-2">{label}</div>
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-400">
                        {label === 'Monthly Budget' ? '₹' : `Select your ${label.toLowerCase()}...`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 animate-float">
                <span>⚡</span>
                Takes 2 min
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full mb-6">
              <span className="text-xl font-bold text-white">01</span>
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Step One</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Tell Us About Your Business
            </h3>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Share basic details: your industry, your city, your goals, and your monthly budget.
              We keep it simple—no complicated forms.
            </p>

            <div className="space-y-3">
              {['Simple 4-field form', 'No technical knowledge needed', 'Takes less than 2 minutes'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-yellow-500 px-5 py-2 rounded-full mb-6">
              <span className="text-xl font-bold text-white">02</span>
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Step Two</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Get Your Clear Budget Plan
            </h3>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our AI creates a personalized plan showing exactly how much to spend on digital,
              branding, content, offline, and more—based on real data from your industry and location.
            </p>

            <div className="space-y-3">
              {['Industry-specific recommendations', 'City-wise spending benchmarks', 'Channel-by-channel breakdown'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-600" />
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl p-8 md:p-10 border-2 border-yellow-200 shadow-xl relative">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-sm text-gray-600 mb-4 font-semibold">Your Budget Split</div>
                {[
                  { label: 'Digital Marketing', percent: 75, color: 'bg-purple-600' },
                  { label: 'Brand Identity', percent: 45, color: 'bg-pink-600' },
                  { label: 'Content Creation', percent: 60, color: 'bg-yellow-500' }
                ].map((item) => (
                  <div key={item.label} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-2 text-xs">
                      <span className="text-gray-700">{item.label}</span>
                      <span className={`font-semibold ${item.color.replace('bg-', 'text-')}`}>{item.percent}%</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 animate-float-delayed">
                <span>🎯</span>
                AI-Optimized
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-10 border-2 border-blue-200 shadow-xl relative">
              <div className="space-y-3">
                {['Digital Studio', 'Brand Creators', 'Creative Hub'].map((name, i) => (
                  <div key={name} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                      i === 0 ? 'from-purple-600 to-pink-600' :
                      i === 1 ? 'from-pink-600 to-yellow-500' :
                      'from-green-500 to-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">{name}</div>
                      <div className="text-xs text-gray-600">Mumbai • ⭐ 4.{9-i} ({24+i*7} reviews)</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 animate-float">
                <span>✓</span>
                Verified
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 px-5 py-2 rounded-full mb-6">
              <span className="text-xl font-bold text-white">03</span>
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Step Three</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Connect With Trusted Agencies
            </h3>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We show you verified agencies in your city who can help you execute your plan.
              Browse profiles, see reviews, and connect directly—all within MIBBS.
            </p>

            <div className="space-y-3">
              {['Only verified, trusted agencies', 'Real reviews from businesses', 'Direct connect—no middlemen'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
            Get My Free Budget Plan →
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Takes 5 minutes • No credit card needed
          </p>
        </div>
      </div>
    </section>
  );
}
