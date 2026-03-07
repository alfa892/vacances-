import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night px-6 text-center">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-ocean/80">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl text-ink md:text-7xl">
        Page introuvable
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base text-ink/60">
        Ce contenu n&apos;existe pas encore. Retourne a l&apos;itineraire principal.
      </p>
      <Link href="/" className="brutal-btn brutal-btn-primary mt-10">
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
