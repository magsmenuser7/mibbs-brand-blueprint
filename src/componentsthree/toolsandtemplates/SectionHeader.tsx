import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SectionHeader = ({ icon: Icon, title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center sm:text-left mb-6 sm:mb-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-4 mx-auto sm:mx-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-700"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 2, opacity: 0.5 }}
          transition={{ duration: 0.4 }}
        />
        <Icon className="w-6 h-6 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl sm:text-3xl font-semibold text-[#5A4A6A] mb-2 relative inline-block"
      >
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-base sm:text-lg text-gray-600 max-w-2xl"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
