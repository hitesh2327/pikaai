import React, { useState, useEffect } from 'react';
import { CharacterScene } from './components/Characters';
import LoginForm from './components/LoginForm';
import ChatPage from './pages/ChatPage';

function App() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Routing Logic
  if (isLoggedIn) {
    return <ChatPage />;
  }

  return (
    // Responsive: flex-col on mobile, flex-row on md+
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Left Column: Characters */}
      {/* On mobile: h-1/3 or similar fixed height to show characters above form */}
      <div className="h-64 md:h-full w-full md:w-1/2 bg-[#F3F4F6] relative">
        <CharacterScene focusedInput={focusedInput} />
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 w-full md:w-1/2 bg-white dark:bg-black">
        <LoginForm
          setFocusedInput={setFocusedInput}
          theme={theme}
          setTheme={setTheme}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      </div>
    </div>
  );
}

export default App;
