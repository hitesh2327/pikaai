export interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface CapabilityBlockProps {
    title: string;
    description: string;
    tags: string[];
    color: string;
}

export interface StatCardProps {
    number: string;
    label: string;
}

export interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    active?: boolean;
}

export interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
}

export interface PricingCardProps {
    tier: string;
    price: string;
    features: string[];
    recommended?: boolean;
}
