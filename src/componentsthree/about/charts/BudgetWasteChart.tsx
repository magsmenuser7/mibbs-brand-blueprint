import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '../../../hooks/useCountUp';

const budgetWasteData = [
  {
    label: 'Completely Wasted',
    value: 26,
    color: '#EF4444',
    description: '₹26,000 lost on ineffective channels'
  },
  {
    label: 'Inefficient Spending',
    value: 34,
    color: '#F97316',
    description: '₹34,000 on wrong timing/targeting'
  },
  {
    label: 'Effective Investment',
    value: 40,
    color: '#10B981',
    description: '₹40,000 producing actual ROI'
  }
];

export default function BudgetWasteChart() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { count: wasteCount, ref: countRef } = useCountUp(26, 2);

  return (
    <motion.div
      ref={ref}
      className="chart-container max-w-md mx-auto my-14"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* SVG Donut Chart */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {(() => {
            let currentAngle = 0;
            return budgetWasteData.map((item, index) => {
              const angle = (item.value / 100) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const x1 = 100 + 70 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 100 + 70 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 100 + 70 * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const y2 = 100 + 70 * Math.sin(((startAngle + angle) * Math.PI) / 180);

              const largeArc = angle > 180 ? 1 : 0;

              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 70 70 0 ${largeArc} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              return (
                <motion.path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.2,
                    ease: "easeOut"
                  }}
                />
              );
            });
          })()}

          {/* Inner white circle for donut effect */}
          <circle cx="100" cy="100" r="50" fill="#3B2C4A" />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div ref={countRef} className="text-4xl md:text-5xl font-bold text-white">
            {inView ? wasteCount : 0}%
          </div>
          <div className="text-sm md:text-base text-purple-200">Wasted</div>
          <div className="text-xs text-purple-300 mt-1">On Every ₹1L Spent</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-3">
        {budgetWasteData.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 + (i * 0.15), duration: 0.4 }}
          >
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{item.label}: {item.value}%</div>
              <div className="text-purple-200 text-xs">{item.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
