import { apiClient } from '../api/client';
import { tokenUtils } from '../utils/token';

export const authService = {
    /**
     * Login User
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<object>} Parsed user data (optional) or basic success
     */
    login: async (username, password) => {
        const response = await apiClient('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { access_token, refresh_token } = response.data;
            if (access_token) {
                // Determine refresh token fallback (cookie vs response) 
                // Instructions: "Store in secure cookie (preferred) OR session storage"
                // API response returns it, so we stick to session storage as planned in `token.js`.
                tokenUtils.setTokens(access_token, refresh_token);
            }
            return response.data;
        } else {
            // Propagate error details
            throw new Error(response.data?.detail || response.data?.message || 'Login failed');
        }
    },

    logout: () => {
        tokenUtils.clearTokens();
        // Potentially call API to invalidate tokens if needed
    }
};
