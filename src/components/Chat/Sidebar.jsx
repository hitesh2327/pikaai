import React, { useState, useEffect, useRef } from 'react';
import { MessageSquarePlus, MessageSquare, LogOut, Settings, HelpCircle, User, PanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const profileMenuRef = useRef(null);
    const profileButtonRef = useRef(null);

    // Mock Data
    const chatHistory = [
        { id: 1, title: "New Conversation" },
        { id: 2, title: "Project Discussion" },
        { id: 3, title: "React Architecture" },
        { id: 4, title: "API Integration" },
        { id: 5, title: "Tailwind Styling" },
    ];

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    // Outside Click Handler for Profile Menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showProfileMenu &&
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target) &&
                profileButtonRef.current && // Ensure button ref exists
                !profileButtonRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileMenu]);

    return (
        <div className={`${isOpen ? 'w-[260px]' : 'w-[60px]'} bg-gray-900 text-white h-full flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out relative z-20 group`}>

            {/* Header / New Chat & Toggle Area */}
            <div className={`p-3 flex ${isOpen ? 'flex-row items-center justify-between gap-2' : 'flex-col items-center gap-4'} transition-all duration-300`}>

                {/* New Chat Button */}
                {isOpen ? (
                    <button className="flex items-center gap-3 flex-1 border border-gray-700 p-3 rounded-md hover:bg-gray-800 transition-colors text-sm text-left">
                        <MessageSquarePlus size={18} />
                        <span className="truncate">New chat</span>
                    </button>
                ) : (
                    <button
                        className="p-3 hover:bg-gray-800 rounded-md transition-colors"
                        title="New Chat"
                    >
                        <MessageSquarePlus size={24} />
                    </button>
                )}

                {/* Toggle Button - Inline and Always Visible */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    title={isOpen ? "Collapse Sidebar (Ctrl+B)" : "Expand Sidebar (Ctrl+B)"}
                >
                    <PanelLeft size={24} />
                </button>
            </div>


            {/* Chat History List */}
            <div className="flex-1 overflow-y-auto px-2 py-4 no-scrollbar">
                {isOpen && <div className="px-2 pb-2 text-xs font-semibold text-gray-400">Today</div>}

                <div className="flex flex-col gap-2">
                    {chatHistory.map((chat) => (
                        <button
                            key={chat.id}
                            className={`flex items-center gap-3 w-full p-3 rounded-md hover:bg-gray-800 transition-colors text-sm text-left group
                                ${!isOpen ? 'justify-center' : ''}`}
                            title={!isOpen ? chat.title : ''}
                        >
                            <MessageSquare size={16} className="text-gray-400 group-hover:text-white flex-shrink-0" />
                            {isOpen && <span className="truncate">{chat.title}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* User/Settings Area */}
            <div className="p-3 border-t border-gray-800 relative">
                {showProfileMenu && (
                    <div
                        ref={profileMenuRef}
                        className={`absolute bottom-full mb-2 bg-gray-800 rounded-lg shadow-xl overflow-hidden py-1 border border-gray-700 w-48 z-50
                            ${isOpen ? 'left-0' : 'left-full ml-2'}`} // Pop to right if closed
                    >
                        <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm text-white font-medium">Test User</p>
                            <p className="text-xs text-gray-400">test@pikachat.ai</p>
                        </div>
                        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-700 text-gray-200 transition-colors">
                            <User size={16} /> Profile
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-700 text-gray-200 transition-colors">
                            <Settings size={16} /> Settings
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-700 text-gray-200 transition-colors">
                            <HelpCircle size={16} /> Help
                        </button>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-700 text-red-400 transition-colors">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}

                <button
                    ref={profileButtonRef}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center gap-3 w-full p-2 hover:bg-gray-800 rounded-md cursor-pointer transition-colors
                        ${!isOpen ? 'justify-center' : ''}`}
                >
                    <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        T
                    </div>
                    {isOpen && <div className="text-sm font-medium">Test User</div>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
