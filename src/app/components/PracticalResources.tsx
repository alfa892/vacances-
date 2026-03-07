import { CarFront, TrainFront, Bike } from "lucide-react";
import type { PracticalResource } from "../lib/siteContent";

const ICONS = [CarFront, TrainFront, Bike];

export function PracticalResources({ resources }: { resources: PracticalResource[] }) {
  return (
    <section className="relative z-10 bg-night px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-ink/60">
            Infos pratiques
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            3 trucs a savoir avant de partir
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = ICONS[index] ?? CarFront;
            return (
              <article key={resource.title} className="brutal-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean/20 text-ocean">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-ink">{resource.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/60">{resource.description}</p>

                <div className="mt-5 space-y-2">
                  {resource.points.map((point) => (
                    <p
                      key={point}
                      className="rounded-lg border-2 border-white/8 bg-white/3 px-4 py-3 text-sm text-ink/65"
                    >
                      {point}
                    </p>
                  ))}
                </div>

                {resource.href && resource.actionLabel ? (
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="brutal-btn brutal-btn-primary mt-5 text-xs"
                  >
                    {resource.actionLabel}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
