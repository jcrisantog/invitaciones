import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { InvitationPage } from '@/components/InvitationPage';
import { db } from '@/lib/insforge';
import { Event, Guest } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{ eventSlug: string; guestSlug: string }>;
}

async function getEventAndGuest(eventSlug: string, guestSlug: string) {
    const { data: events, error: eventError } = await db
        .from('events')
        .select('*')
        .eq('event_slug', eventSlug)
        .limit(1);

    if (eventError || !events?.length) return null;
    const event = events[0] as Event;

    const { data: guests, error: guestError } = await db
        .from('guests')
        .select('*')
        .eq('event_id', event.id)
        .eq('unique_slug', guestSlug)
        .limit(1);

    if (guestError || !guests?.length) return null;
    const guest = guests[0] as Guest;

    const { data: confirmedGuests } = await db
        .from('guests')
        .select('adults_count, kids_count')
        .eq('event_id', event.id)
        .eq('confirmed', true);

    const confirmedCount = (confirmedGuests || []).reduce(
        (sum: number, g: { adults_count: number; kids_count: number }) =>
            sum + (g.adults_count || 0) + (g.kids_count || 0),
        0
    );

    return { event, guest, confirmedCount };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { eventSlug, guestSlug } = await params;
    const result = await getEventAndGuest(eventSlug, guestSlug);
    if (!result) return { title: 'Invitación no encontrada' };
    return {
        title: `Invitación – Cumpleaños de ${result.event.celebrant_name}`,
        description: `Estás invitado al cumpleaños de ${result.event.celebrant_name}`,
    };
}

export default async function InvitationRoute({ params }: PageProps) {
    const { eventSlug, guestSlug } = await params;
    const result = await getEventAndGuest(eventSlug, guestSlug);
    if (!result) notFound();

    const { event, guest, confirmedCount } = result;
    const galleryUrls: string[] = event.gallery_urls || [];

    return (
        <InvitationPage
            event={event}
            guest={guest}
            galleryUrls={galleryUrls}
            confirmedCount={confirmedCount}
        />
    );
}
