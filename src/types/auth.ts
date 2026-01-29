import { User } from './user';

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface LoginResponse {
    token: string;
    user: User;
    access_token?: string;
    refresh_token?: string;
    data?: unknown;
}

export interface AuthService {
    login: (username: string, password: string) => Promise<unknown>;
    logout: () => void;
}
