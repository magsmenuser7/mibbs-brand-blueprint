import { motion } from 'framer-motion';
import { Shield, Compass, Map } from 'lucide-react';
import BeforeAfterChart from './charts/BeforeAfterChart';

const beliefCards = [
  {
    icon: Shield,
    title: "Every MSME Deserves Financial Discipline",
    description: "No business should waste money because they don't know the benchmarks. MIBBS brings structure to spending."
  },
  {
    icon: Compass,
    title: "Branding Must Be Engineered, Not Guessed",
    description: "Successful brands plan with data, not gut feeling. MIBBS turns guesswork into strategy."
  },
  {
    icon: Map,
    title: "India's Growth Needs India-First Solutions",
    description: "Built for India's diversity accounting for pincode-level behavior, regional psychology, and cultural nuances."
  }
];

export default function Act2OurMission() {
  return (
    <section className="act2 bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Section Label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#5A4A6A] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-[#5A4A6A] mb-10 leading-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          To Bring Clarity, Confidence, and Structure
          to Every Rupee Spent on Branding in India
        </motion.h2>

        {/* Mission Statement */}
        <motion.div
          className="text-center text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-12 max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>MIBBS is not a tool.<br />It's a financial operating system for brand spending.</p>

          <p className="mt-6">We exist to turn India's unstructured branding chaos into a system of:</p>

          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">✓</span>
              <span><strong>Discipline</strong> Every rupee deserves a reason</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">✓</span>
              <span><strong>Clarity</strong> Every decision deserves structure</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">✓</span>
              <span><strong>Confidence</strong> Every business deserves to grow without fear</span>
            </div>
          </div>

          <p className="mt-6">This is not about better marketing.<br />This is about smarter planning.</p>
        </motion.div>

        {/* Three Core Beliefs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {beliefCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="belief-card bg-[#F3F0F5] rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(90, 74, 106, 0.15)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="icon mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + (i * 0.15),
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <Icon className="w-16 h-16 mx-auto text-[#5A4A6A]" strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-xl font-semibold text-[#5A4A6A] mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Before/After Chart */}
        <BeforeAfterChart />

        {/* Closing Statement */}
        <motion.div
          className="text-center text-xl md:text-2xl italic text-[#5A4A6A] mt-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p>We believe every rupee deserves intention.<br />
          Every brand deserves clarity.
          And every business deserves to grow with confidence, not fear.</p>

          <p className="mt-6 font-semibold">That's why MIBBS exists.</p>
        </motion.div>
      </div>
    </section>
  );
}
