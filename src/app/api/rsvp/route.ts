import { db } from '@/lib/insforge';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { guestId, name, adults, kids } = await req.json();

        if (!guestId) {
            return NextResponse.json({ error: 'guestId is required' }, { status: 400 });
        }

        const { error } = await db
            .from('guests')
            .update({
                confirmed: true,
                name: name || undefined,
                adults_count: adults ?? 0,
                kids_count: kids ?? 0,
                confirmed_at: new Date().toISOString(),
            })
            .eq('id', guestId);

        if (error) {
            console.error('[RSVP] Update error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[RSVP] Unexpected error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
