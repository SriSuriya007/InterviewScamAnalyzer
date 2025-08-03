import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Shield, 
  FileText, 
  Settings, 
  Users,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { 
    path: '/dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    roles: ['admin', 'interviewer', 'candidate']
  },
  { 
    path: '/interview/demo', 
    icon: Video, 
    label: 'Interview Room',
    roles: ['admin', 'interviewer', 'candidate']
  },
  { 
    path: '/security', 
    icon: Shield, 
    label: 'Security Monitor',
    roles: ['admin', 'interviewer']
  },
  { 
    path: '/reports', 
    icon: FileText, 
    label: 'Reports',
    roles: ['admin', 'interviewer']
  },
  { 
    path: '/settings', 
    icon: Settings, 
    label: 'Settings',
    roles: ['admin', 'interviewer', 'candidate']
  }
];

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'candidate')
  );

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SecureInterview</h1>
            <p className="text-sm text-gray-500">AI Platform</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/interview/demo' && location.pathname.startsWith('/interview/'));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Security Status</p>
              <p className="text-xs opacity-90">All systems operational</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;