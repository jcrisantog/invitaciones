export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#0a0a0a', color: '#f5e6c8', fontFamily: 'serif' }}
    >
      <h1 style={{ fontSize: '2.5rem', color: '#d4a843', fontWeight: 900 }}>✨ Magic Invitations</h1>
      <p style={{ color: '#a08050', marginTop: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Plataforma de invitaciones digitales personalizadas
      </p>
      <a
        href="/admin"
        style={{
          background: '#d4a843',
          color: '#0a0a0a',
          fontWeight: 700,
          padding: '0.85rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        🎛️ Panel de Administración
      </a>
    </div>
  );
}
