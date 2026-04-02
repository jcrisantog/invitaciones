'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundMusicProps {
    url: string;
    autoPlay?: boolean;
    onToggle?: (isMuted: boolean) => void;
    forcePlay?: boolean; // Prop to allow parent (template) to trigger play
}

export function BackgroundMusic({ url, autoPlay = false, onToggle, forcePlay = false }: BackgroundMusicProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [iframeUrl, setIframeUrl] = useState('');
    const [iframeKey, setIframeKey] = useState(0);
    const [isNativeAudio, setIsNativeAudio] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Sync with parent forcePlay
    useEffect(() => {
        if (forcePlay && isMuted) {
            setIsMuted(false);
        }
    }, [forcePlay]);

    useEffect(() => {
        if (!url) return;

        // Detect if it is a local file or direct MP3
        if (url.endsWith('.mp3') || url.startsWith('/')) {
            setIsNativeAudio(true);
            return;
        }

        // YouTube/Spotify Fallback
        setIsNativeAudio(false);
        let finalUrl = '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('v=')
                ? url.split('v=')[1].split('&')[0]
                : url.split('/').pop();
            finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`;
        } else if (url.includes('spotify.com')) {
            const spotifyId = url.split('/').pop()?.split('?')[0];
            finalUrl = `https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&autoplay=1`;
        }
        setIframeUrl(finalUrl);
    }, [url]);

    // Handle Native Audio playback
    useEffect(() => {
        if (!isNativeAudio || !audioRef.current) return;

        if (!isMuted) {
            console.log("[BackgroundMusic] Playing audio...");
            audioRef.current.play()
                .then(() => console.log("[BackgroundMusic] Native Play success"))
                .catch(err => console.error("[BackgroundMusic] Native Play error:", err));
        } else {
            console.log("[BackgroundMusic] Pausing audio...");
            audioRef.current.pause();
        }
    }, [isMuted, isNativeAudio]);

    const toggleMusic = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (!isNativeAudio) {
            setIframeKey(prev => prev + 1);
        }
    };

    if (!url) return null;

    return (
        <>
            {/* Native Audio Element */}
            {isNativeAudio && (
                <audio
                    ref={audioRef}
                    src={url}
                    loop
                    preload="auto"
                />
            )}

            {/* YouTube/Spotify Fallback Iframe */}
            {!isNativeAudio && (
                <div
                    className="fixed -top-20 -left-20 w-10 h-10 pointer-events-none overflow-hidden z-[-1]"
                    style={{ opacity: 0.01 }}
                >
                    {iframeUrl && (
                        <iframe
                            key={iframeKey}
                            src={`${iframeUrl}${isMuted ? '&mute=1' : '&mute=0'}`}
                            allow="autoplay; encrypted-media"
                            title="Background Music"
                        />
                    )}
                </div>
            )}

            {/* Floating Control Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                    e.stopPropagation(); // Evitar clics accidentales en el fondo
                    toggleMusic();
                }}
                className={`fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isMuted ? 'bg-black/40' : 'bg-blue-600/80'
                    } overflow-hidden`}
                style={{
                    boxShadow: isMuted ? 'none' : '0 0 30px rgba(59, 130, 246, 0.7)',
                    border: isMuted ? '1px solid rgba(255,255,255,0.2)' : '2px solid white'
                }}
            >
                {!isMuted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-white"
                    />
                )}
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} className="relative z-10" />}
            </motion.button>
        </>
    );
}
