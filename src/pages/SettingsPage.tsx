import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
    User, Lock, Users, CreditCard, Layout, Mail, Bell,
    Shield, Plus, Check, AlertCircle, Trash2, Zap, ChevronRight, Menu, X
} from 'lucide-react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import {
    MenuItem,
    SettingsCardProps,
    InputFieldProps,
    ToggleProps,
    TeamMember,
    Invoice
} from '../types/settings';
import { InsightsPageProps } from '../types/insights';

const SettingsPage: React.FC<InsightsPageProps> = ({ theme, setTheme }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>(location.state?.activeTab || 'billing');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const menuItems: MenuItem[] = [
        { id: 'details', label: 'My Details', icon: User },
        { id: 'profile', label: 'Profile', icon: Layout },
        { id: 'password', label: 'Password', icon: Lock },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'plan', label: 'Plan', icon: Shield },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const currentItem = menuItems.find(item => item.id === activeTab) || menuItems[0];

    const renderContent = () => {
        switch (activeTab) {
            case 'details': return <DetailsSettings />;
            case 'profile': return <ProfileSettings />;
            case 'password': return <PasswordSettings />;
            case 'team': return <TeamSettings />;
            case 'billing': return <BillingSettings />;
            case 'plan': return <PlanSettings />;
            case 'email': return <EmailSettings />;
            case 'notifications': return <NotificationSettings />;
            default: return <DetailsSettings />;
        }
    };

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="max-w-6xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <header className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-8 relative">

                    {/* Settings Sidebar / Mobile Nav */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        {/* Mobile: Selector Button */}
                        <div className="md:hidden mb-6">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm text-gray-900 dark:text-white"
                            >
                                <div className="flex items-center gap-3">
                                    <currentItem.icon size={20} className="text-yellow-400" />
                                    <span className="font-bold">{currentItem.label}</span>
                                </div>
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>

                            <AnimatePresence>
                                {isMobileMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute z-20 top-20 left-4 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden mt-1"
                                    >
                                        <div className="p-2 space-y-1">
                                            {menuItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        setActiveTab(item.id);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all
                                                        ${activeTab === item.id
                                                            ? 'bg-yellow-400 text-black shadow-md'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <item.icon size={18} />
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Desktop: Vertical Sidebar */}
                        <nav className="hidden md:block space-y-1 sticky top-24">
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
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
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

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children, footer }) => (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm mb-6 md:mb-8">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="p-4 md:p-6">{children}</div>
        {footer && <div className="p-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <div className="w-full sm:w-auto">{footer}</div>
        </div>}
    </section>
);

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', readOnly = false, value, defaultValue, placeholder }) => (
    <div className="space-y-2">
        <label className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            readOnly={readOnly}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-yellow-400 outline-none transition-all dark:text-white text-sm
                ${readOnly ? 'bg-gray-50 dark:bg-gray-900 text-gray-500 cursor-not-allowed border-gray-100 dark:border-gray-800' : ''}`}
        />
    </div>
);

const Toggle: React.FC<ToggleProps> = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between py-4 gap-4">
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{label}</p>
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 md:line-clamp-none">{description}</p>}
        </div>
        <button
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none 
            ${defaultChecked ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${defaultChecked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

/* --- Module Components --- */

const DetailsSettings: React.FC = () => (
    <SettingsCard
        title="My Details"
        description="Update your personal information and contact details."
        footer={<button className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Save Changes</button>}
    >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <InputField label="Full Name" defaultValue="Hitesh Sharma" />
            <InputField label="Username" defaultValue="hitesh_pika" />
            <InputField label="Email Address" defaultValue="hitesh@gmail.com" readOnly />
            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" />
            <InputField label="Timezone" defaultValue="UTC-5 (Eastern Time)" />
            <InputField label="Account ID" defaultValue="pika_9823kjsd" readOnly />
        </div>
    </SettingsCard>
);

const ProfileSettings: React.FC = () => (
    <div className="space-y-6 md:space-y-8">
        <SettingsCard title="Profile Photo" description="Your avatar is used across the product.">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
                <div className="relative group">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 border-4 border-yellow-400 overflow-hidden shadow-xl">
                        <User size={48} className="md:size-[64px]" />
                    </div>
                </div>
                <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                        <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold shadow-sm">Upload New</button>
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-800 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Reset</button>
                    </div>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
            </div>
        </SettingsCard>

        <SettingsCard
            title="Public Profile"
            footer={<button className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Save Settings</button>}
        >
            <div className="space-y-6">
                <InputField label="Display Name" defaultValue="Hitesh" />
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Short Bio</label>
                    <textarea
                        rows={4}
                        placeholder="Tell the world about yourself..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-yellow-400 outline-none transition-all dark:text-white text-sm"
                    />
                </div>
            </div>
        </SettingsCard>
    </div>
);

const PasswordSettings: React.FC = () => (
    <SettingsCard
        title="Password"
        description="Change your account password."
        footer={<button className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 transition-colors">Update Password</button>}
    >
        <div className="space-y-6 max-w-md mx-auto sm:mx-0">
            <InputField label="Current Password" type="password" />
            <div className="space-y-4">
                <InputField label="New Password" type="password" />
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] md:text-xs">
                        <span className="text-gray-500 font-bold">STRENGTH: STRONG</span>
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

const TeamSettings: React.FC = () => {
    const members: TeamMember[] = [
        { name: 'Hitesh Sharma', email: 'hitesh@gmail.com', role: 'Owner', status: 'Active' },
        { name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'Admin', status: 'Active' },
        { name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Member', status: 'Pending' },
    ];

    return (
        <div className="space-y-8">
            <SettingsCard
                title="Team Members"
                description="Manage your team and their access levels."
                footer={
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold shadow-md">
                        <Plus size={16} /> Invite Member
                    </button>
                }
            >
                {/* Desktop/Tablet View */}
                <div className="hidden sm:block overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {members.map((member, i) => (
                                <tr key={i} className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-bold">
                                                {member.name[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold dark:text-white truncate">{member.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{member.role}</td>
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

                {/* Mobile Card-based View */}
                <div className="sm:hidden space-y-4">
                    {members.map((member, i) => (
                        <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {member.name[0]}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold dark:text-white truncate">{member.name}</p>
                                    <p className="text-xs text-gray-500 mb-1 truncate">{member.email}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">{member.role}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${member.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'}`}>
                                            {member.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </SettingsCard>
        </div>
    );
};

