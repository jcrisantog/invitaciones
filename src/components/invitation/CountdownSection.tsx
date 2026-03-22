'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownSectionProps {
    eventDate: string;
}

function getTimeLeft(targetDate: string) {
    const now = new Date().getTime();
    
    // Ajustar la fecha base a hora de México (UTC-6)
    let mxDateStr = targetDate;
    if (mxDateStr.endsWith('Z')) {
        mxDateStr = mxDateStr.replace('Z', '-06:00');
    } else if (mxDateStr.endsWith('+00:00')) {
        mxDateStr = mxDateStr.replace('+00:00', '-06:00');
    } else if (mxDateStr.includes('T') && !mxDateStr.match(/([-+]\d{2}:\d{2})$/)) {
        mxDateStr = `${mxDateStr}-06:00`;
    } else if (!mxDateStr.includes('T')) {
        mxDateStr = `${mxDateStr}T00:00:00-06:00`;
    }

    const target = new Date(mxDateStr).getTime();
    const diff = target - now;
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        passed: false,
    };
}

export function CountdownSection({ eventDate }: CountdownSectionProps) {
    const [time, setTime] = useState(getTimeLeft(eventDate));

    useEffect(() => {
        const interval = setInterval(() => setTime(getTimeLeft(eventDate)), 1000);
        return () => clearInterval(interval);
    }, [eventDate]);

    const boxes = [
        { value: time.days, label: 'Días' },
        { value: time.hours, label: 'Horas' },
        { value: time.minutes, label: 'Minutos' },
        { value: time.seconds, label: 'Segundos' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="theme-divider" />
            <div className="flex justify-center mb-4">
                <p className="theme-text-secondary text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    — Faltan —
                </p>
            </div>
            {time.passed ? (
                <p className="text-center theme-accent text-xl font-bold" style={{ fontFamily: 'var(--font-title)' }}>¡El evento ya comenzó!</p>
            ) : (
                <div className="flex gap-3 justify-center">
                    {boxes.map((box) => (
                        <div key={box.label} className="countdown-box">
                            <div className="countdown-number">{String(box.value).padStart(2, '0')}</div>
                            <div className="countdown-label">{box.label}</div>
                        </div>
                    ))}
                </div>
            )}
            <div className="theme-divider" />
        </motion.div>
    );
}
