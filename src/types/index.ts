export interface SectionVisibility {
    program: boolean;
    gallery: boolean;
    special_message: boolean;
    dress_code: boolean;
    gifts: boolean;
    music: boolean;
    confirmed_count: boolean;
}

export interface ProgramItem {
    time: string;
    activity: string;
}

export interface MusicUrls {
    spotify?: string;
    youtube?: string;
    background_music?: string;
}

export interface GiftRegistry {
    liverpool?: string;
    amazon?: string;
    bank_name?: string;
    bank_account?: string;
    bank_clabe?: string;
    bank_holder?: string;
}

export interface DressCode {
    recommended?: string;
    avoid?: string;
}

export interface Event {
    id: string;
    created_at: string;
    host_name: string;
    host_whatsapp: string;
    celebrant_name: string;
    event_date: string;
    location_name: string;
    location_url?: string;
    time_display?: string;
    special_message?: string;
    program: ProgramItem[];
    style_id: ThemeId;
    music_urls: MusicUrls;
    gift_registry: GiftRegistry;
    section_visibility: SectionVisibility;
    dress_code: DressCode;
    gallery_urls: string[];
    event_slug: string;
}

export interface Guest {
    id: string;
    created_at: string;
    event_id: string;
    name: string;
    unique_slug: string;
    confirmed: boolean;
    adults_count: number;
    kids_count: number;
    confirmed_at?: string;
}

export type ThemeId = 'gold-premium' | 'superhero' | 'princess' | 'unicorn' | 'kpop' | 'cyber-neon' | 'aurora-minimal' | 'stellar-dark' | 'gamer-neon' | 'butterfly' | 'spiderman' | 'goku-ultrainstinto';

export interface Theme {
    id: ThemeId;
    name: string;
    emoji: string;
    description: string;
    // CSS custom properties
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentSecondary: string;
    fontTitle: string;
    fontBody: string;
    borderColor: string;
    bgImage?: string;
}
