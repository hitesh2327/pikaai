import React, { useEffect, useRef } from 'react';
import { User, VideoOff } from 'lucide-react';

interface VideoGridProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    isCameraOff: boolean;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ localStream, remoteStream, isCameraOff }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

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

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4 gap-4">
            {/* Remote Video (Main) */}
            <div className="relative flex-1 w-full h-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
                {remoteStream ? (
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 animate-pulse">
                            <User size={48} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Waiting for others...</p>
                    </div>
                )}

                {/* Label Overlay */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-white text-xs font-bold">
                    Remote Participant
                </div>
            </div>

            {/* Local Video (Floating / Sidebar) */}
            <div className={`
                absolute bottom-24 right-8 md:relative md:bottom-0 md:right-0
                w-48 h-32 md:w-64 md:h-48 bg-gray-800 rounded-2xl overflow-hidden shadow-xl ring-2 ring-yellow-400/50 transition-all z-10
            `}>
                {isCameraOff ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                        <VideoOff size={32} />
                    </div>
                ) : (
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover mirror"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                )}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-white text-[10px] font-bold">
                    You
                </div>
            </div>
        </div>
    );
};
