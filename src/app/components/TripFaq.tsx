'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../lib/siteContent';

export function TripFaq({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative z-10 px-6 pb-24 lg:px-12">
            <div className="mx-auto max-w-4xl">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-ink/40">
                    Objections
                </p>
                <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
                    Les questions que tes potes vont poser
                </h2>

                <div className="mt-8 space-y-3">
                    {items.map((item, index) => {
                        const isOpen = index === openIndex;

                        return (
                            <div
                                key={item.question}
                                className="brutal-card overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                                >
                                    <span className="text-lg font-medium text-ink">{item.question}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-lime transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="border-t-2 border-white/8 px-5 py-5 text-sm leading-7 text-ink/60">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
