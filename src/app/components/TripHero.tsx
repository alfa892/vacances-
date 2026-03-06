'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

type TripHeroProps = {
  title: string;
  subtitle: string;
  heroImage?: string;
  heroVideo?: string;
  prefersReducedMotion?: boolean;
  highlights?: string[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export function TripHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  prefersReducedMotion = false,
  highlights = [],
  primaryAction,
  secondaryAction,
}: TripHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const defaultVideo = 'https://cdn.coverr.co/videos/coverr-drone-shot-of-tropical-jungle-5256/1080p.mp4';
  const defaultImage = 'https://images.unsplash.com/photo-1526401485004-8ad6f57be0d7?auto=format&fit=crop&w=1600&q=80';

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-jungle">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          >
            <source src={heroVideo || defaultVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
            style={{ backgroundImage: `url('${heroImage || defaultImage}')` }}
          />
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,249,157,0.12),transparent_30%),linear-gradient(180deg,rgba(2,44,34,0.25),rgba(2,44,34,0.85))]" />
        <div className="absolute inset-0 bg-noise opacity-60" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/20 bg-jungle/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-lime shadow-[0_0_15px_rgba(217,249,157,0.1)] backdrop-blur-md">
            <Sparkles size={14} />
            Edition 2026 - The Roadtrip
          </span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.45 }}
            className="mt-8 font-serif text-6xl leading-[0.85] tracking-tight text-ink drop-shadow-2xl md:text-8xl lg:text-9xl"
          >
            {title}
          </motion.h1>

          <div className="mx-auto my-10 h-px w-32 bg-gradient-to-r from-transparent via-lime to-transparent" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="mx-auto max-w-3xl text-lg font-light tracking-wide text-ink/80 md:text-2xl"
          >
            {subtitle}
          </motion.p>

          {highlights.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-jungle transition hover:scale-[1.02]"
                >
                  {primaryAction.label}
                  <ArrowRight size={16} />
                </a>
              )}
              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {secondaryAction.label}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.3, duration: prefersReducedMotion ? 0 : 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-lime/60"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
        <div className="h-24 w-px bg-gradient-to-b from-lime/50 to-transparent" />
      </motion.div>
    </section>
  );
}
