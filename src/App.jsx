import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CharacterScene } from './components/Characters';
import LoginForm from './components/LoginForm';
import ChatPage from './pages/ChatPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import { tokenUtils } from './utils/token';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = tokenUtils.getAccessToken();
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Login Layout Wrapper to keep the split screen
const LoginLayout = ({ children, focusedInput }) => (
  <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
    <div className="h-64 md:h-full w-full md:w-1/2 bg-[#F3F4F6] relative">
      <CharacterScene focusedInput={focusedInput} />
    </div>
    <div className="flex-1 w-full md:w-1/2 bg-white dark:bg-black">
      {children}
    </div>
  </div>
);

function App() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
