/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Helper function to load an image and return it as an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${src.substring(0, 50)}...`));
        img.src = src;
    });
}

/**
 * Creates a single "photo album" page image from a collection of generated images.
 * @param imageData A record mapping categories to their image data URLs.
 * @param albumTitle The title to display at the top of the album page.
 * @returns A promise that resolves to a data URL of the generated album page (JPEG format).
 */
export async function createAlbumPage(imageData: Record<string, string>, albumTitle: string): Promise<string> {
    const canvas = document.createElement('canvas');
    const canvasWidth = 2480;
    const canvasHeight = 3508; // A4-like ratio
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D canvas context');
    }

    // 1. Draw the background
    ctx.fillStyle = '#111827'; // A modern, dark gray
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Draw the titles
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.font = `120px 'Bebas Neue', sans-serif`;
    ctx.fillText(`Style Change App: ${albumTitle}`, canvasWidth / 2, 180);

    ctx.font = `50px 'Roboto', sans-serif`;
    ctx.fillStyle = '#9CA3AF'; // Lighter gray for subtitle
    ctx.fillText('Generated on Google AI Studio', canvasWidth / 2, 260);

    // 3. Load all the images concurrently
    const categories = Object.keys(imageData);
    const loadedImages = await Promise.all(
        Object.values(imageData).map(url => loadImage(url))
    );

    const imagesWithCategories = categories.map((category, index) => ({
        category,
        img: loadedImages[index],
    }));

    // 4. Define a clean 3x4 grid layout and draw each image
    const grid = { cols: 3, rows: 4, padding: 80 };
    const contentTopMargin = 350; // Space for the header
    const contentWidth = canvasWidth - grid.padding * 2;
    const contentHeight = canvasHeight - contentTopMargin - grid.padding;
    
    const cellWidth = (contentWidth - grid.padding * (grid.cols - 1)) / grid.cols;
    const cellHeight = (contentHeight - grid.padding * (grid.rows - 1)) / grid.rows;
    
    const imageContainerHeight = cellHeight * 0.8; // Reserve 20% for the caption

    imagesWithCategories.forEach(({ category, img }, index) => {
        const row = Math.floor(index / grid.cols);
        const col = index % grid.cols;

        const cellX = grid.padding + col * (cellWidth + grid.padding);
        const cellY = contentTopMargin + row * (cellHeight + grid.padding);
        
        ctx.save();
        
        // Calculate image dimensions to fit while maintaining aspect ratio
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth = cellWidth;
        let drawHeight = drawWidth / aspectRatio;

        if (drawHeight > imageContainerHeight) {
            drawHeight = imageContainerHeight;
            drawWidth = drawHeight * aspectRatio;
        }

        // Center the image within its designated area in the cell
        const imgX = cellX + (cellWidth - drawWidth) / 2;
        const imgY = cellY + (imageContainerHeight - drawHeight) / 2;
        
        // Draw the image
        ctx.drawImage(img, imgX, imgY, drawWidth, drawHeight);
        
        // Draw the caption below the image
        ctx.fillStyle = '#E5E7EB'; // Off-white
        ctx.font = `52px 'Anton', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const captionY = cellY + imageContainerHeight + 30; // 30px margin
        ctx.fillText(category, cellX + cellWidth / 2, captionY);
        
        ctx.restore();
    });

    // Convert canvas to a high-quality JPEG and return the data URL
    return canvas.toDataURL('image/jpeg', 0.92);
}