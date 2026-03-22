'use client';

import { motion } from 'framer-motion';
import { GiftRegistry } from '@/types';
import { Gift, Banknote } from 'lucide-react';

export function GiftsSection({ registry }: { registry: GiftRegistry }) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Mesa de Regalos —</h2>
            </div>
            <div className="space-y-3">
                {(registry.liverpool || registry.amazon) && (
                    <div className="theme-card">
                        <p className="theme-text-secondary text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Gift size={14} /> Listas de Regalos
                        </p>
                        <div className="flex flex-col gap-2">
                            {registry.liverpool && (
                                <a href={registry.liverpool} target="_blank" rel="noopener noreferrer" className="theme-btn-primary text-sm" style={{ backgroundColor: '#e10098', color: '#ffffff' }}>
                                    🛍️ Liverpool
                                </a>
                            )}
                            {registry.amazon && (
                                <a href={registry.amazon} target="_blank" rel="noopener noreferrer" className="theme-btn-primary text-sm" style={{ backgroundColor: '#ff9900', color: '#000000' }}>
                                    📦 Amazon
                                </a>
                            )}
                        </div>
                    </div>
                )}
                {registry.bank_account && (
                    <div className="theme-card">
                        <p className="theme-text-secondary text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Banknote size={14} /> Transferencia Bancaria
                        </p>
                        {registry.bank_name && <p className="theme-text-secondary text-sm">Banco: <span className="theme-text-primary">{registry.bank_name}</span></p>}
                        {registry.bank_holder && <p className="theme-text-secondary text-sm">Titular: <span className="theme-text-primary">{registry.bank_holder}</span></p>}
                        {registry.bank_account && <p className="theme-text-secondary text-sm">Cuenta: <span className="theme-text-primary">{registry.bank_account}</span></p>}
                        {registry.bank_clabe && <p className="theme-text-secondary text-sm">CLABE: <span className="theme-text-primary">{registry.bank_clabe}</span></p>}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
