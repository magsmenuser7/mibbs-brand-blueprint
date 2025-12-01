export function ProofSection() {
  const testimonials = [
    {
      rating: 5,
      text: 'Before MIBBS, I was spending ₹80,000/month on random ads. Now I spend ₹60,000 smartly and my sales grew by 40%. This system is a game-changer for small businesses.',
      author: 'Vijay Kumar',
      role: 'Sweet Shop Owner, Vijayawada',
      result: '+40% Business Growth',
      image: '👨‍💼'
    },
    {
      rating: 5,
      text: 'I run a skincare D2C brand. MIBBS showed me I was overspending on Instagram and underspending on Google. Fixed it in one month — my ROAS went from 2.1x to 3.8x.',
      author: 'Priya Sharma',
      role: 'Founder, Glow Naturals (D2C Brand)',
      result: 'ROAS: 2.1x → 3.8x',
      image: '👩‍💼'
    },
    {
      rating: 5,
      text: 'As an agency, MIBBS helps me create professional budget proposals in 5 minutes instead of 5 hours. My clients trust the data-backed recommendations. I closed 3 new clients in my first week.',
      author: 'Rajesh Reddy',
      role: 'Founder, Digital Edge Agency, Hyderabad',
      result: '+3 Clients in 7 Days',
      image: '👨‍💻'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4">
              See It In Action
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              This Is What You'll Get
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                In 5 Minutes
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A complete brand budget breakdown — personalized to your business, city, and industry.
              Ready to share with your team or accountant.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">10,000+</div>
                <div className="text-xs text-gray-600">Budgets Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">₹45Cr+</div>
                <div className="text-xs text-gray-600">Money Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-1">4.8★</div>
                <div className="text-xs text-gray-600">Average Rating</div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Create My Budget Now →
            </button>
          </div>

          {/* Dashboard Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-2xl border-4 border-white relative">
              <div className="text-center">
                <div className="text-7xl mb-4">📊</div>
                <p className="text-gray-700 font-semibold text-lg">Dashboard Preview</p>
                <p className="text-gray-500 text-sm mt-2">Your personalized budget breakdown</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute top-[15%] -left-4 bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-100 animate-float hidden md:block">
              <div className="text-xs text-gray-600 mb-1">📊 Monthly Budget</div>
              <div className="text-xl font-bold text-purple-600">₹2,40,000</div>
            </div>

            <div className="absolute top-[50%] -right-4 bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-100 animate-float-delayed hidden md:block">
              <div className="text-xs text-gray-600 mb-1">📈 Expected ROI</div>
              <div className="text-xl font-bold text-green-600">+18% Growth</div>
            </div>

            <div className="absolute bottom-[15%] -left-4 bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-100 animate-float hidden md:block">
              <div className="text-xs text-gray-600 mb-1">💰 Money Saved</div>
              <div className="text-xl font-bold text-pink-600">+₹45,000/mo</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Real Results From Real Indian Businesses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border-2 border-transparent hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Rating */}
                <div className="text-yellow-500 text-lg mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>

                {/* Text */}
                <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <strong className="text-sm text-gray-900 block">{testimonial.author}</strong>
                    <span className="text-xs text-gray-600">{testimonial.role}</span>
                  </div>
                </div>

                {/* Result Badge */}
                <div className="flex justify-center">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-semibold">
                    {testimonial.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Strip */}
          <div className="text-center p-6 bg-pink-50 rounded-xl">
            <p className="text-base text-gray-900">
              <strong className="text-purple-600">Join 10,000+ Indian businesses</strong> who stopped guessing
              and started growing with data-backed budgets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
