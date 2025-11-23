'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

type MagneticButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
};

export function MagneticButton({ children, onClick, className = '', variant = 'primary' }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative px-8 py-4 rounded-full font-medium transition-colors duration-300 overflow-hidden group";
    const variants = {
        primary: "bg-jungle text-white hover:bg-jungle/90",
        secondary: "bg-transparent border border-ink/20 text-ink hover:bg-ink/5",
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10">{children}</span>
            {variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full -z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                />
            )}
        </motion.button>
    );
}
