import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BudgetWasteChart from './charts/BudgetWasteChart';
import IndiaChaosMap from './charts/IndiaChaosMap';
import aboutimg from '../../assets/OChqC8uW.png';

export default function Act1WhyWeBuild() {
  const headline = "For Years, We Watched India's Business Owners Waste Money Because Nobody Showed Them How Much to Spend";
  const words = headline.split(' ');

  const paragraphs = [
    {
      text: "We didn't build MIBBS because we wanted to create another software product.\n\nWe built it because for years across Guntur, Vizag, Hyderabad, Coimbatore, Indore, Surat, and hundreds of other cities we kept seeing the same painful pattern:",
      emphasis: false
    },
    {
      text: "Business owners spending money on branding without a plan.\nAgencies pitching without any benchmark.\nFounders confused, frustrated, trusting the wrong people.\n\nMoney wasted. Time wasted. Opportunities wasted.",
      emphasis: true
    },
    {
      text: "In every single consulting session, we heard the same question:\n\n'Sandeep, just tell me how much should I spend?'\n\nNot which agency.\nNot which campaign.\nAlways the same desperate question:\n\n'What's the right budget?'\n\nIt wasn't a branding question.\nIt was a survival question.",
      emphasis: false
    },
    {
      text: "That's when we realized something uncomfortable:\n\nIndia doesn't lack marketing tools.\nIndia lacks a planning system.\n\nMSMEs were spending 12–40% of their ad money inefficiently not because they were careless, but because nobody gave them structure.\n\nNobody told them what was normal for their city, their industry, their stage.\n\nThe branding industry in India ran on guesswork, not science.\n\nAnd every day that passed, thousands more businesses were making decisions in the dark.",
      emphasis: false
    }
  ];



  const finalParagraph = "We couldn't watch this anymore.\n\nAfter advising 300+ MSMEs, after seeing the same chaos in 63 million businesses across the country, we made a decision:\n\nIf we don't solve this budgeting problem at scale, this chaos will continue forever.\n\nSo we built MIBBS.\n\nNot to be impressive.\nBut because we felt responsible.";

  return (
    <section className="act1 relative bg-gradient-to-br from-[#3B2C4A] to-[#1F2937] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-14 md:py-24 max-w-4xl">

        {/* Hero Image */}
        <motion.div
          className="hero-image relative w-full h-60 md:h-96 rounded-2xl overflow-hidden mb-8 md:mb-12"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src={aboutimg}
            alt="Business owner overwhelmed by financial budgeting decisions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3B2C4A]/80" />
        </motion.div>

        {/* Section Label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          The Truth We Couldn't Ignore
        </motion.p>

        {/* Headline with word-by-word animation */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + (i * 0.05),
                ease: "easeOut"
              }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Narrative Paragraphs */}
        <div className="space-y-8 text-lg md:text-xl leading-relaxed">
          {paragraphs.slice(0, 1).map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="whitespace-pre-line"
            >
              {para.text}
            </motion.div>
          ))}

          {paragraphs.slice(1, 2).map((para, i) => (
            <motion.div
              key={i + 1}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="whitespace-pre-line text-purple-200 pl-6 border-l-4 border-pink-500"
            >
              {para.text}
            </motion.div>
          ))}

          {paragraphs.slice(2, 3).map((para, i) => (
            <motion.div
              key={i + 2}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="whitespace-pre-line"
            >
              {para.text}
            </motion.div>
          ))}

          {paragraphs.slice(3).map((para, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="whitespace-pre-line"
            >
              {para.text}
            </motion.div>
          ))}
        </div>

        {/* Budget Waste Chart */}
        <BudgetWasteChart />

        {/* Final Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl leading-relaxed whitespace-pre-line mt-8"
        >
          {finalParagraph}
        </motion.div>

        {/* India Chaos Map */}
        <IndiaChaosMap />

        {/* Pull Quote */}
        <motion.blockquote
          className="mt-12 md:mt-16 text-2xl md:text-4xl italic text-left border-l-4 border-pink-500 pl-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
            initial={{ backgroundPosition: "200% center" }}
            whileInView={{ backgroundPosition: "0% center" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          >
            "MIBBS was built because Indian businesses deserved better than blind spending."
          </motion.span>
        </motion.blockquote>
      </div>
    </section>
  );
}
