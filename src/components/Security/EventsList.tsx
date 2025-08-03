import React from 'react';
import { AlertTriangle, Eye, Camera, Users, Mic } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'gaze_deviation' | 'object_detected' | 'multiple_faces' | 'suspicious_behavior' | 'audio_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  confidence: number;
}

interface EventsListProps {
  events: SecurityEvent[];
  showFilters: boolean;
}

function EventsList({ events, showFilters }: EventsListProps) {
  const getEventIcon = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'gaze_deviation':
        return Eye;
      case 'object_detected':
        return Camera;
      case 'multiple_faces':
        return Users;
      case 'audio_anomaly':
        return Mic;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityBadgeColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Security Events</h3>
        <p className="text-gray-600">All security metrics are within normal parameters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Security Events</h3>
        <p className="text-sm text-gray-600">Real-time fraud detection alerts and notifications</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {events.map((event) => {
          const Icon = getEventIcon(event.type);
          const severityColor = getSeverityColor(event.severity);
          const badgeColor = getSeverityBadgeColor(event.severity);
          
          return (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg border ${severityColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 capitalize">
                      {event.type.replace('_', ' ')}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${badgeColor}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {event.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {event.timestamp.toLocaleString()}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventsList;