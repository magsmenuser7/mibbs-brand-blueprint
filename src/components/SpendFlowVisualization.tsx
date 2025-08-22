import React, { useEffect, useState } from 'react';

const SpendFlowVisualization = () => {
  const [heatmapData, setHeatmapData] = useState(Array(25).fill(0));
  const [flowLines, setFlowLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update heatmap
      setHeatmapData(prev => prev.map(() => Math.random()));
      
      // Update flow lines
      setFlowLines([
        { from: { x: 20, y: 20 }, to: { x: 80, y: 40 }, intensity: Math.random() },
        { from: { x: 40, y: 60 }, to: { x: 70, y: 20 }, intensity: Math.random() },
        { from: { x: 10, y: 80 }, to: { x: 60, y: 70 }, intensity: Math.random() },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getHeatmapColor = (intensity) => {
    if (intensity > 0.7) return 'bg-purple-600';
    if (intensity > 0.4) return 'bg-purple-400';
    if (intensity > 0.2) return 'bg-purple-200';
    return 'bg-gray-100';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border border-purple-100">
      {/* Heatmap Grid */}
      <div className="absolute inset-4 grid grid-cols-5 gap-1">
        {heatmapData.map((intensity, index) => (
          <div
            key={index}
            className={`rounded transition-all duration-1000 ${getHeatmapColor(intensity)}`}
            style={{ 
              transform: `scale(${0.8 + intensity * 0.4})`,
              opacity: 0.3 + intensity * 0.7
            }}
          ></div>
        ))}
      </div>

      {/* Flow Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {flowLines.map((line, index) => (
          <g key={index}>
            <line
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke={`rgba(139, 92, 246, ${line.intensity})`}
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle
              cx={`${line.to.x}%`}
              cy={`${line.to.y}%`}
              r="3"
              fill={`rgba(236, 72, 153, ${line.intensity})`}
              className="animate-pulse"
            />
          </g>
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-2 text-xs font-medium text-purple-600 bg-white/80 px-2 py-1 rounded">
        Spend Intensity
      </div>
      <div className="absolute bottom-2 right-2 text-xs font-medium text-pink-600 bg-white/80 px-2 py-1 rounded">
        Real-time Flow
      </div>
    </div>
  );
};

export default SpendFlowVisualization;