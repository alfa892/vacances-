import { CarFront, TrainFront, Bike } from "lucide-react";
import type { PracticalResource } from "../lib/siteContent";

const ICONS = [CarFront, TrainFront, Bike];

export function PracticalResources({ resources }: { resources: PracticalResource[] }) {
  return (
    <section className="relative z-10 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
            Infos utiles
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Les trois pense-betes qui evitent les galeres
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/65 md:text-base">
            Ce sont des details, mais ce sont souvent eux qui font perdre du temps
            sur place si on ne les prepare pas.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = ICONS[index] ?? CarFront;
            return (
              <article
                key={resource.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/10 text-lime">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-white">{resource.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{resource.description}</p>

                <div className="mt-6 space-y-3">
                  {resource.points.map((point) => (
                    <p
                      key={point}
                      className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/72"
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
                    className="mt-6 inline-flex rounded-full border border-lime/20 bg-lime/10 px-4 py-2 text-sm text-lime transition hover:bg-lime/15"
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
