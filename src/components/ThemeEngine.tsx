'use client';

import { Theme } from '@/types';
import { useEffect } from 'react';
import { FuturisticBackgrounds } from './FuturisticBackgrounds';

interface ThemeEngineProps {
    theme: Theme;
    children: React.ReactNode;
}

export function ThemeEngine({ theme, children }: ThemeEngineProps) {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--bg-primary', theme.bgPrimary);
        root.style.setProperty('--bg-secondary', theme.bgSecondary);
        root.style.setProperty('--bg-card', theme.bgCard);
        root.style.setProperty('--text-primary', theme.textPrimary);
        root.style.setProperty('--text-secondary', theme.textSecondary);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--accent-secondary', theme.accentSecondary);
        root.style.setProperty('--font-title', theme.fontTitle);
        root.style.setProperty('--font-body', theme.fontBody);
        root.style.setProperty('--border-color', theme.borderColor);
    }, [theme]);

    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: theme.bgPrimary }}
        >
            {/* BACKGROUND LAYER - Absolute boundaries */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <FuturisticBackgrounds themeId={theme.id} />
            </div>

            {/* CONTENT LAYER - Keeps elements on top */}
            <div className="relative z-10 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
}
