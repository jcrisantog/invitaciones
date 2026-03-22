'use client';

import { motion } from 'framer-motion';
import { DressCode } from '@/types';
import { Check, X } from 'lucide-react';

export function DressCodeSection({ dressCode }: { dressCode: DressCode }) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Código de Vestimenta —</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {dressCode.recommended && (
                    <div className="theme-card border-green-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Check size={16} className="text-green-400" />
                            <p className="text-green-400 text-xs uppercase tracking-wider font-bold">Recomendado</p>
                        </div>
                        <p className="theme-text-primary text-sm">{dressCode.recommended}</p>
                    </div>
                )}
                {dressCode.avoid && (
                    <div className="theme-card border-red-900">
                        <div className="flex items-center gap-2 mb-2">
                            <X size={16} className="text-red-400" />
                            <p className="text-red-400 text-xs uppercase tracking-wider font-bold">Evitar</p>
                        </div>
                        <p className="theme-text-primary text-sm">{dressCode.avoid}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
