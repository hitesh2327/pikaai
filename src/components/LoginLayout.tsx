import React from 'react';
import { CharacterScene } from './Characters';
import { FocusedInput } from '../types/mascot';

interface LoginLayoutProps {
    children: React.ReactNode;
    focusedInput: FocusedInput;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children, focusedInput }) => (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
        <div className="h-64 md:h-full w-full md:w-1/2 bg-[#F3F4F6] relative">
            <CharacterScene focusedInput={focusedInput} />
        </div>
        <div className="flex-1 w-full md:w-1/2 bg-white dark:bg-black">
            {children}
        </div>
    </div>
);
