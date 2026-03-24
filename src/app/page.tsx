import { redirect } from 'next/navigation';

/**
 * Página de inicio pública.
 * Ahora redirige automáticamente al panel de administración.
 * La lógica detallada (login vs dashboard) la maneja el middleware.ts
 */
export default function RootPage() {
    redirect('/admin');
}
