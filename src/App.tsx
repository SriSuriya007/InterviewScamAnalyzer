import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WebRTCProvider } from './contexts/WebRTCContext';
import { SecurityProvider } from './contexts/SecurityContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import InterviewRoom from './pages/InterviewRoom';
import SecurityMonitor from './pages/SecurityMonitor';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';
import { LoadingSpinner } from './components/UI/LoadingSpinner';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        <Route
          path="/*"
          element={
            user ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/interview/:sessionId" element={<InterviewRoom />} />
                  <Route path="/security" element={<SecurityMonitor />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <WebRTCProvider>
        <SecurityProvider>
          <AppContent />
        </SecurityProvider>
      </WebRTCProvider>
    </AuthProvider>
  );
}

export default App;