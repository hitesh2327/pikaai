import { apiClient } from '../api/client';

// Simple in-memory cache
const pricingCache = {
    monthly: null,
    yearly: null
};

export const pricingService = {
    /**
     * Fetch pricing plans based on billing cycle.
     * @param {'monthly' | 'yearly'} billingCycle 
     */
    getPricing: async (billingCycle = 'monthly') => {
        // Check cache first
        if (pricingCache[billingCycle]) {
            console.log(`[PricingService] Returning cached data for ${billingCycle}`);
            return pricingCache[billingCycle];
        }

        console.log(`[PricingService] Fetching pricing for ${billingCycle}`);
        const response = await apiClient(`/pricing?billing_cycle=${billingCycle}`);

        if (response.ok) {
            // Cache the successful response
            pricingCache[billingCycle] = response.data;
            return response.data;
        } else {
            throw new Error(response.error || 'Failed to fetch pricing');
        }
    },

    /**
     * Clear cache if needed (e.g. on logout or specific event)
     */
    clearCache: () => {
        pricingCache.monthly = null;
        pricingCache.yearly = null;
    }
};
