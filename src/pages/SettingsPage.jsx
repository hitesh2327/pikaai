import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Lock, Users, CreditCard, Layout, Mail, Bell,
    Shield, Plus, ArrowRight, Check, AlertCircle, Trash2, Zap
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
            case 'details':
                return <DetailsSettings />;
            case 'profile':
                return <ProfileSettings />;
            case 'password':
                return <PasswordSettings />;
            case 'team':
                return <TeamSettings />;
            case 'billing':
                return <BillingSettings />;
            case 'plan':
                return <PlanSettings />;
            case 'email':
                return <EmailSettings />;
            case 'notifications':
                return <NotificationSettings />;
            default:
                return <DetailsSettings />;
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
                    <main className="flex-1 min-w-0">
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

/* --- Global UI Helpers --- */

const SettingsCard = ({ title, description, children, footer }) => (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800 flex justify-end">{footer}</div>}
    </section>
);

const InputField = ({ label, type = 'text', readOnly = false, value, defaultValue, placeholder }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>
        <input
            type={type}
            readOnly={readOnly}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-yellow-400 outline-none transition-all dark:text-white
                ${readOnly ? 'bg-gray-50 dark:bg-gray-900 text-gray-500 cursor-not-allowed border-gray-100 dark:border-gray-800' : ''}`}
        />
    </div>
);

const Toggle = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-4">
        <div className="flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        </div>
        <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none 
            ${defaultChecked ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${defaultChecked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

/* --- Module Components --- */

const DetailsSettings = () => (
    <SettingsCard
        title="My Details"
        description="Update your personal information and contact details."
        footer={<button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Save Changes</button>}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" defaultValue="Hitesh Sharma" />
            <InputField label="Username" defaultValue="hitesh_pika" />
            <InputField label="Email Address" defaultValue="hitesh@gmail.com" readOnly />
            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" />
            <InputField label="Timezone" defaultValue="UTC-5 (Eastern Time)" />
            <InputField label="Account ID" defaultValue="pika_9823kjsd" readOnly />
        </div>
    </SettingsCard>
);

const ProfileSettings = () => (
    <div className="space-y-8">
        <SettingsCard title="Profile Photo" description="Your avatar is used across the product. Size: 400x400px recommended.">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 border-4 border-yellow-400 overflow-hidden shadow-xl">
                        <User size={64} />
                    </div>
                    <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold rounded-full">
                        Change Photo
                    </button>
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold shadow-sm">Upload New</button>
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-800 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Reset</button>
                    </div>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
            </div>
        </SettingsCard>

        <SettingsCard
            title="Public Profile"
            footer={<button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Save Settings</button>}
        >
            <div className="space-y-6">
                <InputField label="Display Name" defaultValue="Hitesh" />
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Short Bio</label>
                    <textarea
                        rows={4}
                        placeholder="Tell the world about yourself..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-yellow-400 outline-none transition-all dark:text-white"
                    />
                </div>
            </div>
        </SettingsCard>
    </div>
);

const PasswordSettings = () => (
    <SettingsCard
        title="Password"
        description="Change your account password. Use a mix of letters, numbers, and symbols."
        footer={<button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Update Password</button>}
    >
        <div className="space-y-6 max-w-md">
            <InputField label="Current Password" type="password" />
            <div className="space-y-4">
                <InputField label="New Password" type="password" />
                {/* Visual Strength Indicator */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Strength: Strong</span>
                        <span className="text-green-500 font-bold">100%</span>
                    </div>
                    <div className="flex gap-1 h-1">
                        <div className="flex-1 bg-green-500 rounded-full" />
                        <div className="flex-1 bg-green-500 rounded-full" />
                        <div className="flex-1 bg-green-500 rounded-full" />
                        <div className="flex-1 bg-green-500 rounded-full" />
                    </div>
                </div>
            </div>
            <InputField label="Confirm New Password" type="password" />
        </div>
    </SettingsCard>
);

const TeamSettings = () => (
    <div className="space-y-8">
        <SettingsCard
            title="Team Members"
            description="Manage your team and their access levels."
            footer={
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold shadow-md">
                    <Plus size={16} /> Invite Member
                </button>
            }
        >
            <div className="overflow-x-auto -mx-6">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            { name: 'Hitesh Sharma', email: 'hitesh@gmail.com', role: 'Owner', status: 'Active' },
                            { name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'Admin', status: 'Active' },
                            { name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Member', status: 'Pending' },
                        ].map((member, i) => (
                            <tr key={i} className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold">
                                            {member.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium dark:text-white">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{member.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${member.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                                        }`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SettingsCard>
    </div>
);

