import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}

const OptionCard = ({ label, description, icon, selected, onClick, compact }: OptionCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-xl border-2 text-left transition-all duration-200 w-full ${
        compact ? "px-3 py-3" : "px-4 py-4"
      } ${
        selected
          ? "border-[hsl(280,70%,55%)] bg-[hsl(280,60%,96%)]"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      {icon && (
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
            selected ? "bg-[hsl(280,60%,90%)] text-[hsl(280,70%,55%)]" : "bg-secondary text-muted-foreground"
          }`}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${selected ? "text-[hsl(280,70%,45%)]" : "text-foreground"}`}>{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          selected ? "bg-[hsl(280,70%,55%)]" : "border-2 border-muted"
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
    </motion.button>
  );
};

export default OptionCard;
