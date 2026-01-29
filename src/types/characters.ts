export interface MousePosition {
    x: number;
    y: number;
}

export interface CharacterEyeProps {
    mousePos: MousePosition;
    parentRef?: React.RefObject<HTMLElement>;
    isLookingAway?: boolean;
    isNeutral?: boolean;
    size?: string;
    pupilSize?: string;
}

export interface LogoMascotProps {
    color: string;
    className: string;
    mousePos: MousePosition;
    isTracking: boolean;
    style?: React.CSSProperties;
}

export interface BrandHeaderProps {
    mousePos: MousePosition;
}

export interface CharacterSceneProps {
    focusedInput: 'username' | 'password' | null;
}
