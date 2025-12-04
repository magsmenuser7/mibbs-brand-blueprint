import { motion } from 'framer-motion';
import { Plan } from '../../types/pricing';

interface PlanCardProps {
  plan: Plan;
  billingCycle: 'monthly' | 'annual';
  index: number;
}

export default function PlanCard({ plan, billingCycle, index }: PlanCardProps) {
  const isPopular = plan.badge === 'MOST POPULAR';
  const isEnterprise = plan.id === 'enterprise';

  const displayPrice = billingCycle === 'annual' && plan.annualPrice
    ? plan.annualPrice
    : `${plan.price}${plan.priceUnit}`;

  const cardContent = (
    <div className={`relative bg-white rounded-2xl p-6 md:p-8 h-full flex flex-col ${
      isPopular ? 'border-4' : 'border-2'
    } border-gray-200 transition-all duration-300`}
    style={{
      borderImage: isPopular ? 'linear-gradient(135deg, #9333EA, #EC4899) 1' : undefined,
      boxShadow: isPopular ? '0 20px 60px rgba(147, 51, 234, 0.2)' : '0 4px 16px rgba(0,0,0,0.08)'
    }}>
      {plan.badge && (
        <motion.div
          animate={isPopular ? {
            boxShadow: [
              '0 0 0 0 rgba(147, 51, 234, 0.4)',
              '0 0 0 10px rgba(147, 51, 234, 0)',
              '0 0 0 0 rgba(147, 51, 234, 0)'
            ]
          } : {}}
          transition={isPopular ? {
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          } : {}}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold text-white uppercase tracking-wide"
          style={{
            background: plan.badgeColor,
            fontSize: isPopular ? '13px' : '12px'
          }}
        >
          {plan.badge}
        </motion.div>
      )}

      <h3 className="text-2xl font-bold mb-2" style={{ color: '#5A4A6A' }}>
        {plan.name}
      </h3>

      <p className="text-sm text-gray-600 italic mb-6">{plan.tagline}</p>

      <div className="mb-4">
        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
        {plan.priceUnit && (
          <span className="text-gray-600 text-base ml-1">{plan.priceUnit}</span>
        )}
        {billingCycle === 'annual' && plan.annualPrice && (
          <div className="text-sm text-green-600 font-medium mt-1">
            Save 20% with annual billing
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{plan.description}</p>

      <div className="h-px bg-gray-200 mb-6" />

      <div className="flex-1 mb-6">
        {plan.features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className={`flex items-start gap-3 mb-4 ${feature.locked ? 'opacity-50' : ''}`}
          >
            <span className="text-xl flex-shrink-0">{feature.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-sm">{feature.label}</div>
              <div className="text-sm text-gray-600">{feature.value}</div>
            </div>
            {feature.locked && <span className="text-base">🔒</span>}
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold mb-2" style={{ color: '#5A4A6A' }}>
          ✨ Ideal for:
        </p>
        <ul className="space-y-1 text-xs text-gray-600">
          {plan.idealFor.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      {plan.testimonial && (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 mb-6">
          <p className="text-sm italic text-amber-900 mb-3 leading-relaxed">
            "{plan.testimonial.quote}"
          </p>
          <div className="flex items-center gap-3">
            <img
              src={plan.testimonial.avatar}
              alt={plan.testimonial.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-amber-900">
              {plan.testimonial.author}
            </span>
          </div>
        </div>
      )}

      <motion.a
        href={plan.cta.link}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`block text-center py-4 rounded-xl font-semibold transition-all ${
          plan.cta.style === 'gradient'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : plan.cta.style === 'outline-gold'
            ? 'bg-white text-amber-700 border-2 border-amber-500'
            : 'bg-white text-purple-700 border-2 border-purple-600'
        }`}
      >
        {plan.cta.text} →
      </motion.a>
    </div>
  );

  if (isEnterprise) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="rounded-2xl p-1"
          style={{
            background: 'linear-gradient(90deg, #9333EA, #EC4899, #F59E0B, #9333EA)',
            backgroundSize: '200% 100%'
          }}
        >
          {cardContent}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: isPopular ? '0 24px 64px rgba(147, 51, 234, 0.3)' : '0 12px 32px rgba(0,0,0,0.12)' }}
    >
      {cardContent}
    </motion.div>
  );
}
