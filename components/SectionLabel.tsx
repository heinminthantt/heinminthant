"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#·";

interface SectionLabelProps {
  index: string;
  label: string;
}

/**
 * Mono eyebrow label that scrambles into place when scrolled into view.
 * Reduced motion / no-JS: renders the final text immediately.
 */
export default function SectionLabel({ index, label }: SectionLabelProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(label);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const full = `${index} / ${label}`;
      const start = performance.now();
      const perChar = 34; // ms between settling characters
      const total = full.length * perChar + 320;

      const tick = (now: number) => {
        const elapsed = now - start;
        // Characters settle left-to-right; unresolved ones churn glyphs
        const settledCount = Math.floor(
          Math.max(0, (elapsed - 200) / perChar)
        );
        if (elapsed >= total) {
          setDisplay(full);
          setDone(true);
          return;
        }
        let out = "";
        for (let i = 0; i < full.length; i++) {
          const ch = full[i];
          if (i < settledCount || ch === " ") {
            out += ch;
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(`${index} / ${label}`);
          setDone(true);
          return;
        }
        run();
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [index, label]);

  return (
    <p
      ref={ref}
      aria-label={`${index} / ${label}`}
      className={`instrument-label mb-4 ${done ? "" : "opacity-80"}`}
    >
      <span aria-hidden="true">{done ? `${index} / ${label}` : display}</span>
    </p>
  );
}
