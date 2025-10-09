import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PincodeInputProps {
  pincode: string;
  city: string;
  state: string;
  onPincodeChange: (pincode: string) => void;
  onLocationUpdate: (data: { city: string; state: string; suggestedIndustry?: string }) => void;
  confidenceThreshold: number;
}

interface PincodeData {
  pincode: string;
  city: string;
  district: string;
  state: string;
}

const PincodeInput: React.FC<PincodeInputProps> = ({
  pincode,
  city,
  state,
  onPincodeChange,
  onLocationUpdate,
  confidenceThreshold
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedIndustry, setSuggestedIndustry] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Sample industry suggestions based on pincode (in production, this would come from API)
  const industryLearning: Record<string, string> = {
    '500081': 'SaaS / Tech', // Hyderabad IT area
    '400001': 'Financial Services / BFSI', // Mumbai financial district
    '560001': 'SaaS / Tech', // Bangalore tech area
    '110001': 'Government / Public Sector', // New Delhi
    '600001': 'Manufacturing / Industrial', // Chennai
    '700001': 'Retail & E-Commerce' // Kolkata
  };

  const lookupPincode = async (pin: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      
      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        const locationData = {
          city: postOffice.District,
          state: postOffice.State,
          district: postOffice.District
        };
        
        // Check for suggested industry
        const suggested = industryLearning[pin];
        if (suggested) {
          setSuggestedIndustry(suggested);
          setShowSuggestion(true);
        }
        
        onLocationUpdate(locationData);
        setIsValid(true);
      } else {
        setError('Pincode not found');
        setIsValid(false);
      }
    } catch (err) {
      setError('Unable to lookup pincode');
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pincode.length === 6 && /^[1-9][0-9]{5}$/.test(pincode)) {
      const timeoutId = setTimeout(() => {
        lookupPincode(pincode);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setIsValid(false);
      setError(null);
      setSuggestedIndustry(null);
      setShowSuggestion(false);
    }
  }, [pincode]);

  const handleAcceptSuggestion = () => {
    if (suggestedIndustry) {
      onLocationUpdate({ city, state, suggestedIndustry });
      setShowSuggestion(false);
    }
  };

  const handleChangeSuggestion = () => {
    setShowSuggestion(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          Pincode
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={(e) => onPincodeChange(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary text-lg ${
              error ? 'border-red-300' : 
              isValid ? 'border-green-300' : 'border-gray-300'
            }`}
            maxLength={6}
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            {isValid && !isLoading && <CheckCircle className="w-5 h-5 text-green-500" />}
            {error && !isLoading && <AlertCircle className="w-5 h-5 text-red-500" />}
          </div>
        </div>
        
        {error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
        
        {isValid && city && state && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{city}, {state}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Industry Suggestion */}
      {showSuggestion && suggestedIndustry && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-3">
            Common business in your area: <strong>{suggestedIndustry}</strong> — Use this?
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleAcceptSuggestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Use This
            </button>
            <button
              onClick={handleChangeSuggestion}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PincodeInput;