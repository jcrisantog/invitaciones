'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Event, Guest } from '@/types';
import { CheckCircle, Send, User, Users } from 'lucide-react';

interface RsvpSectionProps {
    event: Event;
    guest: Guest;
    onInView?: (inView: boolean) => void;
}

export function RsvpSection({ event, guest, onInView }: RsvpSectionProps) {
    const [name, setName] = useState(guest.name);
    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);
    const [sent, setSent] = useState(false);

    const handleConfirm = async () => {
        // Guardar confirmación en la base de datos
        try {
            await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guestId: guest.id,
                    name: name.trim(),
                    adults,
                    kids,
                }),
            });
        } catch (err) {
            console.error('Error saving RSVP:', err);
        }

        // Abrir WhatsApp con el mensaje
        const eventDate = new Date(event.event_date).toLocaleDateString('es-MX', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        });
        const message = `¡Hola! Soy ${name} y confirmo mi asistencia al cumpleaños de ${event.celebrant_name} 🎉\n\nAsistiremos: ${adults} adulto${adults !== 1 ? 's' : ''} y ${kids} niño${kids !== 1 ? 's' : ''}\n\n¡Nos vemos el ${eventDate}!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = event.host_whatsapp.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        setSent(true);
    };

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!onInView) return;
        const observer = new IntersectionObserver(([entry]) => {
            onInView(entry.isIntersecting);
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [onInView]);

    return (
        <motion.div
            id="rsvp-section"
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-8 relative z-10"
        >
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Confirmar Asistencia —</h2>
            </div>
            <div className="theme-card space-y-4">
                {sent ? (
                    <div className="text-center py-6">
                        <CheckCircle size={48} className="theme-accent mx-auto mb-3" />
                        <p className="theme-text-primary font-bold text-lg" style={{ fontFamily: 'var(--font-title)' }}>¡Gracias por confirmar!</p>
                        <p className="theme-text-secondary text-sm mt-1">Te esperamos con mucho gusto 🎉</p>
                        <button onClick={() => setSent(false)} className="theme-btn-secondary mt-4 text-sm">Modificar confirmación</button>
                    </div>
                ) : (
                    <>
                        <div>
                            <label className="theme-text-secondary text-xs uppercase tracking-wider block mb-1 flex items-center gap-1">
                                <User size={12} /> Tu Nombre
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Escribe tu nombre"
                                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                                style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '1.1rem',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Selector de Adultos */}
                            <div>
                                <label className="theme-text-secondary text-[10px] uppercase tracking-wider block mb-2 flex items-center gap-1 opacity-70">
                                    <Users size={12} /> Adultos
                                </label>
                                <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] p-1">
                                    <button
                                        onClick={() => setAdults(prev => Math.max(0, prev - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-90 transition-transform text-2xl font-light theme-text-primary"
                                    >—</button>
                                    <span className="flex-1 text-center font-bold text-xl theme-text-primary">{adults}</span>
                                    <button
                                        onClick={() => setAdults(prev => Math.min(5, prev + 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-90 transition-transform text-2xl font-light theme-text-primary"
                                    >+</button>
                                </div>
                            </div>

                            {/* Selector de Niños */}
                            <div>
                                <label className="theme-text-secondary text-[10px] uppercase tracking-wider block mb-2 flex items-center gap-1 opacity-70">
                                    🧒 Niños
                                </label>
                                <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] p-1">
                                    <button
                                        onClick={() => setKids(prev => Math.max(0, prev - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-90 transition-transform text-2xl font-light theme-text-primary"
                                    >—</button>
                                    <span className="flex-1 text-center font-bold text-xl theme-text-primary">{kids}</span>
                                    <button
                                        onClick={() => setKids(prev => Math.min(5, prev + 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 active:scale-90 transition-transform text-2xl font-light theme-text-primary"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleConfirm}
                            disabled={!name.trim()}
                            className="theme-btn-primary w-full disabled:opacity-50"
                            style={{ fontFamily: 'var(--font-title)', backgroundColor: '#068451', color: '#ffffff' }}
                        >
                            <Send size={18} /> Confirmar por WhatsApp
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}
