'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event, Guest } from '@/types';
import { getTheme } from '@/lib/themes';
import { ThemeEngine } from '@/components/ThemeEngine';
import { CountdownSection } from '@/components/invitation/CountdownSection';
import { EventInfoSection } from '@/components/invitation/EventInfoSection';
import { ProgramSection } from '@/components/invitation/ProgramSection';
import { GallerySection } from '@/components/invitation/GallerySection';
import { SpecialMessageSection } from '@/components/invitation/SpecialMessageSection';
import { DressCodeSection } from '@/components/invitation/DressCodeSection';
import { GiftsSection } from '@/components/invitation/GiftsSection';
import { MusicSection } from '@/components/invitation/MusicSection';
import { ConfirmedCountSection } from '@/components/invitation/ConfirmedCountSection';
import { RsvpSection } from '@/components/invitation/RsvpSection';

interface ButterflyTemplateProps {
    event: Event;
    guest: Guest;
    galleryUrls: string[];
    confirmedCount: number;
}

type Stage = 'video' | 'welcome' | 'invitation';

export function ButterflyTemplate({ event, guest, galleryUrls, confirmedCount }: ButterflyTemplateProps) {
    const [stage, setStage] = useState<Stage>('video');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRsvpInView, setIsRsvpInView] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const theme = getTheme(event.style_id);
    const vis = event.section_visibility;

    const scrollToRsvp = () => {
        document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleVideoEnd = () => {
        // Fade out video then show welcome screen
        setTimeout(() => setStage('welcome'), 600);
    };

    const handleSkip = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleVideoEnd();
    };

    return (
        <ThemeEngine theme={theme}>
            <div className="min-h-screen" style={{ fontFamily: theme.fontBody }}>
                <AnimatePresence mode="wait">

                    {/* ── STAGE 1: VIDEO ── */}
                    {stage === 'video' && (
                        <motion.div
                            key="video-stage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                        >
                            <video
                                ref={videoRef}
                                src="/butterfly/video.mp4"
                                className="w-full h-full object-cover"
                                playsInline
                                onEnded={handleVideoEnd}
                                style={{ display: 'block' }}
                            />

                            {/* Play button overlay — shown until user taps */}
                            <AnimatePresence>
                                {!isPlaying && (
                                    <motion.button
                                        key="play-btn"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                        onClick={handlePlay}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                                        style={{ background: 'rgba(0,0,0,0.45)' }}
                                        aria-label="Reproducir video"
                                    >
                                        {/* Pulsing ring */}
                                        <div className="relative flex items-center justify-center">
                                            <span
                                                className="absolute w-28 h-28 rounded-full animate-ping"
                                                style={{ background: 'rgba(200,130,255,0.25)' }}
                                            />
                                            <span
                                                className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, #b94fff 0%, #7a00cc 100%)',
                                                    boxShadow: '0 0 40px rgba(180,80,255,0.6)',
                                                }}
                                            >
                                                {/* Play triangle SVG */}
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="white"
                                                    className="w-9 h-9 ml-1"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p
                                            className="text-white/80 text-sm uppercase tracking-[0.25em]"
                                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                                        >
                                            Toca para reproducir
                                        </p>
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Skip button — only visible while playing */}
                            <AnimatePresence>
                                {isPlaying && (
                                    <motion.button
                                        key="skip-btn"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        onClick={handleSkip}
                                        className="absolute bottom-8 right-6 text-white/60 text-xs uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:text-white hover:border-white/50 transition-all duration-300"
                                    >
                                        Saltar intro ›
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* ── STAGE 2: WELCOME SCREEN (original) ── */}
                    {stage === 'welcome' && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="mb-3 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10"
                            >
                                <p className="theme-text-secondary text-[10px] uppercase tracking-widest" style={{ fontFamily: theme.fontBody }}>
                                    Esta invitación es para
                                </p>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                                className="text-4xl font-bold theme-accent mb-6 px-6 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/5"
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                {guest.name}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="theme-divider w-32 mx-auto my-4"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="mb-6 px-6 py-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10"
                            >
                                <p className="theme-text-primary text-lg" style={{ fontFamily: theme.fontTitle }}>
                                    Cumpleaños de <strong className="theme-accent">{event.celebrant_name}</strong>
                                </p>
                                <p className="theme-text-secondary text-xs mt-2 opacity-80">
                                    {new Date(event.event_date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 }}
                                whileTap={{ scale: 0.97 }}
                                className="theme-btn-primary text-xl px-10 py-4"
                                onClick={() => setStage('invitation')}
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                ✨ Entrar
                            </motion.button>
                        </motion.div>
                    )}

                    {/* ── STAGE 3: FULL INVITATION ── */}
                    {stage === 'invitation' && (
                        <motion.div
                            key="invitation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="pb-28"
                        >
                            {/* Header Title */}
                            <div className="theme-bg-secondary py-10 px-6 text-center relative overflow-hidden">
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
                                    className="text-5xl font-black theme-accent leading-tight"
                                    style={{ fontFamily: theme.fontTitle }}
                                >
                                    {event.celebrant_name}
                                </motion.h1>
                                <p className="theme-text-secondary text-sm uppercase tracking-widest mt-2">
                                    Mi Cumpleaños
                                </p>
                            </div>

                            <div className="px-5 py-8 space-y-24 max-w-lg mx-auto">
                                <CountdownSection eventDate={event.event_date} />
                                <EventInfoSection event={event} themeId={event.style_id} />

                                {vis.program && event.program.length > 0 && <ProgramSection items={event.program} />}
                                {vis.gallery && galleryUrls.length > 0 && <GallerySection urls={galleryUrls} celebrantName={event.celebrant_name} />}
                                {vis.special_message && event.special_message && <SpecialMessageSection message={event.special_message} />}
                                {vis.dress_code && (event.dress_code.recommended || event.dress_code.avoid) && <DressCodeSection dressCode={event.dress_code} />}
                                {vis.gifts && (event.gift_registry.liverpool || event.gift_registry.amazon || event.gift_registry.bank_account) && <GiftsSection registry={event.gift_registry} />}
                                {vis.music && (event.music_urls.spotify || event.music_urls.youtube) && <MusicSection musicUrls={event.music_urls} />}
                                {vis.confirmed_count && <ConfirmedCountSection count={confirmedCount} />}

                                <RsvpSection event={event} guest={guest} onInView={setIsRsvpInView} />

                                {/* Footer / Attribution */}
                                <footer className="mt-20 mb-10 px-4 w-full flex justify-center">
                                    <div className="max-w-xs w-full bg-black/80 backdrop-blur-md py-6 px-6 rounded-3xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-blue-500/30 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="theme-text-secondary text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 opacity-90 leading-relaxed">
                                                <span className="text-yellow-400 animate-pulse">⚡</span> ¿Te gustó esta experiencia?
                                            </p>
                                            <a
                                                href={`https://wa.me/525512393853?text=${encodeURIComponent(`¡Hola! 👋 Vi la invitación digital de ${event.celebrant_name} y me pareció increíble la experiencia. Estoy organizando un evento y me gustaría que mis invitados reciban algo así de especial. ¿Me darías informes, por favor?`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 text-[13px] font-bold hover:text-blue-300 transition-colors duration-300 flex items-center gap-1 mt-1"
                                                style={{ textDecoration: 'underline', textDecorationStyle: 'solid', textUnderlineOffset: '4px' }}
                                            >
                                                Crea tu invitación. Clic Aquí 🚀
                                            </a>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Sticky RSVP FAB */}
                <AnimatePresence>
                    {stage === 'invitation' && !isRsvpInView && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring' }}
                            className="rsvp-fab"
                            style={{ backgroundColor: '#068451', color: '#fff' }}
                            onClick={scrollToRsvp}
                        >
                            ✅ Confirmar Asistencia
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ThemeEngine>
    );
}
