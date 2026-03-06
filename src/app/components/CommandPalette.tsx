'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ExternalLink, MapPin, Search, X } from 'lucide-react';
import { SearchResult } from '@/app/api/data/types';
import { search, track } from '@/lib/api';

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const closePalette = useCallback(() => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
        setSelectedIndex(0);
        setLoading(false);
    }, []);

    const openPalette = useCallback((source: 'keyboard' | 'button') => {
        setIsOpen(true);
        track({ event: 'search_open', props: { source } });
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => {
                    const nextOpen = !open;
                    if (nextOpen) {
                        track({ event: 'search_open', props: { source: 'keyboard' } });
                    }
                    return nextOpen;
                });
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        let cancelled = false;

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const data = await search(query);
                if (cancelled) return;
                setResults(data);
                setSelectedIndex(0);

                if (data.length > 0) {
                    track({ event: 'search', props: { query, count: data.length } });
                }
            } catch (error) {
                if (cancelled) return;
                console.error('Search failed', error);
            } finally {
                if (cancelled) return;
                setLoading(false);
            }
        }, 250);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [query]);

    const handleSelect = useCallback((result: SearchResult) => {
        track({
            event: 'search_select',
            props: { resultId: result.id, kind: result.kind, title: result.title },
        });
        closePalette();

        if (result.kind === 'day') {
            const element = document.getElementById(result.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        if (result.kind === 'stop') {
            let element = document.getElementById(result.id);
            if (!element && result.dayId) {
                element = document.getElementById(result.dayId);
            }

            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }

        if (result.href) {
            window.open(result.href, '_blank', 'noopener,noreferrer');
        }
    }, [closePalette]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            if (results.length === 0) return;
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % results.length);
            return;
        }

        if (e.key === 'ArrowUp') {
            if (results.length === 0) return;
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + results.length) % results.length);
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            }
            return;
        }

        if (e.key === 'Escape') {
            closePalette();
        }
    }, [closePalette, handleSelect, results, selectedIndex]);

    return (
        <>
            <button
                type="button"
                onClick={() => openPalette('button')}
                className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full border border-lime/20 bg-jungle/85 px-4 py-3 text-sm font-medium text-white shadow-[0_20px_45px_rgba(2,44,34,0.35)] backdrop-blur-xl transition hover:scale-[1.02] hover:bg-jungle"
            >
                <Search className="h-4 w-4 text-lime" />
                <span>Recherche</span>
                <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/55 sm:inline-flex">
                    Cmd/Ctrl + K
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={closePalette}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink shadow-2xl"
                    >
                        <div className="border-b border-white/10 px-4 py-3 sm:px-5">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-lime/70">
                                        Recherche rapide
                                    </p>
                                    <p className="mt-1 text-sm text-white/55">
                                        Trouve une ville, une activite ou un lien utile.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closePalette}
                                    className="rounded-md p-1 transition-colors hover:bg-white/10"
                                >
                                    <X className="h-5 w-5 text-white/50" />
                                </button>
                            </div>

                            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">
                                <Search className="mr-3 h-5 w-5 text-white/45" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Exemple: Colombo, safari, train..."
                                    className="h-14 flex-1 bg-transparent text-base text-white placeholder:text-white/30 focus:outline-none"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {loading && (
                                <div className="py-10 text-center text-sm text-white/35">
                                    Recherche en cours...
                                </div>
                            )}

                            {!loading && results.length === 0 && query && (
                                <div className="py-10 text-center text-sm text-white/35">
                                    Aucun resultat trouve.
                                </div>
                            )}

                            {!loading && results.length === 0 && !query && (
                                <div className="px-3 py-8 text-center text-sm text-white/35">
                                    <p>Tape un mot simple. Exemple :</p>
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {['Colombo', 'Safari', 'Train', 'Plage'].map((hint) => (
                                            <button
                                                key={hint}
                                                type="button"
                                                onClick={() => setQuery(hint)}
                                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                                            >
                                                {hint}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results.map((result, index) => (
                                <button
                                    key={result.id}
                                    type="button"
                                    onClick={() => handleSelect(result)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition-colors ${index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${result.kind === 'day' ? 'bg-indigo-500/20 text-indigo-300' :
                                        result.kind === 'stop' ? 'bg-emerald-500/20 text-emerald-300' :
                                            'bg-lime/20 text-lime'
                                        }`}>
                                        {result.kind === 'day' && <Calendar size={16} />}
                                        {result.kind === 'stop' && <MapPin size={16} />}
                                        {result.kind === 'cta' && <ExternalLink size={16} />}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="truncate text-white">{result.title}</p>
                                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
                                                {result.kind}
                                            </span>
                                        </div>
                                        <p className="mt-1 truncate text-sm text-white/55">{result.subtitle}</p>
                                        {result.description && (
                                            <p className="mt-2 line-clamp-2 text-sm text-white/40">
                                                {result.description}
                                            </p>
                                        )}
                                    </div>

                                    {index === selectedIndex && (
                                        <ArrowRight size={16} className="mt-1 text-white/45" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                            <span>Navigation ↑ ↓</span>
                            <span>Ouvrir ↵</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
