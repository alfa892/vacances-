'use client';

import { MagneticButton } from './MagneticButton';
import { track } from '@/lib/api';

type Cta = {
    label: string;
    href: string;
    type: "whatsapp" | "booking" | "info";
};

export function CtaSection({ ctas }: { ctas: Cta[] }) {
    const handleCtaClick = (cta: Cta) => {
        track({ event: 'cta_click', props: { label: cta.label, type: cta.type, href: cta.href } });
        window.open(cta.href, '_blank');
    };

    return (
        <>
            {ctas.map((cta, index) => (
                <MagneticButton
                    key={index}
                    variant={index === 0 ? "primary" : "secondary"}
                    className={index !== 0 ? "text-jungle border-jungle/20 hover:bg-jungle/5" : ""}
                    onClick={() => handleCtaClick(cta)}
                >
                    {cta.label}
                </MagneticButton>
            ))}
        </>
    );
}
