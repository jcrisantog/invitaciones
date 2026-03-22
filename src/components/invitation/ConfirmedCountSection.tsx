'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function ConfirmedCountSection({ count }: { count: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
        >
            <div className="theme-card inline-block px-10 py-6 mx-auto">
                <Users size={32} className="theme-accent mx-auto mb-2" />
                <div className="countdown-number text-4xl">{count}</div>
                <p className="theme-text-secondary text-sm uppercase tracking-widest mt-1">Persona{count !== 1 ? 's' : ''} confirmada{count !== 1 ? 's' : ''}</p>
            </div>
        </motion.div>
    );
}
