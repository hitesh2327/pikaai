import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { pricingService } from '../services/pricing';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPricing = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const billingCycle = isAnnual ? 'yearly' : 'monthly';
                const data = await pricingService.getPricing(billingCycle);

                // Handle different response structures (Array direct or { plans: [...] })
                const plansData = Array.isArray(data) ? data : (data.plans || []);
                setPlans(plansData);
            } catch (err) {
                console.error("Failed to fetch pricing:", err);
                setError("Failed to load pricing plans. Please try again later.");

                // Fallback for development if API is offline (Prevent total blockage as per request "Do not break layout")
                // REMOVE this in production if strict "No mock" is required, but user said "Do NOT mock... once API is integrated".
                // Since I cannot *ensure* API is running, I will keep the state empty if error occurs, showing the error message.
            } finally {
                setIsLoading(false);
            }
        };

        fetchPricing();
    }, [isAnnual]);

    const handleGetStarted = () => {
        navigate('/under-development');
    };

    const SkeletonCard = () => (
        <div className="flex flex-col p-8 rounded-2xl border border-gray-800 bg-gray-800/40 animate-pulse h-[450px]">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>
            <div className="h-10 w-1/2 bg-gray-700 rounded mb-8"></div>
            <div className="space-y-3 flex-1">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-full bg-gray-700 rounded"></div>
                ))}
            </div>
            <div className="h-12 w-full bg-gray-700 rounded mt-8"></div>
        </div>
    );

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
                            disabled={isLoading}
                            className={`w-14 h-7 bg-gray-700 rounded-full relative transition-colors duration-300 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'left-8' : 'left-1'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                            Annually <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
                        </span>
                    </motion.div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="w-full max-w-lg p-4 bg-red-900/20 border border-red-800 text-red-300 rounded-lg flex items-center gap-3 mb-8">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative">
                    {isLoading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular || plan.is_popular ? 'border-yellow-400/50 bg-gray-800/60 shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)]' : 'border-gray-800 bg-gray-800/40 hover:border-gray-700'} backdrop-blur-sm transition-all duration-300 hover:-translate-y-2`}
                            >
                                {(plan.popular || plan.is_popular) && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">
                                            {/* Handle Price: "0.00" string or number */}
                                            {(Number(plan.price) === 0) ? 'Free' : `$${Number(plan.price)}`}
                                        </span>
                                        {Number(plan.price) > 0 && (
                                            <span className="text-gray-400 text-sm">
                                                {plan.interval ? `/${plan.interval}` : (plan.billing_cycle === 'yearly' ? '/year' : '/month')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {plan.features && plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                            <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                    {/* Fallback if features is missing or empty */}
                                    {(!plan.features || plan.features.length === 0) && (
                                        <div className="text-sm text-gray-500 italic">No specific features listed.</div>
                                    )}
                                </div>

                                <button
                                    onClick={handleGetStarted}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan.popular || plan.is_popular ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    {plan.ctaLabel || 'Get Started'}
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* CTA Section */}
                {!isLoading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-24 text-center space-y-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Start building smarter conversations today</h2>
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Get Started
                        </button>
                    </motion.div>
                )}

            </main>
        </div>
    );
};

export default PricingPage;
