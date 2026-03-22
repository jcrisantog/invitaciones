import { createClient } from '@insforge/sdk';

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
});

// El SDK de Insforge usa client.database.from() — exportamos db como alias directo
export const insforge = client;
export const db = client.database;
