import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EpilogueFounderLetter() {
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const letterParagraphs = [
    "When I started Magsmen 15 years ago, I had no idea how many times I'd hear the same question:",
    "'How much should I spend?'",
    "It's a simple question with a complicated reality.",
    "Because branding in India has always been unstructured. No benchmarks. No standards. No system.",
    "And I watched year after year as hardworking business owners spent money they couldn't afford on strategies they didn't understand, with agencies they couldn't trust.",
    "I couldn't watch anymore.",
    "MIBBS is my answer to that question.\nIt's the system I wish existed when I started.\nIt's the clarity I wish every entrepreneur had access to.",
    "This isn't just software to me.\nIt's a responsibility.",
    "A responsibility to ensure that no business in India makes branding decisions in the dark ever again.",
    "If you're reading this, you're part of the solution.",
    "Welcome to the movement."
  ];

  return (
    <section className="epilogue bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Section Label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#5A4A6A] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          A Message From The Founder
        </motion.p>

        {/* Letter Header */}
        <motion.p
          className="text-lg italic text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dear Fellow Business Builder,
        </motion.p>

        {/* Letter Body */}
        <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
          {letterParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="whitespace-pre-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: letterParagraphs.length * 0.3 }}
        >
          <p className="text-lg text-gray-800 italic mb-8">
            With purpose and conviction,
          </p>

          {/* Signature SVG Animation */}
          <svg
            viewBox="0 0 300 100"
            className="w-48 mb-2"
          >
            <motion.path
              d="M20,50 Q30,30 50,45 Q70,60 90,45 Q110,30 130,50 L150,40 Q170,30 180,50"
              stroke="#5A4A6A"
              strokeWidth={2.5}
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 2.5,
                ease: "easeInOut"
              }}
            />
          </svg>

          <p className="text-sm text-gray-600">
            Founder & CEO, MIBBS | Magsmen Brand Consultants
          </p>
        </motion.div>

        {/* Closing Photo with Parallax */}
        <motion.div
          ref={photoRef}
          className="closing-photo mt-12 rounded-2xl overflow-hidden shadow-xl"
          style={{ y }}
        >
          <div className="bg-gradient-to-br from-[#5A4A6A] to-[#9333EA] aspect-video flex items-center justify-center text-white">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🤝</div>
              <p className="text-lg font-medium">With MIBBS users in Hyderabad, 2024</p>
            </div>
          </div>

          <motion.figcaption
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="p-4 text-center text-sm text-gray-600 italic bg-white"
          >
            With MIBBS users in Hyderabad, 2024
          </motion.figcaption>
        </motion.div>
      </div>
    </section>
  );
}
