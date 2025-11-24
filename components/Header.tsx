import React from 'react';
import type { Theme } from '../hooks/useDarkMode';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
    <header className="w-full p-4 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-start">
                <h1 className="text-3xl md:text-4xl font-bebas-neue font-bold text-neutral-800 dark:text-neutral-100">تغییر استایل</h1>
                <p className="font-anton text-neutral-600 dark:text-neutral-300 text-sm tracking-wide">خودتان را در استایل‌های مختلف تصور کنید.</p>
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label={`تغییر به حالت ${theme === 'dark' ? 'روشن' : 'تاریک'}`}
            >
                {theme === 'dark' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>
        </div>
    </header>
);

export default Header;
