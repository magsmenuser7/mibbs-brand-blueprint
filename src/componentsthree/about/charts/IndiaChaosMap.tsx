import { motion } from 'framer-motion';

const citiesData = [
  { name: 'Guntur', x: 54, y: 56, businesses: '45,000+' },
  { name: 'Vizag', x: 60, y: 52, businesses: '62,000+' },
  { name: 'Hyderabad', x: 48, y: 52, businesses: '1.2L+' },
  { name: 'Chennai', x: 52, y: 62, businesses: '2.5L+' },
  { name: 'Coimbatore', x: 45, y: 66, businesses: '78,000+' },
  { name: 'Pune', x: 40, y: 48, businesses: '1.8L+' },
  { name: 'Indore', x: 40, y: 40, businesses: '95,000+' },
  { name: 'Surat', x: 33, y: 42, businesses: '1.1L+' }
];

export default function IndiaChaosMap() {
  return (
    <motion.div
      className="chaos-map-container max-w-2xl mx-auto my-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-auto">
        {/* Simplified India map outline */}
        <motion.path
          d="M 35,20 L 40,18 L 45,20 L 48,22 L 50,25 L 55,28 L 58,30 L 62,32 L 64,35 L 65,40 L 66,45 L 65,50 L 64,55 L 62,60 L 58,65 L 55,68 L 52,70 L 48,72 L 45,73 L 42,72 L 38,70 L 35,68 L 32,65 L 30,60 L 28,55 L 27,50 L 28,45 L 30,40 L 32,35 L 33,30 L 34,25 Z"
          stroke="#5A4A6A"
          strokeWidth="0.5"
          fill="transparent"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* City markers with pulse animation */}
        {citiesData.map((city, i) => (
          <g key={city.name}>
            {/* Outer pulse ring (infinite) */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={1.5}
              fill="#EC4899"
              opacity={0.3}
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 2.5, 0] }}
              viewport={{ once: true }}
              transition={{
                delay: 2 + (i * 0.1),
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            />

            {/* Inner dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={0.8}
              fill="#EC4899"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 2 + (i * 0.1),
                duration: 0.3,
                type: "spring",
                stiffness: 200
              }}
            />

            {/* City label */}
            <motion.text
              x={city.x}
              y={city.y - 3}
              fontSize="2.5"
              fontWeight="600"
              fill="#FFFFFF"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.3 + (i * 0.1) }}
            >
              {city.name}
            </motion.text>

            {/* Business count */}
            <motion.text
              x={city.x}
              y={city.y + 5}
              fontSize="1.8"
              fill="#E9D5FF"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 + (i * 0.1) }}
            >
              {city.businesses}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Caption */}
      <motion.p
        className="text-center text-sm text-purple-200 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3.5 }}
      >
        The same budgeting chaos exists in every city across India
      </motion.p>
    </motion.div>
  );
}
