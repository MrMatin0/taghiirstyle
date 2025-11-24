import { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Scene {
    title: string;
    prompt: string;
}

export const useSceneManager = (uploadedImages: string[]) => {
    const [ideaInput, setIdeaInput] = useState<string>('');
    const [generationState, setGenerationState] = useState<'idle' | 'generating' | 'results'>('idle');
    const [generatedScenes, setGeneratedScenes] = useState<Scene[]>([]);
    const [selectedScenes, setSelectedScenes] = useState<Set<string>>(new Set());

    const handleGetSceneIdeas = async () => {
        if (!ideaInput.trim() || uploadedImages.length === 0) return;
        setGenerationState('generating');
        setGeneratedScenes([]);
        setSelectedScenes(new Set());

        try {
            const imageParts = uploadedImages.map(url => {
                const match = url.match(/^data:(image\/\w+);base64,(.*)$/);
                if (!match) return null;
                const [, mimeType, data] = match;
                return { inlineData: { mimeType, data } };
            }).filter(Boolean) as { inlineData: { mimeType: string; data: string } }[];

            if (imageParts.length !== uploadedImages.length) {
                 alert("در فرمت یک یا چند عکس بارگذاری شده مشکلی وجود دارد.");
                 setGenerationState('idle');
                 return;
            }
    
            const prompt = `Carefully analyze the person/people in the provided images. The user has provided a core scene idea: "${ideaInput}". Your task is to act as a creative director and expand this single idea into 10 detailed, distinct, and high-quality scene prompts. Each generated prompt should be a direct and coherent elaboration of the user's original idea, not a completely different concept. For each, provide a short, catchy title (2-4 words) and a detailed prompt (2-3 sentences) that is ready for an image generation model. The prompts must be rich with descriptive language, specifying details about the environment, lighting, mood, and composition to create a visually stunning and specific result. The person/people from the images must be the central subject of each scene. Return ONLY a JSON array of objects with "title" and "prompt" keys.`;

            const response = await ai.models.generateContent({
                model: "gemini-3-pro-preview",
                contents: { parts: [...imageParts, { text: prompt }] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "A short, catchy title for the scene." },
                                prompt: { type: Type.STRING, description: "A detailed prompt describing a scene." }
                            },
                            required: ["title", "prompt"]
                        }
                    }
                }
            });
            
            const jsonResponse = JSON.parse(response.text || "[]");
            setGeneratedScenes(jsonResponse);
            setGenerationState('results');

        } catch (error) {
            console.error("Failed to generate scene ideas:", error);
            alert("متاسفانه در حال حاضر امکان تولید ایده وجود ندارد. لطفا دوباره تلاش کنید.");
            setGenerationState('idle');
        }
    };
    
    const toggleSceneSelect = (scenePrompt: string) => {
        setSelectedScenes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scenePrompt)) newSet.delete(scenePrompt);
            else newSet.add(scenePrompt);
            return newSet;
        });
    };

    const resetScenes = () => {
        setGenerationState('idle');
        setGeneratedScenes([]);
        setSelectedScenes(new Set());
        setIdeaInput('');
    };
    
    const handleNewIdea = () => {
        setGenerationState('idle');
        setGeneratedScenes([]);
        setSelectedScenes(new Set());
    };

    return {
        ideaInput,
        setIdeaInput,
        generationState,
        generatedScenes,
        selectedScenes,
        handleGetSceneIdeas,
        toggleSceneSelect,
        resetScenes,
        handleNewIdea
    };
};