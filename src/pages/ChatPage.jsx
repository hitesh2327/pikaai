import React from 'react';
import Sidebar from '../components/Chat/Sidebar';
import ChatArea from '../components/Chat/ChatArea';

const ChatPage = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <ChatArea />
        </div>
    );
};

export default ChatPage;
