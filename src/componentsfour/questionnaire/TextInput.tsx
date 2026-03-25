import { motion } from "framer-motion";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  disabled?: boolean;
}

const TextInput = ({ label, value, onChange, placeholder, type = "text", hint, disabled }: TextInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-foreground font-display">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-12 px-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground 
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60
          transition-all duration-200 text-sm font-body disabled:opacity-50"
      />
    </motion.div>
  );
};

export default TextInput;