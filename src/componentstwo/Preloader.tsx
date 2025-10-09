import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    "Calculating your Brand Health Score...",
    "Scanning agencies near your pincode...",
    "Fetching budget recommendations based on your sector...",
    "Pulling festival-based marketing ideas...",
    "Checking MSME grant eligibility...",
    "Unlocking new content formats for your next campaign..."
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-mibbs-gradient flex items-center justify-center z-50">
      <div className="text-center max-w-lg px-8">
        <div className="mb-8">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Building brands that last, one decision at a time...
          </h1>
        </div>
        
        <div className="mb-8">
          <p className="text-purple-100 text-lg min-h-[28px] transition-opacity duration-300">
            {messages[currentMessage]}
          </p>
        </div>

        <div className="w-full bg-purple-800 rounded-full h-2 mb-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-purple-200 text-sm">
          <strong>Tip:</strong> Premium unlocks a dedicated strategy rollout plan + AI-powered agency matching.
        </div>
      </div>
    </div>
  );
};

export default Preloader;