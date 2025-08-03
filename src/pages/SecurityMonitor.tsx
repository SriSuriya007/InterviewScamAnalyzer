import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Activity, Filter, Download } from 'lucide-react';
import { useSecurity } from '../contexts/SecurityContext';
import SecurityMetrics from '../components/Security/SecurityMetrics';
import EventsList from '../components/Security/EventsList';
import ThreatMap from '../components/Security/ThreatMap';

function SecurityMonitor() {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'analytics'>('overview');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const { events, metrics, isMonitoring } = useSecurity();

  const filteredEvents = filterSeverity === 'all' 
    ? events 
    : events.filter(event => event.severity === filterSeverity);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'events', label: 'Security Events', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: Activity }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Monitor</h1>
          <p className="text-gray-600 mt-2">Real-time fraud detection and security analysis</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isMonitoring 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <SecurityMetrics metrics={metrics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ThreatMap />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Critical Events</h3>
              <EventsList 
                events={events.filter(e => e.severity === 'critical' || e.severity === 'high').slice(0, 5)} 
                showFilters={false}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Filter by severity:</span>
                </div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredEvents.length} of {events.length} events
              </div>
            </div>
          </div>

          <EventsList events={filteredEvents} showFilters={true} />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Patterns</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eye Gaze Deviations</span>
                  <span className="font-medium">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Object Detection</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Behavioral Anomalies</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Audio Irregularities</span>
                  <span className="font-medium">15%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Detection Accuracy</span>
                  <span className="font-medium text-green-600">96.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">False Positive Rate</span>
                  <span className="font-medium text-yellow-600">3.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-medium text-blue-600">127ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Confidence Score</span>
                  <span className="font-medium text-green-600">94.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecurityMonitor;