import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { MagneticButton } from './animations/MagneticButton';
import { ParticleField } from './animations/ParticleField';
import { CountingNumber } from './animations/CountingNumber';
import { Link } from "react-router-dom";

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Dashboard visibility tracking for entrance animation
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(dashboardRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white min-h-[85vh] flex items-center px-4 py-20 md:px-10 overflow-hidden"
    >
      {/* Animated Morphing Background */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating Particles */}
      <ParticleField count={30} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Text Content */}
        <div>
          {/* Eyebrow */}
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            India's First Brand Budgeting System
          </motion.p>

          <motion.p
            className="text-sm font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
          Built on eight years of Indian market research across 10,000 plus pincodes.
          </motion.p>

          {/* Main Headline - Word by Word Reveal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {['Know', 'Exactly', 'Where', 'to'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.5,
                  ease: 'easeOut'
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                delay: 0.62,
                duration: 0.8,
                ease: 'easeOut'
              }}
            >
              Spend Your Marketing Money
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            MIBBS gives you a clear plan for how much to spend, where to spend, and which agency to
            trust.
          </motion.p>

          {/* Value Props */}
          <motion.div
            className="mb-10 space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 1.3
                }
              }
            }}
          >
            {[
              { icon: '🎯', text: 'Simple budget plan in 5 minutes' },
              { icon: '📍', text: 'Based on your city and industry' },
              { icon: '✨', text: 'Free forever no credit card needed' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    delay: 1.5 + i * 0.15,
                    duration: 0.5
                  }}
                >
                  <span className="text-white text-sm font-bold">✓</span>
                </motion.div>
                <span className="text-base text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <Link to="/mibbsapp">
              <MagneticButton className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center gap-2">
                Get Your Budgeting Data
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>

            <Link to="/how-it-works">
              <motion.button
                className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.button>
            </Link>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            No credit card required • Takes 5 minutes • 100% Free
          </motion.p>
        </div>

        {/* Right: Dashboard Preview with Parallax */}
        <motion.div
          className="relative mt-10"
        // style={{ y: dashboardY, opacity: dashboardOpacity }}
        // initial={{ opacity: 0, y: 100, scale: 0 }}
        // animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div ref={dashboardRef} className={`relative transition-all duration-1000 delay-300 ${isVisible ? '' : ''}`}>
            {/* Dashboard Image Placeholder */}
            {/* Right Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Brand Budget Overview</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold">₹2.4L</div>
                    <div className="text-sm opacity-90">Monthly Budget</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="text-2xl font-bold">+18%</div>
                    <div className="text-sm opacity-90">ROI Growth</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Digital Marketing</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Brand Identity</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-5/12 animate-pulse delay-300"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Creation</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/5 animate-pulse delay-700"></div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <div className="text-sm font-semibold">+₹45K Saved</div>
              </div>
{/* 
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg shadow-lg animate-bounce delay-500">
                <div className="text-sm font-semibold">AI Optimized</div>
              </div> */}
            </div>

            {/* Floating Stat Cards with Enhanced Animation */}
            {/* <motion.div
              className="absolute top-[10%] -left-10 bg-white px-5 py-4 rounded-xl shadow-xl border border-gray-100 hidden md:block"
              animate={{
                y: [-5, 5, -5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <div className="text-xs text-gray-600 mb-1">Money Saved</div>
              <div className="text-2xl font-bold text-green-500">
                ₹<CountingNumber value={45000} />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[15%] -right-8 bg-white px-5 py-4 rounded-xl shadow-xl border border-gray-100 hidden md:block"
              animate={{
                y: [5, -5, 5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <div className="text-xs text-gray-600 mb-1">ROI Growth</div>
              <div className="text-2xl font-bold text-purple-600">
                +<CountingNumber value={18} />%
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-current rounded-full relative">
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-current rounded-full"
            animate={{
              y: [0, 16],
              opacity: [1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
