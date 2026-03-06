'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../lib/siteContent';

export function TripFaq({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative z-10 px-6 pb-24 lg:px-12">
            <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-lime/80">
                    Les objections les plus probables
                </p>
                <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
                    Les reponses simples a envoyer quand ca bloque
                </h2>

                <div className="mt-8 space-y-3">
                    {items.map((item, index) => {
                        const isOpen = index === openIndex;

                        return (
                            <div
                                key={item.question}
                                className="rounded-[1.5rem] border border-white/10 bg-black/15"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                                >
                                    <span className="text-lg text-white">{item.question}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-lime transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 text-sm leading-7 text-white/65">
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
