import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { Theme } from './types/common';
import { FocusedInput } from './types/mascot';

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
            <AppRouter
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                theme={theme}
                setTheme={setTheme}
            />
        </BrowserRouter>
    );
}

export default App;
