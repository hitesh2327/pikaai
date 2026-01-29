import { tokenUtils } from '../utils/token';

// Use a type-safe way to access env variables in Vite
const BASE_URL: string = (process.env.GenericChabotAPI as string) || '';

if (!BASE_URL) {
    console.error("GenericChabotAPI environment variable is not set!");
}

interface ApiOptions extends RequestInit {
    body?: BodyInit | null;
}

export interface ApiResponse<T = unknown> {
    ok: boolean;
    status: number;
    data?: T;
    error?: string;
}

/**
 * Generic API Client
 * Wraps fetch to handle base URL and common headers.
 */
export const apiClient = async <T = unknown>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> => {
    const url = `${BASE_URL}${endpoint}`;

    const token = tokenUtils.getAccessToken();

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...((options.headers as Record<string, string>) || {}),
        },
    };

    try {
        console.log("config: ", config);
        console.log("url: ", url);

        const response = await fetch(url, config);

        if (!response.ok) {
            console.error(`API Call Failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { ok: response.ok, status: response.status, data };

    } catch (error: unknown) {
        console.error("Network or API Error:", error);
        return {
            ok: false,
            status: 0,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};
