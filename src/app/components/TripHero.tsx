'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

type TripHeroProps = {
  title: string;
  subtitle: string;
  heroImage?: string;
  heroVideo?: string;
  prefersReducedMotion?: boolean;
  highlights?: string[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  totalBudget?: string;
  duration?: string;
};

export function TripHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  prefersReducedMotion = false,
  primaryAction,
  secondaryAction,
  totalBudget,
  duration,
}: TripHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const defaultVideo = 'https://cdn.coverr.co/videos/coverr-drone-shot-of-tropical-jungle-5256/1080p.mp4';
  const defaultImage = 'https://images.unsplash.com/photo-1526401485004-8ad6f57be0d7?auto=format&fit=crop&w=1600&q=80';

  return (
    <section ref={ref} className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-night">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          >
            <source src={heroVideo || defaultVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url('${heroImage || defaultImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/20 to-night" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 px-5 py-2 text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
            2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, ease: 'easeOut', delay: 0.4 }}
          className="mt-8 font-serif text-7xl leading-[0.9] tracking-tight text-ink md:text-9xl lg:text-[10rem]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-ink/60 md:text-xl"
        >
          {subtitle}
        </motion.p>

        {(totalBudget || duration) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 1 }}
            className="mt-10 flex items-center gap-6"
          >
            {duration && (
              <div className="brutal-card px-6 py-3 text-center">
                <p className="font-mono text-2xl font-bold text-lime">{duration}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/50">jours</p>
              </div>
            )}
            {totalBudget && (
              <div className="brutal-card px-6 py-3 text-center">
                <p className="font-mono text-2xl font-bold text-saffron">{totalBudget}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/50">par personne</p>
              </div>
            )}
          </motion.div>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 1.2 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            {primaryAction && (
              <a href={primaryAction.href} className="brutal-btn brutal-btn-primary">
                {primaryAction.label}
              </a>
            )}
            {secondaryAction && (
              <a href={secondaryAction.href} className="brutal-btn brutal-btn-secondary">
                {secondaryAction.label}
              </a>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-lime/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-lime/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
