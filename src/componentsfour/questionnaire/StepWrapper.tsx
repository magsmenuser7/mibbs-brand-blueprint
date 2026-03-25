import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StepWrapperProps {
  stepKey: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const StepWrapper = ({ stepKey, title, subtitle, children }: StepWrapperProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display gradient-text">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg mx-auto">{subtitle}</p>
          )}
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StepWrapper;