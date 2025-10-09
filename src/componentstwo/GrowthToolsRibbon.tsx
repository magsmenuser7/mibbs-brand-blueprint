import React from 'react';
import { Zap, ArrowRight, X } from 'lucide-react';

interface GrowthToolsRibbonProps {
  onExplore: () => void;
  onDismiss: () => void;
}

const GrowthToolsRibbon: React.FC<GrowthToolsRibbonProps> = ({ onExplore, onDismiss }) => {
  return (
    <div className="bg-gradient-to-r from-mibbs-accent to-mibbs-pink rounded-xl shadow-lg border border-pink-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Looking for more?</h3>
            <p className="text-pink-100">Try our Growth Tools to unlock MSME schemes & profit tracking.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExplore}
            className="flex items-center space-x-2 bg-white text-mibbs-accent px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
          >
            <span>Explore Growth Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onDismiss}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mt-4 text-sm text-pink-100">
        <div className="flex items-center space-x-1">
          <span>🏛️</span>
          <span>Government schemes</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>⚖️</span>
          <span>Trademark protection</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>📊</span>
          <span>Sales tracking</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>🎉</span>
          <span>Festival alerts</span>
        </div>
      </div>
    </div>
  );
};

export default GrowthToolsRibbon;