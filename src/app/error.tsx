'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-saffron/80">
        Erreur
      </p>
      <h1 className="mt-4 font-serif text-5xl text-ink md:text-7xl">
        Oups, quelque chose a plante
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base text-ink/60">
        Pas de panique, ca arrive. Essaie de recharger la page.
      </p>
      <button onClick={reset} className="brutal-btn brutal-btn-primary mt-10">
        Reessayer
      </button>
    </div>
  );
}
