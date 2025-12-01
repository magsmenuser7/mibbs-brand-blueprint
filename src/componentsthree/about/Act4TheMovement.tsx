import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RippleEffectChart from './charts/RippleEffectChart';

const movementPillars = [
  {
    icon: '📈',
    headline: "Empowering MSMEs",
    text: "Giving 63 million businesses the clarity to grow without fear"
  },
  {
    icon: '🤝',
    headline: "Uplifting Communities",
    text: "Every rupee saved is reinvested into families, teams, and local economies"
  },
  {
    icon: '🏆',
    headline: "Creating Future Leaders",
    text: "Transforming confused founders into confident decision-makers"
  }
];

export default function Act4TheMovement() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const gradientX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const visionParagraphs = [
    "MIBBS is the beginning of something bigger than budgeting.",
    "It's about bringing financial discipline to an entire ecosystem.\nAbout empowering MSMEs with clarity they've never had.\nAbout creating confident business leaders who make decisions with data, not desperation.",
    "Every time a shop owner in Vijayawada plans their budget with MIBBS,\nthey're not just using software they're joining a movement toward structured growth.",
    "Every time an entrepreneur in Indore stops overspending on the wrong channels,\nthey're proving that discipline beats guesswork.",
    "Every time an MSME saves ₹50,000 because MIBBS showed them where to cut waste,\nthey're investing that money into their family, their team, their community.",
    "This is the ripple effect we're building.\n\nOne budget plan at a time.\nOne confident decision at a time.\nOne empowered business at a time."
  ];

  return (
    <section
      ref={sectionRef}
      className="act4 relative bg-gradient-to-br from-[#9333EA] to-[#EC4899] text-white py-14 md:py-24 overflow-hidden"
      style={{
        backgroundSize: '150% 150%'
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#9333EA] to-[#EC4899]"
        style={{
          backgroundPosition: gradientX,
          backgroundSize: '150% 150%'
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        {/* Section Label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join The Movement
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-12 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          We're Not Just Building a Tool.<br />
          We're Empowering a Nation.
        </motion.h2>

        {/* Movement Vision Narrative */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12">
          {visionParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Movement Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-14">
          {movementPillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="pillar text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="icon text-6xl mb-4"
                animate={{
                  y: [-5, 5, -5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              >
                {pillar.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">
                {pillar.headline}
              </h3>

              <p className="text-white/90 leading-relaxed">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ripple Effect Chart */}
        <RippleEffectChart />

        {/* Call to Action */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl mb-8 leading-relaxed">
            This movement is just beginning.<br />
            And we want you to be part of it.<br /><br />

            Whether you're a business owner planning your first budget,<br />
            an agency looking for structure,<br />
            or an entrepreneur ready to grow with confidence<br /><br />

            MIBBS is here to guide you.
          </p>

          <motion.button
            className="cta-button w-full max-w-md mx-auto h-14 bg-white text-[#5A4A6A] text-base font-semibold rounded-full shadow-2xl flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0.4)",
                "0 0 0 20px rgba(255, 255, 255, 0)",
                "0 0 0 0 rgba(255, 255, 255, 0)"
              ]
            }}
            transition={{
              duration: 0.6,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }
            }}
          >
            Start Your Journey with MIBBS

            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.p
            className="text-sm text-white/80 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            100% Free • No Credit Card • Join 10,000+ Indian Businesses
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
