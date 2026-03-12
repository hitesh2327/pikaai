import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Phone, Link, Users, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import { InsightsPageProps } from '../types/insights';

const MOCK_TEAM = [
    { id: '1', name: 'Hitesh Sharma', role: 'Owner', status: 'online', avatar: 'H' },
    { id: '2', name: 'Sarah Miller', role: 'Admin', status: 'online', avatar: 'S' },
    { id: '3', name: 'Alex Johnson', role: 'Member', status: 'offline', avatar: 'A' },
];

const ConversationsPage: React.FC<InsightsPageProps> = ({ theme, setTheme }) => {
    const navigate = useNavigate();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const startCall = (userId: string) => {
        const roomId = `room_${Math.random().toString(36).substring(7)}`;
        navigate(`/conversations/${roomId}`);
    };

    const copyLink = (roomId: string) => {
        const link = `${window.location.origin}/conversations/${roomId}`;
        navigator.clipboard.writeText(link);
        setCopiedId(roomId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="max-w-6xl mx-auto py-10 px-6">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Conversations</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Connect with your team via real-time video calls.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Team Members List */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Users size={20} className="text-yellow-400" />
                            Team Members
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {MOCK_TEAM.map((member) => (
                                <motion.div
                                    key={member.id}
                                    whileHover={{ y: -4 }}
                                    className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold text-black">
                                                {member.avatar}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{member.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => startCall(member.id)}
                                        className="p-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full transition-colors"
                                    >
                                        <Video size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / Active Calls */}
                    <div className="space-y-6">
                        <section className="p-6 bg-yellow-400 dark:bg-yellow-400/10 border border-yellow-400/20 rounded-2xl">
                            <h3 className="font-bold text-black dark:text-yellow-400 mb-2">Quick Start</h3>
                            <p className="text-sm text-yellow-900 dark:text-yellow-400/70 mb-4">Create a new room and invite your team.</p>
                            <button
                                onClick={() => startCall('general')}
                                className="w-full py-3 bg-black dark:bg-yellow-400 text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <Phone size={18} />
                                Start New Call
                            </button>
                        </section>

                        <section className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Active Rooms</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center justify-between border border-transparent hover:border-yellow-400/30 transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Design Sync</p>
                                        <p className="text-xs text-gray-500">2 people • 12:40 PM</p>
                                    </div>
                                    <button
                                        onClick={() => copyLink('design-sync')}
                                        className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                                    >
                                        <Link size={16} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ConversationsPage;
