/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ImageEditModalProps {
  imageUrl: string;
  caption: string;
  onClose: () => void;
  onGenerate: (caption: string, prompt: string) => Promise<void>;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ imageUrl, caption, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    await onGenerate(caption, prompt);
    // The parent component will close the modal by clearing the 'editingImage' state,
    // which unmounts this component and resets its internal state.
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
             <h2 className="font-anton text-xl sm:text-2xl text-neutral-800 dark:text-neutral-100 tracking-wide">ویرایش: {caption}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="بستن مودال ویرایش"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full aspect-square bg-neutral-100 dark:bg-black rounded-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt={caption}
                  className="w-full h-full object-contain"
                />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="edit-prompt" className="font-bold text-neutral-700 dark:text-neutral-300 mb-2">پرامپت ویرایش شما:</label>
                <textarea
                    id="edit-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="مثال: «یک کلاه آینده‌نگرانه اضافه کن» یا «پس‌زمینه را به جنگل تغییر بده»"
                    className="w-full flex-1 p-3 bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:border-yellow-400 resize-none text-neutral-800 dark:text-neutral-200"
                    rows={6}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">تغییری که می‌خواهید در تصویر ایجاد کنید را توصیف کنید.</p>
                 <button
                    type="submit"
                    disabled={!prompt.trim() || isGenerating}
                    className="font-anton tracking-wide text-lg text-center text-black bg-yellow-400 py-3 px-6 rounded-sm transform transition-all duration-200 hover:scale-105 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4 w-full"
                >
                    {isGenerating ? 'در حال اعمال...' : 'اعمال ویرایش'}
                </button>
            </form>
        </div>
        {isGenerating && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                 <div className="w-16 h-16 border-4 border-neutral-300 dark:border-neutral-700 border-t-yellow-400 rounded-full animate-spin"></div>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg font-semibold mt-4 animate-pulse">در حال اعمال ویرایش شما...</p>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImageEditModal;