import React from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface BaseProps {
    className?: string;
    children?: React.ReactNode;
}

export interface HeaderProps {
    activePage?: 'dashboard' | 'pricing' | 'about' | 'chat' | string;
}
