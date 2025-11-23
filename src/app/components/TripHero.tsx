'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';

type TripHeroProps = {
  title: string;
  subtitle: string;
  heroImage?: string;
  heroVideo?: string;
  prefersReducedMotion?: boolean;
};

export function TripHero({ title, subtitle, heroImage, heroVideo, prefersReducedMotion = false }: TripHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const defaultVideo = "https://cdn.coverr.co/videos/coverr-drone-shot-of-tropical-jungle-5256/1080p.mp4";
  const defaultImage = "https://images.unsplash.com/photo-1526401485004-8ad6f57be0d7?auto=format&fit=crop&w=1600&q=80";

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-jungle">
      {/* Video Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          >
            <source src={heroVideo || defaultVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
            style={{ backgroundImage: `url('${heroImage || defaultImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-jungle/30 via-transparent to-jungle" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 border border-lime/20 bg-jungle/40 rounded-full text-lime text-xs font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_15px_rgba(217,249,157,0.1)]">
              Edition 2026 — The Roadtrip
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.5 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-ink leading-[0.85] tracking-tight drop-shadow-2xl mix-blend-lighten"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "120px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-lime to-transparent mx-auto my-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 1 }}
            className="text-lg md:text-2xl text-ink/80 font-light tracking-wide max-w-2xl mx-auto font-sans"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: prefersReducedMotion ? 0 : 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-lime/60 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-24 bg-gradient-to-b from-lime/50 to-transparent" />
      </motion.div>
    </div>
  );
}
