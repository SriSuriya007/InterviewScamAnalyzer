import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface WebRTCContextType {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnected: boolean;
  isCameraOn: boolean;
  isMicOn: boolean;
  isScreenSharing: boolean;
  startLocalStream: () => Promise<void>;
  stopLocalStream: () => void;
  toggleCamera: () => void;
  toggleMic: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

const WebRTCContext = createContext<WebRTCContextType | undefined>(undefined);

export function WebRTCProvider({ children }: { children: ReactNode }) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      setLocalStream(stream);
      setIsConnected(true);
      
      // Simulate remote stream for demo
      setTimeout(() => {
        setRemoteStream(stream.clone());
      }, 1000);
      
      // Simulate connection quality changes
      const qualities: Array<'excellent' | 'good' | 'fair' | 'poor'> = ['excellent', 'good', 'fair'];
      setInterval(() => {
        setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
      }, 10000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopLocalStream = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }
    setIsConnected(false);
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
      });
      
      if (localStream) {
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = localStream.getVideoTracks()[0];
        // In a real implementation, you'd replace the video track in the peer connection
        setIsScreenSharing(true);
        
        videoTrack.onended = () => {
          setIsScreenSharing(false);
        };
      }
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = () => {
    setIsScreenSharing(false);
    // In a real implementation, you'd switch back to camera
  };

  return (
    <WebRTCContext.Provider value={{
      localStream,
      remoteStream,
      isConnected,
      isCameraOn,
      isMicOn,
      isScreenSharing,
      startLocalStream,
      stopLocalStream,
      toggleCamera,
      toggleMic,
      startScreenShare,
      stopScreenShare,
      connectionQuality
    }}>
      {children}
    </WebRTCContext.Provider>
  );
}

export function useWebRTC() {
  const context = useContext(WebRTCContext);
  if (context === undefined) {
    throw new Error('useWebRTC must be used within a WebRTCProvider');
  }
  return context;
}