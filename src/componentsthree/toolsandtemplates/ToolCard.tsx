import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  description: string;
  buttonText: React.ReactNode;
  buttonVariant?: 'outline' | 'solid';
  onAction: () => void;
  badge?: string;
}

const ToolCard = ({
  icon: Icon,
  title,
  problem,
  description,
  buttonText,
  buttonVariant = 'outline',
  onAction,
  badge
}: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? {
          background: [
            'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)',
            'linear-gradient(225deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)',
            'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)',
          ],
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-3 relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-20"
            animate={isHovered ? {
              scale: [1, 1.5, 1],
              opacity: [0, 0.3, 0],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Icon className="w-5 h-5 text-white relative z-10" />
        </motion.div>

        <motion.h3
          className="text-lg font-semibold text-[#5A4A6A] mb-1 group-hover:text-purple-600 transition-colors duration-300"
          animate={isHovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-sm text-gray-500 italic mb-2 relative"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.span
            className="absolute -left-2 top-0 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            "
          </motion.span>
          {problem}
          <motion.span
            className="absolute -right-2 bottom-0 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            "
          </motion.span>
        </motion.p>

        <p className="text-base text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full h-12 px-6 rounded-full font-semibold text-base relative overflow-hidden
            transition-all duration-300
            ${
              buttonVariant === 'solid'
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-xl hover:from-purple-700 hover:to-pink-600'
                : 'border-2 border-purple-600 text-purple-600 bg-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white hover:border-transparent hover:shadow-lg'
            }
          `}
        >
          <motion.span
            className="absolute inset-0 bg-white"
            initial={{ x: '-100%', opacity: 0.3 }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10">{buttonText}</span>
        </motion.button>

        {badge && (
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 text-xs rounded-full border border-purple-100 font-medium"
            >
              {badge}
            </motion.span>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default ToolCard;
