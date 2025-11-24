/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImagePreviewModalProps {
  imageUrl: string;
  caption: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, caption, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  // Effect to handle Escape key press for closing the modal
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

  // Reset zoom and pan when a new image is loaded
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);

  // When scale returns to 1, reset the position to center it
  useEffect(() => {
    if (scale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // Handle zooming with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.005;
    setScale(prev => Math.max(1, Math.min(prev + scaleAmount, 8))); // Clamp scale between 1x and 8x
  };

  // --- Pan Logic ---
  const handlePanStart = (clientX: number, clientY: number) => {
    if (scale <= 1) return;
    isDraggingRef.current = true;
    dragStartPosRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
    if (imageContainerRef.current) {
      imageContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePanMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || scale <= 1) return;
    setPosition({
      x: clientX - dragStartPosRef.current.x,
      y: clientY - dragStartPosRef.current.y,
    });
  };

  const handlePanEnd = () => {
    isDraggingRef.current = false;
    if (imageContainerRef.current) {
      imageContainerRef.current.style.cursor = 'grab';
    }
  };

  // Mouse event handlers
  const onMouseDown = (e: React.MouseEvent) => handlePanStart(e.clientX, e.clientY);
  const onMouseMove = (e: React.MouseEvent) => handlePanMove(e.clientX, e.clientY);

  // Touch event handlers for basic panning on mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
    }
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
        className="relative max-w-screen-lg w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -left-2 md:top-2 md:left-2 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="بستن پیش‌نمایش عکس"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          ref={imageContainerRef}
          className="relative max-w-full w-auto h-auto max-h-[80vh] overflow-hidden rounded-lg shadow-2xl"
          onWheel={handleWheel}
          style={{ cursor: scale > 1 ? 'grab' : 'default' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={handlePanEnd}
          onMouseLeave={handlePanEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={handlePanEnd}
        >
          <motion.img
            src={imageUrl}
            alt={caption}
            className="max-h-[80vh] w-auto h-auto object-contain select-none"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.1s linear',
              touchAction: 'none' // Essential for custom touch handling
            }}
            onDragStart={(e) => e.preventDefault()} // Prevents native browser image dragging
          />
        </div>
        
        <p className="font-anton tracking-wide text-2xl text-center mt-4 text-neutral-100 z-20 pointer-events-none">
          {caption}
        </p>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white">
          <button onClick={() => setScale(s => Math.max(1, s - 0.25))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors" aria-label="کوچک‌نمایی">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
          </button>
          <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors" aria-label="بازنشانی بزرگ‌نمایی">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
          </button>
          <button onClick={() => setScale(s => Math.min(8, s + 0.25))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors" aria-label="بزرگ‌نمایی">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ImagePreviewModal;