import React from 'react';
import { 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Video, 
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import MetricCard from '../UI/MetricCard';
import Chart from '../UI/Chart';

function AdminDashboard() {
  const recentInterviews = [
    {
      id: '1',
      candidate: 'Emma Wilson',
      interviewer: 'Mike Chen',
      position: 'Senior Developer',
      status: 'completed',
      riskScore: 12,
      duration: '45 min',
      date: '2025-01-16'
    },
    {
      id: '2',
      candidate: 'David Park',
      interviewer: 'Sarah Johnson',
      position: 'UX Designer',
      status: 'in_progress',
      riskScore: 25,
      duration: '28 min',
      date: '2025-01-16'
    },
    {
      id: '3',
      candidate: 'Lisa Chen',
      interviewer: 'Mike Chen',
      position: 'Data Scientist',
      status: 'flagged',
      riskScore: 78,
      duration: '32 min',
      date: '2025-01-16'
    }
  ];

  const fraudTrends = [
    { date: '2025-01-10', incidents: 2 },
    { date: '2025-01-11', incidents: 1 },
    { date: '2025-01-12', incidents: 4 },
    { date: '2025-01-13', incidents: 0 },
    { date: '2025-01-14', incidents: 3 },
    { date: '2025-01-15', incidents: 1 },
    { date: '2025-01-16', incidents: 2 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'flagged':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor all interviews and security metrics across your organization</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Interviews"
          value="12"
          change="+3 from yesterday"
          trend="up"
          icon={<Video className="w-6 h-6 text-blue-600" />}
          className="bg-blue-50 border-blue-200"
        />
        <MetricCard
          title="Total Candidates"
          value="1,247"
          change="+89 this week"
          trend="up"
          icon={<Users className="w-6 h-6 text-teal-600" />}
          className="bg-teal-50 border-teal-200"
        />
        <MetricCard
          title="Security Incidents"
          value="3"
          change="-2 from last week"
          trend="down"
          icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
          className="bg-orange-50 border-orange-200"
        />
        <MetricCard
          title="Detection Accuracy"
          value="96.8%"
          change="+0.3% this month"
          trend="up"
          icon={<Shield className="w-6 h-6 text-green-600" />}
          className="bg-green-50 border-green-200"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Detection Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security Incidents Trend</h3>
              <p className="text-sm text-gray-600">Daily fraud detection over the past week</p>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <Chart data={fraudTrends} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
              <Video className="w-6 h-6 text-blue-600 mb-2" />
              <div className="text-sm font-medium text-blue-900">Start Interview</div>
            </button>
            <button className="p-4 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors">
              <Users className="w-6 h-6 text-teal-600 mb-2" />
              <div className="text-sm font-medium text-teal-900">Manage Users</div>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
              <Shield className="w-6 h-6 text-orange-600 mb-2" />
              <div className="text-sm font-medium text-orange-900">Security Settings</div>
            </button>
            <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <div className="text-sm font-medium text-green-900">View Reports</div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
          <p className="text-sm text-gray-600">Latest interview sessions with security assessment</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInterviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {interview.candidate.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{interview.candidate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.interviewer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(interview.status)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{interview.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getRiskColor(interview.riskScore)}`}>
                      {interview.riskScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;