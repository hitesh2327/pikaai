import { LucideIcon } from 'lucide-react';
import { Theme } from './common';

export interface DashboardSidebarProps {
    isOpen?: boolean;
    toggleSidebar?: () => void;
    mobileOnly?: boolean;
}

export interface MenuItem {
    icon: LucideIcon;
    label: string;
    path: string;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export interface DashboardStatCardProps {
    title: string;
    value: string;
    trend?: number;
    icon: LucideIcon;
    color: string;
}

export interface ActivityPoint {
    name: string;
    conversations: number;
    msgs: number;
    [key: string]: string | number;
}

export interface PiePoint {
    name: string;
    value: number;
    [key: string]: string | number;
}
