import React, { useState } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: "Basic",
            description: "For individuals getting started",
            price: 0,
            features: ["Unlimited conversations", "Standard AI responses", "Basic chat history"],
            popular: false
        },
        {
            name: "Pro",
            description: "For professionals and growing teams",
            price: isAnnual ? 240 : 20, // 20 * 12 = 240
            displayPrice: isAnnual ? "$20" : "$20", // Static for logic now, usually annual has discount
            period: "month", // showing monthly equivalent or total
            features: ["Everything in Basic", "Advanced AI models", "File & document uploads", "Priority support"],
            popular: true
        },
        {
            name: "Business",
            description: "For businesses scaling conversations",
            price: isAnnual ? 1440 : 120,
            displayPrice: isAnnual ? "$100" : "$120", // Discounted monthly breakdown
            period: "month",
            features: ["Everything in Pro", "Team collaboration", "SSO & Admin controls", "Dedicated account manager"],
            popular: false
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
                <Header activePage="pricing" />
            </div>

            <main className="flex-1 flex flex-col items-center w-full px-6 py-16 md:py-24 max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                    >
                        Simple, Transparent Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Choose a plan that grows with your conversations.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center justify-center gap-4 mt-8"
                    >
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-7 bg-gray-700 rounded-full relative transition-colors duration-300 focus:outline-none"
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'left-8' : 'left-1'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                            Annually <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
                        </span>
                    </motion.div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular ? 'border-yellow-400/50 bg-gray-800/60 shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)]' : 'border-gray-800 bg-gray-800/40 hover:border-gray-700'} backdrop-blur-sm transition-all duration-300 hover:-translate-y-2`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        {plan.price === 0 ? 'Free' : (isAnnual ? plan.displayPrice : `$${plan.price}`)}
                                    </span>
                                    {plan.price > 0 && <span className="text-gray-400 text-sm">/{plan.period}</span>}
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan.popular ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center space-y-6"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Start building smarter conversations today</h2>
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        Get Started
                    </button>
                </motion.div>

            </main>
        </div>
    );
};

export default PricingPage;
