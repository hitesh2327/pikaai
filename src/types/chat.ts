export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export interface ChatHistoryItem {
    id: number;
    title: string;
}

export interface Message {
    id: string | number;
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatAreaProps {
    isOpen: boolean;
}
