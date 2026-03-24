'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(212, 168, 67, 0.2)',
        color: '#f5e6c8',
        borderRadius: '0.75rem',
        padding: '0.85rem 1rem 0.85rem 2.75rem',
        fontSize: '1rem',
        width: '100%',
        outline: 'none',
        transition: 'all 0.3s ease',
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Fondo Decorativo */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(212, 168, 67, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(212, 168, 67, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    margin: '1rem',
                    padding: '2.5rem',
                    background: 'rgba(17, 17, 17, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 168, 67, 0.3)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        background: 'rgba(212, 168, 67, 0.1)',
                        borderRadius: '1rem',
                        marginBottom: '1rem',
                        color: '#d4a843'
                    }}>
                        <Sparkles size={32} />
                    </div>
                    <h1 style={{
                        color: '#d4a843',
                        fontFamily: 'serif',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        margin: 0
                    }}>Panel de Control</h1>
                    <p style={{ color: '#a08050', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Inicia sesión para gestionar tus eventos
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a08050' }} />
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a08050' }} />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{
                                color: '#ff6b6b',
                                fontSize: '0.85rem',
                                padding: '0.5rem 0',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            marginTop: '0.5rem',
                            background: '#d4a843',
                            color: '#0a0a0a',
                            border: 'none',
                            padding: '0.9rem',
                            borderRadius: '0.75rem',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontFamily: 'serif',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.7 : 1,
                            boxShadow: '0 4px 15px rgba(212, 168, 67, 0.3)'
                        }}
                    >
                        {loading ? 'Validando...' : 'Entrar al Panel'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: '#666', fontSize: '0.75rem' }}>
                        Magic Invitations &copy; 2025
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
