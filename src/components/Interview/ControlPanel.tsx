import React from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  Square,
  Circle
} from 'lucide-react';
import { useWebRTC } from '../../contexts/WebRTCContext';
import { useAuth } from '../../contexts/AuthContext';

interface ControlPanelProps {
  onToggleChat: () => void;
  showChat: boolean;
  isRecording: boolean;
  onToggleRecording: () => void;
}

function ControlPanel({ onToggleChat, showChat, isRecording, onToggleRecording }: ControlPanelProps) {
  const { 
    isCameraOn, 
    isMicOn, 
    isScreenSharing, 
    toggleCamera, 
    toggleMic, 
    startScreenShare, 
    stopScreenShare 
  } = useWebRTC();
  const { user } = useAuth();

  const handleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Interview Info */}
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">SI</span>
            </div>
            <div>
              <p className="text-sm font-medium">Senior Developer Interview</p>
              <p className="text-xs text-gray-400">Session: #12345</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded">
            <Circle className="w-3 h-3 fill-current animate-pulse" />
            <span className="text-xs font-medium">LIVE</span>
          </div>
        </div>

        {/* Center - Main Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-all duration-200 ${
              isMicOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full transition-all duration-200 ${
              isCameraOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {user?.role !== 'candidate' && (
            <button
              onClick={handleScreenShare}
              className={`p-3 rounded-full transition-all duration-200 ${
                isScreenSharing 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
            >
              <Monitor className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onToggleRecording}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-200"
            title="End Interview"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side - Additional Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleChat}
            className={`p-2 rounded-lg transition-all duration-200 ${
              showChat 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
            title="Toggle Chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
            title="Security Monitor"
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Timer */}
          <div className="bg-gray-700 px-3 py-2 rounded-lg text-white">
            <span className="text-sm font-mono">32:45</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;