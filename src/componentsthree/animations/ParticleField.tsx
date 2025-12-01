import { motion } from 'framer-motion';

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 30 }: ParticleFieldProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: i % 2 === 0 ? '#7C3AED' : '#EC4899',
              opacity: Math.random() * 0.3 + 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay
            }}
          />
        );
      })}
    </div>
  );
}
