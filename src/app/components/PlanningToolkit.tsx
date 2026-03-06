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
        <section id="kit" className="relative z-10 px-6 py-24 lg:px-12">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
                        Quand reserver quoi
                    </p>
                    <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
                        Un plan simple pour ne rien oublier
                    </h2>

                    <div className="mt-8 space-y-4">
                        {planningSteps.map((step, index) => (
                            <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime/10 text-lime">
                                        <CalendarClock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/45">
                                            Etape {index + 1} - {step.when}
                                        </p>
                                        <p className="mt-1 text-lg text-white">{step.title}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-white/65">{step.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-black/15 p-6 backdrop-blur-xl md:p-8">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
                                Checklist depart
                            </p>
                            <h3 className="mt-4 font-serif text-4xl text-white md:text-5xl">
                                Ce qu&apos;il faut vraiment preparer
                            </h3>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                            {checked.length}/{checklist.length}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {Object.entries(groupedChecklist).map(([category, items]) => (
                            <div key={category} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/45">
                                    {category}
                                </p>
                                <div className="mt-4 space-y-3">
                                    {items.map((item) => {
                                        const isChecked = checked.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => toggleItem(item.id)}
                                                className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-left transition hover:bg-white/5"
                                            >
                                                <div className="mt-0.5 text-lime">
                                                    {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white">{item.label}</p>
                                                    <p className="mt-1 text-xs leading-6 text-white/45">{item.note}</p>
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
