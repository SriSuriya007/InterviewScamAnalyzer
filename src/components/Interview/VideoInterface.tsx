import React, { useRef, useEffect } from 'react';
import { useWebRTC } from '../../contexts/WebRTCContext';
import { Mic, MicOff, Video, VideoOff, Signal } from 'lucide-react';

function VideoInterface() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { 
    localStream, 
    remoteStream, 
    isCameraOn, 
    isMicOn, 
    connectionQuality 
  } = useWebRTC();

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="h-full relative">
      {/* Remote Video (Interviewer/Candidate) */}
      <div className="h-full bg-gray-800 flex items-center justify-center">
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white text-center">
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-lg">Waiting for participant...</p>
          </div>
        )}
      </div>

      {/* Local Video (Self) */}
      <div className="absolute top-4 right-4 w-64 h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
        {localStream && isCameraOn ? (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <VideoOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        
        {/* Local Video Controls */}
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <div className={`p-1 rounded-full ${isMicOn ? 'bg-green-500' : 'bg-red-500'}`}>
            {isMicOn ? (
              <Mic className="w-3 h-3 text-white" />
            ) : (
              <MicOff className="w-3 h-3 text-white" />
            )}
          </div>
          <div className={`p-1 rounded-full ${isCameraOn ? 'bg-green-500' : 'bg-red-500'}`}>
            {isCameraOn ? (
              <Video className="w-3 h-3 text-white" />
            ) : (
              <VideoOff className="w-3 h-3 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Connection Quality Indicator */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
        <Signal className={`w-4 h-4 ${getQualityColor()}`} />
        <span className="text-sm capitalize">{connectionQuality}</span>
      </div>

      {/* Recording Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Recording</span>
      </div>
    </div>
  );
}

export default VideoInterface;