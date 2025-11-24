/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { ChangeEvent } from 'react';

interface UploadedImagesListProps {
  images: string[];
  onRemove: (index: number) => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  maxImages: number;
}

const UploadedImagesList: React.FC<UploadedImagesListProps> = ({ 
  images, 
  onRemove, 
  onUpload, 
  maxImages 
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {images.map((imgSrc, index) => (
        <div key={index} className="relative group aspect-square">
          <img 
            src={imgSrc} 
            alt={`Uploaded ${index + 1}`} 
            className="w-full h-full rounded-md object-cover border-2 border-neutral-300 dark:border-neutral-700" 
          />
          {index === 0 && (
            <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">اصلی</div>
          )}
          <button
            onClick={() => onRemove(index)}
            className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            aria-label={`حذف عکس ${index + 1}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      {images.length < maxImages && (
        <>
          <label htmlFor="add-more-files" className="cursor-pointer group w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-neutral-400 dark:border-neutral-700 rounded-md hover:border-yellow-400 hover:text-yellow-500 transition-colors text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-semibold">افزودن عکس</span>
            <span className="text-xs">({images.length}/{maxImages})</span>
          </label>
          <input 
            id="add-more-files" 
            type="file" 
            multiple 
            className="hidden" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={onUpload} 
          />
        </>
      )}
    </div>
  );
};

export default UploadedImagesList;