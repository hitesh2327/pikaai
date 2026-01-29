import { Theme } from './common';

export interface LoginFormProps {
    setFocusedInput: (input: 'username' | 'password' | null) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    onLoginSuccess?: () => void;
}

export interface FloatingInputProps {
    type: string;
    placeholder: string;
    onFocus?: () => void;
    onBlur?: () => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ThemeToggleProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
