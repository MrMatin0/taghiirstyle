/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REMIX_IDEAS = [
    "برای امتحان مدل موهای مختلف.",
    "تا حیوان خانگی‌تان را به یک شخصیت کارتونی تبدیل کنید.",
    "برای ساختن یک نسخه فانتزی از خودتان.",
    "تا یک ابرقهرمان بر اساس عکستان طراحی کنید.",
    "تا خود را در رویدادهای تاریخی معروف قرار دهید.",
    "برای ساخت یک آواتار بازی ویدیویی سفارشی.",
];

const Footer = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % REMIX_IDEAS.length);
        }, 3500); // Change text every 3.5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className="static md:fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-3 z-50 text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm border-t border-neutral-200 dark:border-white/10">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center gap-4 px-4">
                {/* Left Side */}
                <div className="hidden md:flex items-center gap-4 text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                    <p>قدرت گرفته از Gemini 2.5 Flash Image Preview</p>
                    <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">|</span>
                    <p>
                        ساخته شده توسط{' '}
                        <a
                            href="https://x.com/ammaar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
                        >
                            @ammaar
                        </a>
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex-grow flex justify-end items-center gap-4 sm:gap-6">
                    <div className="hidden lg:flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-end min-w-0">
                        <div className="relative w-64 h-5">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute inset-0 font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap text-start"
                                >
                                    {REMIX_IDEAS[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <span className="flex-shrink-0">این برنامه را ریمیکس کنید...</span>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="https://aistudio.google.com/apps"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-anton tracking-wide text-sm sm:text-base text-center text-black bg-yellow-400 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-yellow-300 shadow-[1px_1px_0px_1px_rgba(0,0,0,0.2)] whitespace-nowrap"
                        >
                            برنامه‌ها در AI Studio
                        </a>
                        <a
                            href="https://gemini.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-anton tracking-wide text-sm sm:text-base text-center text-neutral-800 dark:text-white bg-transparent border border-neutral-800/50 dark:border-white/50 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 hover:bg-neutral-800 dark:hover:bg-white hover:text-white dark:hover:text-black whitespace-nowrap"
                        >
                            چت با Gemini
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;