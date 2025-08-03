import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoInterface from '../components/Interview/VideoInterface';
import SecurityOverlay from '../components/Interview/SecurityOverlay';
import ControlPanel from '../components/Interview/ControlPanel';
import ChatPanel from '../components/Interview/ChatPanel';
import { useWebRTC } from '../contexts/WebRTCContext';
import { useSecurity } from '../contexts/SecurityContext';

function InterviewRoom() {
  const { sessionId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { startLocalStream, isConnected } = useWebRTC();
  const { startMonitoring, isMonitoring } = useSecurity();

  useEffect(() => {
    if (!isConnected) {
      startLocalStream();
    }
    if (!isMonitoring) {
      startMonitoring();
    }
  }, [isConnected, isMonitoring, startLocalStream, startMonitoring]);

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 relative">
          <VideoInterface />
          <SecurityOverlay />
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200">
            <ChatPanel />
          </div>
        )}
      </div>

      {/* Bottom Control Panel */}
      <ControlPanel 
        onToggleChat={() => setShowChat(!showChat)}
        showChat={showChat}
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording(!isRecording)}
      />
    </div>
  );
}

export default InterviewRoom;