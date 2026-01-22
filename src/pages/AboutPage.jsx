import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mascot from '../components/Mascot';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Globe, Zap, Shield, Users, Layers, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden selection:bg-yellow-500/30">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
                <Header activePage="about" />
            </div>

            <main className="flex-1 w-full">

                {/* --- HERO SECTION --- */}
                <section className="relative pt-24 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
                    {/* Background Glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                        {/* Mascot Animation */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="flex justify-center mb-6"
                        >
                            <Mascot emotion="happy" size={80} interaction="track-cursor" />
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-7xl font-extrabold tracking-tight"
                        >
                            Conversations That <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Think, Adapt, and Work.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        >
                            A powerful, domain-aware AI chatbot platform built for real-world automation, interviews, and intelligent conversations.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-4 pt-4"
                        >
                            <Link to="/pricing" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                                Get Started <ArrowRight size={20} />
                            </Link>
                            <a href="#capabilities" className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-full border border-gray-700 hover:bg-gray-750 transition-all hover:border-gray-600">
                                Explore Features
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* --- WHAT IS PIKA AI? --- */}
                <section className="py-24 px-6 bg-gray-900 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">What is Pika AI?</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                More than just a chatbot. Pika AI is a highly configurable platform designed to understand context and deliver precise results.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            <FeatureCard icon={<Globe className="text-blue-400" size={40} />} title="Generic & Flexible" description="Adapts to any use case without complex rebuilding. From simple FAQs to complex workflows." />
                            <FeatureCard icon={<Layers className="text-purple-400" size={40} />} title="Highly Configurable" description="Fine-tune behavior, tone, and knowledge bases to match your specific brand voice." />
                            <FeatureCard icon={<Zap className="text-yellow-400" size={40} />} title="Instant Deployment" description="Launch generic or specialized assistants in minutes, not months." />
                        </motion.div>
                    </div>
                </section>

                {/* --- KEY CAPABILITIES --- */}
                <section id="capabilities" className="py-24 px-6 bg-gray-800/30 relative">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="mb-16"
                        >
                            <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm">Capabilities</span>
                            <h2 className="text-3xl md:text-5xl font-bold mt-2">Powering the Future of Work</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Capability 1 */}
                            <CapabilityBlock
                                title="AI Interview Platform"
                                description="Transform your hiring process with AI-driven interviews. Pika AI conducts structured interviews, evaluates candidate responses based on skills, and provides detailed summaries."
                                tags={['Skill Evaluation', 'Automated Screening', 'Unbiased']}
                                color="border-l-4 border-green-500"
                            />

                            {/* Capability 2 */}
                            <CapabilityBlock
                                title="Domain-Specific Intelligence"
                                description="Deeply specialized knowledge for critical sectors. Configure Pika AI to act as an expert in Medical, Legal, Finance, or Tech Support fields with high accuracy."
                                tags={['Medical', 'Finance', 'Legal', 'Tech Support']}
                                color="border-l-4 border-blue-500"
                            />

                            {/* Capability 3 */}
                            <CapabilityBlock
                                title="Automation Chatbots"
                                description="Embed intelligent assistants into your workflow. Handle customer support tickets, qualify leads, or assist internal teams 24/7 without burnout."
                                tags={['Lead Gen', 'Support', 'Internal Tools']}
                                color="border-l-4 border-purple-500"
                            />

                            {/* Capability 4 */}
                            <CapabilityBlock
                                title="Generic Smart Assistant"
                                description="A versatile companion for everyday tasks. Brainstorm ideas, draft content, summarize documents, and explore new topics with a helpful AI partner."
                                tags={['Productivity', 'Creative', 'Analysis']}
                                color="border-l-4 border-yellow-500"
                            />
                        </div>
                    </div>
                </section>

                {/* --- DIFFERENTIATORS --- */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-3xl md:text-4xl font-bold mb-16"
                        >
                            Why Pika AI Stands Out
                        </motion.h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <StatCard number="Configurable" label="Behavior & Tone" />
                            <StatCard number="Domain-Aware" label="Contextual Accuracy" />
                            <StatCard number="Scalable" label="Enterprise Ready" />
                            <StatCard number="Secure" label="Data Privacy" />
                        </div>
                    </div>
                </section>

                {/* --- OWNERSHIP --- */}
                <section className="py-20 px-6 bg-gray-900 border-y border-gray-800 text-center">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 p-10 rounded-2xl border border-gray-700 backdrop-blur-sm"
                        >
                            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-6" />
                            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-6">
                                "Pika AI is built and owned by <strong className="text-white font-semibold">Hitesh Lalwani</strong>, with a focus on creating reliable, intelligent, and scalable AI-driven products."
                            </p>
                            <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full" />
                        </motion.div>
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className="py-32 px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your workflow?</h2>
                        <Link to="/pricing" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl">
                            Get Started Now <ArrowRight />
                        </Link>
                    </motion.div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

// --- Helper Components ---

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="p-8 bg-gray-800/40 border border-gray-700 rounded-2xl hover:bg-gray-800 transition-colors duration-300"
    >
        <div className="mb-6 p-4 bg-gray-900 rounded-xl inline-block border border-gray-800">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
);

const CapabilityBlock = ({ title, description, tags, color }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`bg-gray-800/20 p-8 rounded-r-2xl border-t border-b border-r border-gray-700/50 ${color} hover:bg-gray-800/40 transition-colors`}
    >
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 text-lg">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full font-medium">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const StatCard = ({ number, label }) => (
    <div className="p-6">
        <div className="text-yellow-500/20 mb-4 flex justify-center">
            <Users size={32} className="text-gray-600" />
            {/* You could make icons dynamic props if needed, reused generic for layout */}
        </div>
        <div className="text-2xl font-bold text-white mb-1">{number}</div>
        <div className="text-sm text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
);

export default AboutPage;
