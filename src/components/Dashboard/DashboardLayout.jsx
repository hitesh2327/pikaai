import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import Footer from '../Footer';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';

const DashboardLayout = ({ children, theme, setTheme }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Desktop Sidebar */}
            <DashboardSidebar />

            {/* Mobile Sidebar (Drawer) */}
            <DashboardSidebar
                mobileOnly={true}
                isOpen={isMobileSidebarOpen}
                toggleSidebar={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-600 dark:text-gray-300"
                            onClick={() => setIsMobileSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold hidden sm:block">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search (Optional) */}
                        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 border border-transparent focus-within:border-gray-300 dark:focus-within:border-gray-600">
                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-32 lg:w-48 placeholder-gray-400"
                            />
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                        </button>

                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 cursor-pointer"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto flex flex-col">
                    <div className="flex-1 p-4 md:p-8">
                        {children}
                    </div>
                    <div className="mt-auto">
                        <Footer />
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
