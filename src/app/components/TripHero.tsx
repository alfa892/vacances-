"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

type HeroBadge = {
  label: string;
  icon?: ReactNode;
};

type HeroCTA = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type TripHeroProps = {
  title: string;
  subtitle: string;
  badges?: HeroBadge[];
  videoSrc?: string;
  posterSrc: string;
  ctas: ReadonlyArray<HeroCTA>;
};

export function TripHero({ title, subtitle, badges = [], videoSrc, posterSrc, ctas }: TripHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-label="Présentation du voyage">
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt="Paysage du Sri Lanka"
          fill
          sizes="100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-24 pt-32 sm:px-10 sm:pb-32">
        {badges.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex flex-wrap items-center gap-3"
          >
            {badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur"
              >
                {badge.icon ? <span aria-hidden>{badge.icon}</span> : null}
                {badge.label}
              </span>
            ))}
          </motion.div>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 text-lg text-white/85 sm:text-xl">{subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="flex flex-col items-start gap-3 sm:flex-row"
        >
          {ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={clsx(
                "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                cta.variant === "secondary"
                  ? "border border-white/60 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/60"
                  : "bg-saffron text-ink hover:bg-saffron/90 focus-visible:ring-saffron/80"
              )}
            >
              {cta.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
