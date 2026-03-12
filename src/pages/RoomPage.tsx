import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWebRTC } from '../hooks/useWebRTC';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { VideoGrid } from '../components/Conversations/VideoGrid';
import { CallControls } from '../components/Conversations/CallControls';
import { InsightsPageProps } from '../types/insights';
import { AlertCircle, Loader2 } from 'lucide-react';

const RoomPage: React.FC<InsightsPageProps> = ({ theme, setTheme }) => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();

    const {
        localStream,
        remoteStream,
        connectionState,
        isMuted,
        isCameraOff,
        toggleMute,
        toggleCamera,
        leaveCall
    } = useWebRTC(roomId || 'default');

    const handleLeave = () => {
        leaveCall();
        navigate('/conversations');
    };

    const getStatusMessage = () => {
        switch (connectionState) {
            case 'new':
            case 'connecting':
                return 'Connecting to participant...';
            case 'connected':
                return remoteStream ? 'Connected' : 'Waiting for participant...';
            case 'disconnected':
            case 'failed':
                return 'Connection failed or lost.';
            case 'closed':
                return 'Call ended.';
            default:
                return '';
        }
    };

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="h-[calc(100vh-64px)] bg-black relative overflow-hidden flex flex-col">
                {/* Connection Status Overlay */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
                        {connectionState === 'connecting' && <Loader2 size={14} className="animate-spin text-yellow-400" />}
                        {(connectionState === 'failed' || connectionState === 'disconnected') && <AlertCircle size={14} className="text-red-500" />}
                        <span className="text-xs font-bold text-white tracking-widest uppercase">
                            {getStatusMessage()}
                        </span>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="flex-1 relative">
                    <VideoGrid
                        localStream={localStream}
                        remoteStream={remoteStream}
                        isCameraOff={isCameraOff}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 flex justify-center">
                    <CallControls
                        isMuted={isMuted}
                        isCameraOff={isCameraOff}
                        onToggleMute={toggleMute}
                        onToggleCamera={toggleCamera}
                        onLeave={handleLeave}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RoomPage;
