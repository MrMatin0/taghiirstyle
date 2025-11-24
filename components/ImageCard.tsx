/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';

type ImageStatus = 'pending' | 'done' | 'error';
type PromptType = 'original' | 'fallback';

interface ImageCardProps {
    imageUrl?: string;
    caption: string;
    status: ImageStatus;
    error?: string;
    isUploadCard?: boolean;
    onRegenerate?: (caption: string, promptType: PromptType) => void;
    onDownload?: (caption: string) => void;
    onEdit?: (imageUrl: string, caption: string) => void;
    isSelected?: boolean;
    isSelectable?: boolean;
    onSelect?: (caption: string) => void;
    prompt?: string;
    onPreview?: (imageUrl: string, caption: string) => void;
    isDraggingOver?: boolean;
}

const LoadingDisplay = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-neutral-200/50 dark:bg-neutral-800/50">
        <div className="w-16 h-16 border-4 border-neutral-300 dark:border-neutral-700 border-t-yellow-400 rounded-full animate-spin"></div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-semibold mt-4 animate-pulse">در حال ایجاد...</p>
    </div>
);

const ErrorDisplay = ({ onRegenerate, caption }: { onRegenerate?: (caption: string, promptType: PromptType) => void, caption: string }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-500/10 dark:bg-red-900/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 dark:text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-neutral-800 dark:text-neutral-300 font-semibold">ایجاد ناموفق بود</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-1 mb-4">در ساخت این تصویر مشکلی پیش آمد.</p>
        {onRegenerate && (
            <div className="flex flex-col gap-2 w-full px-4">
                <button 
                    onClick={() => onRegenerate(caption, 'original')}
                    className="font-anton tracking-wide text-sm text-center text-neutral-800 dark:text-white bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/50 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:bg-black/10 dark:hover:bg-white hover:text-black dark:hover:text-black w-full"
                >
                    تلاش مجدد با پرامپت اصلی
                </button>
                 <button 
                    onClick={() => onRegenerate(caption, 'fallback')}
                    className="font-anton tracking-wide text-sm text-center text-neutral-800 dark:text-white bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/50 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:bg-black/10 dark:hover:bg-white hover:text-black dark:hover:text-black w-full"
                >
                    تلاش مجدد با پرامپت جایگزین
                </button>
            </div>
        )}
    </div>
);

// FIX: Add 'caption' to props for UploadPlaceholder to display the text correctly.
const UploadPlaceholder = ({ isDraggingOver, caption }: { isDraggingOver?: boolean; caption: string; }) => (
    <div className={`flex flex-col items-center justify-center h-full text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-all duration-300 border-2 border-dashed rounded-lg ${
        isDraggingOver 
        ? 'border-yellow-400 bg-yellow-400/10 text-yellow-500 dark:text-yellow-300' 
        : 'border-neutral-400 dark:border-neutral-700 group-hover:border-neutral-500 dark:group-hover:border-neutral-500'
    }`}>
        {isDraggingOver ? (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="font-anton tracking-wide text-xl">برای بارگذاری رها کنید</span>
            </>
        ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2V9z" />
                </svg>
                <span className="font-anton tracking-wide text-xl">{caption}</span>
            </>
        )}
    </div>
);


const SelectablePlaceholder = ({ caption, isSelected }: { caption: string; isSelected?: boolean }) => (
    <div className={`relative w-full h-full flex flex-col items-center justify-center text-center p-2 bg-neutral-100 dark:bg-neutral-800/50 transition-all duration-200 rounded-lg ${isSelected ? 'ring-2 ring-yellow-400' : 'ring-2 ring-neutral-300 dark:ring-neutral-700'}`}>
        {isSelected && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black z-10 pointer-events-none">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        )}
         <p className="font-anton tracking-wide text-base text-neutral-700 dark:text-neutral-300 truncate">{caption}</p>
    </div>
);

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, caption, status, onRegenerate, onDownload, onEdit, isUploadCard = false, isSelectable = false, isSelected = false, onSelect, prompt, onPreview, isDraggingOver = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
    }, [imageUrl]);

    const handlePreviewClick = () => {
        if (status === 'done' && imageUrl && onPreview) {
            onPreview(imageUrl, caption);
        }
    };

    if (isSelectable) {
        return (
            <div className="flex flex-col w-full max-w-sm mx-auto cursor-pointer" onClick={() => onSelect?.(caption)}>
                 <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm overflow-hidden aspect-square">
                    <SelectablePlaceholder caption={caption} isSelected={isSelected} />
                 </div>
            </div>
        );
    }

    const cardContent = () => {
        if (isUploadCard) {
            return <UploadPlaceholder isDraggingOver={isDraggingOver} caption={caption} />;
        }

        switch (status) {
            case 'pending':
                return <LoadingDisplay />;
            case 'error':
                return <ErrorDisplay onRegenerate={onRegenerate} caption={caption} />;
            case 'done':
                if (imageUrl) {
                    return (
                        <div className="relative w-full h-full group">
                            <img
                                src={imageUrl}
                                alt={caption}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIsLoaded(true)}
                            />
                             {!isLoaded && <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900" />}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-4">
                                {onDownload && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDownload(caption); }}
                                        className="p-3 bg-black/60 rounded-full text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-label={`دانلود عکس برای ${caption}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                )}
                                {onEdit && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEdit(imageUrl, caption); }}
                                        className="p-3 bg-black/60 rounded-full text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-label={`ویرایش عکس برای ${caption}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                                        </svg>
                                    </button>
                                )}
                                {onRegenerate && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onRegenerate(caption, 'original'); }}
                                        className="p-3 bg-black/60 rounded-full text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                                        aria-label={`ایجاد مجدد عکس برای ${caption}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.42.71a5.002 5.002 0 00-8.479-1.554H10a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm12 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.899-2.186l1.42-.71a5.002 5.002 0 008.479 1.554H10a1 1 0 110 2h6a1 1 0 011 1v6a1 1 0 01-1 1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                }
                return null; 
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-full max-w-sm mx-auto">
            <div 
                className={`bg-white dark:bg-neutral-900 rounded-lg shadow-md dark:shadow-none overflow-hidden aspect-square border border-neutral-200 dark:border-neutral-800 ${status === 'done' && imageUrl && onPreview ? 'cursor-pointer' : ''}`}
                onClick={handlePreviewClick}
            >
                {cardContent()}
            </div>
            <p className="font-anton text-lg text-center mt-4 text-neutral-700 dark:text-neutral-300 truncate">
                {caption}
            </p>
            {status === 'done' && prompt && (
                 <div className="mt-3 text-start text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/50 p-3 rounded-md border border-neutral-200 dark:border-neutral-700/50">
                    <span className="font-bold text-neutral-800 dark:text-neutral-300">پرامپت:</span>
                    <p className="mt-1 leading-relaxed">{prompt}</p>
                </div>
            )}
        </div>
    );
};

export default ImageCard;