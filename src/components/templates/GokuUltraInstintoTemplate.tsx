'use client';

import { useState } from 'react';
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
import { ImageSequenceBackground } from '@/components/ImageSequenceBackground';
import { BackgroundMusic } from '@/components/BackgroundMusic';

interface GokuUltraInstintoTemplateProps {
    event: Event;
    guest: Guest;
    galleryUrls: string[];
    confirmedCount: number;
}

export function GokuUltraInstintoTemplate({ event, guest, galleryUrls, confirmedCount }: GokuUltraInstintoTemplateProps) {
    const [entered, setEntered] = useState(false);
    const [isRsvpInView, setIsRsvpInView] = useState(false);
    const [audioStarted, setAudioStarted] = useState(false);
    const theme = getTheme(event.style_id);
    const vis = event.section_visibility;

    const scrollToRsvp = () => {
        document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <ThemeEngine theme={theme}>
            <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: theme.fontBody }}>
                {/* Background Video Sequence */}
                <ImageSequenceBackground 
                    folderPath="/goku-ultrainstinto" 
                    frameCount={70} 
                    fps={24} 
                />

                {/* Background Music Handler */}
                {event.music_urls.background_music && (
                    <BackgroundMusic 
                        url={event.music_urls.background_music} 
                        autoPlay={true} 
                        forcePlay={audioStarted}
                    />
                )}

                {/* Overlays to make text readable */}
                <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60 z-0" />
                <div className="fixed inset-0 pointer-events-none bg-blue-900/10 mix-blend-color z-0" />
                
                <AnimatePresence mode="wait">
                    {!entered ? (
                        // --- WELCOME SCREEN ---
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="mb-3 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-slate-300/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                <p className="text-slate-200 text-xs uppercase tracking-[0.3em] font-bold">
                                    EL PODER HA DESPERTADO PARA
                                </p>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase"
                                style={{ 
                                    fontFamily: theme.fontTitle, 
                                    letterSpacing: '2px',
                                    textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(165,189,248,0.5), 0 0 40px rgba(59,130,246,0.3)'
                                }}
                            >
                                {guest.name}
                            </motion.h1>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
                                className="w-24 h-24 rounded-full border-2 border-white/80 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center my-4 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-blue-400/20 animate-pulse rounded-full" />
                                <span className="text-4xl">🔥</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="mb-10 px-8 py-5 rounded-xl bg-black/50 backdrop-blur-md border border-slate-600/50 shadow-2xl relative"
                            >
                                {/* Esquinas de adorno tecnológico / sci-fi */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-300 rounded-tl-md"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-300 rounded-tr-md"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-300 rounded-bl-md"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-300 rounded-br-md"></div>

                                <p className="text-blue-200 text-lg uppercase tracking-widest font-bold" style={{ fontFamily: theme.fontTitle }}>
                                    ¡Mi Gran Celebración!
                                </p>
                                <p className="text-white text-3xl font-black mt-2 tracking-wider" style={{ fontFamily: theme.fontTitle, textShadow: '0 0 15px rgba(255,255,255,0.6)' }}>
                                    {event.celebrant_name}
                                </p>
                            </motion.div>
                            
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.7)' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-slate-200 to-white text-slate-900 border border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] text-xl uppercase tracking-widest px-10 py-4 font-black rounded-lg transition-all"
                                onClick={() => {
                                    setEntered(true);
                                    setAudioStarted(true);
                                }}
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                DESATAR EL KI
                            </motion.button>
                        </motion.div>
                    ) : (
                        // --- MAIN INVITATION ---
                        <motion.div
                            key="invitation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="pb-28 relative z-10"
                        >
                            {/* Header Title */}
                            <div className="bg-black/40 backdrop-blur-md border-b border-slate-400/30 py-16 px-6 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.8, type: 'spring' }}
                                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-blue-200 leading-tight"
                                    style={{ 
                                        fontFamily: theme.fontTitle, 
                                        letterSpacing: '4px',
                                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))'
                                    }}
                                >
                                    {event.celebrant_name}
                                </motion.h1>
                                <p className="text-white/80 font-bold text-sm uppercase tracking-[0.4em] mt-4 inline-block px-6 py-2 rounded-full border border-slate-500/30 bg-black/40 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                    Sobrepasa tus límites
                                </p>
                            </div>

                            <div className="px-5 py-8 space-y-12 max-w-lg mx-auto relative z-10">
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                  .theme-card {
                                    background: rgba(10, 15, 25, 0.75) !important;
                                    backdrop-filter: blur(12px) !important;
                                    -webkit-backdrop-filter: blur(12px) !important;
                                    border: 1px solid rgba(255,255,255,0.15) !important;
                                    border-top: 1px solid rgba(255,255,255,0.3) !important;
                                    border-radius: 16px;
                                    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1) !important;
                                    color: white;
                                  }
                                  .theme-card * {
                                    color: white;
                                  }
                                  .theme-card .text-slate-600, .theme-card .text-gray-600 {
                                    color: #cbd5e1 !important; /* Lighter text for contrast */
                                  }
                                  .theme-section-title {
                                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
                                    color: white;
                                    padding: 0.5rem 1.5rem;
                                    border: 1px solid rgba(255,255,255,0.2);
                                    border-left: 4px solid #fff;
                                    display: inline-block;
                                    backdrop-filter: blur(5px);
                                    border-radius: 4px;
                                    font-family: ${theme.fontTitle};
                                    letter-spacing: 3px;
                                    font-size: 1.5rem;
                                    text-transform: uppercase;
                                    text-shadow: 0 0 10px rgba(255,255,255,0.5);
                                  }
                                  .theme-title-container {
                                    text-align: center;
                                    margin-bottom: 2rem;
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
                                            className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-lg flex items-center justify-center gap-2 transform transition-all hover:-translate-y-1"
                                            style={{ fontFamily: theme.fontTitle }}
                                        >
                                            📍 Localizar el Ki
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
                                                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] mx-auto font-bold uppercase tracking-widest px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 transform transition-all"
                                                style={{ fontFamily: theme.fontTitle }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" /></svg>
                                                Mensaje de Sabiduría
                                            </button>
                                        )}
                                    />
                                )}
                                {vis.dress_code && (event.dress_code.recommended || event.dress_code.avoid) && <DressCodeSection dressCode={event.dress_code} />}
                                {vis.gifts && (event.gift_registry.liverpool || event.gift_registry.amazon || event.gift_registry.bank_account) && <GiftsSection registry={event.gift_registry} />}
                                
                                {vis.music && (event.music_urls.spotify || event.music_urls.youtube) && (
                                    <div className="relative">
                                        <MusicSection musicUrls={event.music_urls} />
                                    </div>
                                )}
                                
                                {vis.confirmed_count && <ConfirmedCountSection count={confirmedCount} />}

                                <div>
                                    <RsvpSection event={event} guest={guest} onInView={setIsRsvpInView} />
                                </div>

                                {/* Footer / Attribution */}
                                <footer className="mt-20 mb-10 px-4 w-full flex justify-center">
                                    <div className="max-w-xs w-full bg-black/60 backdrop-blur-lg py-6 px-6 rounded-xl border border-slate-700/50 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">
                                                Alcanza el siguiente nivel
                                            </p>
                                            <a
                                                href={`https://wa.me/525512393853?text=${encodeURIComponent(`¡Hola! 👋 Vi la invitación digital de ${event.celebrant_name} y me pareció increíble la experiencia. Estoy organizando un evento y me gustaría que mis invitados reciban algo así de especial. ¿Me darías informes, por favor?`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white font-bold hover:text-slate-300 transition-colors uppercase text-[11px] tracking-widest mt-1"
                                                style={{ textDecoration: 'underline' }}
                                            >
                                                Crea tu invitación aquí ⚡
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
                            className="fixed bottom-6 right-6 z-50 bg-white text-slate-900 px-6 py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] border border-slate-200 flex items-center justify-center gap-2 uppercase tracking-widest text-sm font-black"
                            onClick={scrollToRsvp}
                            style={{ fontFamily: theme.fontTitle }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            ¡Confirmar!
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </ThemeEngine>
    );
}
