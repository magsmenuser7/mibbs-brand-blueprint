import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CursorGradient() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 mix-blend-multiply hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
        width: '800px',
        height: '800px',
        background:
          'radial-gradient(circle 400px at center, rgba(124, 58, 237, 0.08), transparent 70%)',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
}
