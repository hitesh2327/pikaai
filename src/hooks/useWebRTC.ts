import { useState, useEffect, useRef, useCallback } from 'react';
import { signalingService } from '../services/signaling';

export const useWebRTC = (roomId: string) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>('new');
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);

    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);

    const cleanup = useCallback(() => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        signalingService.disconnect();
    }, []);

    const createPeerConnection = useCallback(() => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                signalingService.sendMessage({
                    type: 'ice-candidate',
                    data: event.candidate
                });
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        pc.onconnectionstatechange = () => {
            setConnectionState(pc.connectionState);
        };

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => {
                pc.addTrack(track, localStreamRef.current!);
            });
        }

        peerConnection.current = pc;
        return pc;
    }, []);

    const startCall = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            localStreamRef.current = stream;

            signalingService.connect(roomId, async (msg) => {
                switch (msg.type) {
                    case 'join':
                        // New user joined, create offer
                        const pc = createPeerConnection();
                        const offer = await pc.createOffer();
                        await pc.setLocalDescription(offer);
                        signalingService.sendMessage({ type: 'offer', data: offer });
                        break;

                    case 'offer':
                        if (!peerConnection.current) createPeerConnection();
                        await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(msg.data));
                        const answer = await peerConnection.current!.createAnswer();
                        await peerConnection.current!.setLocalDescription(answer);
                        signalingService.sendMessage({ type: 'answer', data: answer });
                        break;

                    case 'answer':
                        await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(msg.data));
                        break;

                    case 'ice-candidate':
                        if (peerConnection.current) {
                            await peerConnection.current.addIceCandidate(new RTCIceCandidate(msg.data));
                        }
                        break;

                    case 'leave':
                        setRemoteStream(null);
                        if (peerConnection.current) {
                            peerConnection.current.close();
                            peerConnection.current = null;
                        }
                        break;
                }
            });
        } catch (err) {
            console.error('Error accessing media devices:', err);
        }
    }, [roomId, createPeerConnection]);

    const toggleMute = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleCamera = async () => {
        if (!localStreamRef.current) return;

        if (!isCameraOff) {
            // Turning OFF: Stop all video tracks to turn off the hardware light
            localStreamRef.current.getVideoTracks().forEach(track => {
                track.stop();
            });
            setIsCameraOff(true);
        } else {
            // Turning ON: Re-acquire video track from device
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const newTrack = newStream.getVideoTracks()[0];

                // Construct a new stream combining existing audio with new video
                const combinedStream = new MediaStream([
                    ...localStreamRef.current.getAudioTracks(),
                    newTrack
                ]);

                setLocalStream(combinedStream);
                localStreamRef.current = combinedStream;

                // Update the peer connection with the new track without re-negotiation
                if (peerConnection.current) {
                    const senders = peerConnection.current.getSenders();
                    const videoSender = senders.find(s => s.track?.kind === 'video' || (s as any).track === null);
                    if (videoSender) {
                        await videoSender.replaceTrack(newTrack);
                    } else {
                        // If no video sender exists (rare if we started with video), add it
                        peerConnection.current.addTrack(newTrack, combinedStream);
                    }
                }

                setIsCameraOff(false);
            } catch (err) {
                console.error("Failed to re-acquire camera:", err);
            }
        }
    };

    useEffect(() => {
        startCall();
        return () => cleanup();
    }, [startCall, cleanup]);

    return {
        localStream,
        remoteStream,
        connectionState,
        isMuted,
        isCameraOff,
        toggleMute,
        toggleCamera,
        leaveCall: cleanup
    };
};
