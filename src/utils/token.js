/**
 * Token Management Utilities
 * Uses sessionStorage as requested.
 */

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenUtils = {
    /**
     * Get the current access token
     * @returns {string|null}
     */
    getAccessToken: () => {
        if (typeof window === 'undefined') return null;
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    },

    /**
     * Get the current refresh token
     * @returns {string|null}
     */
    getRefreshToken: () => {
        if (typeof window === 'undefined') return null;
        return sessionStorage.getItem(REFRESH_TOKEN_KEY);
    },

    /**
     * Store tokens
     * @param {string} accessToken 
     * @param {string} refreshToken 
     */
    setTokens: (accessToken, refreshToken) => {
        if (typeof window === 'undefined') return;
        if (accessToken) sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    /**
     * Clear all tokens (Logout)
     */
    clearTokens: () => {
        if (typeof window === 'undefined') return;
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};
