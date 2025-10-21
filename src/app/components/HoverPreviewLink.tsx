"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

type HoverPreviewLinkProps = {
  href?: string;
  label: ReactNode;
  subtitle?: ReactNode;
  images: Array<{ src: string; alt: string }>;
  srLabel?: string;
};

type Coords = {
  top: number;
  left: number;
  width: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HoverPreviewLink({
  href,
  label,
  subtitle,
  images,
  srLabel,
}: HoverPreviewLinkProps) {
  const triggerRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0, width: 360 });
  const [isMounted, setIsMounted] = useState(false);
  const [isTriggerActive, setIsTriggerActive] = useState(false);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [focusPreviewOnOpen, setFocusPreviewOnOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const updatePosition = useCallback(() => {
    const node = triggerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const margin = 16;
    const estimatedWidth = Math.min(
      900,
      viewportWidth - margin * 2,
      images.length * 280 + Math.max(images.length - 1, 0) * 16 + 64
    );
    const preferredLeft = rect.left;
    const clampedLeft = clamp(preferredLeft, margin, viewportWidth - margin - estimatedWidth);
    setCoords({
      top: rect.bottom + 16,
      left: clampedLeft,
      width: estimatedWidth,
    });
  }, [images.length]);

  useEffect(() => {
    if (!(isTriggerActive || isPreviewHovered)) return;
    updatePosition();
    const handleScroll = () => updatePosition();
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isTriggerActive, isPreviewHovered, updatePosition]);

  const handleTriggerEnter = () => {
    setIsTriggerActive(true);
  };
  const handleTriggerLeave = () => {
    if (!isPreviewHovered) {
      setIsTriggerActive(false);
    }
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const key = event.key;
    const isActivationKey = key === "Enter" || key === " " || key === "Spacebar";
    if (!isActivationKey) {
      return;
    }

    if (href && key === "Enter") {
      return; // let the link behave normally
    }

    event.preventDefault();
    setIsTriggerActive(true);
    setFocusPreviewOnOpen(true);
  };

  const showPreview = isMounted && (isTriggerActive || isPreviewHovered);
  const TriggerTag = (href ? "a" : "button") as "a" | "button";

  const triggerProps: Record<string, unknown> = href
    ? {
        href,
        target: "_blank",
        rel: "noreferrer noopener",
      }
    : { type: "button" };

  const assignTriggerRef = useCallback(
    (node: HTMLAnchorElement | HTMLButtonElement | null) => {
      triggerRef.current = node;
    },
    []
  );

  useEffect(() => {
    if (!showPreview) {
      return;
    }

    if (focusPreviewOnOpen && previewRef.current) {
      previewRef.current.focus({ preventScroll: true });
      setFocusPreviewOnOpen(false);
    }

    const margin = 16;
    const viewportHeight = window.innerHeight;
    const adjustPosition = () => {
      const node = previewRef.current;
      if (!node) return;
      const height = node.offsetHeight;
      setCoords((prev) => {
        const desiredTop = clamp(viewportHeight - height - margin, margin, viewportHeight - margin);
        const adjustedTop = Math.min(Math.max(margin, prev.top), desiredTop);
        if (Math.abs(adjustedTop - prev.top) < 1) {
          return prev;
        }
        return { ...prev, top: adjustedTop };
      });
    };

    adjustPosition();

    const handleBlur = () => {
      setTimeout(() => {
        const active = document.activeElement;
        if (previewRef.current?.contains(active) || triggerRef.current === active) {
          return;
        }
        if (!isTriggerActive && !isPreviewHovered) {
          return;
        }
        setIsTriggerActive(false);
        setIsPreviewHovered(false);
      }, 0);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTriggerActive(false);
        setIsPreviewHovered(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("focusin", handleBlur);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("focusin", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPreview, focusPreviewOnOpen, isTriggerActive, isPreviewHovered]);

  const closePreview = () => {
    setIsPreviewHovered(false);
    setIsTriggerActive(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const trigger = (
    <TriggerTag
      {...triggerProps}
      ref={assignTriggerRef}
      onMouseEnter={handleTriggerEnter}
      onMouseLeave={handleTriggerLeave}
      onFocus={handleTriggerEnter}
      onKeyDown={handleTriggerKeyDown}
      aria-haspopup="dialog"
      aria-expanded={showPreview}
      aria-label={
        href
          ? undefined
          : typeof label === "string"
            ? label
            : srLabel ?? "Lire la description"
      }
      className="inline-flex max-w-full flex-col gap-1 text-[#214D34] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#214D34]/60"
    >
      <span
        className={href ? "font-semibold underline decoration-dotted underline-offset-2" : "font-semibold"}
      >
        {label}
      </span>
      {subtitle ? <span className="text-xs text-slate-500">{subtitle}</span> : null}
      {href ? <span className="sr-only">{srLabel ?? "Ouvrir le lien"}</span> : null}
    </TriggerTag>
  );

  if (!showPreview) {
    return <>{trigger}</>;
  }

  const preview = (
    <div
      ref={previewRef}
      role="dialog"
      aria-label={typeof label === "string" ? label : "Prévisualisation"}
      tabIndex={-1}
      className="fixed z-[200] flex max-w-[900px] flex-col gap-4 overflow-visible rounded-2xl bg-white/95 p-5 pb-6 shadow-2xl ring-1 ring-slate-900/10"
      style={{
        top: coords.top,
        left: coords.left,
        width: coords.width,
        maxWidth: Math.min(coords.width, 900),
      }}
      onMouseEnter={() => setIsPreviewHovered(true)}
      onMouseLeave={() => {
        setIsPreviewHovered(false);
        setIsTriggerActive(false);
      }}
      onFocus={() => setIsPreviewHovered(true)}
      onBlur={(event) => {
        const nextTarget = (event.relatedTarget as Node | null) ?? null;
        if (nextTarget && (previewRef.current?.contains(nextTarget) || triggerRef.current === nextTarget)) {
          return;
        }
        setIsPreviewHovered(false);
        setIsTriggerActive(false);
      }}
    >
      <button
        type="button"
        className="absolute right-0 top-0 z-[210] flex h-10 w-10 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-[#214D34] text-white shadow-xl ring-4 ring-white/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#214D34]"
        aria-label="Fermer l’aperçu"
        onClick={closePreview}
        onTouchEnd={(event) => {
          event.preventDefault();
          closePreview();
        }}
      >
        ×
      </button>
      <div className="flex max-h-[65vh] w-full flex-col gap-3 overflow-auto pr-1 sm:flex-row sm:flex-wrap">
        {images.map((image) => (
          <div
            key={image.src}
            className="relative h-44 w-full overflow-hidden rounded-xl sm:h-48 sm:min-w-[240px] sm:flex-1 lg:h-56"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(min-width: 1536px) 33vw, (min-width: 1024px) 45vw, 90vw"
            />
          </div>
        ))}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#214D34] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#214D34]/70 focus-visible:ring-offset-2"
          >
            Ouvrir le détail
          </a>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      {trigger}
      {createPortal(preview, document.body)}
    </>
  );
}
