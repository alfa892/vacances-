'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Users, Plane, Bed, Ticket, Bus, Utensils, FileText } from 'lucide-react';
import clsx from 'clsx';
import { BudgetResponse, BudgetLine } from '../api/data/types';

const CATEGORY_CONFIG: Record<string, { icon: any, color: string }> = {
    vols: { icon: Plane, color: 'bg-ocean' },
    logement: { icon: Bed, color: 'bg-indigo-400' },
    activites: { icon: Ticket, color: 'bg-saffron' },
    repas: { icon: Utensils, color: 'bg-emerald-400' },
    transport: { icon: Bus, color: 'bg-orange-400' },
    visa: { icon: FileText, color: 'bg-slate-400' },
    divers: { icon: Wallet, color: 'bg-pink-400' },
};

export function BudgetWidget({ budget }: { budget: BudgetResponse }) {
    const [perPerson, setPerPerson] = useState(true);

    return (
        <div className="relative p-6 md:p-10 max-w-3xl w-full rounded-[2.5rem] bg-jungle/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-serif text-2xl text-white">Budget</h3>
                        <p className="text-xs text-lime font-mono uppercase tracking-wider mt-1">Estimation 2026</p>
                    </div>
                    <button
                        onClick={() => setPerPerson(!perPerson)}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
                        title={perPerson ? "Voir total groupe" : "Voir par personne"}
                    >
                        <AnimatePresence mode="wait">
                            {perPerson ? (
                                <motion.div
                                    key="user"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Users size={20} className="text-lime" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="wallet"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Wallet size={20} className="text-lime" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

            </div>

            <div className="relative z-10 space-y-5">
                {budget.perPerson.map((line, index) => {
                    const config = CATEGORY_CONFIG[line.category] || CATEGORY_CONFIG.divers;
                    const Icon = config.icon;
                    const amount = perPerson ? line.amount : line.amount * budget.groupSize;

                    return (
                        <div key={line.label} className="group flex items-center gap-4">
                            <div className={clsx("w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner text-jungle font-bold", config.color)}>
                                <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-medium text-white text-sm">{line.label}</span>
                                    <span className="font-mono text-lime font-semibold">
                                        {amount.toLocaleString('fr-FR')} €
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(line.amount / 2000) * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className={clsx("h-full rounded-full opacity-100", config.color)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Imprévu Line */}
                {(() => {
                    const targetBudget = 2000;
                    const imprevuPerPerson = targetBudget - budget.totalPerPerson;

                    if (imprevuPerPerson > 0) {
                        const amount = perPerson ? imprevuPerPerson : imprevuPerPerson * budget.groupSize;
                        const config = { icon: Wallet, color: 'bg-fuchsia-400' }; // Brighter color for Imprévu
                        const Icon = config.icon;

                        return (
                            <div key="Imprévu" className="group flex items-center gap-4">
                                <div className={clsx("w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner text-jungle font-bold", config.color)}>
                                    <Icon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-medium text-white text-sm">Imprévu</span>
                                        <span className="font-mono text-lime font-semibold">
                                            {amount.toLocaleString('fr-FR')} €
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(imprevuPerPerson / targetBudget) * 100}%` }}
                                            transition={{ duration: 1, delay: budget.perPerson.length * 0.1 }}
                                            className={clsx("h-full rounded-full opacity-100", config.color)}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-white/80">Total cible</span>
                    <motion.span
                        key={perPerson ? 'person' : 'group'}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        className="font-serif text-4xl text-white tracking-tight"
                    >
                        {perPerson ? (2000).toLocaleString('fr-FR') : (2000 * budget.groupSize).toLocaleString('fr-FR')} €
                    </motion.span>
                </div>
                <p className="text-right text-[10px] text-lime/80 mt-2 font-mono uppercase tracking-wider">
                    {perPerson ? 'Par personne' : `Pour ${budget.groupSize} personnes`}
                </p>
                {budget.promo && (
                    <div className="mt-4 p-3 bg-lime/10 border border-lime/20 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-lime font-bold">{budget.promo.label}</span>
                        <span className="text-xs text-white font-mono">-{budget.promo.amount} €</span>
                    </div>
                )}
            </div>
        </div>
    );
}
