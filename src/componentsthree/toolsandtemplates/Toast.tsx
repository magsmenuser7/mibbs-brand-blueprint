import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ opacity: 0.3 }}
            />

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="relative z-10"
            >
              <CheckCircle className="w-6 h-6" />
            </motion.div>

            <div className="flex-1 relative z-10">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-semibold text-base"
              >
                {message}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-white/90 mt-1"
              >
                Check your downloads folder
              </motion.p>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/50"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </motion.div>

          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Download className="w-5 h-5 text-green-500" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
