import React from 'react';
import { motion } from 'framer-motion';
import ImageCard from './ImageCard';
import type { GeneratedImage, PromptType } from '../hooks/useGenerator';
import { THEMES, CAMERA_ANGLES, ThemeKey, CameraAngleKey } from '../lib/themes';

interface ResultsSectionProps {
    generatedImages: Record<string, GeneratedImage>;
    sceneGeneratedImage: Record<string, GeneratedImage>;
    customGeneratedImages: { prompt: string, images: GeneratedImage[] } | null;
    generatedScenes: { title: string, prompt: string }[];
    
    appState: 'idle' | 'image-uploaded' | 'generating' | 'results-shown';
    activeTab: ThemeKey;
    selectedCameraAngle: CameraAngleKey;
    
    // Handlers
    onPreview: (url: string, caption: string) => void;
    onEdit: (url: string, caption: string) => void;
    onRegenerateBatch: (category: string, type: PromptType) => void;
    onRegenerateScene: (title: string, type: PromptType) => void;
    onRegenerateCustom: (index: number, type: PromptType) => void;
    onShuffle: () => void;
    onDownloadAlbum: () => void;
    isDownloading: boolean;
}

const primaryButtonClasses = "font-anton tracking-wide text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-yellow-300";
const secondaryButtonClasses = "font-anton tracking-wide text-xl text-center text-neutral-800 dark:text-white bg-transparent border-2 border-neutral-800 dark:border-white py-3 px-8 rounded-sm transform transition-all duration-200 hover:scale-105 hover:-rotate-2 hover:bg-neutral-800 dark:hover:bg-white hover:text-white dark:hover:text-black";

const ResultsSection: React.FC<ResultsSectionProps> = ({
    generatedImages,
    sceneGeneratedImage,
    customGeneratedImages,
    generatedScenes,
    appState,
    activeTab,
    selectedCameraAngle,
    onPreview,
    onEdit,
    onRegenerateBatch,
    onRegenerateScene,
    onRegenerateCustom,
    onShuffle,
    onDownloadAlbum,
    isDownloading
}) => {
    const hasGeneratedBatch = Object.keys(generatedImages).length > 0;
    const hasSceneImages = Object.keys(sceneGeneratedImage).length > 0;
    const hasCustomImages = customGeneratedImages !== null;
    
    const allImagesDone = Object.values(generatedImages).every(i => i.status === 'done') && hasGeneratedBatch;

    const handleDownloadSingle = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section>
            {/* Custom Prompt Results */}
            {customGeneratedImages && (
                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {customGeneratedImages.images.map((image, index) => {
                        const caption = `پرامپت سفارشی ${index + 1}`;
                        return (
                            <ImageCard
                                key={index}
                                caption={caption}
                                status={image.status}
                                imageUrl={image.url}
                                error={image.error}
                                prompt={customGeneratedImages.prompt}
                                onPreview={(url) => onPreview(url, caption)}
                                onEdit={(url) => onEdit(url, `custom-${index}`)}
                                onRegenerate={(_, type) => onRegenerateCustom(index, type)}
                                onDownload={() => image.url && handleDownloadSingle(image.url, `custom-style-${index}.jpg`)}
                            />
                        );
                    })}
                </div>
            )}

            {/* Scene Generator Results */}
            {hasSceneImages && (
                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {Object.keys(sceneGeneratedImage).map((title) => (
                        <div key={title}>
                            <ImageCard
                                caption={title}
                                status={sceneGeneratedImage[title]?.status || 'pending'}
                                imageUrl={sceneGeneratedImage[title]?.url}
                                error={sceneGeneratedImage[title]?.error}
                                prompt={generatedScenes.find(s => s.title === title)?.prompt}
                                onPreview={(url, cap) => onPreview(url, cap)}
                                onEdit={(url, cap) => onEdit(url, cap)}
                                onRegenerate={(_, type) => onRegenerateScene(title, type)}
                                onDownload={() => sceneGeneratedImage[title].url && handleDownloadSingle(sceneGeneratedImage[title].url!, `scene-${title}.jpg`)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Batch Generation Results */}
            {(appState === 'generating' || appState === 'results-shown') && (
                <>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <button
                            onClick={onShuffle}
                            disabled={appState === 'generating'}
                            className={`${secondaryButtonClasses} !text-sm md:!text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            بر زدن ✨
                        </button>
                        <button 
                            onClick={onDownloadAlbum} 
                            disabled={isDownloading || !allImagesDone || appState === 'generating'}
                            className={`${primaryButtonClasses} !text-sm md:!text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-yellow-400/50 disabled:hover:scale-100 disabled:hover:rotate-0`}
                        >
                            {isDownloading ? 'در حال ساخت آلبوم...' : 'دانلود آلبوم'}
                        </button>
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {Object.keys(generatedImages).map((category, index) => {
                            const basePrompt = THEMES[activeTab].getPrompt(category);
                            const angleModifier = CAMERA_ANGLES[selectedCameraAngle].prompt;
                            const prompt = `${basePrompt}${angleModifier ? ` ${angleModifier}` : ''}`;
                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                >
                                    <ImageCard
                                        caption={category}
                                        status={generatedImages[category]?.status || 'pending'}
                                        imageUrl={generatedImages[category]?.url}
                                        error={generatedImages[category]?.error}
                                        onRegenerate={(_, type) => onRegenerateBatch(category, type)}
                                        onDownload={() => generatedImages[category].url && handleDownloadSingle(generatedImages[category].url!, `style-${category}.jpg`)}
                                        onEdit={(url, cap) => onEdit(url, cap)}
                                        prompt={prompt}
                                        onPreview={(url, cap) => onPreview(url, cap)}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </>
            )}

            {/* Empty State */}
            {appState === 'image-uploaded' && !hasSceneImages && !hasCustomImages && (
                <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 min-h-[50vh]">
                    <div className="text-center text-neutral-500 dark:text-neutral-400 p-4">
                        <p className="font-anton text-2xl tracking-wide">نتایج شما اینجا نمایش داده خواهد شد</p>
                        <p>یک صحنه ایجاد کنید یا استایل‌ها را انتخاب کرده و روی «ایجاد» کلیک کنید</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ResultsSection;
