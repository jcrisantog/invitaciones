'use client';

import { Event, Guest } from '@/types';
import { GoldPremiumTemplate } from '@/components/templates/GoldPremiumTemplate';
import { SuperheroTemplate } from '@/components/templates/SuperheroTemplate';
import { PrincessTemplate } from '@/components/templates/PrincessTemplate';
import { UnicornTemplate } from '@/components/templates/UnicornTemplate';
import { KpopTemplate } from '@/components/templates/KpopTemplate';
import { CyberNeonTemplate } from '@/components/templates/CyberNeonTemplate';
import { AuroraMinimalTemplate } from '@/components/templates/AuroraMinimalTemplate';
import { StellarDarkTemplate } from '@/components/templates/StellarDarkTemplate';
import { GamerNeonTemplate } from '@/components/templates/GamerNeonTemplate';
import { ButterflyTemplate } from '@/components/templates/ButterflyTemplate';
import { SpidermanTemplate } from '@/components/templates/SpidermanTemplate';
import { GokuUltraInstintoTemplate } from '@/components/templates/GokuUltraInstintoTemplate';

export interface InvitationPageProps {
    event: Event;
    guest: Guest;
    galleryUrls: string[];
    confirmedCount: number;
}

export function InvitationPage(props: InvitationPageProps) {
    const { event } = props;

    // Factory/Router pattern: Render the specific template based on the event style
    switch (event.style_id) {
        case 'gold-premium':
            return <GoldPremiumTemplate {...props} />;
        case 'superhero':
            return <SuperheroTemplate {...props} />;
        case 'princess':
            return <PrincessTemplate {...props} />;
        case 'unicorn':
            return <UnicornTemplate {...props} />;
        case 'kpop':
            return <KpopTemplate {...props} />;
        case 'cyber-neon':
            return <CyberNeonTemplate {...props} />;
        case 'aurora-minimal':
            return <AuroraMinimalTemplate {...props} />;
        case 'stellar-dark':
            return <StellarDarkTemplate {...props} />;
        case 'gamer-neon':
            return <GamerNeonTemplate {...props} />;
        case 'butterfly':
            return <ButterflyTemplate {...props} />;
        case 'spiderman':
            return <SpidermanTemplate {...props} />;
        case 'goku-ultrainstinto':
            return <GokuUltraInstintoTemplate {...props} />;
        default:
            // Fallback
            return <GoldPremiumTemplate {...props} />;
    }
}
