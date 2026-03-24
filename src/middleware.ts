import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

// Definir rutas protegidas
const adminPath = '/admin';
const loginPath = '/admin/login';
const apiAuthPath = '/api/auth';

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const path = nextUrl.pathname;

    // 1. Evitar recursión en la página de login
    if (path === loginPath) return NextResponse.next();

// Proteger RUTAS de /admin O la raíz (/)
    if (path === '/' || path.startsWith(adminPath)) {
        const session = request.cookies.get('session')?.value;

        // Si es la raíz y HAY sesión -> ir directamente a /admin
        if (path === '/' && session) {
            const payload = await decrypt(session);
            if (payload) return NextResponse.redirect(new URL(adminPath, request.url));
        }

        // Si NO hay sesión y NO estamos en login -> ir a login
        if (!session && path !== loginPath) {
            return NextResponse.redirect(new URL(loginPath, request.url));
        }

        if (session) {
            const payload = await decrypt(session);
            if (!payload) {
                // Cookie inválida o expirada
                const response = NextResponse.redirect(new URL(loginPath, request.url));
                response.cookies.delete('session');
                return response;
            }
        }

        return NextResponse.next();
    }

    // Dejar pasar el resto de rutas (invitaciones públicas)
    return NextResponse.next();
}

// Configuración del Matcher
export const config = {
    matcher: [
        '/',
        '/admin/:path*',
    ],
};
