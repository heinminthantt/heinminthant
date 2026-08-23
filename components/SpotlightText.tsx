"use client";

import { useRef, useState, type ReactNode } from "react";

interface SpotlightTextProps {
  children: ReactNode;
  className?: string;
  radius?: number;
}

/**
 * Cursor-following spotlight reveal. Text renders normally until the
 * pointer enters, then dims while a soft radial mask around the cursor
 * brings letters back to full brightness. Falls back to static text on
 * touch devices and when reduced motion is requested.
 */
export default function SpotlightText({
  children,
  className,
  radius = 190,
}: SpotlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [engaged, setEngaged] = useState(false);

  const onEnter = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEngaged(true);
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const mask =
    engaged && pos
      ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`
      : undefined;

  return (
    <span
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      className={`relative ${className ?? ""}`}
    >
      {/* Dimmed base once the spotlight is engaged */}
      <span aria-hidden="true" className={engaged ? "text-mist/35" : ""}>
        {children}
      </span>

      {/* Bright layer revealed under the cursor */}
      {engaged && (
        <span
          aria-hidden="true"
          className="absolute inset-0 text-mist"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            opacity: pos ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}
