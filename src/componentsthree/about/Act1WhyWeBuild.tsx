import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BudgetWasteChart from './charts/BudgetWasteChart';
import IndiaChaosMap from './charts/IndiaChaosMap';
import aboutimg from '../../assets/OChqC8uW.png';
import { Italic } from 'lucide-react';

export default function Act1WhyWeBuild() {
  const headline = "1. Why I Exist";

  const words = headline.split(' ');

  const paragraphs = [
    {
      text: "Every business wants to grow.",
      emphasis: false
    },
    {
      text: "But growth decisions often come down to one difficult question: ",
      emphasis: true
    },
    {
      text: <strong>Where should the money go?</strong>,
      emphasis: false
    },
    {
      text: "Marketing, hiring, product development, expansion, technology, operations — every option competes for the same limited budget. ",
      emphasis: false
    },

    {
      text: "Most teams rely on instinct, scattered spreadsheets, or past habits to make these decisions. Sometimes it works. Often, it leaves opportunities unexplored. ",
      emphasis: false
    },
    {
      text: "That’s where I come in. ",
      emphasis: false
    },

    {
      text: (
        <>
          I exist to help you{" "}
          <strong>think more clearly about budget allocation.</strong>
        </>
      ),
      emphasis: false
    },
    {
      text: "Instead of guessing, I analyze how different budget distributions could affect your goals. I simulate scenarios and highlight where your resources might create the most impact.",
      emphasis: false
    },
    {
      text: (
        <span>
          I don’t replace your judgment. I simply help you{" "}
          <strong>see the decision space more clearly.</strong>
        </span>
      ),
      emphasis: false
    },
    {
      text: (
        <span>
          Think of me as a {" "}
          <strong>strategic thinking partner </strong>
          for one of the most important decisions
          your business makes:
        </span>
      ),
      emphasis: false
    },

    {
      text: <strong>how to invest its resources. </strong>,
      emphasis: false
    },

     {
      text: <strong>2. How to Use Me  </strong>,
      emphasis: false
    },
    {
      text: "Using me is simple. You bring the context. I help you explore the possibilities. ",
      emphasis: false
    },

    {
    text: (
      <strong className="text-[25px] font-bold">
        Step 1 — Tell me about your business
      </strong>
    ),
    emphasis: false
  },
  {
    text: (
      <>
        <p className="mb-4">
          Start by sharing the key inputs that define your situation:
        </p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Your total available budget</li>
          <li>
            The departments or initiatives competing for funding
          </li>
          <li>
            Your primary business goals (growth, profitability,
            market expansion, etc.)
          </li>
        </ul>
      </>
    ),
    emphasis: false
  },
  {
      text: "The more context you provide, the more relevant my analysis becomes. ",
      emphasis: false
    },

    {
  text: (
    <>
      <strong className="text-[25px] font-bold block mb-6">
        Step 2 — Define priorities
      </strong>

      <p className="mb-6 leading-relaxed">
        Not every company values the same outcomes.
        <br />
        You can indicate what matters most to you:
      </p>

      <ul className="list-disc pl-10 space-y-3">
        <li>Faster growth</li>
        <li>Risk reduction</li>
        <li>Balanced spending</li>
        <li>Strategic experimentation</li>
      </ul>
    </>
  ),
  emphasis: false
},

 {
      text: "These priorities guide how I evaluate possible allocations.",
      emphasis: false
    },


    {
  text: (
    <>
      <strong className="text-[25px] font-bold block mb-6">
        Step 3 — Explore allocation scenarios
      </strong>

      <p className="mb-8 leading-relaxed">
        Once I understand your inputs, I generate possible
        budget allocations and analyze their potential outcomes.
      </p>

      <p className="mb-6 leading-relaxed">
        You’ll see:
      </p>

      <ul className="list-disc pl-10 space-y-3">
        <li>Different distribution strategies</li>
        <li>Trade-offs between options</li>
        <li>Potential risks</li>
        <li>Areas of opportunity</li>
      </ul>
    </>
  ),
  emphasis: false
},
{
 text: (
        <span>
          You can adjust inputs and instantly explore{" "}
          <strong>new scenarios. </strong>
        </span>
      ),
      emphasis: false
    },


    {
    text: (
      <strong className="text-[25px] font-bold">
        Step 4 — Make the final decision 
      </strong>
    ),
    emphasis: false
  },


  {
 text: (
        <span>
          I provide analysis —{" "}
          <strong>you stay in control. </strong>
        </span>
      ),
      emphasis: false
    },

    {
 text: (
        <span>
          You decide which allocation aligns best with your vision, strategy and risk tolerance.
          
        </span>
      ),
      emphasis: false
    },

     {
      text: <strong>3. How You Can Trust Me  </strong>,
      emphasis: false
    },

    {
 text: (
        <span>
          Trust in decision tools comes from{" "}
          <strong>transparency and control. </strong>
        </span>
      ),
      emphasis: false
    },

     {
 text: (
        <span>
          Here’s how I approach both. {" "}
          
        </span>
      ),
      emphasis: false
    },

    {
      text: <strong>I show my reasoning </strong>,
      emphasis: false
    },

    {
 text: (
        <span>
          Whenever I suggest an allocation, I explain the logic behind it. You can see what factors 
influenced the analysis and how the scenario was evaluated. {" "}
          
        </span>
      ),
      emphasis: false
    },

     {
 text: (
        <span>
          No hidden logic. No mysterious outputs. {" "}
          
        </span>
      ),
      emphasis: false
    },

     {
      text: <strong>I support your thinking — I don’t replace it  </strong>,
      emphasis: false
    },

     {
 text: (
        <span>
         My role is to assist decision-making, not automate it.{" "}
          
        </span>
      ),
      emphasis: false
    },

     {
 text: (
        <span>
          Your experience, industry knowledge, and strategy remain central to every choice. I 
simply provide{" "}
          <strong> structured insights to support your judgment. </strong>
        </span>
      ),
      emphasis: false
    },

     {
      text: <strong>Your data stays yours  </strong>,
      emphasis: false
    },

     {
 text: (
        <span>
         The information you provide is used only to generate analysis for your session. It is not 
sold, repurposed, or used to make decisions outside your control. 
          
        </span>
      ),
      emphasis: false
    },


     {
 text: (
        <span>
You decide what to share and how to use the insights. 
          
        </span>
      ),
      emphasis: false
    },

    {
      text: <strong>You can challenge every result </strong>,
      emphasis: false
    },

     {
 text: (
        <span>
If a recommendation doesn’t feel right, you can adjust inputs, priorities, or constraints 
and immediately see alternative outcomes. 
          
        </span>
      ),
      emphasis: false
    },

     {
 text: (
        <span>
In other words:
          
        </span>
      ),
      emphasis: false
    },

    {
      text: <strong>You remain the strategist.  </strong>,
      emphasis: false
    },

    {
      text: <strong>I help you see the map. </strong>,
      emphasis: false
    },





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
          className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Meet Your Budget Intelligence
        </motion.p>

        {/* Headline with word-by-word animation */}
        <h1 className="text-3xl md:text-5xl font-bold text-left mb-8 md:mb-12 leading-tight">
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
