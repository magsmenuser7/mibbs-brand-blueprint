import { motion } from 'framer-motion';

const layers = [
  { radius: 60, label: 'Pincode Intelligence', delay: 0.4 },
  { radius: 80, label: 'Industry Intelligence', delay: 0.6 },
  { radius: 100, label: 'Regional Intelligence', delay: 0.8 }
];

function generateDataPoints(cx: number, cy: number, radius: number, count: number) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    });
  }
  return points;
}

export default function IntelligenceLayersChart() {
  const allDataPoints = [
    ...generateDataPoints(100, 100, 60, 12),
    ...generateDataPoints(100, 100, 80, 18),
    ...generateDataPoints(100, 100, 100, 24)
  ];

  return (
    <motion.div
      className="intelligence-layers max-w-md mx-auto my-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-auto">
        {/* Center logo */}
        <motion.circle
          cx={100}
          cy={100}
          r={20}
          fill="#5A4A6A"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.text
          x={100}
          y={105}
          textAnchor="middle"
          fontSize={10}
          fontWeight="bold"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          MIBBS
        </motion.text>

        {/* Concentric circles */}
        {layers.map((layer, i) => (
          <g key={i}>
            <motion.circle
              cx={100}
              cy={100}
              r={layer.radius}
              fill="transparent"
              stroke={i === 0 ? "#9333EA" : i === 1 ? "#EC4899" : "#5A4A6A"}
              strokeWidth={2}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: layer.delay, ease: "easeInOut" }}
            />

            <motion.text
              x={100}
              y={100 - layer.radius - 8}
              textAnchor="middle"
              fontSize={9}
              fontWeight="600"
              fill="#5A4A6A"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: layer.delay + 1 }}
            >
              {layer.label}
            </motion.text>
          </g>
        ))}

        {/* Animated data points */}
        {allDataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={1.5}
            fill="#EC4899"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{
              scale: [0, 1.2, 1],
              opacity: 1
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 2 + (i * 0.02)
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
