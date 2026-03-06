import { Sparkles, TimerReset, WalletCards } from "lucide-react";
import type { TripMode } from "../lib/siteContent";

const ICONS = {
  smart: WalletCards,
  balanced: Sparkles,
  premium: TimerReset,
} as const;

export function TripModes({ modes }: { modes: TripMode[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {modes.map((mode) => {
        const Icon = ICONS[mode.id];
        return (
          <article
            key={mode.id}
            className={`rounded-[2rem] border p-6 backdrop-blur-xl ${
              mode.recommended
                ? "border-lime/30 bg-lime/10 shadow-[0_30px_90px_rgba(217,249,157,0.08)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/45">
                  {mode.badge}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-white">{mode.label}</h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lime">
                <Icon size={20} />
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/45">
                Budget vise
              </p>
              <p className="mt-2 text-xl text-white">{mode.budgetHint}</p>
              <p className="mt-2 text-sm text-white/60">{mode.vibe}</p>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/70">{mode.description}</p>

            <div className="mt-5 flex items-center gap-2 text-xs text-lime/80">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {mode.pace}
            </div>

            <div className="mt-6 space-y-3">
              {mode.bullets.map((bullet) => (
                <p key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72">
                  {bullet}
                </p>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
