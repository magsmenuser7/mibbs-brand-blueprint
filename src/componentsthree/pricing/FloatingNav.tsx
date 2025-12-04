import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 0.1]
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBg,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur
      }}
    >
      <motion.div
        style={{
          opacity: borderOpacity,
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              d="M20 5 L35 20 L20 35 L5 20 Z"
              fill="url(#logo-gradient)"
            />
          </svg>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MIBBS
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Pricing', href: '/pricing', active: true },
            { label: 'Tools & Templates', href: '/tools' },
            { label: 'About', href: '/about' }
          ].map((link, i) => (
            <MagneticNavLink
              key={i}
              href={link.href}
              active={link.active}
              delay={i * 0.05}
            >
              {link.label}
            </MagneticNavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="/login"
            className="hidden md:inline-block text-gray-700 font-medium hover:text-purple-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.a>

          <motion.a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <motion.div
        className="md:hidden overflow-hidden bg-white border-t"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 space-y-4">
          {[
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Pricing', href: '/pricing', active: true },
            { label: 'Tools & Templates', href: '/tools' },
            { label: 'About', href: '/about' }
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`block py-2 font-medium ${
                link.active ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="/login" className="block py-2 font-medium text-gray-700">
            Login
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

function MagneticNavLink({ children, href, active, delay }: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={`relative text-[15px] font-medium py-2 transition-colors ${
        active ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {children}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ scaleX: active ? 1 : 0 }}
        animate={{ scaleX: isHovered || active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.a>
  );
}
