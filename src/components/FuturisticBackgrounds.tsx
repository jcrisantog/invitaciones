'use client';

import { motion } from 'framer-motion';
import { ThemeId } from '@/types';
import { useEffect, useState } from 'react';
import Ballpit from './Ballpit';


export function FuturisticBackgrounds({ themeId }: { themeId: ThemeId }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (themeId === 'unicorn') {
        return (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#fff0f3' }}>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/unicorn-rainbow/background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 z-10 opacity-70">
                    <Ballpit
                        count={20}
                        gravity={0.0}
                        friction={1.00}
                        wallBounce={0.70}
                        followCursor
                        colors={["#e629ff", "#f075d9", "#a205ad"]}
                    />
                </div>
            </div>
        );
    }

    if (themeId === 'cyber-neon') {
        return (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{
                backgroundColor: '#050505',
                backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.18) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}>
                {/* Horizontal scanner */}
                <motion.div
                    animate={{ y: ['-10vh', '110vh'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="absolute left-0 w-full"
                    style={{ height: '3px', backgroundColor: '#ff003c', boxShadow: '0 0 20px 5px rgba(255,0,60,0.5)', zIndex: 1 }}
                />
            </div>
        );
    }

    if (themeId === 'aurora-minimal') {
        return (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#020617' }}>
                <motion.div
                    animate={{
                        x: ['0%', '50%', '0%'],
                        y: ['0%', '20%', '0%'],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                    className="absolute rounded-full"
                    style={{
                        top: '-10%', left: '-10%', width: '300px', height: '300px',
                        background: 'radial-gradient(circle, rgba(147,51,234,0.6) 0%, rgba(147,51,234,0) 70%)', filter: 'blur(30px)'
                    }}
                />
                <motion.div
                    animate={{
                        x: ['0%', '-50%', '0%'],
                        y: ['0%', '30%', '0%'],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                    className="absolute rounded-full"
                    style={{
                        bottom: '-10%', right: '-10%', width: '250px', height: '250px',
                        background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(30px)'
                    }}
                />
            </div>
        );
    }

    if (themeId === 'stellar-dark') {
        const stars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 2
        }));

        return (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#040d21' }}>
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full"
                        style={{
                            backgroundColor: '#ffffff',
                            boxShadow: '0 0 8px 1px #ffffff',
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                        }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                            repeat: Infinity,
                            duration: star.duration,
                            ease: 'easeInOut',
                            delay: star.delay
                        }}
                    />
                ))}

                {/* Glowing Core */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    className="absolute"
                    style={{
                        top: '10%', left: '10%', right: '10%', height: '50vh',
                        background: 'radial-gradient(circle, rgba(30,58,138,0.5) 0%, rgba(30,58,138,0) 60%)', filter: 'blur(40px)'
                    }}
                />
            </div>
        );
    }

    if (themeId === 'gamer-neon') {
        return (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#0f0720' }}>
                {/* Generated Background Image Layer */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-screen"
                    style={{
                        backgroundImage: 'url(/gamer-neon/bg-pattern.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Pixel Rain Effect */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{
                                y: ['0vh', '100vh'],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{
                                duration: Math.random() * 5 + 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: 'linear'
                            }}
                            className="absolute w-1 h-1 bg-purple-500 shadow-[0_0_5px_#a855f7]"
                            style={{
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`orange-${i}`}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{
                                y: ['0vh', '100vh'],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{
                                duration: Math.random() * 6 + 4,
                                repeat: Infinity,
                                delay: Math.random() * 6,
                                ease: 'linear'
                            }}
                            className="absolute w-2 h-2 bg-orange-500 shadow-[0_0_8px_#f97316]"
                            style={{
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Orange Neon Glow */}
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                    className="absolute rounded-full"
                    style={{
                        top: '10%', right: '5%', width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0) 70%)', filter: 'blur(60px)'
                    }}
                />

                {/* Floating Purple Neon Glow */}
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -25, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 1 }}
                    className="absolute rounded-full"
                    style={{
                        bottom: '20%', left: '5%', width: '450px', height: '450px',
                        background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(147,51,234,0) 70%)', filter: 'blur(70px)'
                    }}
                />

                {/* Gaming Elements Pack overlay (floating) */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: 'url(/gamer-neon/elements.png)',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />

                {/* Cyber Scanlines/Grid overlay */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: 'linear-gradient(transparent 50%, rgba(255,255,255,0.5) 50%)',
                    backgroundSize: '100% 4px'
                }} />
            </div>
        );
    }



    if (themeId === 'butterfly') {
        return (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#05010a' }}>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/butterfly/background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Ballpit Effect (React Bits) */}
                <div className="absolute inset-0 z-10 opacity-60">
                    <Ballpit
                        count={20}
                        gravity={0.0}
                        friction={1.00}
                        wallBounce={0.70}
                        followCursor
                        colors={["#e629ff", "#f075d9", "#a205ad"]}
                    />
                </div>
            </div>
        );
    }

    if (themeId === 'spiderman') {
        return (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/spiderman/background.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-red-950/20" />
            </div>
        );
    }

    return null;
}
