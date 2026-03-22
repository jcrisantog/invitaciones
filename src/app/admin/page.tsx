'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import { db } from '@/lib/insforge';
import { ThemeId, ProgramItem, Event } from '@/types';
import { themes } from '@/lib/themes';
import { Upload, Plus, Trash2, Settings, Users, Palette, Sparkles, List, Edit2, Copy, Play } from 'lucide-react';

const SECTION_LABELS: Record<string, string> = {
    program: 'Programa del Evento',
    gallery: 'Galería de Imágenes',
    special_message: 'Mensaje Especial',
    dress_code: 'Código de Vestimenta',
    gifts: 'Mesa de Regalos',
    music: 'Música',
    confirmed_count: 'Personas Confirmadas',
};

const defaultVisibility = {
    program: true,
    gallery: true,
    special_message: true,
    dress_code: true,
    gifts: true,
    music: true,
    confirmed_count: true,
};

export default function AdminPage() {
    const [tab, setTab] = useState<'list' | 'event' | 'details' | 'guests' | 'style'>('list');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Dashboard / Lista de eventos
    const [eventsList, setEventsList] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(false);

    // Modo Edición
    const [editEventId, setEditEventId] = useState<string | null>(null);

    const [guests, setGuests] = useState<Array<{ name: string; unique_slug: string }>>([]);
    const [newGuest, setNewGuest] = useState('');
    const [selectedStyle, setSelectedStyle] = useState<ThemeId>('gold-premium');
    const [visibility, setVisibility] = useState(defaultVisibility);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Basicos
    const [eventForm, setEventForm] = useState({
        celebrant_name: '',
        host_name: '',
        host_whatsapp: '',
        event_date: '',
        time_display: '',
        location_name: '',
        location_url: '',
        event_slug: '',
        special_message: '',
    });

    // Detalles Adicionales
    const [program, setProgram] = useState<ProgramItem[]>([]);
    const [newProgramTime, setNewProgramTime] = useState('');
    const [newProgramActivity, setNewProgramActivity] = useState('');

    const [galleryUrlsText, setGalleryUrlsText] = useState('');

    const [dressCode, setDressCode] = useState({ recommended: '', avoid: '' });

    const [giftRegistry, setGiftRegistry] = useState({
        liverpool: '', amazon: '', bank_name: '', bank_holder: '', bank_account: '', bank_clabe: ''
    });

    const [musicUrls, setMusicUrls] = useState({ spotify: '', youtube: '' });

    useEffect(() => {
        if (tab === 'list') {
            fetchEvents();
        }
    }, [tab]);

    const fetchEvents = async () => {
        setLoadingEvents(true);
        const { data: events, error } = await db.from('events').select('*').order('created_at', { ascending: false });
        if (!error && events) setEventsList(events as Event[]);
        setLoadingEvents(false);
    };

    const generateSlug = (name: string) =>
        name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const resetForm = () => {
        setEditEventId(null);
        setEventForm({ celebrant_name: '', host_name: '', host_whatsapp: '', event_date: '', time_display: '', location_name: '', location_url: '', event_slug: '', special_message: '' });
        setProgram([]);
        setGalleryUrlsText('');
        setDressCode({ recommended: '', avoid: '' });
        setGiftRegistry({ liverpool: '', amazon: '', bank_name: '', bank_holder: '', bank_account: '', bank_clabe: '' });
        setMusicUrls({ spotify: '', youtube: '' });
        setGuests([]);
        setSelectedStyle('gold-premium');
        setVisibility(defaultVisibility);
    };

    const startNewEvent = () => {
        resetForm();
        setMessage('');
        setTab('event');
    };

    const editEvent = async (evt: Event) => {
        resetForm();
        setMessage('Cargando datos del evento...');

        setEditEventId(evt.id);
        setEventForm({
            celebrant_name: evt.celebrant_name || '',
            host_name: evt.host_name || '',
            host_whatsapp: evt.host_whatsapp || '',
            event_date: evt.event_date ? new Date(evt.event_date).toISOString().slice(0, 16) : '',
            time_display: evt.time_display || '',
            location_name: evt.location_name || '',
            location_url: evt.location_url || '',
            event_slug: evt.event_slug || '',
            special_message: evt.special_message || '',
        });

        setProgram(evt.program || []);
        setGalleryUrlsText((evt.gallery_urls || []).join('\n'));
        setDressCode({
            recommended: evt.dress_code?.recommended || '',
            avoid: evt.dress_code?.avoid || ''
        });
        setGiftRegistry({
            liverpool: evt.gift_registry?.liverpool || '',
            amazon: evt.gift_registry?.amazon || '',
            bank_name: evt.gift_registry?.bank_name || '',
            bank_holder: evt.gift_registry?.bank_holder || '',
            bank_account: evt.gift_registry?.bank_account || '',
            bank_clabe: evt.gift_registry?.bank_clabe || ''
        });
        setMusicUrls({
            spotify: evt.music_urls?.spotify || '',
            youtube: evt.music_urls?.youtube || ''
        });
        setSelectedStyle(evt.style_id || 'gold-premium');
        setVisibility(evt.section_visibility || defaultVisibility);

        // Fetch guests
        const { data: loadedGuests } = await db.from('guests').select('name, unique_slug').eq('event_id', evt.id);
        if (loadedGuests) setGuests(loadedGuests);

        setMessage('');
        setTab('event');
    };

    const deleteEvent = async (id: string, name: string) => {
        if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el evento de "${name}"? Esta acción borrará a todos los invitados registrados.`)) return;

        setMessage('Borrando invitados y evento...');
        await db.from('guests').delete().eq('event_id', id);
        const { error } = await db.from('events').delete().eq('id', id);

        if (error) {
            setMessage(`❌ Error al borrar: ${error.message}`);
        } else {
            setMessage(`✅ Evento de "${name}" borrado exitosamente.`);
            fetchEvents();
        }
        setTimeout(() => setMessage(''), 4000);
    };

    const addGuest = () => {
        if (!newGuest.trim()) return;
        const slug = generateSlug(newGuest.trim());
        setGuests(prev => [...prev, { name: newGuest.trim(), unique_slug: slug }]);
        setNewGuest('');
    };

    const addProgramItem = () => {
        if (!newProgramTime.trim() || !newProgramActivity.trim()) return;
        setProgram(prev => [...prev, { time: newProgramTime, activity: newProgramActivity }]);
        setNewProgramTime('');
        setNewProgramActivity('');
    };

    const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const data = new Uint8Array(ev.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json<{ nombre?: string; name?: string; Nombre?: string }>(sheet);
            const newGuests = rows.map(row => {
                const name = row.nombre || row.name || row.Nombre || '';
                return { name: String(name).trim(), unique_slug: generateSlug(String(name).trim()) };
            }).filter(g => g.name);
            setGuests(prev => {
                const existingNames = new Set(prev.map(p => p.unique_slug));
                const filtered = newGuests.filter(ng => !existingNames.has(ng.unique_slug));
                return [...prev, ...filtered];
            });
        };
        reader.readAsArrayBuffer(file);
    };

    const exportToExcel = (eventSlug: string) => {
        const baseUrl = window.location.origin;
        const rows = guests.map(g => ({
            Nombre: g.name,
            Liga: `${baseUrl}/i/${eventSlug}/${g.unique_slug}`,
            'Clave/ID Invitado': g.unique_slug
        }));
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Invitaciones Generadas');
        XLSX.writeFile(wb, `invitaciones_${eventSlug}.xlsx`);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setMessage('✅ Liga general de registro copiada al portapapeles');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSave = async () => {
        if (!eventForm.celebrant_name || !eventForm.event_date || !eventForm.event_slug || !eventForm.host_whatsapp) {
            setMessage('⚠️ Falta: Festejado/a, Fecha, WhatsApp del host o Slug.');
            return;
        }
        setSaving(true);
        try {
            const slug = generateSlug(eventForm.event_slug);
            const gallery_urls = galleryUrlsText.split('\n').map(u => u.trim()).filter(Boolean);

            const payload = {
                ...eventForm,
                event_slug: slug,
                style_id: selectedStyle,
                section_visibility: visibility,
                program: program,
                music_urls: musicUrls,
                gift_registry: giftRegistry,
                dress_code: dressCode,
                gallery_urls: gallery_urls
            };

            let eventId = editEventId;

            if (eventId) {
                // Modo Edición
                const { error: eventError } = await db.from('events').update(payload).eq('id', eventId);
                if (eventError) { setMessage(`❌ Error al actualizar: ${eventError.message}`); setSaving(false); return; }

                // Update guests: easiest way is to delete missing ones, and insert new ones.
                // But to preserve confirm status, it's safer to only insert new ones.
                // We'll delete all guests and reinsert them for simplicity unless they already exist?
                // Actually, deleting all guests would erase their confirmations!
                // So we only insert guests that don't exist by matching slugs.
                const { data: currentGuests } = await db.from('guests').select('unique_slug').eq('event_id', eventId);
                const existingSlugs = new Set((currentGuests || []).map(g => g.unique_slug));

                const newGuestsToInsert = guests.filter(g => !existingSlugs.has(g.unique_slug));
                const slugsToKeep = new Set(guests.map(g => g.unique_slug));
                const slugsToDelete = Array.from(existingSlugs).filter(s => !slugsToKeep.has(s));

                if (slugsToDelete.length > 0) {
                    await db.from('guests').delete().eq('event_id', eventId).in('unique_slug', slugsToDelete);
                }

                if (newGuestsToInsert.length > 0) {
                    const guestRows = newGuestsToInsert.map(g => ({ event_id: eventId, name: g.name, unique_slug: g.unique_slug }));
                    await db.from('guests').insert(guestRows);
                }

                setMessage(`✅ Evento "${eventForm.celebrant_name}" actualizado. ${newGuestsToInsert.length} invitados nuevos.`);
            } else {
                // Modo Creación
                const { data: eventData, error: eventError } = await db.from('events').insert([payload]).select();
                if (eventError) { setMessage(`❌ Error de evento: ${eventError.message}`); setSaving(false); return; }

                eventId = (eventData as Array<{ id: string }>)?.[0]?.id;

                // Fix: Force setEditEventId so subsequent saves map to 'update'
                setEditEventId(eventId);

                if (eventId && guests.length > 0) {
                    const guestRows = guests.map(g => ({ event_id: eventId, name: g.name, unique_slug: g.unique_slug }));
                    const { error: gError } = await db.from('guests').insert(guestRows);
                    if (gError) { setMessage(`⚠️ Evento creado, error en invitados: ${gError.message}`); setSaving(false); return; }
                }

                setMessage(`✅ Evento "${eventForm.celebrant_name}" creado exitosamente.`);
            }

            exportToExcel(slug);
        } catch (e: any) {
            setMessage(`❌ Excepción: ${e.message}`);
        } finally {
            setSaving(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        background: '#1a1a1a', border: '1px solid #3a2e1a', color: '#f5e6c8',
        borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '1rem',
        width: '100%', outline: 'none',
    };
    const labelStyle: React.CSSProperties = { color: '#a08050', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' };

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f5e6c8', fontFamily: 'sans-serif' }}>
            {/* Header */}
            <div style={{ background: '#111', borderBottom: '1px solid #3a2e1a', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#d4a843', fontFamily: 'serif' }}>✨ Magic Invitations</span>
                </div>
                <button
                    onClick={() => setTab('list')}
                    style={{ background: 'transparent', border: '1px solid #d4a843', color: '#d4a843', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', gap: '0.4rem', alignItems: 'center' }}
                >
                    <List size={16} /> Mis Eventos
                </button>
            </div>

            {message && (
                <div style={{ padding: '0.75rem', margin: '1rem 1rem 0', background: message.includes('❌') ? '#3a1a1a' : '#1a2e1a', border: `1px solid ${message.includes('❌') ? '#ff6b6b' : '#4ade80'}`, borderRadius: '0.5rem', textAlign: 'center', color: message.includes('❌') ? '#ff6b6b' : '#4ade80', fontSize: '0.9rem' }}>
                    {message}
                </div>
            )}

            {tab === 'list' ? (
                <div style={{ maxWidth: '850px', margin: '0 auto', padding: '2rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.75rem' }}>Mis Eventos Activos</h1>
                        <button onClick={startNewEvent} style={{ background: '#d4a843', color: '#0a0a0a', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={18} /> Crear Nuevo
                        </button>
                    </div>

                    {loadingEvents ? (
                        <p style={{ textAlign: 'center', color: '#a08050', padding: '2rem' }}>Cargando eventos...</p>
                    ) : eventsList.length === 0 ? (
                        <div style={{ background: '#1a1a1a', padding: '3rem', borderRadius: '1rem', textAlign: 'center', border: '1px dashed #3a2e1a' }}>
                            <p style={{ color: '#a08050', marginBottom: '1rem' }}>No tienes eventos creados aún.</p>
                            <button onClick={startNewEvent} className="theme-btn-primary">Empieza aquí</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {eventsList.map(evt => (
                                <div key={evt.id} style={{ background: '#1a1a1a', border: '1px solid #3a2e1a', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div>
                                            <h2 style={{ color: '#f5e6c8', fontSize: '1.25rem', fontFamily: 'serif' }}>Cumpleaños de {evt.celebrant_name}</h2>
                                            <p style={{ color: '#a08050', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                                                📅 {new Date(evt.event_date).toLocaleDateString()} &nbsp; | &nbsp; 🔗 /{evt.event_slug}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => editEvent(evt)} style={{ background: '#2a2a2a', color: '#d4a843', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                                <Edit2 size={16} /> Editar
                                            </button>
                                            <button onClick={() => deleteEvent(evt.id, evt.celebrant_name)} style={{ background: '#3a1a1a', color: '#ff6b6b', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                                <Trash2 size={16} /> Borrar
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <button onClick={() => copyToClipboard(`${window.location.origin}/i/${evt.event_slug}/general`)} style={{ background: 'transparent', border: '1px solid #a08050', color: '#f5e6c8', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                            <Copy size={14} /> Copiar URL General
                                        </button>
                                        <button onClick={() => exportToExcel(evt.event_slug)} style={{ background: '#111', border: '1px solid #d4a843', color: '#d4a843', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                            <Upload size={14} /> Re-Exportar Lista Invitados
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ maxWidth: '750px', margin: '0 auto', padding: '1.5rem 1rem' }}>
                    {/* Form Tabs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)', gap: '0.25rem', marginBottom: '1.5rem' }}>
                        {[
                            { key: 'event', label: 'Básico', icon: Settings },
                            { key: 'details', label: 'Detalles', icon: Sparkles },
                            { key: 'guests', label: 'Invitados', icon: Users },
                            { key: 'style', label: 'Estilo', icon: Palette },
                        ].map(t => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key as typeof tab)}
                                style={{
                                    padding: '0.75rem 0.25rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
                                    background: tab === t.key ? '#d4a843' : '#1a1a1a',
                                    color: tab === t.key ? '#0a0a0a' : '#a08050',
                                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem'
                                }}
                            >
                                <t.icon size={16} /> <span className="hidden sm:inline">{t.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form Contents (Reuse previous structure with minor tweaks) */}
                    {tab === 'event' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.25rem' }}>📋 Configuración Básica</h2>
                            {[
                                { key: 'celebrant_name', label: 'Nombre del Festejado/a *', placeholder: 'Ej: Carlitos' },
                                { key: 'host_name', label: 'Tu Nombre (Anfitrión)', placeholder: 'Ej: Mamá de Carlitos' },
                                { key: 'host_whatsapp', label: 'Tu WhatsApp (con código de país) *', placeholder: 'Ej: 521234567890' },
                                { key: 'event_date', label: 'Fecha y Hora del Evento *', placeholder: '', type: 'datetime-local' },
                                { key: 'time_display', label: 'Hora para mostrar (En caso de esconder horario real)', placeholder: 'Ej: 4:00 P.M.' },
                                { key: 'location_name', label: 'Lugar del Evento', placeholder: 'Ej: Salón Kidzplania, CDMX' },
                                { key: 'location_url', label: 'Link de Google Maps', placeholder: 'https://maps.google.com/...' },
                                { key: 'event_slug', label: 'Identificador del evento (URL) *', placeholder: 'Ej: cumple-carlitos' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label style={labelStyle}>{field.label}</label>
                                    <input
                                        type={(field as { type?: string }).type || 'text'}
                                        value={eventForm[field.key as keyof typeof eventForm]}
                                        onChange={e => setEventForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                                        placeholder={field.placeholder}
                                        style={inputStyle}
                                    />
                                </div>
                            ))}

                            <div>
                                <label style={labelStyle}>✉️ Mensaje Especial (Para los invitados)</label>
                                <textarea
                                    value={eventForm.special_message}
                                    onChange={e => setEventForm(prev => ({ ...prev, special_message: e.target.value }))}
                                    placeholder="Escribe un mensaje emotivo para tus invitados..."
                                    rows={3}
                                    style={{ ...inputStyle, resize: 'vertical' }}
                                />
                            </div>

                            <h3 style={{ color: '#d4a843', fontFamily: 'serif', marginTop: '1rem' }}>👁️ Visibilidad de Secciones Opcionales</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '0.5rem' }}>
                                {Object.entries(SECTION_LABELS).map(([key, label]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#1a1a1a', borderRadius: '0.5rem', padding: '0.75rem', cursor: 'pointer', border: '1px solid #3a2e1a' }}>
                                        <input
                                            type="checkbox"
                                            checked={visibility[key as keyof typeof visibility]}
                                            onChange={e => setVisibility(prev => ({ ...prev, [key]: e.target.checked }))}
                                            style={{ accentColor: '#d4a843', width: '16px', height: '16px', flexShrink: 0 }}
                                        />
                                        <span style={{ fontSize: '0.8rem', color: '#f5e6c8', wordBreak: 'break-word' }}>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Detalles Tab (same as before) */}
                    {tab === 'details' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.15rem' }}>⏱️ Programa de Actividades</h2>
                                <div style={{ background: '#1a1a1a', borderRadius: '0.5rem', padding: '1rem', border: '1px solid #3a2e1a', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <input value={newProgramTime} onChange={e => setNewProgramTime(e.target.value)} placeholder="Hora (ej. 4:00 PM)" style={{ ...inputStyle, flex: '1 1 100px' }} />
                                        <input value={newProgramActivity} onChange={e => setNewProgramActivity(e.target.value)} onKeyDown={e => e.key === 'Enter' && addProgramItem()} placeholder="Actividad (ej. Bienvenida)" style={{ ...inputStyle, flex: '2 1 150px' }} />
                                        <button onClick={addProgramItem} style={{ background: '#d4a843', color: '#0a0a0a', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', cursor: 'pointer', fontWeight: 700, flexShrink: 0 }}><Plus size={18} /></button>
                                    </div>
                                    {program.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '0.5rem 0' }}>
                                            <span><strong style={{ color: '#d4a843' }}>{item.time}</strong> - {item.activity}</span>
                                            <button onClick={() => setProgram(p => p.filter((_, idx) => idx !== i))} style={{ color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.15rem' }}>👗 Código de Vestimenta</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div>
                                        <label style={labelStyle}>Recomendado</label>
                                        <input value={dressCode.recommended} onChange={e => setDressCode(p => ({ ...p, recommended: e.target.value }))} placeholder="Ej: Ropa cómoda..." style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Evitar</label>
                                        <input value={dressCode.avoid} onChange={e => setDressCode(p => ({ ...p, avoid: e.target.value }))} placeholder="Ej: Tacones..." style={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.15rem' }}>🎁 Mesa de Regalos / Banco</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                                    <div>
                                        <label style={labelStyle}>Link Liverpool</label>
                                        <input value={giftRegistry.liverpool} onChange={e => setGiftRegistry(p => ({ ...p, liverpool: e.target.value }))} placeholder="https://..." style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Link Amazon</label>
                                        <input value={giftRegistry.amazon} onChange={e => setGiftRegistry(p => ({ ...p, amazon: e.target.value }))} placeholder="https://..." style={inputStyle} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '0.5rem' }}>
                                        <div><label style={labelStyle}>Banco</label><input value={giftRegistry.bank_name} onChange={e => setGiftRegistry(p => ({ ...p, bank_name: e.target.value }))} placeholder="Ej: BBVA" style={inputStyle} /></div>
                                        <div><label style={labelStyle}>Titular</label><input value={giftRegistry.bank_holder} onChange={e => setGiftRegistry(p => ({ ...p, bank_holder: e.target.value }))} placeholder="Ej: Juan Pérez" style={inputStyle} /></div>
                                        <div><label style={labelStyle}>Cuenta</label><input value={giftRegistry.bank_account} onChange={e => setGiftRegistry(p => ({ ...p, bank_account: e.target.value }))} style={inputStyle} /></div>
                                        <div><label style={labelStyle}>CLABE</label><input value={giftRegistry.bank_clabe} onChange={e => setGiftRegistry(p => ({ ...p, bank_clabe: e.target.value }))} style={inputStyle} /></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.15rem' }}>🎵 Música y Playlists</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div><label style={labelStyle}>Spotify</label><input value={musicUrls.spotify} onChange={e => setMusicUrls(p => ({ ...p, spotify: e.target.value }))} placeholder="https://..." style={inputStyle} /></div>
                                    <div><label style={labelStyle}>YouTube</label><input value={musicUrls.youtube} onChange={e => setMusicUrls(p => ({ ...p, youtube: e.target.value }))} placeholder="https://..." style={inputStyle} /></div>
                                </div>
                            </div>

                            <div>
                                <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.15rem' }}>🖼️ Galería (URLs de Fotos)</h2>
                                <label style={labelStyle}>Pega las URLs (una por línea)</label>
                                <textarea value={galleryUrlsText} onChange={e => setGalleryUrlsText(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', marginTop: '0.5rem' }} />
                            </div>
                        </motion.div>
                    )}

                    {tab === 'guests' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.25rem' }}>👥 Lista de Invitados</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input value={newGuest} onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGuest()} placeholder="Nombre del invitado..." style={{ ...inputStyle, flex: 1 }} />
                                <button onClick={addGuest} style={{ background: '#d4a843', color: '#0a0a0a', border: 'none', borderRadius: '0.5rem', padding: '0 1rem', cursor: 'pointer', fontWeight: 700 }}><Plus size={18} /></button>
                            </div>
                            <button onClick={() => fileInputRef.current?.click()} style={{ background: '#1a1a1a', border: '1px dashed #d4a843', color: '#d4a843', borderRadius: '0.5rem', padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <Upload size={18} /> Cargar Excel / CSV
                            </button>
                            <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleExcelUpload} style={{ display: 'none' }} />
                            <div style={{ maxHeight: '40vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {guests.map((g, i) => (
                                    <div key={i} style={{ background: '#1a1a1a', border: '1px solid #3a2e1a', borderRadius: '0.5rem', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>{g.name}</span>
                                        <button onClick={() => setGuests(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                {!guests.length && <p style={{ color: '#a08050', textAlign: 'center', padding: '2rem', fontSize: '0.9rem' }}>Aún no hay invitados. Agrégalos arriba o carga un Excel.</p>}
                            </div>
                            <p style={{ color: '#a08050', fontSize: '0.8rem', textAlign: 'center' }}>{guests.length} invitado(s) en lista</p>
                        </motion.div>
                    )}

                    {tab === 'style' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 style={{ color: '#d4a843', fontFamily: 'serif', fontSize: '1.25rem', marginBottom: '1rem' }}>🎨 Estilo de la Invitación</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {Object.values(themes).map(theme => (
                                    <button key={theme.id} onClick={() => setSelectedStyle(theme.id)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', background: selectedStyle === theme.id ? theme.accent + '22' : '#1a1a1a', border: `2px solid ${selectedStyle === theme.id ? theme.accent : '#3a2e1a'}`, cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.2s' }}>
                                        <span style={{ fontSize: '1.75rem' }}>{theme.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ color: theme.accent, fontWeight: 700, fontSize: '0.95rem' }}>{theme.name}</p>
                                            <p style={{ color: '#a08050', fontSize: '0.75rem', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{theme.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Save Button */}
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #3a2e1a', position: 'sticky', bottom: '1rem' }}>
                        <button
                            onClick={handleSave} disabled={saving}
                            style={{ width: '100%', background: '#d4a843', color: '#0a0a0a', border: 'none', borderRadius: '0.75rem', padding: '1rem', fontWeight: 700, fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'serif', opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                        >
                            {saving ? '⏳ Guardando...' : (editEventId ? '💾 Actualizar Evento y Lista' : '🚀 Crear Evento y Exportar Ligas')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
