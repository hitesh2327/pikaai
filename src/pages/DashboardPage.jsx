// javascript
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell
} from 'recharts';
import { Users, MessageSquare, Zap, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import Mascot from '../components/Mascot';

const DashboardPage = ({ theme, setTheme }) => {
    // State for Mascot Tracking
    const [mascotTarget, setMascotTarget] = useState(null);
    const [mascotEmotion, setMascotEmotion] = useState('idle');

    // Mock Data
    const activityData = [
        { name: 'Mon', conversations: 40, msgs: 240 },
        { name: 'Tue', conversations: 30, msgs: 139 },
        { name: 'Wed', conversations: 20, msgs: 980 },
        { name: 'Thu', conversations: 27, msgs: 390 },
        { name: 'Fri', conversations: 18, msgs: 480 },
        { name: 'Sat', conversations: 23, msgs: 380 },
        { name: 'Sun', conversations: 34, msgs: 430 },
    ];

    const pieData = [
        { name: 'Active', value: 400 },
        { name: 'New', value: 300 },
        { name: 'Inactive', value: 300 },
    ];

    const COLORS = ['#FACC15', '#4ADE80', '#94A3B8']; // Yellow, Green, Gray

    const usageData = [
        { name: 'GPT-3.5', usage: 4000 },
        { name: 'GPT-4', usage: 2400 },
        { name: 'DALL-E', usage: 2400 },
    ];

    const handleCardHover = (e, trend) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMascotTarget({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });

        if (trend && trend > 10) {
            setMascotEmotion('happy');
        } else if (trend && trend < 0) {
            setMascotEmotion('neutral'); // Thoughtful for negative
        } else {
            setMascotEmotion('idle');
        }
    };

    const handleCardLeave = () => {
        setMascotTarget(null);
        setMascotEmotion('idle');
    };

    const StatCard = ({ title, value, trend, icon: Icon, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
            onMouseEnter={(e) => handleCardHover(e, trend)}
            onMouseLeave={handleCardLeave}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
                    <Icon size={24} className={color.split(' ')[0].replace('bg-', 'text-')} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold dark:text-white mt-1">{value}</p>
        </motion.div>
    );

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero / Welcome */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-lg flex items-center justify-between"
                >
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-bold mb-2">Welcome back to PikaAI 👋</h1>
                        <p className="text-white/90 text-lg">Here’s how your AI conversations are performing. You have reached 80% of your monthly token limit.</p>
                        <Link to="/dashboard/insights">
                            <button className="mt-6 px-6 py-2 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                                View Insights
                            </button>
                        </Link>
                    </div>

                    {/* Dashboard Mascot */}
                    <div className="hidden lg:block relative z-20 pr-12">
                        <Mascot
                            size={100}
                            color="bg-yellow-400"
                            target={mascotTarget}
                            emotion={mascotEmotion}
                            className="shadow-2xl"
                        />
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Conversations" value="1,234" trend={12} icon={MessageSquare} color="bg-blue-500 text-blue-500" />
                    <StatCard title="Active Users" value="578" trend={8} icon={Users} color="bg-green-500 text-green-500" />
                    <StatCard title="Messages Sent" value="89.4k" trend={-2} icon={Zap} color="bg-yellow-500 text-yellow-500" />
                    <StatCard title="Avg. Response Time" value="1.2s" trend={5} icon={Activity} color="bg-purple-500 text-purple-500" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Activity Chart (Lines) */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold dark:text-white mb-6">Conversation Activity</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <defs>
                                        <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                                    <XAxis dataKey="name" tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        labelStyle={{ color: theme === 'dark' ? '#FFFFFF' : '#000000' }}
                                    />
                                    <Area type="monotone" dataKey="msgs" stroke="#8884d8" fillOpacity={1} fill="url(#colorMsgs)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Engagement / Plan Usage (Donut/Bar) */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold dark:text-white mb-6">Membership Distribution</h3>
                        <div className="flex-1 min-h-[250px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell - ${index} `} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                <span className="text-3xl font-bold dark:text-white">68%</span>
                                <span className="text-xs text-gray-500">Active</span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Active
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-400"></span> New
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Recent & Plan */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Recent Chats Table */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold dark:text-white">Recent Activity</h3>
                            <button className="text-sm text-blue-500 hover:underline">View all</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-50 dark:bg-gray-800/50">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Chatbot</th>
                                        <th className="px-6 py-3 font-medium">Last Active</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium text-right">Messages</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                                                    <MessageSquare size={16} />
                                                </div>
                                                <span className="font-medium dark:text-gray-200">EchoBot {i}</span>
                                            </td>
                                            <td className="px-6 py-4">2 hours ago</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 block w-fit">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">1,20{i}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Plan Card */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold dark:text-white mb-4">Current Plan</h3>
                        <div className="p-4 bg-gradient-to-br from-gray-800 to-black rounded-lg text-white mb-6">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h4 className="text-xl font-bold text-yellow-400">Pro Plan</h4>
                                    <p className="text-xs text-gray-400">Billed Annually</p>
                                </div>
                                <span className="bg-white/20 text-xs px-2 py-1 rounded">Active</span>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Credits Used</span>
                                    <span>80%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-1.5">
                                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">1,200 / 1,500 monthly credits</p>
                            </div>
                        </div>
                        <button className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Manage Subscription
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
