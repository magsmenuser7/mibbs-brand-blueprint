// PricingPageWrapper.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
// import FloatingNav from '../componentsthree/pricing/FloatingNav';
import PricingHero from '../componentsthree/pricing/PricingHero';
import PlanCard from '../componentsthree/pricing/PlanCard';
import ComparisonTable from '../componentsthree/pricing/ComparisonTable';
import SuccessStoriesReact from '../componentsthree/pricing/SuccessStoriesReact';
import FAQS from '../componentsthree/pricing/FAQS';
import TrustBadges from '../componentsthree/pricing/TrustBadges';
import { plans, quizQuestions, comparisonData, successStories, faqs, trustBadges } from '../data/pricingData';
import { Plan, QuizAnswers } from '../types/pricing';

const PricingPageWrapper: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [recommendedPlan, setRecommendedPlan] = useState<Plan | null>(null);

  const handleQuizComplete = (plan: Plan, _answers: QuizAnswers) => {
    setRecommendedPlan(plan);
    setTimeout(() => {
      const element = document.getElementById('plan-cards');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      {/* <FloatingNav /> */}

      {/* Hero / Quiz */}
      <PricingHero questions={quizQuestions} onQuizComplete={handleQuizComplete} />

      {/* Plans Section */}
      <section id="plan-cards" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#5A4A6A' }}>
            Choose Your Growth Path
          </h2>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-base font-semibold ${billingCycle === 'monthly' ? 'text-purple-900' : 'text-gray-400'}`}>
              Monthly
            </span>

            <motion.button
              onClick={() => setBillingCycle(prev => (prev === 'monthly' ? 'annual' : 'monthly'))}
              className={`w-14 h-8 rounded-full transition-colors ${billingCycle === 'annual' ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <motion.div
                animate={{ x: billingCycle === 'annual' ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-7 h-7 bg-white rounded-full shadow-md ml-0.5"
              />
            </motion.button>

            <span className={`text-base font-semibold ${billingCycle === 'annual' ? 'text-purple-900' : 'text-gray-400'}`}>
              Annual
            </span>

            {billingCycle === 'annual' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                Save 20%
              </motion.span>
            )}
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Annual offer section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center border-2 border-blue-500"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-5xl mb-4"
          >
            💰
          </motion.div>

          <h3 className="text-3xl font-bold text-blue-900 mb-3">Save 20% with Annual Billing</h3>
          <p className="text-blue-800 mb-6">
            Pay yearly and get 2 months free. Switch anytime, no lock-in.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBillingCycle('annual')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            See Annual Prices
          </motion.button>
        </motion.div>
      </section>

      {/* Comparison table */}
      <section className="py-16">
        <ComparisonTable data={comparisonData} />
      </section>

      {/* Success Stories */}
      <SuccessStoriesReact stories={successStories} />

      {/* FAQ Section */}
      <FAQS faqs={faqs} />

      {/* Trust badges */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto">
          <TrustBadges badges={trustBadges} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Ready to Take Control of Your Brand Budget?
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl mb-10 opacity-95"
          >
            Join 10,000+ Indian businesses growing with MIBBS.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-10 py-4 rounded-xl font-semibold text-lg"
            >
              Start Free Today
            </motion.a>

            <motion.a
              href="/contact-sales"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg"
            >
              Contact Sales
            </motion.a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm mt-6 opacity-80"
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default PricingPageWrapper;