const PlanSettings: React.FC = () => (
    <div className="space-y-6 md:space-y-8">
        <SettingsCard title="Your Plan" description="Manage your subscription and view usage.">
            <div className="p-5 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 md:mb-12">
                        <div>
                            <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-bold rounded-full uppercase tracking-widest mb-3 inline-block">Pro Plan</span>
                            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">Business Elite</h3>
                            <p className="text-xs md:text-sm text-gray-400 mt-2">Billed annually • Jan 2027</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 hidden sm:block">
                            <CreditCard className="text-yellow-400" size={32} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em]">Message Credits</p>
                                <p className="text-sm font-bold">28% used</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl md:text-3xl font-black">14,230</span>
                                <span className="text-xs text-gray-500">/ 50,000</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-yellow-400 h-full rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: '28%' }} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em]">Team Seats</p>
                                <p className="text-sm font-bold">30% used</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl md:text-3xl font-black">3</span>
                                <span className="text-xs text-gray-500">/ 10 seats</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-400 h-full rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" style={{ width: '30%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 md:p-5 bg-yellow-400/5 dark:bg-yellow-400/10 border border-yellow-400/20 rounded-2xl gap-4">
                <div className="flex items-center gap-3 text-yellow-500">
                    <Zap size={20} className="flex-shrink-0" />
                    <p className="text-sm font-bold leading-tight">Need more power? Upgrade to Enterprise for unlimited credits.</p>
                </div>
                <button className="w-full sm:w-auto px-5 py-2.5 bg-yellow-400 text-black text-sm font-bold rounded-xl shadow-lg hover:shadow-yellow-400/20 active:scale-95 transition-all">
                    Upgrade Now
                </button>
            </div>
        </SettingsCard>
    </div>
);

const EmailSettings: React.FC = () => (
    <div className="space-y-6 md:space-y-8">
        <SettingsCard title="Email Configuration" description="Manage primary email.">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 md:gap-6">
                    <div className="flex-1">
                        <InputField label="Primary Email" value="hitesh@gmail.com" readOnly />
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-200 dark:border-gray-800 dark:text-white rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Change Email
                    </button>
                </div>
                <div className="flex items-center gap-2 text-green-500 bg-green-500/5 w-fit px-3 py-1 rounded-full border border-green-500/20">
                    <Check size={14} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Account</span>
                </div>
            </div>
        </SettingsCard>

        <SettingsCard title="Subscription Preference">
            <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800 -mx-4 md:-mx-6 px-4 md:px-6">
                <Toggle label="Product Updates" description="New features and improvements." defaultChecked />
                <Toggle label="Security Alerts" description="Account security activity alerts." defaultChecked />
                <Toggle label="Billing Emails" description="Invoices and renewal notices." defaultChecked />
            </div>
        </SettingsCard>
    </div>
);

