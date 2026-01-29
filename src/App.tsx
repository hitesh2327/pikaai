import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CharacterScene } from './components/Characters';
import LoginForm from './components/LoginForm';
import ChatPage from './pages/ChatPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';
import InsightsPage from './pages/InsightsPage';
import { tokenUtils } from './utils/token';
import { Theme } from './types/common';
import { FocusedInput } from './types/mascot';

// Protected Route Wrapper
interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = tokenUtils.getAccessToken();
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

// Login Layout Wrapper to keep the split screen
interface LoginLayoutProps {
    children: React.ReactNode;
    focusedInput: FocusedInput;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children, focusedInput }) => (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
        <div className="h-64 md:h-full w-full md:w-1/2 bg-[#F3F4F6] relative">
            <CharacterScene focusedInput={focusedInput} />
        </div>
        <div className="flex-1 w-full md:w-1/2 bg-white dark:bg-black">
            {children}
        </div>
    </div>
);

const App: React.FC = () => {
    const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme') as Theme | null;
            return stored || 'system';
        }
        return 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Route */}
                <Route path="/" element={
                    <LoginLayout focusedInput={focusedInput}>
                        <LoginForm
                            setFocusedInput={setFocusedInput}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    </LoginLayout>
                } />

                {/* Public Routes */}
                <Route path="/under-development" element={<UnderDevelopmentPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Chat Routes */}
                <Route path="/chat" element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                } />
                <Route path="/chat/:chatId" element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                } />

                {/* Pricing Route */}
                <Route path="/pricing" element={
                    <ProtectedRoute>
                        <PricingPage />
                    </ProtectedRoute>
                } />

                {/* Dashboard Route */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage theme={theme} setTheme={setTheme} />
                    </ProtectedRoute>
                } />

                {/* Insights Route */}
                <Route path="/dashboard/insights" element={
                    <ProtectedRoute>
                        <InsightsPage theme={theme} setTheme={setTheme} />
                    </ProtectedRoute>
                } />

                {/* Settings Route */}
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <SettingsPage theme={theme} setTheme={setTheme} />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
