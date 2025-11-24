/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface CustomPromptGeneratorProps {
    promptInput: string;
    setPromptInput: (value: string) => void;
    numImages: number;
    setNumImages: (value: number) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    isAppBusy: boolean;
}

const primaryButtonClasses = "font-anton tracking-wide text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-yellow-300";

const CustomPromptGenerator: React.FC<CustomPromptGeneratorProps> = ({
    promptInput,
    setPromptInput,
    numImages,
    setNumImages,
    onGenerate,
    isGenerating,
    isAppBusy
}) => {
    return (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700/50">
            <label htmlFor="custom-prompt-input" className="block font-anton text-2xl text-neutral-800 dark:text-neutral-200 tracking-wide mb-2">ایجاد با پرامپت سفارشی</label>
            <textarea
                id="custom-prompt-input"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="مثال: یک ابرقهرمان در حال پرواز بر فراز تهران"
                className="w-full p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                rows={3}
            />
            <div className="flex items-stretch gap-2 mt-2">
                <button
                    onClick={onGenerate}
                    disabled={!promptInput.trim() || isGenerating || isAppBusy}
                    className={`${primaryButtonClasses} !py-2 !px-4 !text-sm flex-grow disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isGenerating ? 'در حال ایجاد...' : 'ایجاد عکس سفارشی'}
                </button>
                <div className="relative">
                    <select
                        value={numImages}
                        onChange={(e) => setNumImages(Number(e.target.value))}
                        disabled={isGenerating || isAppBusy}
                        className="h-full appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-neutral-800 dark:text-neutral-200 pr-3 pl-8 text-sm font-semibold"
                        aria-label="تعداد تصاویر سفارشی برای ایجاد"
                    >
                        <option value={1}>۱ عکس</option>
                        <option value={2}>۲ عکس</option>
                        <option value={3}>۳ عکس</option>
                        <option value={4}>۴ عکس</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPromptGenerator;