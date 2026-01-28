import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lightbulb, TrendingUp, TrendingDown, AlertCircle,
    CheckCircle2, ArrowRight, Brain, Clock, MessageSquare,
    ShieldCheck, Target, Zap, ChevronDown, ChevronUp
} from 'lucide-react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';

const InsightsPage = ({ theme, setTheme }) => {
    const [expandedInsight, setExpandedInsight] = useState(null);

    const recommendations = [
        "Tighten domain constraints for financial conversations to reduce uncertainty.",
        "Enable 'Interview Mode' for candidate screening to improve lead qualification.",
        "Reduce average response length for general queries to minimize user fatigue.",
        "Add clarification prompts for ambiguous technical support requests."
    ];

    const timelineData = [
        { date: "Jan 28", event: "Optimization Applied", result: "Clarification frequency reduced by 15%", type: "success" },
        { date: "Jan 20", event: "Medical Domain Enabled", result: "Incorrect responses dropped by 42%", type: "success" },
        { date: "Jan 12", event: "Policy Update", result: "New guardrails added to financial topics", type: "neutral" },
        { date: "Jan 05", event: "High Fatigue Detected", result: "Identified drop-offs after 5+ turns", type: "warning" },
    ];

    const insightCategories = [
        {
            title: "Conversation Quality",
            description: "Deep dive into interaction efficiency and flow.",
            insights: [
                {
                    id: "iq-1",
                    headline: "Response fatigue peaks at 6 turns",
                    explanation: "Users tend to disengage significantly when conversations exceed 6 turns without reaching a clear resolution or value point.",
                    evidence: "24% drop-off rate increase at turn 7 compared to turn 3.",
                    action: "Implement more proactive transition prompts or shorter summaries during long threads.",
                    priority: "high",
                    icon: Clock
                },
                {
                    id: "iq-2",
                    headline: "Repeated questions in technical support",
                    explanation: "15% of users ask the same question twice within a single session, indicating original answer clarity issues.",
                    evidence: "Keyword overlap analysis shows 'how-to' queries are being re-asked in simplified terms.",
                    action: "Update documentation snippets used by AI for technical troubleshooting.",
                    priority: "medium",
                    icon: MessageSquare
                }
            ]
        },
        {
            title: "User Behavior",
            description: "Understanding how users engage and evolve.",
            insights: [
                {
                    id: "ub-1",
                    headline: "Intent shifts during long sessions",
                    explanation: "Users starting with 'informational' intent often pivot to 'transactional' intent after the third interaction.",
                    evidence: "Clustering analysis shows a shift from 'What is...' to 'How do I buy...' mid-session.",
                    action: "Automatically suggest pricing or upgrade paths once intent shift is detected.",
                    priority: "medium",
                    icon: Target
                },
                {
                    id: "ub-2",
                    headline: "Evening peak in creative queries",
                    explanation: "Creative and brainstorming interactions are 40% higher between 8 PM and 11 PM local time.",
                    evidence: "Time-of-day query distribution shows a distinct shift toward generative tasks at night.",
                    action: "Optimizing server allocation for generative models during peak evening hours.",
                    priority: "low",
                    icon: Brain
                }
            ]
        },
        {
            title: "AI Performance",
            description: "Monitoring model accuracy and boundaries.",
            insights: [
                {
                    id: "ap-1",
                    headline: "Domain leakage in financial topics",
                    explanation: "The AI occasionally provides generalized advice on restricted financial topics instead of referring to official documents.",
                    evidence: "7 cases identified where AI-generated advice deviated from company-specific compliance rules.",
                    action: "Re-train RAG system with stricter constraints on financial domain boundaries.",
                    priority: "high",
                    icon: ShieldCheck
                },
                {
                    id: "ap-2",
                    headline: "High confidence vs. Low empathy",
                    explanation: "Despite high accuracy, conversations often lack the empathetic tone required for sensitive customer complaints.",
                    evidence: "Sentiment analysis on 'frustrated' user inputs shows AI responses are consistently 'neutral/cold'.",
                    action: "A/B test a 'customer-first' personality profile for support-tier interactions.",
                    priority: "medium",
                    icon: Zap
                }
            ]
        }
    ];

    return (
        <DashboardLayout theme={theme} setTheme={setTheme}>
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                {/* Header Section */}
                <header className="space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                    >
                        Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl"
                    >
                        Actionable intelligence derived from your AI conversations — helping you understand the 'why' behind the metrics.
                    </motion.p>
                </header>

                {/* AI Recommendations Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors duration-500">
                        <Brain size={120} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                        <div className="lg:w-1/3">
                            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-4">
                                <Lightbulb size={24} />
                                <span className="font-bold uppercase tracking-wider text-sm">PikaAI Recommends</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Immediate Actions</h2>
                            <p className="text-gray-600 dark:text-gray-400">Our analysis of 4,200 recent interactions suggests these optimizations will yield the highest impact.</p>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {recommendations.map((rec, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/50 p-4 rounded-2xl flex items-start gap-3 shadow-sm"
                                >
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{rec}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Insights Grid */}
                    <div className="lg:col-span-2 space-y-12">
                        {insightCategories.map((category, catIndex) => (
                            <section key={category.title} className="space-y-6">
                                <div className="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                                        <p className="text-sm text-gray-500">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {category.insights.map((insight, i) => (
                                        <InsightCard
                                            key={insight.id}
                                            insight={insight}
                                            index={(catIndex * 2) + i}
                                            isExpanded={expandedInsight === insight.id}
                                            toggleExpand={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Timeline & Context Sidebar */}
                    <aside className="space-y-10">
                        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Clock className="text-yellow-400" size={20} />
                                Narrative Timeline
                            </h3>
                            <div className="space-y-8 relative">
                                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800" />

                                {timelineData.map((item, i) => (
                                    <div key={i} className="relative pl-10">
                                        <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 z-10 
                                            ${item.type === 'success' ? 'bg-green-500' : item.type === 'warning' ? 'bg-red-500' : 'bg-gray-400'}`}
                                        />
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.date}</div>
                                        <div className="font-bold text-gray-900 dark:text-white mb-1">{item.event}</div>
                                        <div className="text-sm text-gray-500">{item.result}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gray-900 text-white rounded-3xl p-8 overflow-hidden relative group">
                            <div className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <Zap size={200} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-4">Did you know?</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Small adjustments to response length can increase user retention by up to 18%. PikaAI continuously analyzes churn patterns to provide these insights.
                                </p>
                                <button className="flex items-center gap-2 text-yellow-400 font-bold text-sm hover:gap-3 transition-all">
                                    Learn about our AI methodology <ArrowRight size={16} />
                                </button>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
};

const InsightCard = ({ insight, index, isExpanded, toggleExpand }) => {
    const Icon = insight.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`bg-white dark:bg-gray-900 border overflow-hidden rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md
                ${isExpanded ? 'ring-2 ring-yellow-400 border-transparent scale-[1.01]' : 'border-gray-200 dark:border-gray-800'}
            `}
        >
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl ${isExpanded ? 'bg-yellow-400 text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            <Icon size={24} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                                    ${insight.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                        insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                                            'bg-green-100 text-green-600 dark:bg-green-900/30'}
                                `}>
                                    {insight.priority} Priority
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{insight.headline}</h4>
                        </div>
                    </div>
                    <button
                        onClick={toggleExpand}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">The Analysis</p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                {insight.explanation}
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Evidence Context</p>
                            <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                                {insight.priority === 'high' ? <TrendingDown size={18} className="text-red-500" /> : <TrendingUp size={18} className="text-yellow-500" />}
                                {insight.evidence}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 bg-gray-900 dark:bg-black rounded-2xl p-5 text-white flex flex-col justify-between border border-white/5">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Recommended Action</p>
                            <p className="text-sm font-medium leading-relaxed">
                                {insight.action}
                            </p>
                        </div>
                        <button className="mt-6 flex items-center justify-center gap-2 w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg text-xs font-bold transition-colors">
                            Apply Fix <CheckCircle2 size={14} />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-6">
                                <h5 className="font-bold text-gray-900 dark:text-white">Detailed Supporting Data</h5>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Metric {i}</p>
                                            <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 w-[60%]" />
                                            </div>
                                            <p className="text-sm font-bold">84.2%</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 italic">
                                    This insight was generated using PikaAI's proprietary sentiment and sequence analysis engine.
                                    Data reflects the last 30 days of production traffic.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default InsightsPage;
