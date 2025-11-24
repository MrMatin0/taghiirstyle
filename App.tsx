/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode';
import { useImageManager } from './hooks/useImageManager';
import { useSceneManager } from './hooks/useSceneManager';
import { useGenerator } from './hooks/useGenerator';
import { THEMES, ThemeKey, CameraAngleKey } from './lib/themes';
import { createAlbumPage } from './lib/albumUtils';

import Header from './components/Header';
import Footer from './components/Footer';
import ImageCard from './components/ImageCard';
import ImagePreviewModal from './components/ImagePreviewModal';
import ImageEditModal from './components/ImageEditModal';
import ControlsSidebar from './components/ControlsSidebar';
import ResultsSection from './components/ResultsSection';

function App() {
    const { theme, toggleTheme } = useDarkMode();
    const { uploadedImages, handleImageUpload, handleRemoveImage, resetImages, dragProps } = useImageManager();
    const { appState, setAppState, generatedImages, sceneGeneratedImage, customGeneratedImages, isSceneImageGenerating, isCustomGenerating, generateBatch, generateSceneImages, generateCustomImages, regenerateItem, handleImageEdit, resetGeneration } = useGenerator(uploadedImages);
    const { ideaInput, setIdeaInput, generationState, generatedScenes, selectedScenes, handleGetSceneIdeas, toggleSceneSelect, resetScenes, handleNewIdea } = useSceneManager(uploadedImages);

    // UI State
    const [activeTab, setActiveTab] = useState<ThemeKey>('identity');
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [selectedCameraAngle, setSelectedCameraAngle] = useState<CameraAngleKey>('Default Angle');
    const [previewImage, setPreviewImage] = useState<{ url: string; caption: string } | null>(null);
    const [editingImage, setEditingImage] = useState<{ url: string; caption: string } | null>(null);
    const [customPromptInput, setCustomPromptInput] = useState<string>('');
    const [numCustomImages, setNumCustomImages] = useState<number>(1);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (uploadedImages.length > 0 && appState === 'idle') {
            setAppState('image-uploaded');
        }
    }, [uploadedImages, appState, setAppState]);

    useEffect(() => {
        if (appState === 'image-uploaded') {
            setSelectedCategories(new Set(THEMES[activeTab].categories));
        }
    }, [appState, activeTab]);

    useEffect(() => {
        if (appState === 'generating' && resultsRef.current && window.innerWidth < 1024) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [appState]);

    const handleReset = () => {
        resetImages();
        resetGeneration();
        resetScenes();
        setCustomPromptInput('');
        setSelectedCameraAngle('Default Angle');
    };

    const handleShuffleClick = () => {
        const themeKeys = Object.keys(THEMES) as ThemeKey[];
        const availableThemes = themeKeys.filter(key => key !== activeTab);
        const newTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
        setActiveTab(newTheme);
        setSelectedCategories(new Set(THEMES[newTheme].categories));
        setTimeout(() => generateBatch(newTheme, new Set(THEMES[newTheme].categories), selectedCameraAngle), 100);
    };

    const handleDownloadAlbum = async () => {
        setIsDownloading(true);
        try {
            const imageData = Object.entries(generatedImages)
                .filter(([, image]) => image.status === 'done' && image.url)
                .reduce((acc, [cat, img]) => ({ ...acc, [cat]: img!.url! }), {});
            const url = await createAlbumPage(imageData, THEMES[activeTab].title);
            const link = document.createElement('a');
            link.href = url;
            link.download = `style-change-${activeTab}-album.jpg`;
            document.body.click(); // Phantom click fallback?
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Album creation failed:", error);
            alert("ساخت آلبوم با خطا مواجه شد.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <main className="bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 min-h-screen w-full flex flex-col items-center relative">
            <Header theme={theme} toggleTheme={toggleTheme} />
            
            <div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 pb-16 md:pb-32">
                {appState === 'idle' && (
                     <motion.div
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col items-center w-full max-w-lg p-4 sm:p-8"
                         {...dragProps}
                     >
                         <label htmlFor="file-upload" className="cursor-pointer group w-full">
                             <ImageCard
                                 caption="برای بارگذاری، عکس را بکشید و رها کنید یا کلیک کنید"
                                 status="done"
                                 isUploadCard={true}
                                 isDraggingOver={dragProps.isDraggingOver}
                             />
                         </label>
                         <input id="file-upload" type="file" multiple className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                         <p className="mt-8 font-anton tracking-wide text-neutral-500 dark:text-neutral-400 text-center max-w-xs text-lg">
                            برای شروع، حداکثر ۴ عکس واضح از چهره خود بارگذاری کنید.
                         </p>
                     </motion.div>
                )}

                {appState !== 'idle' && uploadedImages.length > 0 && (
                    <div className="w-full max-w-7xl mx-auto lg:grid lg:grid-cols-[380px_1fr] lg:gap-8">
                        <ControlsSidebar
                            uploadedImages={uploadedImages}
                            onRemoveImage={handleRemoveImage}
                            onImageUpload={handleImageUpload}
                            maxImages={4}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            selectedCategories={selectedCategories}
                            handleToggleCategory={(cat) => setSelectedCategories(prev => {
                                const n = new Set(prev);
                                n.has(cat) ? n.delete(cat) : n.add(cat);
                                return n;
                            })}
                            handleSelectAll={() => setSelectedCategories(new Set(THEMES[activeTab].categories))}
                            handleClearAll={() => setSelectedCategories(new Set())}
                            selectedCameraAngle={selectedCameraAngle}
                            setSelectedCameraAngle={setSelectedCameraAngle}
                            onGenerateClick={() => generateBatch(activeTab, selectedCategories, selectedCameraAngle)}
                            onReset={handleReset}
                            isGenerating={appState === 'generating'}
                            
                            sceneProps={{
                                ideaInput, setIdeaInput,
                                onGetIdeas: handleGetSceneIdeas,
                                generationState, generatedScenes, selectedScenes,
                                onToggleScene: toggleSceneSelect,
                                onNewIdea: handleNewIdea,
                                onGenerateImages: () => generateSceneImages(generatedScenes, selectedScenes),
                                isGeneratingImages: isSceneImageGenerating,
                                isAppBusy: appState === 'generating'
                            }}
                            customPromptProps={{
                                promptInput: customPromptInput,
                                setPromptInput: setCustomPromptInput,
                                numImages: numCustomImages,
                                setNumImages: setNumCustomImages,
                                onGenerate: () => generateCustomImages(customPromptInput, numCustomImages),
                                isGenerating: isCustomGenerating,
                                isAppBusy: appState === 'generating'
                            }}
                        />

                        <div ref={resultsRef}>
                            <ResultsSection
                                generatedImages={generatedImages}
                                sceneGeneratedImage={sceneGeneratedImage}
                                customGeneratedImages={customGeneratedImages}
                                generatedScenes={generatedScenes}
                                appState={appState}
                                activeTab={activeTab}
                                selectedCameraAngle={selectedCameraAngle}
                                onPreview={(url, caption) => setPreviewImage({ url, caption })}
                                onEdit={(url, caption) => setEditingImage({ url, caption })}
                                onRegenerateBatch={(cat, type) => regenerateItem(cat, 'batch', { activeTab, selectedCameraAngle }, type)}
                                onRegenerateScene={(title, type) => regenerateItem(title, 'scene', { activeTab, selectedCameraAngle, scenes: generatedScenes }, type)}
                                onRegenerateCustom={(idx, type) => regenerateItem(idx, 'custom', { activeTab, selectedCameraAngle, promptText: customGeneratedImages?.prompt }, type)}
                                onShuffle={handleShuffleClick}
                                onDownloadAlbum={handleDownloadAlbum}
                                isDownloading={isDownloading}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Footer />
            <AnimatePresence>
                {previewImage && <ImagePreviewModal imageUrl={previewImage.url} caption={previewImage.caption} onClose={() => setPreviewImage(null)} />}
            </AnimatePresence>
            <AnimatePresence>
                {editingImage && <ImageEditModal imageUrl={editingImage.url} caption={editingImage.caption} onClose={() => setEditingImage(null)} onGenerate={(c, p) => handleImageEdit(editingImage.url, c, p).then(() => setEditingImage(null))} />}
            </AnimatePresence>
        </main>
    );
}

export default App;