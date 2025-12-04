import { motion } from 'framer-motion';
import EnhancedQuiz from './EnhancedQuiz';
import FloatingStatsCards from './FloatingStatsCards';
import { QuizQuestion, QuizAnswers, Plan } from '../../types/pricing';

interface PricingHeroProps {
  questions: QuizQuestion[];
  onQuizComplete: (plan: Plan, answers: QuizAnswers) => void;
}

export default function PricingHero({ questions, onQuizComplete }: PricingHeroProps) {
  return (
    <section
      className="relative min-h-[95vh] flex items-center justify-center px-4 md:px-10 pt-32 md:pt-40 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={i * 60}
              y1="0"
              x2={i * 60}
              y2="800"
              stroke="rgba(124, 58, 237, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
          {[...Array(14)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={i * 60}
              x2="1200"
              y2={i * 60}
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          className="relative inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/90 backdrop-blur-xl border border-purple-200 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <span className="relative text-xl">⚡</span>
          <span className="relative text-sm font-semibold text-purple-600">
            Trusted by 10,000+ Indian Businesses
          </span>
        </motion.div>

        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-3 text-gray-900"
          >
            Find Your
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Perfect Plan
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none text-gray-900"
          >
            In 30 Seconds
          </motion.div>
        </div>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Answer 3 simple questions. Get a personalized recommendation.
          <br />
          No guessing. No confusion. Just clarity.
        </motion.p>

        <motion.div
          className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <EnhancedQuiz questions={questions} onComplete={onQuizComplete} />
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span>4.8/5 from 2,400+ reviews</span>
          </div>
          <div className="hidden md:block text-gray-300">•</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✓</span>
            <span>Free forever plan</span>
          </div>
          <div className="hidden md:block text-gray-300">•</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <span>No credit card required</span>
          </div>
        </motion.div>
      </div>

      <FloatingStatsCards />

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-sm font-medium">Explore Plans</span>
        <div className="w-7 h-11 border-2 border-current rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-current rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
