import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import ChatPage from '../pages/ChatPage';
import PricingPage from '../pages/PricingPage';
import DashboardPage from '../pages/DashboardPage';
import UnderDevelopmentPage from '../pages/UnderDevelopmentPage';
import AboutPage from '../pages/AboutPage';
import SettingsPage from '../pages/SettingsPage';
import InsightsPage from '../pages/InsightsPage';
import ConversationsPage from '../pages/ConversationsPage';
import RoomPage from '../pages/RoomPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { LoginLayout } from '../components/LoginLayout';
import { Theme } from '../types/common';
import { FocusedInput } from '../types/mascot';

interface AppRouterProps {
    focusedInput: FocusedInput;
    setFocusedInput: React.Dispatch<React.SetStateAction<FocusedInput>>;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const AppRouter: React.FC<AppRouterProps> = ({
    focusedInput,
    setFocusedInput,
    theme,
    setTheme
}) => {
    return (
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

            {/* Conversations Routes */}
            <Route path="/conversations" element={
                <ProtectedRoute>
                    <ConversationsPage theme={theme} setTheme={setTheme} />
                </ProtectedRoute>
            } />
            <Route path="/conversations/:roomId" element={
                <ProtectedRoute>
                    <RoomPage theme={theme} setTheme={setTheme} />
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
    );
};
