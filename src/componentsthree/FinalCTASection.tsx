import { Shield } from 'lucide-react';
import { Link } from "react-router-dom";

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Stop Guessing. Start Growing.
          <br />
          <span className="block mt-2">Get Your Free Budget In 5 Minutes.</span>
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto">
          Join 10,000+ Indian businesses who know exactly where to spend their marketing money — and where not to.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            'Personalized budget plan',
            'Local market insights',
            'Verified agency matches',
            'Shareable PDF report'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-left text-sm">
              <span className="flex-shrink-0 text-lg">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
      <Link to="/mibbsapp" className="inline-block">
        <button className="w-full md:w-auto bg-white text-purple-600 px-12 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200 mb-6">
          Build My Brand Budget →
        </button>
      </Link>
        

        {/* Trust Signals */}
        <div className="space-y-2 mb-10">
          <p className="text-sm flex items-center justify-center gap-2">
            <span>🔒</span>
            <strong>100% Free Forever</strong> • No Credit Card Needed • Cancel Anytime
          </p>
          <p className="text-sm opacity-90">
            Used by 10,000+ businesses across India
          </p>
        </div>

        {/* Guarantee Badge */}
        <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl text-left max-w-2xl mx-auto border border-white/20">
          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <strong className="text-base block mb-1">30-Day Money Back Guarantee</strong>
            <p className="text-sm opacity-90">
              If any paid plan doesn't save you money, get a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
