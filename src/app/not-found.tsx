export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900">
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-2 text-sm text-slate-600">
        Oups, ce contenu n&apos;existe pas encore. Retournez à l&apos;itinéraire principal.
      </p>
    </div>
  );
}
