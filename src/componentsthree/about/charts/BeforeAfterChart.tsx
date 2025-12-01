import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const comparisonData = {
  before: [
    { label: 'Budget Planning Clarity', value: 20, color: '#EF4444' },
    { label: 'Agency Trust Level', value: 30, color: '#EF4444' },
    { label: 'ROI Visibility', value: 25, color: '#EF4444' },
    { label: 'Decision Confidence', value: 35, color: '#EF4444' }
  ],
  after: [
    { label: 'Budget Planning Clarity', value: 90, color: '#10B981' },
    { label: 'Agency Trust Level', value: 85, color: '#10B981' },
    { label: 'ROI Visibility', value: 88, color: '#10B981' },
    { label: 'Decision Confidence', value: 92, color: '#10B981' }
  ]
};

function BarChart({ data, title, delay }: { data: typeof comparisonData.before, title: string, delay: number }) {
  return (
    <div className="comparison-column">
      <motion.h4
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="text-xl font-semibold mb-6 text-center"
        style={{ color: data[0].color }}
      >
        {title}
      </motion.h4>

      {data.map((item, i) => (
        <div key={i} className="bar-row mb-5">
          <span className="block text-sm text-gray-600 mb-2 font-medium">
            {item.label}
          </span>

          <div className="bar-container w-full h-10 bg-gray-100 rounded-lg overflow-hidden relative">
            <motion.div
              className="bar h-full rounded-lg flex items-center justify-end pr-3"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: delay + (i * 0.1),
                ease: "easeOut"
              }}
            >
              <motion.span
                className="text-white font-semibold text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + (i * 0.1) + 0.5 }}
              >
                {item.value}%
              </motion.span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BeforeAfterChart() {
  return (
    <motion.div
      className="comparison-chart grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-14 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <BarChart data={comparisonData.before} title="Before MIBBS" delay={0.2} />
      <BarChart data={comparisonData.after} title="With MIBBS" delay={0.7} />
    </motion.div>
  );
}
