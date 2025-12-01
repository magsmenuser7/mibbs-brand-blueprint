import { motion } from 'framer-motion';

const ripples = [
  { radius: 20, label: '1 Business', delay: 0.5 },
  { radius: 35, label: '10 Employees', delay: 0.8 },
  { radius: 50, label: '100 Families', delay: 1.1 },
  { radius: 65, label: '1000 Customers', delay: 1.4 }
];

function generateRippleParticles(cx: number, cy: number, startRadius: number, endRadius: number, count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    particles.push({
      startX: cx + Math.cos(angle) * startRadius,
      startY: cy + Math.sin(angle) * startRadius,
      endX: cx + Math.cos(angle) * endRadius,
      endY: cy + Math.sin(angle) * endRadius
    });
  }
  return particles;
}

export default function RippleEffectChart() {
  const particles = generateRippleParticles(120, 120, 15, 70, 40);

  return (
    <motion.div
      className="ripple-effect-chart max-w-md mx-auto my-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <svg viewBox="0 0 240 240" className="w-full h-auto">
        {/* Center MIBBS logo */}
        <motion.circle
          cx={120}
          cy={120}
          r={10}
          fill="#FFFFFF"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
        />
        <motion.text
          x={120}
          y={124}
          textAnchor="middle"
          fontSize={8}
          fontWeight="700"
          fill="#5A4A6A"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          MIBBS
        </motion.text>

        {/* Ripple waves */}
        {ripples.map((ripple, i) => (
          <g key={i}>
            {/* Animated circle */}
            <motion.circle
              cx={120}
              cy={120}
              r={ripple.radius}
              fill="transparent"
              stroke="#FFFFFF"
              strokeWidth={2}
              opacity={0.4}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: [0, 0.6, 0.4]
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: ripple.delay,
                ease: "easeOut"
              }}
            />

            {/* Label */}
            <motion.text
              x={120}
              y={120 - ripple.radius - 5}
              fill="#FFFFFF"
              fontSize={7}
              fontWeight="600"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ripple.delay + 0.5 }}
            >
              {ripple.label}
            </motion.text>
          </g>
        ))}

        {/* Particle effects shooting outward */}
        {particles.map((particle, i) => (
          <motion.circle
            key={i}
            cx={particle.startX}
            cy={particle.startY}
            r={1}
            fill="#FFFFFF"
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0
            }}
            whileInView={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: particle.endX - particle.startX,
              y: particle.endY - particle.startY
            }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              delay: 2 + (i * 0.05),
              ease: "easeOut"
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
