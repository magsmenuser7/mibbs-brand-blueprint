import { motion } from 'framer-motion';
import { TrustBadge } from '../../types/pricing';

interface TrustBadgesProps {
  badges: TrustBadge[];
}

export default function TrustBadges({ badges }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 py-16">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-4xl">{badge.icon}</div>
          <div className="font-semibold text-center" style={{ color: '#5A4A6A' }}>
            {badge.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
