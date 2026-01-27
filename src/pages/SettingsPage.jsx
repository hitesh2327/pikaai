import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Lock, Users, CreditCard, Layout, Mail, Bell,
    Shield, Plus, ArrowRight, Check, AlertCircle, Trash2
} from 'lucide-react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';

const SettingsPage = ({ theme, setTheme }) => {
    const [activeTab, setActiveTab] = useState('billing');

    const menuItems = [
        { id: 'details', label: 'My Details', icon: User },
        { id: 'profile', label: 'Profile', icon: Layout },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'plan', label: 'Plan', icon: Shield },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'billing':
                return <BillingSettings />;
            default:
                return <PlaceholderSettings title={menuItems.find(i => i.id === activeTab)?.label} />;
        }
    };

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Horizontal Tabs for Mobile / Sidebar for Desktop */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        {/* Mobile: Horizontal Scrollable Tabs */}
                        <div className="flex md:hidden overflow-x-auto pb-2 scrollbar-hide gap-2 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800 mb-6">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all
                                        ${activeTab === item.id
                                            ? 'bg-yellow-400 text-black shadow-sm'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <item.icon size={14} />
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Desktop: Vertical Sidebar */}
                        <nav className="hidden md:block space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                                        ${activeTab === item.id
                                            ? 'bg-yellow-400 text-black shadow-md translate-x-1'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </DashboardLayout>
    );
};

/* --- Billing Section Components --- */

const BillingSettings = () => (
    <div className="space-y-8">
        {/* Payment Method */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Method</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your cards and preferred payment options.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Plus size={16} /> Add Card
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-yellow-400/30 bg-yellow-400/5 dark:bg-yellow-400/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-black dark:bg-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-white tracking-widest uppercase">
                            Visa
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Expiry 12/26 • Default</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium">Edit</button>
                        <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
                        <button className="text-sm text-red-500 hover:text-red-600 font-medium">Remove</button>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact Email */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contact Email</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Where should we send your invoices?</p>
            </div>
            <div className="p-6 space-y-4">
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="billing-email" defaultChecked className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Send to my account email (hitesh@gmail.com)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="billing-email" className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Send to another email address</span>
                    </label>
                </div>
            </div>
        </section>

        {/* Billing History */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Billing History</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download and view your past invoices.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Invoice</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            { id: 'INV-2024-001', date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
                            { id: 'INV-2023-012', date: 'Dec 1, 2023', amount: '$29.00', status: 'Paid' },
                            { id: 'INV-2023-011', date: 'Nov 1, 2023', amount: '$29.00', status: 'Cancelled' },
                        ].map((invoice) => (
                            <tr key={invoice.id} className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 font-medium dark:text-white">{invoice.id}</td>
                                <td className="px-6 py-4">{invoice.date}</td>
                                <td className="px-6 py-4">{invoice.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${invoice.status === 'Paid'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-yellow-500 hover:text-yellow-600 font-bold transition-colors">Download</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
);

const PlaceholderSettings = ({ title }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
            This module is currently under development to ensure a secure and enterprise-ready experience.
        </p>
        <button className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-80 transition-opacity">
            Notify Me When Available
        </button>
    </div>
);

export default SettingsPage;
