import { NextResponse } from 'next/server';
import { encrypt, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const envUsername = (process.env.ADMIN_USERNAME || '').replace(/['"]/g, '').trim();
        let envHash = (process.env.ADMIN_PASSWORD_HASH || '').replace(/['"]/g, '').trim();
        const envHashHex = (process.env.ADMIN_PASSWORD_HASH_HEX || '').replace(/['"]/g, '').trim();

        // prioritized HEX loading
        if (envHashHex) {
            try {
                const decoded = Buffer.from(envHashHex, 'hex').toString('utf-8');
                if (decoded.startsWith('$')) envHash = decoded;
            } catch (e) {}
        } else if (envHash.length > 30 && !envHash.startsWith('$')) {
            try {
                const decoded = Buffer.from(envHash, 'base64').toString('utf-8');
                if (decoded.startsWith('$')) envHash = decoded;
            } catch (e) {}
        }

        // Generic error if env is misconfigured
        if (!envUsername || !envHash) {
            return NextResponse.json({ error: 'Falla técnica del servidor' }, { status: 500 });
        }

        // Secure credential validation
        if (username !== envUsername || !(await verifyPassword(password, envHash))) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        // 3. Generar Sesión (JWT)
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        const session = await encrypt({ user: username, expiresAt });

        // 4. Establecer Cookie segura
        const response = NextResponse.json({ message: 'Login exitoso' });
        
        response.cookies.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
