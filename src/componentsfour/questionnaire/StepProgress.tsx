import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

const StepProgress = ({ steps, currentStep, completedSteps }: StepProgressProps) => {
  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === currentStep;
          const isPending = !isCompleted && !isActive;

          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "bg-step-complete text-primary-foreground"
                      : isActive
                      ? "bg-step-active text-primary-foreground ring-4 ring-primary/20"
                      : "bg-step-pending text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </motion.div>
                <span
                  className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap ${
                    isActive ? "text-primary" : isCompleted ? "text-step-complete" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isCompleted ? "bg-step-complete" : "bg-step-pending"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
