import React from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Video,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react';
import MetricCard from '../UI/MetricCard';

function CandidateDashboard() {
  const upcomingInterview = {
    position: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    interviewer: 'Mike Chen',
    date: 'Today',
    time: '2:30 PM',
    duration: '45 minutes',
    type: 'Technical Interview'
  };

  const systemCheck = {
    camera: true,
    microphone: true,
    internet: true,
    browser: true
  };

  const interviewHistory = [
    {
      id: '1',
      position: 'Frontend Developer',
      company: 'StartupXYZ',
      date: 'Jan 10, 2025',
      status: 'completed',
      feedback: 'Excellent technical skills demonstrated'
    },
    {
      id: '2',
      position: 'React Developer',
      company: 'WebCorp',
      date: 'Jan 8, 2025',
      status: 'completed',
      feedback: 'Strong problem-solving approach'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Emma!</h1>
        <p className="text-gray-600 mt-2">You have an interview scheduled today. Good luck!</p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Camera"
          value={systemCheck.camera ? 'Ready' : 'Check Required'}
          change={systemCheck.camera ? 'Working properly' : 'Needs attention'}
          trend={systemCheck.camera ? 'up' : 'down'}
          icon={<Video className={`w-6 h-6 ${systemCheck.camera ? 'text-green-600' : 'text-red-600'}`} />}
          className={systemCheck.camera ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
        />
        <MetricCard
          title="Microphone"
          value={systemCheck.microphone ? 'Ready' : 'Check Required'}
          change={systemCheck.microphone ? 'Working properly' : 'Needs attention'}
          trend={systemCheck.microphone ? 'up' : 'down'}
          icon={<CheckCircle className={`w-6 h-6 ${systemCheck.microphone ? 'text-green-600' : 'text-red-600'}`} />}
          className={systemCheck.microphone ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
        />
        <MetricCard
          title="Internet"
          value="Excellent"
          change="92 Mbps connection"
          trend="up"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          className="bg-green-50 border-green-200"
        />
        <MetricCard
          title="Browser"
          value="Compatible"
          change="Chrome 120.0"
          trend="up"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          className="bg-green-50 border-green-200"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Next Interview</h3>
            <p className="text-sm text-gray-600">Your upcoming interview session</p>
          </div>
          <div className="p-6">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">{upcomingInterview.position}</h4>
                  <p className="text-blue-700">{upcomingInterview.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-900">{upcomingInterview.time}</p>
                  <p className="text-sm text-blue-700">{upcomingInterview.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Interviewer</p>
                  <p className="text-blue-900">{upcomingInterview.interviewer}</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Duration</p>
                  <p className="text-blue-900">{upcomingInterview.duration}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Join Interview</span>
              </button>
              <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Test System</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interview Guidelines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Interview Guidelines</h3>
            <p className="text-sm text-gray-600">Important reminders for your interview</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Clear Environment</h4>
                  <p className="text-xs text-gray-600">Ensure a quiet, well-lit space with minimal distractions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Join Early</h4>
                  <p className="text-xs text-gray-600">Connect 5-10 minutes before the scheduled time</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Privacy Notice</h4>
                  <p className="text-xs text-gray-600">This interview uses AI monitoring for security purposes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <HelpCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Technical Support</h4>
                  <p className="text-xs text-gray-600">Help is available during your interview session</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800">System Monitoring Active</p>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Our AI system monitors for security and ensures interview integrity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interview History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Interview History</h3>
          <p className="text-sm text-gray-600">Your completed interview sessions</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {interviewHistory.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{interview.position}</h4>
                    <p className="text-sm text-gray-600">{interview.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{interview.date}</p>
                  <p className="text-xs text-green-600">{interview.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;