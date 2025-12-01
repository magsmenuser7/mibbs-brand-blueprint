import { Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomCTA = () => {
  const handleStartUsingTools = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full px-4 py-12 sm:py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          backgroundSize: '200% 100%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-16 h-16 rounded-full bg-white"
            />
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10 cursor-pointer"
            >
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold text-white mb-3"
        >
          Start Building Your Brand Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Download tools, plan your budget, and grow your business with confidence.
        </motion.p>

        <motion.button
          onClick={handleStartUsingTools}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto sm:min-w-[320px] h-[52px] px-8 py-3 bg-white text-purple-600 font-semibold text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">Start Using Tools</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm text-white/80 mt-6 flex items-center justify-center gap-2 flex-wrap"
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            100% Free
          </motion.span>
          <span>•</span>
          <span>No Sign-Up Required</span>
          <span>•</span>
          <span>Instant Download</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default BottomCTA;
