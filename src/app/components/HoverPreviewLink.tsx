'use client';

import { useState, createContext, useContext, memo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

export const PreviewImageContext = createContext<((src: string | null) => void) | null>(null);

type ImageProps = {
  src: string;
  alt: string;
};

type HoverPreviewLinkProps = {
  label: string;
  href?: string;
  subtitle?: string;
  images?: ImageProps[];
  srLabel?: string;
  onImageHover?: (src: string | null) => void;
};

export const HoverPreviewLink = memo(function HoverPreviewLink({
  label,
  href,
  subtitle,
  images,
  srLabel,
  onImageHover,
}: HoverPreviewLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const contextHover = useContext(PreviewImageContext);
  const hoverHandler = onImageHover || contextHover;

  const Wrapper = (href ? Link : 'div') as React.ElementType;
  const wrapperProps = href
    ? {
      href,
      target: '_blank',
      rel: 'noreferrer noopener',
      'aria-label': srLabel || label,
    }
    : {};

  const showPreview = () => {
    if (images && images.length > 0 && hoverHandler) {
      hoverHandler(images[0].src);
    }
  };

  const clearPreview = () => {
    if (hoverHandler) {
      hoverHandler(null);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    showPreview();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearPreview();
  };

  const handleFocus = () => {
    setIsHovered(true);
    showPreview();
  };

  const handleBlur = () => {
    setIsHovered(false);
    clearPreview();
  };

  const handlePointerDown = () => {
    showPreview();
  };

  return (
    <>
      <Wrapper
        {...wrapperProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
      >
        <div className={clsx(
          "flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
          "hover:bg-white/10 hover:backdrop-blur-md border border-transparent hover:border-white/20",
          isHovered ? "translate-x-2" : "translate-x-0"
        )}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 shadow-sm">
              <ArrowUpRight size={20} className={clsx("transition-transform duration-300", isHovered ? "rotate-45" : "rotate-0")} />
            </div>
            <div>
              <span className="font-serif text-xl text-white font-medium drop-shadow-md">{label}</span>
              {subtitle && <p className="text-sm text-white/80 mt-0.5 font-mono font-semibold drop-shadow-sm">{subtitle}</p>}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
});
