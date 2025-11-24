import { useState, ChangeEvent, useRef } from 'react';

export const useImageManager = (maxImages: number = 4) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const dragCounter = useRef(0);

    const processFiles = (files: FileList) => {
        if (!files) return;
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) {
            alert('لطفا فایل‌های تصویری معتبر (PNG, JPEG, WEBP) بارگذاری کنید.');
            return;
        }

        const totalImages = uploadedImages.length + imageFiles.length;
        if (totalImages > maxImages) {
            alert(`شما می‌توانید حداکثر ${maxImages} عکس بارگذاری کنید.`);
            return;
        }

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            processFiles(e.target.files);
            e.target.value = ''; // Reset input
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const resetImages = () => setUploadedImages([]);

    // Drag and Drop handlers
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDraggingOver(true);
        }
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDraggingOver(false);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        dragCounter.current = 0;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    return {
        uploadedImages,
        handleImageUpload,
        handleRemoveImage,
        resetImages,
        dragProps: {
            isDraggingOver,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop
        }
    };
};
