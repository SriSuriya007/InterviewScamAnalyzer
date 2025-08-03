import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

function ThreatMap() {
  const threats = [
    { id: '1', x: 25, y: 30, severity: 'high', type: 'Object Detected' },
    { id: '2', x: 70, y: 45, severity: 'medium', type: 'Gaze Deviation' },
    { id: '3', x: 40, y: 60, severity: 'low', type: 'Audio Anomaly' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Threat Detection Map</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Live View</span>
        </div>
      </div>

      <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
        {/* Simulated camera view background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Threat markers */}
        {threats.map((threat) => (
          <div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
          >
            <div className={`w-4 h-4 ${getSeverityColor(threat.severity)} rounded-full animate-ping`}></div>
            <div className={`absolute inset-0 w-4 h-4 ${getSeverityColor(threat.severity)} rounded-full`}></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {threat.type}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-black border-t-transparent border-l-transparent border-r-transparent"></div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-900 mb-2">Threat Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Real-time visual analysis of security threats in the interview environment
        </p>
      </div>
    </div>
  );
}

export default ThreatMap;