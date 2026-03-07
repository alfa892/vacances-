export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-night">
      <div className="flex flex-col items-center gap-6">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-white/5" />
        <div className="h-6 w-72 animate-pulse rounded-lg bg-white/5" />
        <div className="mt-4 h-3 w-32 animate-pulse rounded-full bg-lime/10" />
      </div>
    </div>
  );
}
