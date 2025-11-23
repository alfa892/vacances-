'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { search, track } from '@/lib/api';
import { SearchResult } from '@/app/api/data/types';

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Search logic
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await search(query);
                setResults(data);
                setSelectedIndex(0);
                if (data.length > 0) {
                    track({ event: 'search', props: { query, count: data.length } });
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, [results, selectedIndex]);

    const handleSelect = (result: SearchResult) => {
        track({ event: 'search_select', props: { resultId: result.id, kind: result.kind, title: result.title } });
        setIsOpen(false);
        if (result.kind === 'day') {
            const element = document.getElementById(result.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (result.kind === 'stop') {
            // Try to find the stop or the day it belongs to
            // The API returns id for stop, but we might not have IDs on stops in DOM yet.
            // But we put IDs on DayCards.
            // If we can't find the stop ID, we might need to scroll to the day.
            // Ideally stops should have IDs too.
            // I added key={stop.id} in ScrollytellingSection, but not id={stop.id}.
            // I should add id={stop.id} to stops in ScrollytellingSection if I want precise scrolling.
            // For now, let's assume we scroll to the day if stop ID is not found, or just try stop ID.
            // Wait, the API result for stop has `dayId`.
            // Let's try to scroll to stop ID first, then day ID.

            let element = document.getElementById(result.id);
            if (!element && result.dayId) {
                element = document.getElementById(result.dayId);
            }

            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (result.href) {
                window.open(result.href, '_blank');
            }
        } else if (result.kind === 'cta') {
            if (result.href) {
                window.open(result.href, '_blank');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative w-full max-w-lg bg-ink border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="flex items-center px-4 border-b border-white/10">
                    <Search className="w-5 h-5 text-white/50 mr-3" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Rechercher une destination, une activité..."
                        className="flex-1 h-14 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors">
                        <X className="w-5 h-5 text-white/50" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {loading && (
                        <div className="py-8 text-center text-white/30 text-sm">Recherche en cours...</div>
                    )}

                    {!loading && results.length === 0 && query && (
                        <div className="py-8 text-center text-white/30 text-sm">Aucun résultat trouvé.</div>
                    )}

                    {!loading && results.length === 0 && !query && (
                        <div className="py-8 text-center text-white/30 text-sm">
                            Tapez pour rechercher...
                            <div className="mt-2 flex gap-2 justify-center">
                                <span className="px-2 py-1 rounded bg-white/5 text-xs border border-white/10">Colombo</span>
                                <span className="px-2 py-1 rounded bg-white/5 text-xs border border-white/10">Safari</span>
                                <span className="px-2 py-1 rounded bg-white/5 text-xs border border-white/10">Plage</span>
                            </div>
                        </div>
                    )}

                    {results.map((result, index) => (
                        <button
                            key={result.id}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-4 transition-colors ${index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${result.kind === 'day' ? 'bg-indigo-500/20 text-indigo-400' :
                                result.kind === 'stop' ? 'bg-emerald-500/20 text-emerald-400' :
                                    'bg-lime/20 text-lime'
                                }`}>
                                {result.kind === 'day' && <Calendar size={16} />}
                                {result.kind === 'stop' && <MapPin size={16} />}
                                {result.kind === 'cta' && <ExternalLink size={16} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="text-white font-medium truncate">{result.title}</div>
                                {result.description && (
                                    <div className="text-white/50 text-xs truncate">{result.description}</div>
                                )}
                            </div>

                            {index === selectedIndex && (
                                <ArrowRight size={16} className="text-white/50" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono uppercase tracking-wider">
                    <span>Navigation <kbd className="bg-white/10 px-1 rounded">↑</kbd> <kbd className="bg-white/10 px-1 rounded">↓</kbd></span>
                    <span>Ouvrir <kbd className="bg-white/10 px-1 rounded">↵</kbd></span>
                </div>
            </motion.div>
        </div>
    );
}
