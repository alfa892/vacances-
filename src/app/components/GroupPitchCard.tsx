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
        <div className="brutal-card p-6 md:p-8">
            <h3 className="font-serif text-3xl text-ink md:text-4xl">
                Un message pret a envoyer
            </h3>
            <p className="mt-4 text-sm leading-7 text-ink/50">
                Tu copies, tu envoies, c&apos;est plie.
            </p>

            <div className="mt-6 space-y-3">
                {bullets.map((bullet) => (
                    <div key={bullet} className="rounded-xl border-2 border-white/8 bg-white/3 px-4 py-3 text-sm text-ink/70">
                        {bullet}
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border-2 border-lime/20 bg-lime/5 p-5 text-sm leading-7 text-ink/80">
                {message}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleCopy}
                    className="brutal-btn brutal-btn-primary"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copie !' : 'Copier le pitch'}
                </button>
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => track({ event: 'pitch_whatsapp' })}
                    className="brutal-btn brutal-btn-whatsapp"
                >
                    <MessageCircleMore size={16} />
                    Envoyer sur WhatsApp
                </a>
            </div>
        </div>
    );
}
