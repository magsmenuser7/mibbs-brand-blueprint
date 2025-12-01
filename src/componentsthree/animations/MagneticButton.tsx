import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 150) {
        mouseX.set(distanceX * 0.3);
        mouseY.set(distanceY * 0.3);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.span
        className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        animate={{ left: ['-100%', '200%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
      />

      <motion.span
        className="absolute inset-0 -inset-1 border-2 border-purple-500/50 rounded-[inherit] pointer-events-none"
        animate={{
          scale: [1, 1.4],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />

      {children}
    </motion.button>
  );
}
