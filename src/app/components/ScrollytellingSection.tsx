'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, isValidElement, cloneElement, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StoryDay } from '../api/data/types';
import { HoverPreviewLink, PreviewImageContext } from './HoverPreviewLink';
import { RouteLink } from './RouteLink';
import clsx from 'clsx';

const RouteMap = dynamic(() => import('./RouteMap').then((mod) => mod.RouteMap), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.18),transparent_45%),linear-gradient(180deg,rgba(2,44,34,0.95),rgba(2,44,34,0.85))] px-6 text-center text-sm text-white/60">
            Chargement du parcours...
        </div>
    ),
});

type LegacyItineraryItem = {
    day: string;
    city: string;
    time: string;
    plan: React.ReactNode;
    price: string;
    note?: boolean;
};

type ScrollytellingSectionProps = {
    days?: StoryDay[];
    itinerary?: LegacyItineraryItem[];
    prefersReducedMotion?: boolean;
};

const expandCities = (value: string) =>
    value
        .split('→')
        .map((part) => part.trim())
        .filter(Boolean);

export function ScrollytellingSection({ days, itinerary, prefersReducedMotion = false }: ScrollytellingSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeContext, setActiveContext] = useState<{ day: string; city: string } | null>(null);
    const hasStoryDays = Array.isArray(days) && days.length > 0;

    const groupedLegacy = useMemo(() => {
        if (!itinerary || itinerary.length === 0) return [];
        const groups: Record<string, LegacyItineraryItem[]> = {};
        itinerary.forEach((item) => {
            if (!groups[item.day]) groups[item.day] = [];
            groups[item.day].push(item);
        });
        return Object.entries(groups).map(([day, items]) => ({ day, items }));
    }, [itinerary]);

    return (
        <div ref={containerRef} className="relative min-h-screen">
            {/* Fixed Map Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-jungle/5 z-10 pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-0 z-0">
                    <RouteMap
                        activeDay={activeContext?.day}
                        activeCity={activeContext?.city}
                        prefersReducedMotion={prefersReducedMotion}
                    />
                </div>
                {/* Vignette & Grain - Subtle */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,44,34,0.3)_100%)]" />
            </div>

            {/* Scrollable Content Overlay */}
            <div className="relative z-30 max-w-5xl mx-auto px-6 py-24 pointer-events-none">
                <div className="flex flex-col gap-[40vh]">
                    {hasStoryDays
                        ? days!.map((day) => (
                            <DayCard
                                key={day.id}
                                id={day.id}
                                day={day}
                                onActive={(city) => {
                                    setActiveContext({ day: day.label.split('—')[0].trim(), city });
                                }}
                            />
                        ))
                        : groupedLegacy.map((group) => (
                            <DayCardLegacy
                                key={group.day}
                                day={group.day}
                                items={group.items}
                                onActive={(city) => setActiveContext({ day: group.day, city })}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

function DayCard({ day, id, onActive }: { day: StoryDay, id: string, onActive: (city: string) => void }) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const setPreview = useCallback((src: string | null) => {
        setActiveImage((prev) => (prev === src ? prev : src));
    }, []);
    const dayCities = day.cities;
    const primaryCity = dayCities[0] ?? '';

    return (
        <PreviewImageContext.Provider value={setPreview}>
            <motion.div
                id={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto w-full"
                onViewportEnter={() => onActive(primaryCity)}
            >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-jungle/80 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 group">
                    {/* Dynamic Background Image */}
                    <AnimatePresence>
                        {activeImage && (
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-0"
                            >
                                <Image
                                    src={activeImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 960px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-jungle/40 via-jungle/15 to-transparent" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12 transition-colors duration-500">
                        {/* Gradient backing for text readability when image is active - Bottom heavy */}
                        <div className={clsx(
                            "absolute inset-0 z-[-1] transition-opacity duration-500",
                            activeImage ? "opacity-100 bg-gradient-to-t from-jungle/35 via-jungle/15 to-transparent" : "opacity-0"
                        )} />

                        <div className="flex items-baseline justify-between mb-8 border-b border-white/20 pb-6">
                            <h3 className="text-3xl md:text-5xl font-serif text-white drop-shadow-lg">{day.label}</h3>
                            {dayCities.length > 0 && (
                                <span className="text-xs font-mono text-lime uppercase tracking-widest border border-lime/40 px-3 py-1 rounded-full bg-lime/10 backdrop-blur-md shadow-lg">
                                    {dayCities.join(' → ')}
                                </span>
                            )}
                        </div>

                        <div className="space-y-8">
                            {day.stops.map((stop) => (
                                <div
                                    key={stop.id}
                                    id={stop.id}
                                    className="group/item flex flex-col md:flex-row gap-4 md:gap-8 items-start"
                                >
                                    <div className="w-24 shrink-0 pt-1">
                                        <span className="font-mono text-sm text-white/80 font-bold drop-shadow-md">{stop.time}</span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-xl md:text-2xl font-medium text-white group-hover/item:text-lime transition-colors drop-shadow-md">
                                            {stop.media && stop.media.length > 0 ? (
                                            <HoverPreviewLink
                                                label={stop.title}
                                                href={stop.href}
                                                subtitle={stop.description}
                                                images={stop.media}
                                                onImageHover={setPreview}
                                            />
                                            ) : stop.href ? (
                                                <div className="flex flex-col gap-1">
                                                    <RouteLink label={stop.title} href={stop.href} />
                                                    {stop.description && <span className="text-sm text-white/70">{stop.description}</span>}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1">
                                                    <span>{stop.title}</span>
                                                    {stop.description && <span className="text-sm text-white/70">{stop.description}</span>}
                                                </div>
                                            )}
                                        </div>

                                        {stop.price && (
                                            <div className="mt-2 flex items-center gap-2 text-sm font-mono text-lime font-bold drop-shadow-md">
                                                <span className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(217,249,157,0.8)]" />
                                                {stop.price}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </PreviewImageContext.Provider>
    );
}

function DayCardLegacy({ day, items, onActive }: { day: string; items: LegacyItineraryItem[]; onActive: (city: string) => void }) {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const setPreview = useCallback((src: string | null) => {
        setActiveImage((prev) => (prev === src ? prev : src));
    }, []);
    const dayCities = Array.from(new Set(items.flatMap((item) => expandCities(item.city))));
    const primaryCity = dayCities[0] ?? items[0]?.city ?? '';

    return (
        <PreviewImageContext.Provider value={setPreview}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="pointer-events-auto w-full"
                onViewportEnter={() => onActive(primaryCity)}
            >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-jungle/80 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 group">
                    <AnimatePresence>
                        {activeImage && (
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-0"
                            >
                                <Image
                                    src={activeImage}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 960px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-jungle/20 via-jungle/10 to-transparent" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative z-10 p-8 md:p-12 transition-colors duration-500">
                        <div className={clsx(
                            "absolute inset-0 z-[-1] transition-opacity duration-500",
                            activeImage ? "opacity-100 bg-jungle/15" : "opacity-0"
                        )} />

                        <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-6">
                            <h3 className="text-3xl md:text-5xl font-serif text-white drop-shadow-lg">{day}</h3>
                            <span className="text-xs font-mono text-lime uppercase tracking-widest border border-lime/40 px-3 py-1 rounded-full bg-lime/10">
                                {dayCities.join(' → ')}
                            </span>
                        </div>

                        <div className="space-y-8">
                            {items.map((item, i) => {
                                type PlanWithImages = { images?: { src: string }[]; onImageHover?: (src: string | null) => void };
                                const planElement = isValidElement(item.plan) ? item.plan as React.ReactElement<PlanWithImages> : null;
                                const previewSrc = planElement?.props?.images?.[0]?.src;
                                const handleEnter = () => {
                                    if (previewSrc) {
                                        setPreview(previewSrc);
                                    }
                                };
                                const handleLeave = () => setPreview(null);

                                return (
                                    <div
                                        key={`${day}-${i}`}
                                        className="group/item flex flex-col md:flex-row gap-4 md:gap-8 items-start"
                                        onMouseEnter={handleEnter}
                                        onMouseLeave={handleLeave}
                                        onFocus={handleEnter}
                                        onBlur={handleLeave}
                                    >
                                        <div className="w-24 shrink-0 pt-1">
                                            <span className="font-mono text-sm text-white/80">{item.time}</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="text-xl md:text-2xl font-medium text-white/90 group-hover/item:text-lime transition-colors">
                                                {planElement
                                                    ? cloneElement(planElement, {
                                                        onImageHover: (src: string | null) => setPreview(src),
                                                    })
                                                    : item.plan}
                                            </div>

                                            {item.price && (
                                                <div className="mt-2 flex items-center gap-2 text-xs font-mono text-lime/80">
                                                    <span className="w-1 h-1 rounded-full bg-lime" />
                                                    {item.price}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </PreviewImageContext.Provider>
    );
}
