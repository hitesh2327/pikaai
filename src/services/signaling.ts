/**
 * Signaling Service
 * Uses BroadcastChannel for simple cross-tab signaling in the same browser.
 * This is a replaceable layer for WebSockets or a real signaling server.
 */

type SignalingMessage = {
    type: 'offer' | 'answer' | 'ice-candidate' | 'join' | 'leave';
    sender: string;
    target?: string;
    data?: any;
    roomId: string;
};

class SignalingService {
    private channel: BroadcastChannel | null = null;
    private onMessageCallback: ((msg: SignalingMessage) => void) | null = null;
    private roomId: string | null = null;
    private userId: string | null = null;

    constructor() {
        // userId could be fetched from global state or local storage
        this.userId = Math.random().toString(36).substring(7);
    }

    connect(roomId: string, onMessage: (msg: SignalingMessage) => void) {
        this.roomId = roomId;
        this.onMessageCallback = onMessage;
        this.channel = new BroadcastChannel(`conversations_${roomId}`);

        this.channel.onmessage = (event) => {
            const msg = event.data as SignalingMessage;
            if (msg.sender !== this.userId) {
                this.onMessageCallback?.(msg);
            }
        };

        // Notify others that we've joined
        this.sendMessage({ type: 'join', sender: this.userId ?? undefined, roomId: this.roomId ?? undefined });
    }

    sendMessage(msg: Omit<SignalingMessage, 'sender' | 'roomId'> & { sender?: string; roomId?: string }) {
        if (!this.channel) return;

        const fullMsg: SignalingMessage = {
            sender: this.userId!,
            roomId: this.roomId!,
            ...msg
        };

        this.channel.postMessage(fullMsg);
    }

    disconnect() {
        if (this.channel) {
            this.sendMessage({ type: 'leave', sender: this.userId!, roomId: this.roomId! });
            this.channel.close();
            this.channel = null;
        }
    }

    getUserId() {
        return this.userId;
    }
}

export const signalingService = new SignalingService();
