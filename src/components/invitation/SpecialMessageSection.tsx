'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

export function SpecialMessageSection({ message }: { message: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="theme-title-container">
                    <h2 className="theme-section-title mb-4">— Mensaje Especial —</h2>
                </div>
                <button type="button" onClick={() => setOpen(true)} className="theme-btn-secondary mx-auto">
                    <Mail size={18} /> Leer Mensaje
                </button>
            </motion.div>

            {open && (
                <div
                    className="fixed inset-0 z-[999999] flex flex-col items-center justify-center p-6 bg-black/95 pointer-events-auto"
                    onClick={() => setOpen(false)}
                    style={{ isolation: 'isolate', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
                >
                    <div
                        className="w-full max-w-sm relative z-50 transform-none scale-100"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="theme-card text-center shadow-2xl relative" style={{ backgroundColor: 'var(--bg-primary)', opacity: 1 }}>
                            <p className="theme-accent font-bold tracking-widest text-lg mb-4" style={{ fontFamily: 'var(--font-title)' }}>💌 PARA TI</p>
                            <p className="theme-text-primary leading-relaxed text-[1rem] whitespace-pre-wrap">{message}</p>
                            <button type="button" onClick={() => setOpen(false)} className="theme-btn-primary mt-8 w-full border border-current">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
