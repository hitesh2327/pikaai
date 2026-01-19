import React from 'react';
import { MessageSquarePlus, MessageSquare } from 'lucide-react';

const Sidebar = () => {
    // Mock Data
    const chatHistory = [
        { id: 1, title: "New Conversation" },
        { id: 2, title: "Project Discussion" },
        { id: 3, title: "React Architecture" },
        { id: 4, title: "API Integration" },
        { id: 5, title: "Tailwind Styling" },
    ];

    return (
        <div className="md:flex md:flex-col w-64 bg-gray-900 text-white h-full hidden flex-shrink-0">
            {/* New Chat Button */}
            <div className="p-4">
                <button className="flex items-center gap-3 w-full border border-gray-700 p-3 rounded-md hover:bg-gray-800 transition-colors text-sm text-left">
                    <MessageSquarePlus size={16} />
                    New chat
                </button>
            </div>

            {/* Chat History List */}
            <div className="flex-1 overflow-y-auto px-2">
                <div className="flex flex-col gap-2 pb-4">
                    <div className="px-2 py-2 text-xs font-semibold text-gray-400">Today</div>
                    {chatHistory.map((chat) => (
                        <button
                            key={chat.id}
                            className="flex items-center gap-3 w-full p-3 rounded-md hover:bg-gray-800 transition-colors text-sm text-left truncate group"
                        >
                            <MessageSquare size={16} className="text-gray-400 group-hover:text-white" />
                            <span className="truncate">{chat.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* User/Settings Area - Optional Placeholder */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-md cursor-pointer transition-colors">
                    <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center text-xs font-bold">
                        T
                    </div>
                    <div className="text-sm font-medium">Test User</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
