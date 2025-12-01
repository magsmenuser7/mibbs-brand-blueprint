import { motion } from 'framer-motion';

interface SectionNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isSticky: boolean;
}

const sections = [
  { id: 'brand-budgeting', label: 'Brand Budgeting' },
  { id: 'marketing-templates', label: 'Marketing Templates' },
  { id: 'strategy-guides', label: 'Strategy Guides' }
];

const SectionNavigation = ({ activeSection, onSectionClick, isSticky }: SectionNavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        isSticky ? 'sticky top-0 z-40 bg-white/95 backdrop-blur-sm' : 'relative'
      } transition-all duration-300`}
    >
      <div className="overflow-x-auto scrollbar-hide py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 justify-start sm:justify-center min-w-max sm:min-w-0">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-5 py-2.5 rounded-full font-medium text-sm sm:text-base whitespace-nowrap
                  transition-all duration-300 min-h-[40px] relative overflow-hidden
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-purple-400 hover:text-purple-600 hover:shadow-md'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ opacity: 0.3 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default SectionNavigation;
