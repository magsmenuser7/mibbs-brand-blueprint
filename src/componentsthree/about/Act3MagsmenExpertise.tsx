import { motion } from 'framer-motion';
import { MapPin, Building2, Rocket, BarChart3 } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import IntelligenceLayersChart from './charts/IntelligenceLayersChart';

const statsData = [
  { icon: '📜', number: 15, suffix: '+', label: 'Years Experience', color: '#5A4A6A' },
  { icon: '🏢', number: 300, suffix: '+', label: 'Brands Built', color: '#9333EA' },
  { icon: '₹', number: 500, suffix: 'Cr+', label: 'Value Created', color: '#EC4899' }
];

const frameworkCards = [
  {
    icon: MapPin,
    title: "Pincode-Level Intelligence",
    description: "Local market rates, customer behavior, and competitor spending patterns"
  },
  {
    icon: Building2,
    title: "Industry-Specific Algorithms",
    description: "Sector-specific budget strategies from retail to tech to FMCG"
  },
  {
    icon: Rocket,
    title: "Stage-Based Planning",
    description: "Idea → Business → Brand → Leader journey frameworks"
  },
  {
    icon: BarChart3,
    title: "Real-Time Market Data",
    description: "Continuous updates from 50,000+ Indian businesses"
  }
];

function StatItem({ stat, index }: { stat: typeof statsData[0], index: number }) {
  const { count, ref } = useCountUp(stat.number, 2);

  return (
    <motion.div
      className="stat-item text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: "spring",
        stiffness: 200
      }}
    >
      <motion.div
        className="stat-icon text-5xl mb-4"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: index * 0.5
        }}
      >
        {stat.icon}
      </motion.div>

      <div ref={ref} className="stat-number text-4xl font-bold mb-2" style={{ color: stat.color }}>
        {count}{stat.suffix}
      </div>

      <div className="stat-label text-gray-600">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Act3MagsmenExpertise() {
  return (
    <section className="act3 bg-gradient-to-b from-[#F3F0F5] to-white py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Section Label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#5A4A6A] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built on Proven Expertise
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-[#5A4A6A] mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          MIBBS Is Built by People Who've Walked<br />
          the Journey 300+ Times
        </motion.h2>

        {/* Intro Text */}
        <motion.div
          className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>This isn't our first time solving branding problems.<br />
          This is our 300th.</p>

          <p className="mt-4">MIBBS represents 15+ years of brand consulting experience,<br />
          distilled into a system that works at scale.</p>
        </motion.div>

        {/* Magsmen Authority Block */}
        <div className="magsmen-block max-w-3xl mx-auto mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#5A4A6A] to-[#9333EA] rounded-2xl flex items-center justify-center text-white text-4xl font-bold">
                M
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-[#5A4A6A] mb-3">About Magsmen</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Magsmen is India's leading brand strategy and positioning consultancy, working with businesses from startups to Fortune 25 companies.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our team has shaped 300+ Indian brands across technology, FMCG, retail, education, healthcare, and manufacturing.
              </p>
              <p className="text-gray-700 leading-relaxed">
                MIBBS is the culmination of insights gathered from years of successful brand-building campaigns across India's diverse markets.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Credibility Stats */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 my-14">
          {statsData.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* Framework Showcase */}
        <div className="mt-16">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center text-[#5A4A6A] mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Frameworks That Power MIBBS
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworkCards.map((card, i) => {
              const Icon = card.icon;
              const row = Math.floor(i / 2);
              const col = i % 2;
              const delay = (row * 0.1) + (col * 0.05);

              return (
                <motion.div
                  key={i}
                  className="framework-card bg-white border border-purple-200 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 30, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: delay,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 24px rgba(90, 74, 106, 0.12)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <Icon className="w-12 h-12 mx-auto text-[#5A4A6A]" strokeWidth={1.5} />
                  </motion.div>

                  <h4 className="text-lg font-semibold text-[#5A4A6A] mb-3">
                    {card.title}
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Intelligence Layers Chart */}
        <IntelligenceLayersChart />

        {/* Founder Section */}
        <div className="founder-section mt-16">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-10 items-start max-w-4xl mx-auto">
            <motion.div
              className="founder-photo mx-auto md:mx-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-48 h-48 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#5A4A6A] to-[#9333EA] flex items-center justify-center text-white text-6xl font-bold shadow-lg"
              >
                SN
              </motion.div>
            </motion.div>

            <motion.div
              className="founder-bio text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-[#5A4A6A] mb-1">
                Meet Sandeep N.
              </h3>
              <p className="text-gray-600 mb-4">Founder & Chief Architect</p>

              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                Sandeep is a visionary brand strategist who's redefined how Indian businesses build lasting identities.
              </p>

              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                As founder of Magsmen Brand Consultants, he's been the strategic force behind Fortune 25 companies, IPL sponsors, and 2,500+ entrepreneurs.
              </p>

              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                Recognized as one of India's Top 100 Marketing Leaders and named 'Consultant of the Year 2023', Sandeep's philosophy is clear:
              </p>

              <motion.blockquote
                className="border-l-4 border-[#5A4A6A] pl-5 mt-6 text-xl italic text-[#5A4A6A]"
                initial={{ opacity: 0, borderLeftWidth: 0 }}
                whileInView={{
                  opacity: 1,
                  borderLeftWidth: 4
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                "Brands must be engineered, not left to chance."
              </motion.blockquote>

              <p className="text-lg text-gray-800 leading-relaxed mt-6">
                MIBBS is built to bring that vision to every business in India.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
