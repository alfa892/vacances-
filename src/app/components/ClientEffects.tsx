'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function ClientEffects() {
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return undefined;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        let frameId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };

        frameId = requestAnimationFrame(raf);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, [prefersReducedMotion]);

    return null;
}
