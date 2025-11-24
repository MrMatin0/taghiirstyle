import { useState } from 'react';
import { generateStyledImage } from '../services/geminiService';
import { THEMES, CAMERA_ANGLES, ThemeKey, CameraAngleKey } from '../lib/themes';

export type ImageStatus = 'pending' | 'done' | 'error';
export interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
}
export type PromptType = 'original' | 'fallback';

interface CustomGeneratedData {
    prompt: string;
    images: GeneratedImage[];
}

export const useGenerator = (uploadedImages: string[]) => {
    const [appState, setAppState] = useState<'idle' | 'image-uploaded' | 'generating' | 'results-shown'>('idle');
    const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({});
    const [sceneGeneratedImage, setSceneGeneratedImage] = useState<Record<string, GeneratedImage>>({});
    const [customGeneratedImages, setCustomGeneratedImages] = useState<CustomGeneratedData | null>(null);
    
    const [isSceneImageGenerating, setIsSceneImageGenerating] = useState(false);
    const [isCustomGenerating, setIsCustomGenerating] = useState(false);

    // Helper to safely execute generation
    const executeGeneration = async (
        images: string[],
        prompt: string,
        fallbackPrompt: string | undefined,
        onSuccess: (url: string) => void,
        onError: (err: string) => void
    ) => {
        try {
            const resultUrl = await generateStyledImage(images, prompt, fallbackPrompt);
            onSuccess(resultUrl);
        } catch (err) {
            onError(err instanceof Error ? err.message : "An unknown error occurred.");
        }
    };

    // --- Main Batch Generation ---
    const generateBatch = async (
        activeTab: ThemeKey,
        selectedCategories: Set<string>,
        selectedCameraAngle: CameraAngleKey
    ) => {
        if (uploadedImages.length === 0 || selectedCategories.size === 0) return;

        setAppState('generating');
        
        const { getPrompt, getFallbackPrompt } = THEMES[activeTab];
        const categories = Array.from(selectedCategories);
        const angleModifier = CAMERA_ANGLES[selectedCameraAngle].prompt;
        const primaryImage = uploadedImages[0];

        // Initialize pending states
        const initial: Record<string, GeneratedImage> = {};
        categories.forEach(cat => initial[cat] = { status: 'pending' });
        setGeneratedImages(initial);

        // Process each category
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const basePrompt = getPrompt(category);
            const baseFallback = getFallbackPrompt(category);
            const prompt = `${basePrompt}${angleModifier ? ` ${angleModifier}` : ''}`;
            const fallback = `${baseFallback}${angleModifier ? ` ${angleModifier}` : ''}`;

            await executeGeneration(
                [primaryImage],
                prompt,
                fallback,
                (url) => setGeneratedImages(prev => ({ ...prev, [category]: { status: 'done', url } })),
                (error) => setGeneratedImages(prev => ({ ...prev, [category]: { status: 'error', error } }))
            );

            if (i < categories.length - 1) await new Promise(r => setTimeout(r, 1000));
        }
        setAppState('results-shown');
    };

    // --- Scene Generation ---
    const generateSceneImages = async (
        scenes: { title: string, prompt: string }[],
        selectedScenes: Set<string>
    ) => {
        if (uploadedImages.length === 0 || selectedScenes.size === 0) return;
        setIsSceneImageGenerating(true);

        const scenesToGen = scenes.filter(s => selectedScenes.has(s.prompt));
        
        setSceneGeneratedImage(prev => {
            const next = { ...prev };
            scenesToGen.forEach(s => next[s.title] = { status: 'pending' });
            return next;
        });

        for (const scene of scenesToGen) {
             const prompt = `Create a high-quality, photorealistic image based on the following scene: "${scene.prompt}". It is crucial to incorporate the person/people from the provided image(s) into this scene, preserving their facial likeness and unique features. Ensure they appear naturally integrated into the environment.`;
             const fallback = `A high-quality, photorealistic image depicting: ${scene.prompt} with the person/people from the provided image(s).`;
             
             await executeGeneration(
                uploadedImages,
                prompt,
                fallback,
                (url) => setSceneGeneratedImage(prev => ({ ...prev, [scene.title]: { status: 'done', url } })),
                (error) => setSceneGeneratedImage(prev => ({ ...prev, [scene.title]: { status: 'error', error } }))
             );
        }
        setIsSceneImageGenerating(false);
    };

    // --- Custom Prompt Generation ---
    const generateCustomImages = async (customPrompt: string, count: number) => {
        if (uploadedImages.length === 0 || !customPrompt.trim()) return;
        setIsCustomGenerating(true);

        const initialImages = Array(count).fill({ status: 'pending' });
        setCustomGeneratedImages({ prompt: customPrompt, images: initialImages });

        const prompt = `Create a high-quality, photorealistic image based on the following scene: "${customPrompt}". It is crucial to incorporate the person/people from the provided image(s) into this scene, preserving their facial likeness and unique features. Ensure they appear naturally integrated into the environment.`;
        const fallback = `A high-quality, photorealistic image depicting: ${customPrompt} with the person/people from the provided image(s).`;

        for (let i = 0; i < count; i++) {
             await executeGeneration(
                uploadedImages,
                prompt,
                fallback,
                (url) => setCustomGeneratedImages(prev => {
                    if (!prev) return null;
                    const newImgs = [...prev.images];
                    newImgs[i] = { status: 'done', url };
                    return { ...prev, images: newImgs };
                }),
                (error) => setCustomGeneratedImages(prev => {
                    if (!prev) return null;
                    const newImgs = [...prev.images];
                    newImgs[i] = { status: 'error', error };
                    return { ...prev, images: newImgs };
                })
             );
        }
        setIsCustomGenerating(false);
    };

    // --- Regeneration & Editing logic ---
    const regenerateItem = async (
        key: string | number, 
        type: 'batch' | 'scene' | 'custom', 
        config: { activeTab: ThemeKey, selectedCameraAngle: CameraAngleKey, scenes?: any[], promptText?: string },
        promptType: PromptType
    ) => {
        const images = uploadedImages; 
        if (images.length === 0) return;

        let prompt = "";
        let fallback = undefined;

        if (type === 'batch') {
            const category = key as string;
            const { getPrompt, getFallbackPrompt } = THEMES[config.activeTab];
            const angle = CAMERA_ANGLES[config.selectedCameraAngle].prompt;
            const base = promptType === 'original' ? getPrompt(category) : getFallbackPrompt(category);
            prompt = `${base}${angle ? ` ${angle}` : ''}`;
            
            setGeneratedImages(prev => ({ ...prev, [category]: { status: 'pending' } }));
            await executeGeneration(
                [images[0]], prompt, fallback,
                (url) => setGeneratedImages(prev => ({ ...prev, [category]: { status: 'done', url } })),
                (error) => setGeneratedImages(prev => ({ ...prev, [category]: { status: 'error', error } }))
            );
        } else if (type === 'scene') {
            const title = key as string;
            const scene = config.scenes?.find(s => s.title === title);
            if (!scene) return;
            
            const scenePrompt = scene.prompt;
            prompt = promptType === 'original' 
                ? `Create a high-quality, photorealistic image based on the following scene: "${scenePrompt}". It is crucial to incorporate the person/people from the provided image(s) into this scene, preserving their facial likeness and unique features. Ensure they appear naturally integrated into the environment.`
                : `A high-quality, photorealistic image depicting: ${scenePrompt} with the person/people from the provided image(s).`;

            setSceneGeneratedImage(prev => ({ ...prev, [title]: { status: 'pending' } }));
            await executeGeneration(
                images, prompt, fallback,
                (url) => setSceneGeneratedImage(prev => ({ ...prev, [title]: { status: 'done', url } })),
                (error) => setSceneGeneratedImage(prev => ({ ...prev, [title]: { status: 'error', error } }))
            );
        } else if (type === 'custom') {
            const index = key as number;
            const txt = config.promptText || "";
             prompt = promptType === 'original' 
                ? `Create a high-quality, photorealistic image based on the following scene: "${txt}". It is crucial to incorporate the person/people from the provided image(s) into this scene, preserving their facial likeness and unique features. Ensure they appear naturally integrated into the environment.`
                : `A high-quality, photorealistic image depicting: ${txt} with the person/people from the provided image(s).`;
            
             setCustomGeneratedImages(prev => {
                if (!prev) return null;
                const newImgs = [...prev.images];
                newImgs[index] = { status: 'pending' };
                return { ...prev, images: newImgs };
            });

            await executeGeneration(
                images, prompt, fallback,
                (url) => setCustomGeneratedImages(prev => {
                    if (!prev) return null;
                    const newImgs = [...prev.images];
                    newImgs[index] = { status: 'done', url };
                    return { ...prev, images: newImgs };
                }),
                (error) => setCustomGeneratedImages(prev => {
                    if (!prev) return null;
                    const newImgs = [...prev.images];
                    newImgs[index] = { status: 'error', error };
                    return { ...prev, images: newImgs };
                })
            );
        }
    };

    const handleImageEdit = async (imageUrl: string, caption: string, prompt: string) => {
        // Determine type by caption format/existence in state
        const isScene = Object.keys(sceneGeneratedImage).includes(caption);
        const isCustom = caption.startsWith('custom-');

        if (isScene) setSceneGeneratedImage(prev => ({ ...prev, [caption]: { status: 'pending' } }));
        else if (isCustom) {
             const index = parseInt(caption.split('-')[1], 10);
             setCustomGeneratedImages(prev => {
                if (!prev) return null;
                const newImgs = [...prev.images];
                newImgs[index] = { status: 'pending' };
                return { ...prev, images: newImgs };
            });
        } else {
            setGeneratedImages(prev => ({ ...prev, [caption]: { status: 'pending' } }));
        }

        await executeGeneration(
            [imageUrl], prompt, undefined,
            (url) => {
                if (isScene) setSceneGeneratedImage(prev => ({ ...prev, [caption]: { status: 'done', url } }));
                else if (isCustom) {
                     const index = parseInt(caption.split('-')[1], 10);
                     setCustomGeneratedImages(prev => {
                        if (!prev) return null;
                        const newImgs = [...prev.images];
                        newImgs[index] = { status: 'done', url };
                        return { ...prev, images: newImgs };
                    });
                } else {
                    setGeneratedImages(prev => ({ ...prev, [caption]: { status: 'done', url } }));
                }
            },
            (error) => {
                if (isScene) setSceneGeneratedImage(prev => ({ ...prev, [caption]: { status: 'error', error } }));
                else if (isCustom) {
                    const index = parseInt(caption.split('-')[1], 10);
                     setCustomGeneratedImages(prev => {
                        if (!prev) return null;
                        const newImgs = [...prev.images];
                        newImgs[index] = { status: 'error', error };
                        return { ...prev, images: newImgs };
                    });
                } else {
                    setGeneratedImages(prev => ({ ...prev, [caption]: { status: 'error', error } }));
                }
            }
        );
    };

    const resetGeneration = () => {
        setAppState('idle');
        setGeneratedImages({});
        setSceneGeneratedImage({});
        setCustomGeneratedImages(null);
    };

    return {
        appState,
        setAppState,
        generatedImages,
        sceneGeneratedImage,
        customGeneratedImages,
        isSceneImageGenerating,
        isCustomGenerating,
        generateBatch,
        generateSceneImages,
        generateCustomImages,
        regenerateItem,
        handleImageEdit,
        resetGeneration
    };
};
