"use client";

import { useCallback } from "react";
import clsx from "clsx";

type MessengerCtaProps = {
  conversationUrl: string;
  messages: readonly string[];
  label: string;
  className?: string;
};

export function MessengerCta({ conversationUrl, messages, label, className }: MessengerCtaProps) {
  const handleClick = useCallback(() => {
    const pool = messages.length > 0 ? messages : ["je viens a ce voyage incroyable !"];
    const randomMessage = pool[Math.floor(Math.random() * pool.length)] ?? pool[0];
    const url = `${conversationUrl}?text=${encodeURIComponent(randomMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [conversationUrl, messages]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "inline-flex items-center justify-center gap-3 rounded-[28px] bg-[var(--color-saffron)] px-10 py-5 text-xl font-semibold text-ink shadow-2xl transition hover:bg-[var(--color-saffron)]/90 active:translate-y-[1px]",
        className
      )}
    >
      {label}
    </button>
  );
}
