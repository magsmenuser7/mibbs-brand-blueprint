import React from 'react';
import { X } from 'lucide-react';

interface IndustryData {
  name: string;
  marketingSpendRange: string;
  channels: string[];
  parameters: string[];
}

interface IndustryModalProps {
  isOpen: boolean;
  industryData: IndustryData | null;
  onClose: () => void;
  onConfirm: () => void;
}

const IndustryModal: React.FC<IndustryModalProps> = ({ isOpen, industryData, onClose, onConfirm }) => {
  if (!isOpen || !industryData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 hidden">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{industryData.name} Industry Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Marketing Spend */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Spend (% of Revenue)</h3>
            <div className="text-2xl font-bold text-blue-600">{industryData.marketingSpendRange}</div>
          </div>

          {/* Typical Channel Allocation */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Typical Channel Allocation</h3>
            <div className="flex flex-wrap gap-2">
              {industryData.channels.map((channel, index) => (
                <span key={index} className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {industryData.parameters.map((parameter, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">{parameter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onConfirm}
            className="flex-1 bg-mibbs-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Confirm Industry Selection
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryModal;