import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CountingNumber } from './animations/CountingNumber';

export function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 63, label: 'Indian Businesses', suffix: 'M+', color: 'text-purple-600' },
    { value: 1000, label: 'Verified Agencies', suffix: '+', color: 'text-pink-600' },
    { value: 1, label: 'Brand Budgeting System', prefix: '#', color: 'text-green-600' }
  ];

  return (
    <section ref={ref} className="bg-gray-50 py-8 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-around items-center gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <motion.div
                className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}
                whileHover={{ scale: 1.1 }}
              >
                {stat.prefix}
                <CountingNumber value={stat.value} />
                {stat.suffix}
              </motion.div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}

          {/* Made in India Badge */}
          <motion.div
            className="bg-gradient-to-r from-yellow-100 to-yellow-200 px-6 py-3 rounded-full text-sm font-semibold text-yellow-900 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🇮🇳
            </motion.span>
            Made in India
          </motion.div>
        </div>
      </div>
    </section>
  );
}
