import { apiClient } from '../api/client';
import { tokenUtils } from '../utils/token';
import { LoginResponse } from '../types/auth';

export const authService = {
    /**
     * Login User
     */
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if (response.ok && response.data) {
            const { access_token, refresh_token } = response.data;
            if (access_token) {
                tokenUtils.setTokens(access_token, refresh_token);
            }
            return response.data;
        } else {
            // Propagate error details
            const data = response.data as Record<string, unknown> | undefined;
            const errorMsg = String(data?.detail || data?.message || 'Login failed');
            throw new Error(errorMsg);
        }
    },

    logout: () => {
        tokenUtils.clearTokens();
    }
};
