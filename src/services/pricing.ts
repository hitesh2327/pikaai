import { apiClient } from '../api/client';
import { PricingPlan, BillingCycle } from '../types/pricing';

// Simple in-memory cache
const pricingCache: Record<BillingCycle, PricingPlan[] | null> = {
    monthly: null,
    yearly: null
};

export const pricingService = {
    /**
     * Fetch pricing plans based on billing cycle.
     */
    getPricing: async (billingCycle: BillingCycle = 'monthly'): Promise<PricingPlan[]> => {
        // Check cache first
        if (pricingCache[billingCycle]) {
            console.log(`[PricingService] Returning cached data for ${billingCycle}`);
            return pricingCache[billingCycle]!;
        }

        console.log(`[PricingService] Fetching pricing for ${billingCycle}`);
        const response = await apiClient<PricingPlan[] | { plans: PricingPlan[] }>(`/pricing?billing_cycle=${billingCycle}`);

        if (response.ok && response.data) {
            const plansData = Array.isArray(response.data) ? response.data : (response.data.plans || []);
            // Cache the successful response
            pricingCache[billingCycle] = plansData;
            return plansData;
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
