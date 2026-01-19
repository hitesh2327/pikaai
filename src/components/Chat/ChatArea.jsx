import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

const ChatArea = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Hello! How can I help you today?' },
        { id: 2, role: 'user', content: 'I need help implementing a chat layout.' },
        { id: 3, role: 'assistant', content: 'Sure! A chat layout typically consists of a sidebar for history and a main area for messages. How specific do you want to get?' },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message mock
        const newMessage = { id: Date.now(), role: 'user', content: inputValue };
        setMessages([...messages, newMessage]);
        setInputValue('');

        // Mock response after delay
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "That sounds like a great plan! Let me know if you need code snippets." }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-white dark:bg-gray-800 relative">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="flex flex-col items-center text-sm dark:text-gray-100">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group ${msg.role === 'assistant' ? 'bg-gray-50 dark:bg-[#444654]' : 'bg-white dark:bg-gray-800'
                                }`}
                        >
                            <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
                                <div className="flex-shrink-0 flex flex-col relative items-end">
                                    <div className={`w-[30px] h-[30px] rounded-sm flex items-center justify-center ${msg.role === 'assistant' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                        {msg.role === 'assistant' ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
                                    </div>
                                </div>
                                <div className="relative flex-1 overflow-hidden">
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Spacer for bottom input */}
                <div className="h-32 md:h-48 flex-shrink-0"></div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
                <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                    <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Send a message..."
                            className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                            style={{ maxHeight: '200px', height: '24px', overflowY: 'hidden' }}
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                        >
                            <Send size={16} className="text-gray-400 group-hover:text-gray-900" />
                        </button>
                    </div>
                </div>
                <div className="px-3 pb-3 pt-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pb-6 md:pt-3">
                    This is a preview of the Chat UI.
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
