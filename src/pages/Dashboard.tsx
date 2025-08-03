import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import InterviewerDashboard from '../components/Dashboard/InterviewerDashboard';
import CandidateDashboard from '../components/Dashboard/CandidateDashboard';

function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'interviewer':
      return <InterviewerDashboard />;
    case 'candidate':
      return <CandidateDashboard />;
    default:
      return <div>Loading...</div>;
  }
}

export default Dashboard;