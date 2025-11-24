/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface Scene {
    title: string;
    prompt: string;
}

interface SceneGeneratorProps {
    ideaInput: string;
    setIdeaInput: (value: string) => void;
    onGetIdeas: () => void;
    generationState: 'idle' | 'generating' | 'results';
    generatedScenes: Scene[];
    selectedScenes: Set<string>;
    onToggleScene: (prompt: string) => void;
    onNewIdea: () => void;
    onGenerateImages: () => void;
    isGeneratingImages: boolean;
    isAppBusy: boolean;
}

const primaryButtonClasses = "font-anton tracking-wide text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-yellow-300";

const SceneGenerator: React.FC<SceneGeneratorProps> = ({
    ideaInput,
    setIdeaInput,
    onGetIdeas,
    generationState,
    generatedScenes,
    selectedScenes,
    onToggleScene,
    onNewIdea,
    onGenerateImages,
    isGeneratingImages,
    isAppBusy
}) => {
    return (
        <div className="mb-4 pt-4 border-t border-neutral-200 dark:border-neutral-700/50">
            <p className="text-center text-sm font-bold text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">یا ایده صحنه بگیرید</p>

            {generationState === 'idle' && (
                <div className="mt-4">
                    <label htmlFor="scene-idea-input" className="block font-anton text-2xl text-neutral-800 dark:text-neutral-200 tracking-wide mb-2">از طریق توضیحات</label>
                    <div className="flex gap-2">
                        <textarea
                            id="scene-idea-input"
                            value={ideaInput}
                            onChange={(e) => setIdeaInput(e.target.value)}
                            placeholder="مثال: جنگلی جادویی در شب"
                            className="w-full flex-1 p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                            rows={2}
                        />
                        <button
                            onClick={onGetIdeas}
                            disabled={!ideaInput.trim()}
                            className={`${primaryButtonClasses} !py-2 !px-4 !text-sm self-stretch disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-yellow-400/50 disabled:hover:scale-100 disabled:hover:rotate-0`}
                        >
                            ایده بگیر
                        </button>
                    </div>
                </div>
            )}

            {generationState === 'generating' && (
                <div className="mt-4 text-center p-4">
                    <p className="font-anton tracking-wide text-lg text-neutral-600 dark:text-neutral-400 animate-pulse">در حال تولید ایده...</p>
                </div>
            )}

            {generationState === 'results' && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-anton text-2xl text-neutral-800 dark:text-neutral-200 tracking-wide">محیط(ها) را انتخاب کنید</h3>
                        <button onClick={onNewIdea} className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline font-bold">ایده جدید</button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {generatedScenes.map((scene, index) => {
                            const isSelected = selectedScenes.has(scene.prompt);
                            return (
                                <button
                                    key={index}
                                    onClick={() => onToggleScene(scene.prompt)}
                                    className={`w-full text-start p-3 rounded-md border transition-all duration-200 flex items-start gap-3 ${isSelected ? 'bg-yellow-400/20 border-yellow-500 dark:border-yellow-400 ring-1 ring-yellow-500 dark:ring-yellow-400' : 'bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}
                                >
                                    <div className={`mt-1 w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? 'bg-yellow-400 border-yellow-500' : 'bg-white dark:bg-neutral-900 border-neutral-400'}`}>
                                        {isSelected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{scene.title}</p>
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{scene.prompt}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    {generatedScenes.length > 0 && (
                        <button
                            onClick={onGenerateImages}
                            disabled={selectedScenes.size === 0 || isGeneratingImages || isAppBusy}
                            className={`${primaryButtonClasses} !py-2 !px-4 !text-sm w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isGeneratingImages ? 'در حال ایجاد...' : `ایجاد صحنه‌ها (${selectedScenes.size})`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SceneGenerator;