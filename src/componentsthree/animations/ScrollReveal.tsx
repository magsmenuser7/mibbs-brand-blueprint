import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }
          : {}
      }
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
}

export function StaggeredGrid({ children, className = '' }: StaggeredGridProps) {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={gridRef}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.12
          }
        }
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
          whileHover={{
            scale: 1.05,
            y: -8,
            transition: { duration: 0.2 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
