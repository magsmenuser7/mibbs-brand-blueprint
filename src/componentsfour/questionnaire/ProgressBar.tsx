import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressBar = ({ currentStep, totalSteps, stepLabels }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const currentLabel = stepLabels[currentStep - 1] || "";

  return (
    <div className="w-full">
      {/* Step info row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-primary font-display">
          {currentLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;