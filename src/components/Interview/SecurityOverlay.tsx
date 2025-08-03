import React, { useState } from 'react';
import { Shield, Eye, AlertTriangle, Activity } from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';

function SecurityOverlay() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { metrics, events, isMonitoring } = useSecurity();

  const recentEvents = events.slice(0, 3);
  const criticalEvents = events.filter(e => e.severity === 'critical' || e.severity === 'high');

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-50 border-green-200';
    if (score < 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <>
      {/* Security Status Button */}
      <div className="absolute bottom-20 right-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            metrics.overallRiskScore < 30 
              ? 'bg-green-500 hover:bg-green-600' 
              : metrics.overallRiskScore < 60
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-red-500 hover:bg-red-600'
          } text-white`}
        >
          <Shield className="w-6 h-6" />
          {criticalEvents.length > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{criticalEvents.length}</span>
            </div>
          )}
        </button>
      </div>

      {/* Expanded Security Panel */}
      {isExpanded && (
        <div className="absolute bottom-32 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Security Monitor</h3>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${
              isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isMonitoring ? 'Active' : 'Inactive'}
            </div>
          </div>

          {/* Risk Score */}
          <div className={`mb-4 p-3 rounded-lg border ${getRiskBgColor(metrics.overallRiskScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
              <span className={`text-xl font-bold ${getRiskColor(metrics.overallRiskScore)}`}>
                {Math.round(metrics.overallRiskScore)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  metrics.overallRiskScore < 30 ? 'bg-green-500' : 
                  metrics.overallRiskScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metrics.overallRiskScore}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Gaze Attention</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{Math.round(metrics.gazeAttention)}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-700">Behavior</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{Math.round(metrics.behaviorNormality)}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Environment</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{Math.round(metrics.environmentSecurity)}%</span>
            </div>
          </div>

          {/* Recent Events */}
          {recentEvents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Events</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-2 p-2 bg-gray-50 rounded text-xs">
                    <AlertTriangle className={`w-3 h-3 mt-0.5 ${
                      event.severity === 'critical' ? 'text-red-500' :
                      event.severity === 'high' ? 'text-orange-500' :
                      event.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-gray-900">{event.description}</p>
                      <p className="text-gray-500">{event.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Detection Overlay */}
      <div className="absolute top-20 left-4">
        <div className="bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">AI Monitoring Active</span>
          </div>
          <div className="text-xs text-gray-300">
            Eye tracking • Object detection • Behavior analysis
          </div>
        </div>
      </div>
    </>
  );
}

export default SecurityOverlay;