import { tokenUtils } from '../utils/token';

const BASE_URL = process.env.GenericChabotAPI;

if (!BASE_URL) {
    console.error("GenericChabotAPI environment variable is not set!");
}

/**
 * Generic API Client
 * Wraps fetch to handle base URL and common headers.
 */
export const apiClient = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const token = tokenUtils.getAccessToken();

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        console.log("config: ", config);
        console.log("url: ", url);

        const response = await fetch(url, config);

        // Simple error handling for now
        if (!response.ok) {
            console.error(`API Call Failed: ${response.status} ${response.statusText}`);
            // Depending on requirements, we might want to throw here
            // throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return { ok: response.ok, status: response.status, data };

    } catch (error) {
        console.error("Network or API Error:", error);
        return { ok: false, error: error.message };
    }
};
