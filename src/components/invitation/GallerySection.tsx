'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface GallerySectionProps {
    urls: string[];
    celebrantName: string;
}

export function GallerySection({ urls, celebrantName }: GallerySectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Galería de Fotos —</h2>
            </div>
            <div ref={ref} className="carousel-container">
                {urls.map((url, i) => (
                    <div key={i} className="carousel-item">
                        <img
                            src={url}
                            alt={`${celebrantName} - foto ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-3">
                {urls.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full theme-accent-bg opacity-40" />
                ))}
            </div>
        </motion.div>
    );
}
