'use client';

import { useState, useEffect } from 'react';
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
import LiquidEther from '@/components/LiquidEther';

interface SpidermanTemplateProps {
    event: Event;
    guest: Guest;
    galleryUrls: string[];
    confirmedCount: number;
}

export function SpidermanTemplate({ event, guest, galleryUrls, confirmedCount }: SpidermanTemplateProps) {
    const [entered, setEntered] = useState(false);
    const [isRsvpInView, setIsRsvpInView] = useState(false);
    const theme = getTheme(event.style_id);
    const vis = event.section_visibility;

    const scrollToRsvp = () => {
        document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ThemeEngine theme={theme}>
            <div className="min-h-screen relative" style={{ fontFamily: theme.fontBody }}>
                {/* Background is handled by ThemeEngine globally or we can add specific overlay here */}
                <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-blue-900/30 to-red-900/10 mix-blend-multiply z-10" />
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
                    <LiquidEther
                        mouseForce={20}
                        cursorSize={100}
                        isViscous
                        viscous={30}
                        colors={["#101cbc", "#d62921", "#2563ea"]}
                        autoDemo
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        isBounce={false}
                        resolution={0.5}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {!entered ? (
                        // --- WELCOME SCREEN ---
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="mb-3 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            >
                                <p className="text-white text-[10px] uppercase tracking-widest font-bold">
                                    INVITACIÓN CLASIFICADA PARA
                                </p>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, type: 'spring', bounce: 0.6 }}
                                className="text-4xl font-bold text-white mb-6 px-6 py-2 rounded-xl bg-red-600/80 backdrop-blur-md border border-red-400 shadow-[2px_4px_0px_rgba(0,0,0,0.5)] transform -skew-x-6"
                                style={{ fontFamily: theme.fontTitle, letterSpacing: '2px' }}
                            >
                                {guest.name}
                            </motion.h1>

                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.8, type: 'spring' }}
                                className="w-24 h-24 rounded-full border-4 border-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)] flex items-center justify-center my-6"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-spider">
                                    <path d="M2 13 L6 11 L10 13" />
                                    <path d="M22 13 L18 11 L14 13" />
                                    <path d="M4 8 L8 9 L10 7" />
                                    <path d="M20 8 L16 9 L14 7" />
                                    <circle cx="12" cy="14" r="3" />
                                    <circle cx="12" cy="8" r="2" />
                                    <path d="M12 17 v5" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="mb-8 px-6 py-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl"
                            >
                                <p className="text-gray-300 text-lg uppercase tracking-wide" style={{ fontFamily: theme.fontTitle }}>
                                    ¡Mi Fiesta Aracnida!
                                </p>
                                <p className="theme-text-primary text-2xl font-bold mt-1" style={{ fontFamily: theme.fontTitle }}>
                                    <strong className="text-red-500">{event.celebrant_name}</strong>
                                </p>
                            </motion.div>
                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-red-600 hover:bg-red-500 text-white border-2 border-slate-900 shadow-[4px_6px_0px_rgba(0,0,0,0.5)] text-2xl uppercase tracking-wider px-10 py-3 font-bold rounded-lg transform transition-all"
                                onClick={() => setEntered(true)}
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                ENTRAR A LA ACCIÓN
                            </motion.button>
                        </motion.div>
                    ) : (
                        // --- MAIN INVITATION ---
                        <motion.div
                            key="invitation"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
                            className="pb-28 relative z-10"
                        >
                            {/* Header Title */}
                            <div className="bg-red-600/90 backdrop-blur-sm border-b-4 border-blue-600 py-12 px-6 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                                    <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                                        <circle cx="12" cy="14" r="3" />
                                        <circle cx="12" cy="8" r="2" />
                                    </svg>
                                </div>
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                                    transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
                                    className="text-6xl font-black text-white leading-tight drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)]"
                                    style={{ fontFamily: theme.fontTitle, letterSpacing: '4px' }}
                                >
                                    {event.celebrant_name}
                                </motion.h1>
                                <p className="text-blue-100 font-bold text-sm uppercase tracking-[0.3em] mt-3 font-serif bg-black/30 inline-block px-4 py-1 rounded-full border border-blue-400">
                                    ¡Es hora de la acción!
                                </p>
                            </div>

                            <div className="px-5 py-8 space-y-12 max-w-lg mx-auto">
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                  .theme-card {
                                    background: rgba(15, 23, 42, 0.85) !important;
                                    border: 2px solid ${theme.accent} !important;
                                    border-radius: 12px;
                                    box-shadow: 4px 4px 0px rgba(0,0,0,1) !important;
                                    transform: skewX(-2deg);
                                  }
                                  .theme-card > * {
                                    transform: skewX(2deg);
                                  }
                                  .theme-section-title {
                                    background: ${theme.accentSecondary};
                                    color: white;
                                    padding: 0.5rem 1rem;
                                    border: 2px solid #000;
                                    display: inline-block;
                                    transform: rotate(-2deg);
                                    box-shadow: 3px 3px 0px rgba(0,0,0,1);
                                    font-family: ${theme.fontTitle};
                                    letter-spacing: 2px;
                                    font-size: 1.5rem;
                                  }
                                  .theme-title-container {
                                    text-align: center;
                                    margin-bottom: 1.5rem;
                                  }
                                `}} />

                                <CountdownSection eventDate={event.event_date} />
                                <EventInfoSection
                                    event={event}
                                    themeId={event.style_id}
                                    renderMapsButton={(url) => (
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-red-600 hover:bg-red-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] font-bold text-sm tracking-wide px-4 py-2 rounded-lg flex items-center justify-center gap-2 transform transition-all hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_rgba(0,0,0,0.5)]"
                                            style={{ fontFamily: 'Bangers, serif' }}
                                        >
                                            📍 Cómo Llegar
                                        </a>
                                    )}
                                />

                                {vis.program && event.program.length > 0 && <ProgramSection items={event.program} />}
                                {vis.gallery && galleryUrls.length > 0 && <GallerySection urls={galleryUrls} celebrantName={event.celebrant_name} />}
                                {vis.special_message && event.special_message && (
                                    <SpecialMessageSection
                                        message={event.special_message}
                                        renderButton={(onClick) => (
                                            <button
                                                type="button"
                                                onClick={onClick}
                                                className="bg-red-600 hover:bg-red-500 text-white border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] mx-auto font-bold uppercase tracking-wider px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 transform transition-all hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.5)]"
                                                style={{ fontFamily: 'Arial, sans-serif' }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" /></svg>
                                                Leer Mensaje Clasificado
                                            </button>
                                        )}
                                    />
                                )}
                                {vis.dress_code && (event.dress_code.recommended || event.dress_code.avoid) && <DressCodeSection dressCode={event.dress_code} />}
                                {vis.gifts && (event.gift_registry.liverpool || event.gift_registry.amazon || event.gift_registry.bank_account) && <GiftsSection registry={event.gift_registry} />}
                                {vis.music && (event.music_urls.spotify || event.music_urls.youtube) && <MusicSection musicUrls={event.music_urls} />}
                                {vis.confirmed_count && <ConfirmedCountSection count={confirmedCount} />}

                                <div className="rsvp-spiderman">
                                    <RsvpSection event={event} guest={guest} onInView={setIsRsvpInView} />
                                </div>

                                {/* Footer / Attribution */}
                                <footer className="mt-20 mb-10 px-4 w-full flex justify-center">
                                    <div className="max-w-xs w-full bg-slate-900/90 backdrop-blur-md py-6 px-6 rounded-xl border-t-4 border-blue-600 shadow-2xl text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-bold">
                                                Un evento espectacular
                                            </p>
                                            <a
                                                href={`https://wa.me/525512393853?text=${encodeURIComponent(`¡Hola! 👋 Vi la invitación digital de ${event.celebrant_name} y me pareció increíble la experiencia. Estoy organizando un evento y me gustaría que mis invitados reciban algo así de especial. ¿Me darías informes, por favor?`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-500 font-bold hover:text-red-400 transition-colors uppercase text-[12px] tracking-wide"
                                                style={{ textDecoration: 'underline' }}
                                            >
                                                Crea tu invitación aquí 🕷️
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
                    {entered && !isRsvpInView && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0, x: 100 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-6 py-4 rounded-full shadow-[0_10px_20px_rgba(220,38,38,0.5)] border-2 border-white flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-bold"
                            onClick={scrollToRsvp}
                            style={{ fontFamily: theme.fontTitle }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            Confirmar!
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ThemeEngine>
    );
}
