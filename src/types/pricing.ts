export interface PricingPlan {
    name: string;
    price: string | number;
    description: string;
    features: string[];
    popular?: boolean;
    is_popular?: boolean;
    interval?: string;
    billing_cycle?: 'monthly' | 'yearly';
    ctaLabel?: string;
}

export type BillingCycle = 'monthly' | 'yearly';

export interface PricingResponse {
    plans?: PricingPlan[];
}
