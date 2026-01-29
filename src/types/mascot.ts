export type MascotEmotion = 'idle' | 'happy' | 'thinking' | 'neutral' | 'surprise';
export type Emotion = MascotEmotion;

export type FocusedInput = 'username' | 'password' | null;

export interface MascotProps {
    emotion?: MascotEmotion;
    size?: number;
    color?: string;
    target?: { x: number; y: number } | null;
    className?: string;
}

export interface EyeProps {
    lookAt: { x: number; y: number } | null;
    isLookingAway?: boolean;
    size?: number;
    pupilSize?: number;
}
