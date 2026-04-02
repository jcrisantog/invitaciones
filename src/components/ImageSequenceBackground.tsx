'use client';

import { useEffect, useRef, useState } from 'react';

interface ImageSequenceBackgroundProps {
    folderPath: string; // e.g. '/goku-ultrainstinto'
    frameCount: number; // e.g. 70
    fps?: number; // e.g. 24
}

export function ImageSequenceBackground({ folderPath, frameCount, fps = 24 }: ImageSequenceBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameIndexRef = useRef(0);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const interval = 1000 / fps;

    useEffect(() => {
        // Preload images
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // pad with 0 if single digit: 01, 02...
            const frameNum = i.toString().padStart(2, '0');
            img.src = `${folderPath}/${frameNum}.png`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }

        imagesRef.current = images;

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [folderPath, frameCount]);

    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();

        const render = (time: number) => {
            if (time - lastTimeRef.current >= interval) {
                const img = imagesRef.current[frameIndexRef.current];
                if (img && img.complete) {
                    // Calculamos la proporción para que cubra todo el canvas (object-fit: cover)
                    const canvasRatio = canvas.width / canvas.height;
                    const imgRatio = img.width / img.height;
                    
                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;
                    let offsetX = 0;
                    let offsetY = 0;

                    if (canvasRatio > imgRatio) {
                        // El canvas es más ancho que la imagen
                        drawHeight = canvas.width / imgRatio;
                        offsetY = (canvas.height - drawHeight) / 2;
                    } else {
                        // El canvas es más alto que la imagen
                        drawWidth = canvas.height * imgRatio;
                        offsetX = (canvas.width - drawWidth) / 2;
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }

                frameIndexRef.current = (frameIndexRef.current + 1) % frameCount;
                lastTimeRef.current = time;
            }
            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [imagesLoaded, frameCount, interval]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
            <canvas 
                ref={canvasRef} 
                className={`w-full h-full object-cover transition-opacity duration-1000 ${imagesLoaded ? 'opacity-50' : 'opacity-0'}`} 
            />
            {/* Si aún no cargan las imágenes mostramos un pequeño loader o fondo oscuro */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="w-10 h-10 border-4 border-slate-600 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
