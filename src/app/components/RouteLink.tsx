import React from 'react';

type RouteLinkProps = {
    label: string;
    href: string;
};

export function RouteLink({ label, href }: RouteLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-white font-bold drop-shadow-md underline decoration-lime decoration-2 underline-offset-4 hover:text-lime transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 focus-visible:ring-offset-2"
        >
            {label}
        </a>
    );
}
