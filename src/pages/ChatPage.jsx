import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Chat/Sidebar';
import ChatArea from '../components/Chat/ChatArea';
import Header from '../components/Header';
import { PanelLeft } from 'lucide-react';

const ChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // Keyboard Shortcut (Cmd+B / Ctrl+B)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-gray-900">
            {/* Top Navigation */}
            <Header />

            {/* Main Workspace (Sidebar + Chat) */}
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <ChatArea />
            </div>
        </div>
    );
};

export default ChatPage;

