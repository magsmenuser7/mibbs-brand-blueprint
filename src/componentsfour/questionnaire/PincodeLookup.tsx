import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Loader2 } from "lucide-react";
import { lookupPincodeOnline, searchPincodes, PincodeInfo } from "@/data/pincodeData";

interface PincodeLookupProps {
  pincode: string;
  onPincodeChange: (pincode: string) => void;
  onLocationFound: (info: PincodeInfo) => void;
}

const PincodeLookup = ({ pincode, onPincodeChange, onLocationFound }: PincodeLookupProps) => {
  const [locationInfo, setLocationInfo] = useState<PincodeInfo | null>(null);
  const [suggestions, setSuggestions] = useState<PincodeInfo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stableOnLocationFound = useCallback(onLocationFound, []);

  useEffect(() => {
    if (pincode.length === 6) {
      setLoading(true);
      setError("");
      setShowSuggestions(false);
      lookupPincodeOnline(pincode).then((info) => {
        setLoading(false);
        if (info) {
          setLocationInfo(info);
          setError("");
          stableOnLocationFound(info);
        } else {
          setLocationInfo(null);
          setError("Pincode not found. Please enter a valid Indian pincode.");
        }
      });
    } else {
      setLocationInfo(null);
      setError("");
      if (pincode.length >= 3) {
        const results = searchPincodes(pincode);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }, [pincode, stableOnLocationFound]);

  const handleSuggestionClick = (info: PincodeInfo) => {
    onPincodeChange(info.pincode);
    setLocationInfo(info);
    onLocationFound(info);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            onPincodeChange(val);
          }}
          placeholder="Enter 6-digit pincode (e.g., 110001)"
          className="form-input text-lg py-4"
        />

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute z-10 w-full mt-2 bg-card border-2 border-border rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
            >
              {suggestions.map((s) => (
                <button
                  key={s.pincode}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-option-hover transition-colors text-left border-b border-border last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{s.pincode}</span>
                    <span className="text-muted-foreground"> — {s.locality}, {s.district}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-primary text-sm font-medium"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Looking up pincode...
        </motion.div>
      )}

      {error && !loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-sm font-medium"
        >
          {error}
        </motion.p>
      )}

      <AnimatePresence>
        {locationInfo && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border-2 border-border rounded-2xl p-5 sm:p-6 card-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h4 className="font-bold gradient-text text-base">Location Detected</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <InfoBox label="AREA" value={locationInfo.locality} />
              <InfoBox label="DISTRICT" value={locationInfo.district} />
              <InfoBox label="STATE" value={locationInfo.state} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-option-selected-bg rounded-xl px-3 py-3 border border-primary/10">
    <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{label}</p>
    <p className="font-semibold text-foreground text-sm">{value}</p>
  </div>
);

export default PincodeLookup;
