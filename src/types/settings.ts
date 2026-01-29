import { LucideIcon } from 'lucide-react';

export interface MenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

export interface SettingsCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export interface InputFieldProps {
    label: string;
    type?: string;
    readOnly?: boolean;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
}

export interface ToggleProps {
    label: string;
    description?: string;
    defaultChecked?: boolean;
}

export interface TeamMember {
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Pending';
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: 'Paid' | 'Cancelled';
}
