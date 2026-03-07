'use client';

import { useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, Circle } from 'lucide-react';
import type { ChecklistItem, PlanningStep } from '../lib/siteContent';

type PlanningToolkitProps = {
    planningSteps: PlanningStep[];
    checklist: ChecklistItem[];
};

export function PlanningToolkit({ planningSteps, checklist }: PlanningToolkitProps) {
    const [checked, setChecked] = useState<string[]>([]);

    const groupedChecklist = useMemo(() => {
        return checklist.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});
    }, [checklist]);

    const toggleItem = (id: string) => {
        setChecked((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    };

    return (
        <section id="kit" className="relative z-10 bg-night px-6 py-24 lg:px-12">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                {/* Planning steps */}
                <div className="brutal-card p-6 md:p-8">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-ocean">
                        Timeline
                    </p>
                    <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                        Quand reserver quoi
                    </h2>

                    <div className="mt-8 space-y-4">
                        {planningSteps.map((step, index) => (
                            <div key={step.title} className="rounded-xl border-2 border-white/8 bg-white/3 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean/20 text-ocean">
                                        <CalendarClock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink/60">
                                            Etape {index + 1} — {step.when}
                                        </p>
                                        <p className="mt-1 text-base font-medium text-ink">{step.title}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-ink/60">{step.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checklist */}
                <div className="brutal-card p-6 md:p-8">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.3em] text-saffron">
                                Checklist
                            </p>
                            <h3 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
                                A preparer avant de partir
                            </h3>
                        </div>
                        <div className="brutal-card px-4 py-2 text-sm font-mono font-bold text-lime">
                            {checked.length}/{checklist.length}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {Object.entries(groupedChecklist).map(([category, items]) => (
                            <div key={category} className="rounded-xl border-2 border-white/8 bg-white/3 p-5">
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-ink/60">
                                    {category}
                                </p>
                                <div className="mt-4 space-y-3">
                                    {items.map((item) => {
                                        const isChecked = checked.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                aria-pressed={isChecked}
                                                onClick={() => toggleItem(item.id)}
                                                className="flex w-full items-start gap-3 rounded-lg border-2 border-white/8 bg-night px-4 py-3 text-left transition hover:border-white/15"
                                            >
                                                <div className="mt-0.5 text-lime">
                                                    {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${isChecked ? 'text-ink/40 line-through' : 'text-ink'}`}>
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-1 text-xs leading-6 text-ink/55">{item.note}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
