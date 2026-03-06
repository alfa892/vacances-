'use client';

import { useState } from 'react';
import { Check, Copy, MessageCircleMore } from 'lucide-react';
import { track } from '@/lib/api';

type GroupPitchCardProps = {
    message: string;
    bullets: string[];
    whatsappHref: string;
};

export function GroupPitchCard({ message, bullets, whatsappHref }: GroupPitchCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            track({ event: 'pitch_copy' });
            window.setTimeout(() => setCopied(false), 1800);
        } catch (error) {
            console.error('Copy failed', error);
        }
    };

    return (
        <div className="rounded-[2rem] border border-lime/20 bg-[linear-gradient(180deg,rgba(217,249,157,0.14),rgba(217,249,157,0.05))] p-6 shadow-[0_30px_90px_rgba(2,44,34,0.18)] backdrop-blur-xl md:p-8">
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-jungle/60">
                Convaincre le groupe
            </p>
            <h3 className="mt-4 font-serif text-4xl text-jungle">
                Un message deja pret a envoyer
            </h3>
            <p className="mt-4 text-sm leading-7 text-jungle/70">
                Le but est simple: enlever le travail mental. Tu copies, tu envoies, et
                le projet devient concret.
            </p>

            <div className="mt-6 space-y-3">
                {bullets.map((bullet) => (
                    <div key={bullet} className="rounded-2xl border border-jungle/10 bg-white/40 px-4 py-3 text-sm text-jungle/75">
                        {bullet}
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-jungle/10 bg-jungle p-5 text-sm leading-7 text-white/80">
                {message}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-jungle px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.01]"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Texte copie' : 'Copier le pitch'}
                </button>
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => track({ event: 'pitch_whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-jungle/15 bg-white/50 px-5 py-3 text-sm font-medium text-jungle transition hover:bg-white/70"
                >
                    <MessageCircleMore size={16} />
                    Envoyer dans WhatsApp
                </a>
            </div>
        </div>
    );
}
