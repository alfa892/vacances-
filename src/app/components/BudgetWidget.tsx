'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Bus, FileText, Plane, Ticket, Users, Utensils, Wallet } from 'lucide-react';
import clsx from 'clsx';
import type { BudgetResponse } from '../api/data/types';
import { tripModes, type TripModeId } from '../lib/siteContent';

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
    vols: { icon: Plane, color: 'bg-ocean' },
    logement: { icon: Bed, color: 'bg-indigo-400' },
    activites: { icon: Ticket, color: 'bg-saffron' },
    repas: { icon: Utensils, color: 'bg-emerald-400' },
    transport: { icon: Bus, color: 'bg-orange-400' },
    visa: { icon: FileText, color: 'bg-slate-400' },
    divers: { icon: Wallet, color: 'bg-pink-400' },
};

const COMFORT_LIMIT = 2000;

export function BudgetWidget({ budget }: { budget: BudgetResponse }) {
    const [scope, setScope] = useState<'person' | 'group'>('person');
    const [mode, setMode] = useState<TripModeId>('balanced');

    const activeMode = tripModes.find((item) => item.id === mode) ?? tripModes[1];

    const scenario = useMemo(() => {
        const lines = budget.perPerson.map((line) => {
            const delta = activeMode.adjustments[line.category] ?? 0;
            return {
                ...line,
                amount: Math.max(0, line.amount + delta),
            };
        });

        const totalPerPerson = lines.reduce((sum, line) => sum + line.amount, 0);
        const margin = COMFORT_LIMIT - totalPerPerson;

        return {
            lines,
            totalPerPerson,
            totalGroup: totalPerPerson * budget.groupSize,
            margin,
        };
    }, [activeMode, budget.groupSize, budget.perPerson]);

    const displayTotal = scope === 'person' ? scenario.totalPerPerson : scenario.totalGroup;
    const maxLineAmount = Math.max(...scenario.lines.map((line) => line.amount), COMFORT_LIMIT / 4);

    return (
        <div className="brutal-card relative w-full p-6 md:p-10">
            <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.28em] text-lime/75">
                            Budget vivant
                        </p>
                        <h3 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
                            Choisis le niveau de confort
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-ink/50">
                            On peut montrer au groupe trois versions tres claires:
                            plus malin, equilibre, ou plus premium.
                        </p>
                    </div>

                    <div className="inline-flex rounded-full border-2 border-white/10 bg-night p-1">
                        <button
                            type="button"
                            onClick={() => setScope('person')}
                            className={`rounded-full px-4 py-2 text-sm font-mono transition ${scope === 'person' ? 'bg-lime text-night font-bold' : 'text-ink/60'}`}
                        >
                            1 personne
                        </button>
                        <button
                            type="button"
                            onClick={() => setScope('group')}
                            className={`rounded-full px-4 py-2 text-sm font-mono transition ${scope === 'group' ? 'bg-lime text-night font-bold' : 'text-ink/60'}`}
                        >
                            Groupe x{budget.groupSize}
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-3">
                    {tripModes.map((tripMode) => (
                        <button
                            key={tripMode.id}
                            type="button"
                            onClick={() => setMode(tripMode.id)}
                            className={`rounded-xl border-2 p-4 text-left transition ${tripMode.id === mode ? 'border-lime/40 bg-lime/10' : 'border-white/8 bg-white/3 hover:bg-white/5'}`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-ink">{tripMode.label}</p>
                                    <p className="mt-1 text-xs text-ink/40">{tripMode.badge}</p>
                                </div>
                                {tripMode.recommended && (
                                    <span className="brutal-card-lime rounded-full px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] !border-2 !shadow-[2px_2px_0px_#0a0a0a]">
                                        Recommande
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-lg text-ink">{tripMode.budgetHint}</p>
                            <p className="mt-2 text-sm leading-6 text-ink/50">{tripMode.description}</p>
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-5">
                        {scenario.lines.map((line, index) => {
                            const config = CATEGORY_CONFIG[line.category] || CATEGORY_CONFIG.divers;
                            const Icon = config.icon;
                            const amount = scope === 'person' ? line.amount : line.amount * budget.groupSize;

                            return (
                                <div key={line.label} className="flex items-center gap-4">
                                    <div className={clsx('flex h-11 w-11 items-center justify-center rounded-xl border-2 border-night text-night shadow-[2px_2px_0px_#0a0a0a]', config.color)}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-baseline justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-ink">{line.label}</p>
                                                <p className="text-xs text-ink/40">{line.note}</p>
                                            </div>
                                            <span className="font-mono text-lime">
                                                {amount.toLocaleString('fr-FR')} EUR
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-night">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(line.amount / maxLineAmount) * 100}%` }}
                                                transition={{ duration: 0.7, delay: index * 0.05 }}
                                                className={clsx('h-full rounded-full', config.color)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="brutal-card p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-lime/70">
                            Lecture rapide
                        </p>
                        <div className="mt-5 rounded-xl border-2 border-white/8 bg-white/3 p-5">
                            <p className="text-sm text-ink/50">Total estime</p>
                            <p className="mt-2 font-serif text-5xl text-ink">
                                {displayTotal.toLocaleString('fr-FR')} EUR
                            </p>
                            <p className="mt-3 text-sm text-ink/50">
                                {scope === 'person' ? 'Par personne' : `Pour ${budget.groupSize} personnes`}
                            </p>
                        </div>

                        <div className="mt-4 rounded-xl border-2 border-white/8 bg-white/3 p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime">
                                    {scope === 'group' ? <Users size={18} /> : <Wallet size={18} />}
                                </div>
                                <div>
                                    <p className="text-sm text-ink">Marge avant 2 000 EUR</p>
                                    <p className={`mt-1 font-mono text-lg ${scenario.margin >= 0 ? 'text-lime' : 'text-saffron'}`}>
                                        {scenario.margin >= 0 ? '+' : ''}
                                        {scenario.margin.toLocaleString('fr-FR')} EUR
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-ink/50">
                                {scenario.margin >= 0
                                    ? "Bonne nouvelle: on reste sous la barre psychologique des 2 000 EUR."
                                    : "On depasse la barre des 2 000 EUR, mais on gagne en confort et en simplicite."}
                            </p>
                        </div>

                        <div className="mt-4 rounded-xl border-2 border-white/8 bg-white/3 p-5">
                            <p className="text-sm text-ink">Pourquoi ce mode est defendable</p>
                            <div className="mt-4 space-y-3">
                                {activeMode.bullets.map((bullet) => (
                                    <p key={bullet} className="text-sm leading-6 text-ink/50">
                                        {bullet}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
