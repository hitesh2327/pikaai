import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const UnderDevelopmentPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full flex flex-col items-center"
                >
                    <div className="bg-yellow-500/20 p-4 rounded-full mb-6">
                        <Construction size={48} className="text-yellow-500" />
                    </div>

                    <h1 className="text-3xl font-bold mb-4">Under Development</h1>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        We're working hard to bring this feature to life! Check back soon for updates.
                    </p>

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Go Back Home
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default UnderDevelopmentPage;
