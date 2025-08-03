import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  Users,
  Shield,
  AlertTriangle
} from 'lucide-react';
import ReportCard from '../components/Reports/ReportCard';
import ReportChart from '../components/Reports/ReportChart';

function Reports() {
  const [dateRange, setDateRange] = useState('7days');
  const [reportType, setReportType] = useState('all');

  const reports = [
    {
      id: '1',
      title: 'Weekly Security Summary',
      description: 'Comprehensive security analysis for the past week',
      date: '2025-01-16',
      type: 'security',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Interview Performance Report',
      description: 'Analysis of interview completion rates and candidate feedback',
      date: '2025-01-15',
      type: 'performance',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Fraud Detection Analytics',
      description: 'Detailed breakdown of fraud detection incidents and patterns',
      date: '2025-01-14',
      type: 'fraud',
      status: 'generating',
      size: 'Processing...'
    }
  ];

  const chartData = [
    { date: '2025-01-10', interviews: 15, incidents: 2 },
    { date: '2025-01-11', interviews: 18, incidents: 1 },
    { date: '2025-01-12', interviews: 22, incidents: 4 },
    { date: '2025-01-13', interviews: 20, incidents: 0 },
    { date: '2025-01-14', interviews: 25, incidents: 3 },
    { date: '2025-01-15', interviews: 19, incidents: 1 },
    { date: '2025-01-16', interviews: 24, incidents: 2 }
  ];

  const stats = {
    totalInterviews: 143,
    securityIncidents: 13,
    detectionAccuracy: 96.8,
    averageRiskScore: 18.5
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive security and performance insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Past year</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInterviews}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last period
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Security Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.securityIncidents}</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 from last period
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Detection Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.detectionAccuracy}%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.3% improvement
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRiskScore}%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                -2.1% decrease
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Volume & Security Incidents</h3>
          <ReportChart data={chartData} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Detection Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Eye Gaze Deviations</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">34%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Object Detection</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-7 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Behavioral Anomalies</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">23%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Audio Irregularities</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-4 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generated Reports</h3>
              <p className="text-sm text-gray-600">Download detailed analysis reports</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Reports</option>
                <option value="security">Security</option>
                <option value="performance">Performance</option>
                <option value="fraud">Fraud Detection</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;