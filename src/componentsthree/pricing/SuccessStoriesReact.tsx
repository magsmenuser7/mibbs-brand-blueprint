import { motion } from 'framer-motion';
import { SuccessStory } from '../../types/pricing';

interface SuccessStoriesProps {
  stories: SuccessStory[];
}

export default function SuccessStoriesReact({ stories }: SuccessStoriesProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
          style={{ color: '#5A4A6A' }}
        >
          Real Results from Real Businesses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 mb-12"
        >
          See how MIBBS helps businesses like yours grow
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100"
            >
              <div
                className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-white mb-4"
                style={{ background: '#9333EA' }}
              >
                {story.plan} PLAN
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={story.logo}
                  alt={story.business}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <h4 className="font-semibold text-gray-900">{story.business}</h4>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 mb-5 text-center">
                <div className="text-2xl font-bold text-green-800 mb-1">{story.metric}</div>
                <div className="text-sm text-green-700">with MIBBS</div>
              </div>

              <p className="text-gray-700 italic mb-5 leading-relaxed">"{story.quote}"</p>

              <div className="flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{story.author}</div>
                  <div className="text-sm text-gray-600">{story.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
