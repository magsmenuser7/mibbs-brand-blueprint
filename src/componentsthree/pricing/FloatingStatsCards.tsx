import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingStatsCards() {
  const { scrollY } = useScroll();

  const card1Y = useTransform(scrollY, [0, 500], [0, -80]);
  const card2Y = useTransform(scrollY, [0, 500], [0, -120]);
  const card3Y = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <>
      <motion.div
        className="absolute top-[25%] left-[5%] hidden lg:flex items-center gap-4 px-6 py-5 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl"
        style={{ y: card1Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="text-4xl">💰</div>
        <div>
          <div className="text-3xl font-extrabold text-purple-600 leading-none mb-1">
            <CountUpNumber end={45000} prefix="₹" />
          </div>
          <div className="text-sm text-gray-600">Avg. Money Saved/mo</div>
        </div>
        <motion.div
          className="absolute -top-2 -right-2 text-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          ✨
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[50%] right-[5%] hidden lg:flex items-center gap-4 px-6 py-5 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl"
        style={{ y: card2Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="text-4xl">🏢</div>
        <div>
          <div className="text-3xl font-extrabold text-purple-600 leading-none mb-1">
            <CountUpNumber end={10000} suffix="+" />
          </div>
          <div className="text-sm text-gray-600">Indian Businesses</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[8%] hidden lg:flex items-center gap-4 px-6 py-5 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl"
        style={{ y: card3Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <div className="text-4xl">📈</div>
        <div>
          <div className="text-3xl font-extrabold text-purple-600 leading-none mb-1">
            <CountUpNumber end={287} suffix="%" />
          </div>
          <div className="text-sm text-gray-600">Avg. ROI Increase</div>
        </div>
      </motion.div>
    </>
  );
}

function CountUpNumber({ end, prefix = '', suffix = '' }: {
  end: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
