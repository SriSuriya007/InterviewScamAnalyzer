import React from 'react';
import { Shield, Eye, Activity, Volume2 } from 'lucide-react';

interface SecurityMetricsProps {
  metrics: {
    overallRiskScore: number;
    gazeAttention: number;
    behaviorNormality: number;
    environmentSecurity: number;
    audioIntegrity: number;
  };
}

function SecurityMetrics({ metrics }: SecurityMetricsProps) {
  const metricCards = [
    {
      title: 'Overall Risk Score',
      value: `${Math.round(metrics.overallRiskScore)}%`,
      icon: Shield,
      color: metrics.overallRiskScore < 30 ? 'green' : metrics.overallRiskScore < 60 ? 'yellow' : 'red',
      description: 'Combined security assessment'
    },
    {
      title: 'Gaze Attention',
      value: `${Math.round(metrics.gazeAttention)}%`,
      icon: Eye,
      color: metrics.gazeAttention > 80 ? 'green' : metrics.gazeAttention > 60 ? 'yellow' : 'red',
      description: 'Eye tracking analysis'
    },
    {
      title: 'Behavior Analysis',
      value: `${Math.round(metrics.behaviorNormality)}%`,
      icon: Activity,
      color: metrics.behaviorNormality > 80 ? 'green' : metrics.behaviorNormality > 60 ? 'yellow' : 'red',
      description: 'Movement and interaction patterns'
    },
    {
      title: 'Audio Integrity',
      value: `${Math.round(metrics.audioIntegrity)}%`,
      icon: Volume2,
      color: metrics.audioIntegrity > 90 ? 'green' : metrics.audioIntegrity > 70 ? 'yellow' : 'red',
      description: 'Voice and sound analysis'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          value: 'text-green-700'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          value: 'text-yellow-700'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          value: 'text-red-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          value: 'text-gray-700'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards.map((metric) => {
        const Icon = metric.icon;
        const colors = getColorClasses(metric.color);
        
        return (
          <div key={metric.title} className={`${colors.bg} ${colors.border} rounded-xl border p-6`}>
            <div className="flex items-center justify-between mb-4">
              <Icon className={`w-8 h-8 ${colors.icon}`} />
              <span className={`text-2xl font-bold ${colors.value}`}>
                {metric.value}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{metric.title}</h3>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SecurityMetrics;