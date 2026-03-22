'use client';

import { motion } from 'framer-motion';
import { MusicUrls } from '@/types';
import { Music } from 'lucide-react';

export function MusicSection({ musicUrls }: { musicUrls: MusicUrls }) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Sugerencias Musicales —</h2>
            </div>
            <div className="theme-card text-center">
                <Music size={28} className="theme-accent mx-auto mb-3" />
                <p className="theme-text-secondary text-sm mb-4">¡Escucha la playlist del evento!</p>
                <div className="flex flex-col gap-3">
                    {musicUrls.spotify && (
                        <a href={musicUrls.spotify} target="_blank" rel="noopener noreferrer" className="theme-btn-primary" style={{ backgroundColor: '#068451', color: '#ffffff' }}>
                            🔊 Playlist en Spotify
                        </a>
                    )}
                    {musicUrls.youtube && (
                        <a href={musicUrls.youtube} target="_blank" rel="noopener noreferrer" className="theme-btn-primary" style={{ backgroundColor: '#ff0000', color: '#ffffff' }}>
                            ▶️ Playlist en YouTube
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
