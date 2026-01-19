import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { authService } from '../services/auth';

const FloatingInput = ({ type, placeholder, onFocus, onBlur, value, onChange }) => {
    return (
        <div className="relative mb-6">
            <input
                type={type}
                className="w-full py-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 
                   focus:border-black dark:focus:border-white outline-none 
                   transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500
                   text-black dark:text-white"
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const ThemeToggle = ({ theme, setTheme }) => {
    return (
        <div className="absolute top-6 right-6 flex bg-[#F3F4F6] dark:bg-gray-800 rounded-full p-1 gap-1">
            <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
                <Sun size={16} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-700 shadow text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
                <Moon size={16} />
            </button>
            <button
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-gray-700 shadow text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
                <Monitor size={16} />
            </button>
        </div>
    );
};

const LoginForm = ({ setFocusedInput, theme, setTheme, onLoginSuccess }) => {
    // Defaulting to requested static data for convenience, but editable
    const [email, setEmail] = useState('test@pikachat.ai');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await authService.login(email, password);
            // If we get here, it didn't throw, so success
            if (onLoginSuccess) onLoginSuccess();

        } catch (err) {
            console.error("Login failed", err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center h-full max-w-md mx-auto px-8 relative">
            {/* Theme Toggle Positioned Absolute in Corner */}
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <h1 className="text-4xl font-bold mb-8 text-black dark:text-white transition-colors duration-300">
                Welcome back!
            </h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <FloatingInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                />
                <FloatingInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                />

                <div className="flex justify-end mb-8">
                    <a href="#" className="text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        Forgot password?
                    </a>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-medium text-lg mb-4 transition-colors duration-300 disabled:opacity-50"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </motion.button>

                <button
                    type="button"
                    className="w-full border border-gray-200 dark:border-gray-700 py-4 rounded-lg font-medium 
                     text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 
                     hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
