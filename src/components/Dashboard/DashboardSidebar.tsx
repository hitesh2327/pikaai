import React from 'react';
import { Home, MessageSquare, CreditCard, PieChart, Settings, LogOut, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardSidebarProps, MenuItem } from '../../types/dashboard';

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, toggleSidebar, mobileOnly = false }) => {
    const location = useLocation();

    const menuItems: MenuItem[] = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageSquare, label: 'Chats', path: '/chat' },
        { icon: CreditCard, label: 'Pricing', path: '/pricing' },
        { icon: PieChart, label: 'Insights', path: '/dashboard/insights' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const sidebarClasses = mobileOnly
        ? `fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`
        : `hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 flex-shrink-0 h-screen sticky top-0`;

    return (
        <div className={sidebarClasses}>
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
                <Link to="/chat" className="text-3xl font-bold text-yellow-400 select-none hover:opacity-80 transition-opacity" style={{ fontFamily: '"Caveat", cursive' }}>
                    Pika AI
                </Link>
                {mobileOnly && (
                    <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative
                                ${isActive
                                    ? 'text-white bg-gray-800'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />}
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-800">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