const NotificationSettings: React.FC = () => (
    <div className="space-y-6 md:space-y-8">
        <SettingsCard title="In-App Notifications" description="Configure dashboard alerts.">
            <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800 -mx-4 md:-mx-6 px-4 md:px-6">
                <Toggle label="New Message Activity" description="Alerts for new chat messages." defaultChecked={false} />
                <Toggle label="System Alerts" description="Maintenance and performance updates." defaultChecked />
                <Toggle label="Theme Changes" description="Automatic theme adjustment notices." />
            </div>
        </SettingsCard>

        <SettingsCard title="Browser Notifications">
            <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-red-400/5 border border-red-400/20 rounded-2xl gap-4">
                <div className="flex items-center gap-3 text-red-500">
                    <AlertCircle size={24} className="flex-shrink-0" />
                    <p className="text-sm font-bold leading-tight">Browser notifications are currently blocked by system settings.</p>
                </div>
                <button className="w-full md:w-auto px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                    Enable in Browser
                </button>
            </div>
        </SettingsCard>
    </div>
);

const BillingSettings: React.FC = () => {
    const invoices: Invoice[] = [
        { id: 'INV-2024-001', date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
        { id: 'INV-2023-012', date: 'Dec 1, 2023', amount: '$29.00', status: 'Paid' },
        { id: 'INV-2023-011', date: 'Nov 1, 2023', amount: '$29.00', status: 'Cancelled' },
    ];

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Payment Method */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Method</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage card options.</p>
                    </div>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors border border-gray-200 dark:border-gray-700">
                        <Plus size={16} /> Add Card
                    </button>
                </div>
                <div className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-8 bg-black dark:bg-white/10 rounded-md flex items-center justify-center text-[8px] font-black text-white tracking-widest uppercase flex-shrink-0">
                                VISA
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Visa ending in 4242</p>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">EXP 12/26 • DEFAULT</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                            <button className="text-xs text-gray-500 hover:text-black dark:hover:text-white font-bold transition-colors">Edit</button>
                            <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
                            <button className="text-xs text-red-500 hover:text-red-600 font-bold transition-colors">Remove</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Invoicing Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Invoice Destination</h2>
                </div>
                <div className="p-5 md:p-6 space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                        <input type="radio" name="billing-email" defaultChecked className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400" />
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Account primary email</p>
                            <p className="text-xs text-gray-500 truncate">hitesh@gmail.com</p>
                        </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                        <input type="radio" name="billing-email" className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Custom billing address</span>
                    </label>
                </div>
            </section>

            {/* Billing History Table */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Billing History</h2>
                </div>

                {/* Desktop/Tablet View */}
                <div className="hidden sm:block overflow-x-auto px-4 md:px-6">
                    <table className="w-full text-left">
                        <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <tr>
                                <th className="py-4">Invoice</th>
                                <th className="py-4">Date</th>
                                <th className="py-4">Amount</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="py-5 font-bold dark:text-white">{invoice.id}</td>
                                    <td className="py-5 whitespace-nowrap">{invoice.date}</td>
                                    <td className="py-5 font-bold">{invoice.amount}</td>
                                    <td className="py-5">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black ${invoice.status === 'Paid'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                            }`}>
                                            {invoice.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-5 text-right">
                                        <button className="text-yellow-500 hover:text-yellow-600 font-bold flex items-center gap-1 justify-end ml-auto">
                                            PDF <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-800">
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="p-5 flex justify-between items-center gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-bold dark:text-white">{invoice.id}</p>
                                <p className="text-xs text-gray-500 mb-2">{invoice.date}</p>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {invoice.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold mb-3">{invoice.amount}</p>
                                <button className="text-[10px] font-black text-yellow-500 uppercase tracking-widest border border-yellow-500/30 px-3 py-1.5 rounded-lg active:bg-yellow-400 active:text-black">
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;
