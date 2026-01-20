import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Paperclip, FileText, X } from 'lucide-react';

const ChatArea = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Hello! How can I help you today?' },
        { id: 2, role: 'user', content: 'I need help implementing a chat layout.' },
        { id: 3, role: 'assistant', content: 'Sure! A chat layout typically consists of a sidebar for history and a main area for messages. How specific do you want to get?' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Auto-Scroll Logic
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim() && !attachedFile) return;

        // Add user message mock with attachment if present
        let content = inputValue;
        if (attachedFile) {
            content = `[Attached: ${attachedFile.name}] ${content}`;
        }

        const newMessage = { id: Date.now(), role: 'user', content: content };
        setMessages([...messages, newMessage]);
        setInputValue('');
        setAttachedFile(null); // Clear attachment

        // Mock response after delay
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "That sounds like a great plan! Let me know if you need code snippets." }]);
        }, 1000);
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
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
                    <div ref={messagesEndRef} />
                </div>
                {/* Spacer for bottom input */}
                <div className="h-32 md:h-48 flex-shrink-0"></div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
                <div className="stretch mx-2 flex flex-col gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">

                    {/* File Attachment Preview */}
                    {attachedFile && (
                        <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 w-fit">
                            <FileText size={20} className="text-gray-500 dark:text-gray-300" />
                            <span className="text-sm text-gray-700 dark:text-gray-200 truncate max-w-[200px]">{attachedFile.name}</span>
                            <button onClick={() => setAttachedFile(null)} className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-1">
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {/* Attachment Button */}
                        <button
                            className="absolute left-2 top-2 md:top-3 md:left-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip size={20} />
                        </button>

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
                            className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-10 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-10"
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
                    Pika AI can make mistakes, Check important info.
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
