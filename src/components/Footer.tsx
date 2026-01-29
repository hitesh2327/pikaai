import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-900 border-t border-gray-800 pt-16 pb-8 text-gray-400 font-sans">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand Section */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-caveat text-3xl text-yellow-500 font-bold group-hover:text-yellow-400 transition-colors">
                            Pika AI
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Conversations that think, adapt, and work. A powerful, domain-aware AI chatbot platform built for the future of automation.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Product Links */}
                <div>
                    <h3 className="text-white font-semibold mb-6">Product</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/dashboard" className="hover:text-yellow-400 transition-colors">Dashboard</Link></li>
                        <li><Link to="/pricing" className="hover:text-yellow-400 transition-colors">Pricing</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-400 transition-colors">About Pika AI</Link></li>
                        <li><Link to="/under-development" className="hover:text-yellow-400 transition-colors">Features</Link></li>
                    </ul>
                </div>

                {/* Resources Links */}
                <div>
                    <h3 className="text-white font-semibold mb-6">Resources</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/under-development" className="hover:text-yellow-400 transition-colors">Documentation</Link></li>
                        <li><Link to="/under-development" className="hover:text-yellow-400 transition-colors">API Reference</Link></li>
                        <li><Link to="/under-development" className="hover:text-yellow-400 transition-colors">Community</Link></li>
                        <li><Link to="/under-development" className="hover:text-yellow-400 transition-colors">Help Center</Link></li>
                    </ul>
                </div>

                {/* Contact/Address */}
                <div>
                    <h3 className="text-white font-semibold mb-6">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <Mail size={16} className="mt-1 flex-shrink-0" />
                            <span>support@pikaai.com</span>
                        </li>
                        <li>
                            <p>123 AI Boulevard</p>
                            <p>Tech City, TC 90210</p>
                            <p>United States</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Pika AI. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/under-development" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/under-development" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
