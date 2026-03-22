'use client';

import { motion } from 'framer-motion';
import { ProgramItem } from '@/types';
import { Clock } from 'lucide-react';

export function ProgramSection({ items }: { items: ProgramItem[] }) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-title-container">
                <h2 className="theme-section-title mb-4">— Programa del Evento —</h2>
            </div>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="theme-card flex items-start gap-3">
                        <Clock size={16} className="theme-accent mt-1 flex-shrink-0" />
                        <div>
                            <span className="theme-accent font-bold text-sm mr-2">{item.time} - </span>
                            <span className="theme-text-primary text-sm">{item.activity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
