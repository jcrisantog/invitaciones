'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types';
import { MapPin, Clock, Calendar, Gamepad2, Map, Timer } from 'lucide-react';

interface EventInfoSectionProps {
    event: Event;
    themeId?: string;
}

export function EventInfoSection({ event, themeId }: EventInfoSectionProps) {
    const rawDate = new Date(event.event_date).toLocaleDateString('es-MX', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    // "Sábado, 30 de Mayo de 2026" — capitalizar día y mes, "de" en minúscula
    const formattedDate = rawDate.replace(/\b\w+/g, (word) =>
        word.toLowerCase() === 'de' ? 'de' : word.charAt(0).toUpperCase() + word.slice(1)
    );

    const calendarUrl = () => {
        // Asegurar que la fecha se interprete en hora de México (UTC-6)
        let dateStr = event.event_date;
        if (dateStr.endsWith('Z')) {
            dateStr = dateStr.replace('Z', '-06:00');
        } else if (dateStr.endsWith('+00:00')) {
            dateStr = dateStr.replace('+00:00', '-06:00');
        } else if (dateStr.includes('T') && !dateStr.match(/([-+]\d{2}:\d{2})$/)) {
            dateStr = `${dateStr}-06:00`;
        } else if (!dateStr.includes('T')) {
            dateStr = `${dateStr}T00:00:00-06:00`;
        }

        const startDate = new Date(dateStr);
        const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

        // Formatear a YYYYMMDDTHHmmssZ (Google Calendar espera UTC)
        const toGCalFormat = (d: Date) =>
            d.toISOString().replace(/-|:|\.\d{3}/g, '');

        const title = encodeURIComponent(`Cumpleaños de ${event.celebrant_name}`);
        const location = encodeURIComponent(event.location_name);
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${toGCalFormat(startDate)}/${toGCalFormat(endDate)}&location=${location}`;
    };

    const mapsUrl = event.location_url || `https://maps.google.com/?q=${encodeURIComponent(event.location_name)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
        >
            <div className="theme-card flex items-center gap-3">
                {themeId === 'gamer-neon' ? (
                    <Gamepad2 size={24} className="theme-accent flex-shrink-0" />
                ) : (
                    <Calendar size={20} className="theme-accent flex-shrink-0" />
                )}
                <div>
                    <p className="theme-text-secondary text-xs uppercase tracking-wider">Fecha</p>
                    <p className="theme-text-primary font-semibold">{formattedDate}</p>
                </div>
            </div>
            <div className="theme-card flex items-center gap-3">
                {themeId === 'gamer-neon' ? (
                    <Map size={24} className="theme-accent flex-shrink-0" />
                ) : (
                    <MapPin size={20} className="theme-accent flex-shrink-0" />
                )}
                <div>
                    <p className="theme-text-secondary text-xs uppercase tracking-wider">Lugar</p>
                    <p className="theme-text-primary font-semibold">{event.location_name}</p>
                </div>
            </div>
            {event.time_display && (
                <div className="theme-card flex items-center gap-3">
                    {themeId === 'gamer-neon' ? (
                        <Timer size={24} className="theme-accent flex-shrink-0" />
                    ) : (
                        <Clock size={20} className="theme-accent flex-shrink-0" />
                    )}
                    <div>
                        <p className="theme-text-secondary text-xs uppercase tracking-wider">Hora</p>
                        <p className="theme-text-primary font-semibold">{event.time_display}</p>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 mt-4">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="theme-btn-primary text-sm" style={{ fontFamily: 'var(--font-title)', backgroundColor: '#87278C', color: '#ffffff' }}>
                    📍 Cómo Llegar
                </a>
                <a href={calendarUrl()} target="_blank" rel="noopener noreferrer" className="theme-btn-secondary text-sm">
                    📅 Calendario
                </a>
            </div>
        </motion.div>
    );
}
