import { Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import magsmenlogo from '../../assets/magsmen-new-version.png';
import magsmenlogoold from '../../assets/magsmen-new-version-removebg-preview.png';

const Hero = () => {
  return (
    <section className="w-full px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-sm text-gray-500 mb-4 sm:mb-6"
        >
          Home &gt; Tools &amp; Templates
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <motion.h1
            className="text-[28px] sm:text-4xl lg:text-[40px] font-semibold text-[#5A4A6A] mb-4 relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="relative"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #5A4A6A, #9333EA, #EC4899, #5A4A6A)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Business Toolkit
            </motion.span>
            <motion.span
              className="absolute -top-2 -right-8"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Simple tools and templates made for Indian business owners. No confusing jargon just practical solutions you can use today.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto sm:min-w-[320px] h-[52px] px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white font-semibold text-base rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto relative overflow-hidden group"
          onClick={() => {
            const firstSection = document.getElementById('brand-budgeting');
            firstSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <Briefcase className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Start Using Tools</span>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 sm:mt-8"
        >
          <motion.p
            className="text-sm text-gray-500 mb-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Powered by <span className="font-semibold text-[#5A4A6A]">Magsmen</span> – India's Leading Brand Consultants
          </motion.p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-40 h-40  rounded-lg flex items-center justify-center text-white font-bold text-sm  transition-shadow duration-300 cursor-pointer"
            >
              <img src={magsmenlogoold} alt="magsmenlogo" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
