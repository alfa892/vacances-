import Image from "next/image";
import type { SignatureMoment } from "../lib/siteContent";

export function SignatureMoments({ moments }: { moments: SignatureMoment[] }) {
  return (
    <section id="moments" className="relative z-10 bg-night px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
            Temps forts
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">
            Les moments qui valent le detour
          </h2>
          <p className="mt-5 text-sm leading-7 text-ink/60 md:text-base">
            Quatre scenes du voyage, pour se projeter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {moments.map((moment) => (
            <article
              key={moment.title}
              className="brutal-card group relative min-h-[420px] overflow-hidden"
            >
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-night/10 via-night/40 to-night/90" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-lime/80">
                  {moment.eyebrow}
                </p>
                <h3 className="mt-4 max-w-lg font-serif text-3xl text-ink md:text-4xl">
                  {moment.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-ink/75 md:text-base">
                  {moment.description}
                </p>
                <div className="mt-6 inline-flex w-fit rounded-full border-2 border-lime/20 bg-lime/10 px-4 py-2 text-xs font-mono text-lime/80">
                  {moment.note}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
