import React from 'react';
import UploadedImagesList from './UploadedImagesList';
import SceneGenerator from './SceneGenerator';
import CustomPromptGenerator from './CustomPromptGenerator';
import Tabs from './Tabs';
import ImageCard from './ImageCard';
import { THEMES, CAMERA_ANGLES, ThemeKey, CameraAngleKey } from '../lib/themes';

const primaryButtonClasses = "font-anton tracking-wide text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-yellow-300";
const secondaryButtonClasses = "font-anton tracking-wide text-xl text-center text-neutral-800 dark:text-white bg-transparent border-2 border-neutral-800 dark:border-white py-3 px-8 rounded-sm transform transition-all duration-200 hover:scale-105 hover:-rotate-2 hover:bg-neutral-800 dark:hover:bg-white hover:text-white dark:hover:text-black";

interface ControlsSidebarProps {
    // Image Manager Props
    uploadedImages: string[];
    onRemoveImage: (index: number) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxImages: number;

    // Settings
    activeTab: ThemeKey;
    setActiveTab: (tab: ThemeKey) => void;
    selectedCategories: Set<string>;
    handleToggleCategory: (category: string) => void;
    handleSelectAll: () => void;
    handleClearAll: () => void;
    selectedCameraAngle: CameraAngleKey;
    setSelectedCameraAngle: (angle: CameraAngleKey) => void;

    // Generators
    sceneProps: any;
    customPromptProps: any;
    
    // Actions
    onGenerateClick: () => void;
    onReset: () => void;
    isGenerating: boolean;
}

const ControlsSidebar: React.FC<ControlsSidebarProps> = ({
    uploadedImages,
    onRemoveImage,
    onImageUpload,
    maxImages,
    activeTab,
    setActiveTab,
    selectedCategories,
    handleToggleCategory,
    handleSelectAll,
    handleClearAll,
    selectedCameraAngle,
    setSelectedCameraAngle,
    sceneProps,
    customPromptProps,
    onGenerateClick,
    onReset,
    isGenerating
}) => {
    return (
        <aside className="w-full mb-8 lg:mb-0">
            <div className="bg-neutral-100 dark:bg-neutral-900/50 p-3 lg:p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 sticky top-4">
                
                <UploadedImagesList
                    images={uploadedImages}
                    onRemove={onRemoveImage}
                    onUpload={onImageUpload}
                    maxImages={maxImages}
                />

                <div className="mb-6">
                    <label htmlFor="camera-angle-select" className="block font-anton text-2xl text-neutral-800 dark:text-neutral-200 tracking-wide mb-2">زاویه دوربین</label>
                    <select
                        id="camera-angle-select"
                        value={selectedCameraAngle}
                        onChange={(e) => setSelectedCameraAngle(e.target.value as CameraAngleKey)}
                        className="w-full p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-neutral-800 dark:text-neutral-200"
                    >
                        {Object.keys(CAMERA_ANGLES).map(angle => (
                            <option key={angle} value={angle}>{angle}</option>
                        ))}
                    </select>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 min-h-[20px]">
                        {CAMERA_ANGLES[selectedCameraAngle].description}
                    </p>
                </div>

                <SceneGenerator {...sceneProps} />
                <CustomPromptGenerator {...customPromptProps} />

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700/50">
                    <h2 className="font-anton text-2xl text-neutral-800 dark:text-neutral-200 tracking-wide">استایل‌های خود را انتخاب کنید</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">یک تم انتخاب کنید، سپس عکس‌هایی که می‌خواهید ایجاد شوند را برگزینید.</p>
                </div>
                
                <Tabs themes={THEMES} activeTab={activeTab} setActiveTab={setActiveTab as (tab: string) => void} />
        
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-4">
                    {THEMES[activeTab].categories.map((category) => (
                        <ImageCard
                            key={category}
                            caption={category}
                            status="done"
                            isSelectable={true}
                            isSelected={selectedCategories.has(category)}
                            onSelect={handleToggleCategory}
                        />
                    ))}
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button onClick={handleSelectAll} className={`${secondaryButtonClasses} !py-2 !px-4 !text-sm`}>انتخاب همه</button>
                    <button onClick={handleClearAll} className={`${secondaryButtonClasses} !py-2 !px-4 !text-sm`}>پاک کردن</button>
                     <button onClick={onReset} className={`${secondaryButtonClasses} !py-2 !px-4 !text-sm`}>شروع مجدد</button>
                    <button 
                        onClick={onGenerateClick}
                        className={`${primaryButtonClasses} !py-2 !px-4 !text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-yellow-400/50 disabled:hover:scale-100 disabled:hover:rotate-0`}
                        disabled={selectedCategories.size === 0 || isGenerating}
                    >
                        {`ایجاد (${selectedCategories.size})`}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ControlsSidebar;
