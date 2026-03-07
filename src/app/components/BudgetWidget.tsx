'use client';

import { motion } from 'framer-motion';
import { Bed, Bus, FileText, Plane, Ticket, Utensils, Wallet } from 'lucide-react';
import clsx from 'clsx';
import type { BudgetResponse } from '../api/data/types';

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
    vols: { icon: Plane, color: 'bg-ocean' },
    visa: { icon: FileText, color: 'bg-slate-400' },
    transport: { icon: Bus, color: 'bg-orange-400' },
    logement: { icon: Bed, color: 'bg-indigo-400' },
    activites: { icon: Ticket, color: 'bg-saffron' },
    repas: { icon: Utensils, color: 'bg-emerald-400' },
    divers: { icon: Wallet, color: 'bg-pink-400' },
};

export function BudgetWidget({ budget }: { budget: BudgetResponse }) {
    const maxLineAmount = Math.max(...budget.perPerson.map((line) => line.amount));

    return (
        <div className="brutal-card relative w-full p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Detail par poste */}
                <div className="space-y-5">
                    {budget.perPerson.map((line, index) => {
                        const config = CATEGORY_CONFIG[line.category] || CATEGORY_CONFIG.divers;
                        const Icon = config.icon;

                        return (
                            <div key={line.label} className="flex items-center gap-4">
                                <div className={clsx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-night text-night shadow-[2px_2px_0px_#0a0a0a]', config.color)}>
                                    <Icon size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-2 flex items-baseline justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-ink">{line.label}</p>
                                            <p className="text-xs text-ink/60">{line.note}</p>
                                        </div>
                                        <span className="shrink-0 font-mono text-lime">
                                            {line.amount.toLocaleString('fr-FR')} EUR
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

                {/* Resume */}
                <div className="space-y-4">
                    <div className="brutal-card p-6 text-center">
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-ink/60">
                            Total par personne
                        </p>
                        <p className="mt-3 font-serif text-5xl text-ink md:text-6xl">
                            {budget.totalPerPerson.toLocaleString('fr-FR')} EUR
                        </p>
                        <p className="mt-3 text-sm text-ink/60">
                            Tout compris
                        </p>
                    </div>

                    <div className="brutal-card p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.24em] text-ink/60">
                            Total groupe ({budget.groupSize} personnes)
                        </p>
                        <p className="mt-3 font-serif text-3xl text-ink">
                            {budget.totalGroup.toLocaleString('fr-FR')} EUR
                        </p>
                    </div>

                    <div className="rounded-xl border-2 border-lime/20 bg-lime/5 p-5">
                        <p className="text-sm leading-7 text-ink/60">
                            Ca comprend les vols, le visa, le chauffeur prive, les logements, les activites et la bouffe. Y&apos;a une petite marge pour les imprevus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