const PlanSettings = () => (
    <div className="space-y-8">
        <SettingsCard title="Your Plan" description="Manage your subscription and view usage.">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl text-white shadow-xl relative overflow-hidden ring-1 ring-white/10">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-bold rounded-full uppercase tracking-widest mb-2 inline-block">Pro Plan</span>
                            <h3 className="text-3xl font-bold">Business Elite</h3>
                            <p className="text-sm text-gray-400 mt-1">Billed annually • Next renewal Jan 2027</p>
                        </div>
                        <CreditCard className="text-gray-600" size={32} />
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Message Credits</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">14,230</span>
                                <span className="text-sm text-gray-500 mb-0.5">/ 50,000</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-yellow-400 h-full rounded-full" style={{ width: '28%' }} />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Team Seats</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-gray-500 mb-0.5">/ 10</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-green-400 h-full rounded-full" style={{ width: '30%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
            </div>

            <div className="mt-8 flex items-center justify-between p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl">
                <div className="flex items-center gap-3 text-yellow-500">
                    <Zap size={20} />
                    <p className="text-sm font-bold">Need more power? Upgrade to Enterprise for unlimited credits.</p>
                </div>
                <button className="px-4 py-2 bg-yellow-400 text-black text-sm font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                    Upgrade Now
                </button>
            </div>
        </SettingsCard>
    </div>
);

const EmailSettings = () => (
    <div className="space-y-8">
        <SettingsCard title="Email Configuration" description="Manage your primary email and delivery settings.">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
                        <InputField label="Primary Email" value="hitesh@gmail.com" readOnly />
                    </div>
                    <button className="px-6 py-2 border border-gray-200 dark:border-gray-800 dark:text-white rounded-lg text-sm font-bold h-[42px] hover:bg-gray-50 dark:hover:bg-gray-800">
                        Change Email
                    </button>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                    <Check size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                </div>
            </div>
        </SettingsCard>

        <SettingsCard title="Subscription Preference">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <Toggle label="Product Updates" description="Be the first to know about new features and improvements." defaultChecked />
                <Toggle label="Security Alerts" description="Important messages about your account security and activity." defaultChecked />
                <Toggle label="Billing Emails" description="Receive invoices, renewal notices and payment receipts." defaultChecked />
            </div>
        </SettingsCard>
    </div>
);

const NotificationSettings = () => (
    <div className="space-y-8">
        <SettingsCard title="In-App Notifications" description="Configure when you receive alerts within the dashboard.">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <Toggle label="New Message Activity" description="Alerts for new messages in your chats." defaultChecked={false} />
                <Toggle label="System Alerts" description="Critical system maintenance and performance updates." defaultChecked />
                <Toggle label="Theme Changes" description="Notifications when theme is automatically adjusted." />
            </div>
        </SettingsCard>

        <SettingsCard title="Push & Browser Notifications">
            <div className="flex items-center justify-between p-6 bg-red-400/5 border border-red-400/20 rounded-xl">
                <div className="flex items-center gap-3 text-red-500">
                    <AlertCircle size={20} />
                    <p className="text-sm font-bold">Browser notifications are currently blocked by your system settings.</p>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold rounded-lg shadow-sm">
                    Enable in Browser
                </button>
            </div>
        </SettingsCard>
    </div>
);

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
