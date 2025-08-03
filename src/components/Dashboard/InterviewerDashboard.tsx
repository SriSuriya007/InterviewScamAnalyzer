import React from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Video,
  FileText,
  Shield,
  Star
} from 'lucide-react';
import MetricCard from '../UI/MetricCard';

function InterviewerDashboard() {
  const upcomingInterviews = [
    {
      id: '1',
      candidate: 'Alex Rodriguez',
      position: 'Frontend Developer',
      time: '10:00 AM',
      date: 'Today',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '2',
      candidate: 'Maria Garcia',
      position: 'UI/UX Designer',
      time: '2:30 PM',
      date: 'Today',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '3',
      candidate: 'James Wilson',
      position: 'Backend Developer',
      time: '11:00 AM',
      date: 'Tomorrow',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const recentInterviews = [
    {
      id: '1',
      candidate: 'Emma Thompson',
      position: 'Product Manager',
      date: 'Jan 15, 2025',
      rating: 4.5,
      riskScore: 15,
      status: 'completed'
    },
    {
      id: '2',
      candidate: 'David Kim',
      position: 'Data Analyst',
      date: 'Jan 14, 2025',
      rating: 4.2,
      riskScore: 8,
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Mike!</h1>
        <p className="text-gray-600 mt-2">You have 3 interviews scheduled today</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Interviews"
          value="3"
          change="2 remaining"
          trend="neutral"
          icon={<Calendar className="w-6 h-6 text-blue-600" />}
          className="bg-blue-50 border-blue-200"
        />
        <MetricCard
          title="This Week"
          value="12"
          change="+3 from last week"
          trend="up"
          icon={<Users className="w-6 h-6 text-teal-600" />}
          className="bg-teal-50 border-teal-200"
        />
        <MetricCard
          title="Avg Duration"
          value="42 min"
          change="-5 min from avg"
          trend="down"
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          className="bg-orange-50 border-orange-200"
        />
        <MetricCard
          title="Success Rate"
          value="94%"
          change="+2% this month"
          trend="up"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          className="bg-green-50 border-green-200"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
            <p className="text-sm text-gray-600">Your scheduled interview sessions</p>
          </div>
          <div className="p-6 space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <img
                    src={interview.avatar}
                    alt={interview.candidate}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                  <p className="text-xs text-gray-600">{interview.date}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Start Next Interview</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <Video className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm font-medium text-blue-900">Start Interview</div>
              </button>
              <button className="p-4 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100 transition-colors">
                <Calendar className="w-6 h-6 text-teal-600 mb-2" />
                <div className="text-sm font-medium text-teal-900">Schedule New</div>
              </button>
              <button className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                <FileText className="w-6 h-6 text-orange-600 mb-2" />
                <div className="text-sm font-medium text-orange-900">View Reports</div>
              </button>
              <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <div className="text-sm font-medium text-green-900">Security Monitor</div>
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Assistant Ready</p>
                  <p className="text-sm opacity-90">Get real-time interview insights</p>
                </div>
                <Shield className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
          <p className="text-sm text-gray-600">Your latest completed interview sessions</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {interview.candidate.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{interview.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Candidate Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{interview.riskScore}%</p>
                    <p className="text-xs text-gray-600">Risk Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{interview.date}</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewerDashboard;