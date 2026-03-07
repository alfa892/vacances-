'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type CustomCursorProps = {
    forceHidden?: boolean;
};

export function CustomCursor({ forceHidden = false }: CustomCursorProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [pointerIsFine, setPointerIsFine] = useState<boolean | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const pointerQuery = window.matchMedia('(pointer: fine)');
        const updatePointer = () => setPointerIsFine(pointerQuery.matches);
        updatePointer();
        pointerQuery.addEventListener('change', updatePointer);

        return () => pointerQuery.removeEventListener('change', updatePointer);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || forceHidden || pointerIsFine !== true) return undefined;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, pointerIsFine, prefersReducedMotion, forceHidden]);

    if (prefersReducedMotion || forceHidden || pointerIsFine !== true) {
        return null;
    }

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-lime pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? 'rgba(217, 249, 157, 0.1)' : 'transparent',
                borderColor: isHovered ? 'rgba(217, 249, 157, 0.5)' : 'rgba(217, 249, 157, 0.8)',
            }}
        >
            <motion.div
                className="w-1 h-1 bg-lime rounded-full"
                animate={{
                    scale: isHovered ? 0 : 1
                }}
            />
        </motion.div>
    );
}
