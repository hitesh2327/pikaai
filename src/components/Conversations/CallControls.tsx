import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ScreenShare } from 'lucide-react';

interface CallControlsProps {
    isMuted: boolean;
    isCameraOff: boolean;
    onToggleMute: () => void;
    onToggleCamera: () => void;
    onLeave: () => void;
}

export const CallControls: React.FC<CallControlsProps> = ({
    isMuted,
    isCameraOff,
    onToggleMute,
    onToggleCamera,
    onLeave
}) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <button
                onClick={onToggleMute}
                className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button
                onClick={onToggleCamera}
                className={`p-4 rounded-2xl transition-all ${isCameraOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
                {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>

            <button className="p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 hidden md:block opacity-50 cursor-not-allowed">
                <ScreenShare size={24} />
            </button>

            <div className="w-px h-10 bg-white/10 mx-2" />

            <button
                onClick={onLeave}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl shadow-lg ring-4 ring-red-600/20 active:scale-95 transition-all"
            >
                <PhoneOff size={24} />
            </button>
        </div>
    );
};
