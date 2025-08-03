import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SecurityEvent {
  id: string;
  type: 'gaze_deviation' | 'object_detected' | 'multiple_faces' | 'suspicious_behavior' | 'audio_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  confidence: number;
  metadata?: any;
}

interface SecurityMetrics {
  overallRiskScore: number;
  gazeAttention: number;
  behaviorNormality: number;
  environmentSecurity: number;
  audioIntegrity: number;
}

interface SecurityContextType {
  events: SecurityEvent[];
  metrics: SecurityMetrics;
  isMonitoring: boolean;
  alertsEnabled: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  toggleAlerts: () => void;
  clearEvents: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    overallRiskScore: 15,
    gazeAttention: 92,
    behaviorNormality: 88,
    environmentSecurity: 95,
    audioIntegrity: 97
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate random security events
        if (Math.random() < 0.3) {
          generateSecurityEvent();
        }
        updateMetrics();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  const generateSecurityEvent = () => {
    const eventTypes: SecurityEvent['type'][] = [
      'gaze_deviation', 'object_detected', 'multiple_faces', 'suspicious_behavior', 'audio_anomaly'
    ];
    
    const severities: SecurityEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
    
    const descriptions = {
      gaze_deviation: 'Candidate looking away from screen for extended period',
      object_detected: 'Unauthorized device detected in frame',
      multiple_faces: 'Multiple people detected in video feed',
      suspicious_behavior: 'Unusual typing or movement patterns detected',
      audio_anomaly: 'Background voices or suspicious audio patterns'
    };

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      type,
      severity,
      timestamp: new Date(),
      description: descriptions[type],
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      metadata: {
        location: type === 'object_detected' ? { x: 245, y: 156 } : undefined,
        duration: type === 'gaze_deviation' ? Math.floor(Math.random() * 10) + 3 : undefined
      }
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep last 50 events
  };

  const updateMetrics = () => {
    setMetrics(prev => ({
      overallRiskScore: Math.max(5, Math.min(100, prev.overallRiskScore + (Math.random() - 0.5) * 10)),
      gazeAttention: Math.max(60, Math.min(100, prev.gazeAttention + (Math.random() - 0.5) * 8)),
      behaviorNormality: Math.max(70, Math.min(100, prev.behaviorNormality + (Math.random() - 0.5) * 6)),
      environmentSecurity: Math.max(80, Math.min(100, prev.environmentSecurity + (Math.random() - 0.5) * 4)),
      audioIntegrity: Math.max(85, Math.min(100, prev.audioIntegrity + (Math.random() - 0.5) * 3))
    }));
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <SecurityContext.Provider value={{
      events,
      metrics,
      isMonitoring,
      alertsEnabled,
      startMonitoring,
      stopMonitoring,
      toggleAlerts,
      clearEvents
    }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}