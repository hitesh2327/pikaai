import { LucideIcon } from 'lucide-react';
import { Theme } from './common';

export interface Insight {
    id: string;
    headline: string;
    explanation: string;
    evidence: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
    icon: LucideIcon;
}

export interface InsightCategory {
    title: string;
    description: string;
    insights: Insight[];
}

export interface TimelineItemData {
    date: string;
    event: string;
    result: string;
    type: 'success' | 'warning' | 'neutral';
}

export interface InsightsPageProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export interface InsightCardProps {
    insight: Insight;
    index: number;
    isExpanded: boolean;
    toggleExpand: () => void;
}
