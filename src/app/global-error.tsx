'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error for debugging (error is required by Next.js interface)
  console.error('Global error:', error);
  return (
    <html lang="fr">
      <body
        style={{
          backgroundColor: '#0a0a0a',
          color: '#f5f1e6',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#fb923c',
            }}
          >
            Erreur critique
          </p>
          <h1 style={{ marginTop: '1rem', fontSize: '2.5rem', fontFamily: 'serif' }}>
            Le site a rencontre un probleme
          </h1>
          <p
            style={{
              marginTop: '1.5rem',
              maxWidth: '28rem',
              color: 'rgba(245,241,230,0.6)',
            }}
          >
            Recharge la page. Si ca persiste, previens l&apos;organisateur.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '2.5rem',
              padding: '0.875rem 1.75rem',
              background: '#d9f99d',
              color: '#0a0a0a',
              border: '3px solid #0a0a0a',
              borderRadius: '9999px',
              boxShadow: '4px 4px 0px #0a0a0a',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Recharger
          </button>
        </div>
      </body>
    </html>
  );
}
