import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../types/common';

const Header: React.FC<HeaderProps> = ({ activePage }) => {
    return (
        <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 flex-shrink-0 z-50 relative">
            {/* Left: Branding */}
            <div className="flex items-center">
                <Link to="/chat" className="text-3xl font-bold text-yellow-400 select-none hover:opacity-80 transition-opacity" style={{ fontFamily: '"Caveat", cursive' }}>
                    Pika AI
                </Link>
            </div>

            {/* Right: Navigation Items */}
            <nav className="hidden md:flex items-center gap-8">
                <Link
                    to="/chat"
                    className={`text-sm font-medium transition-colors ${activePage === 'chat' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                    Chat
                </Link>
                <Link
                    to="/conversations"
                    className={`text-sm font-medium transition-colors ${activePage === 'conversations' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                    Conversations
                </Link>
                <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/pricing"
                    className={`text-sm font-medium transition-colors ${activePage === 'pricing' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                    Pricing
                </Link>
                <Link
                    to="/about"
                    className={`text-sm font-medium transition-colors ${activePage === 'about' ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                    About Pika AI
                </Link>
                <Link
                    to="/settings"
                    state={{ activeTab: 'profile' }}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm font-medium transition-colors"
                >
                    Profile
                </Link>
            </nav>

            {/* Mobile Menu Placeholder (Optional, for responsiveness if needed later) */}
            <div className="md:hidden">
                {/* Mobile menu icon could go here */}
            </div>
        </div>
    );
};

export default Header;
