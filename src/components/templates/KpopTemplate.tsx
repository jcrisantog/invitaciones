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

interface KpopTemplateProps {
    event: Event;
    guest: Guest;
    galleryUrls: string[];
    confirmedCount: number;
}

export function KpopTemplate({ event, guest, galleryUrls, confirmedCount }: KpopTemplateProps) {
    const [entered, setEntered] = useState(false);
    const [isRsvpInView, setIsRsvpInView] = useState(false);
    const theme = getTheme(event.style_id);
    const vis = event.section_visibility;

    const scrollToRsvp = () => {
        document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ThemeEngine theme={theme}>
            <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: theme.fontBody }}>

                <AnimatePresence mode="wait">
                    {!entered ? (
                        // --- WELCOME SCREEN ---
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 0.6 }}
                            className="min-h-screen flex flex-col items-center justify-start px-6 text-center relative z-10"
                        >
                            {/* AJUSTA ESTE ESPACIADOR PARA MOVER TODO EL TEXTO HACIA ABAJO O ARRIBA */}
                            <div className="h-15 w-full shrink-0" />

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="mb-2 px-6 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                            >
                                <p className="theme-text-primary text-[10px] uppercase tracking-[0.3em] font-bold" style={{ fontFamily: theme.fontTitle }}>
                                    Special Stage Guest
                                </p>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                                className="text-4xl font-black theme-accent mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                                style={{ fontFamily: theme.fontTitle, letterSpacing: '-1px' }}
                            >
                                {guest.name}
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '60px' }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-6"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="mb-8 p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
                            >
                                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Celebrating</p>
                                <p className="text-2xl font-bold theme-text-primary mb-0.5" style={{ fontFamily: theme.fontTitle }}>
                                    {event.celebrant_name}
                                </p>
                                <p className="theme-accent text-[10px] font-bold tracking-tighter">THE BIRTHDAY PERFORMANCE</p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251,191,36,0.6)' }}
                                whileTap={{ scale: 0.95 }}
                                className="theme-btn-primary text-lg px-10 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-t border-white/30"
                                onClick={() => setEntered(true)}
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                GET TICKETS ✨
                            </motion.button>
                        </motion.div>
                    ) : (
                        // --- MAIN INVITATION ---
                        <motion.div
                            key="invitation"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="pb-28 relative z-10"
                        >
                            {/* Header Title */}
                            <div className="py-20 px-6 text-center relative overflow-hidden bg-black/40 backdrop-blur-sm border-b border-white/10 shadow-2xl">
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.2 }}
                                    className="absolute left-4 top-4 font-black text-8xl pointer-events-none select-none text-white italic"
                                >
                                    STAY
                                </motion.div>
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 0.2 }}
                                    className="absolute right-4 bottom-4 font-black text-8xl pointer-events-none select-none text-white italic"
                                >
                                    GOLD
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 1, type: 'spring' }}
                                    className="text-6xl font-black theme-accent drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] mb-2"
                                    style={{ fontFamily: theme.fontTitle }}
                                >
                                    {event.celebrant_name}
                                </motion.h1>
                                <p className="theme-text-primary text-sm uppercase tracking-[0.4em] font-bold opacity-80">
                                    ✦ OFFICIAL SHOWCASE ✦
                                </p>
                            </div>

                            <div className="px-5 py-8 space-y-20 max-w-lg mx-auto">
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    .theme-card {
                                        background: rgba(26, 26, 46, 0.7) !important;
                                        backdrop-filter: blur(16px) saturate(180%) !important;
                                        -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
                                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                                        border-radius: 2rem !important;
                                        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
                                        position: relative;
                                        overflow: hidden;
                                    }
                                    .theme-card::before {
                                        content: "";
                                        position: absolute;
                                        top: 0; left: 0; right: 0; height: 1px;
                                        background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.5), transparent);
                                    }
                                    .theme-section-title {
                                        background: rgba(0,0,0,0.4) !important;
                                        backdrop-filter: blur(8px) !important;
                                        border: 1px solid ${theme.accent} !important;
                                        color: ${theme.accent} !important;
                                        border-radius: 9999px !important;
                                        padding: 0.4rem 1.5rem !important;
                                        font-size: 1.1rem !important;
                                        text-transform: uppercase !important;
                                        letter-spacing: 0.2em !important;
                                        box-shadow: 0 0 15px ${theme.accent}40 !important;
                                    }
                                    .countdown-box {
                                        background: rgba(255, 255, 255, 0.05) !important;
                                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                                        backdrop-filter: blur(4px) !important;
                                    }
                                `}} />

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
                                    <div className="max-w-xs w-full bg-black/60 backdrop-blur-md py-8 px-6 rounded-[2.5rem] border border-white/10 shadow-2xl text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <p className="theme-text-secondary text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
                                                ★ ¿Te gustó esta experiencia? ★
                                            </p>
                                            <a
                                                href={`https://wa.me/525512393853?text=${encodeURIComponent(`¡Hola! 👋 Vi la invitación digital de ${event.celebrant_name} y me pareció increíble la experiencia. Estoy organizando un evento y me gustaría que mis invitados reciban algo así de especial. ¿Me darías informes, por favor?`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="theme-accent text-[12px] font-black uppercase tracking-tighter hover:opacity-80 transition-opacity"
                                                style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
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
                    {entered && !isRsvpInView && (
                        <motion.button
                            initial={{ scale: 0, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: 100 }}
                            transition={{ type: 'spring', damping: 15 }}
                            className="fixed bottom-8 right-6 z-50 bg-[#068451] text-white px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(6,132,81,0.5)] border border-white/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-bold"
                            onClick={scrollToRsvp}
                        >
                            <span className="animate-pulse">●</span> Confirmar Asistencia
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ThemeEngine>
    );
}
