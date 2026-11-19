"use client";
import { useEffect, useRef, useState } from "react";

export default function GooglyEyes({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;
      const max = 4;
      setOffset({ x: (dx / len) * Math.min(max, len / 30), y: (dy / len) * Math.min(max, len / 30) });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className={`pointer-events-none inline-flex items-start justify-center gap-1 ${className}`} aria-hidden="true">
      {[0, 1].map((i) => (
        <span key={i} className="flex h-10 w-8 items-center justify-center rounded-[50%] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] sm:h-12 sm:w-10">
          <span className="block h-3.5 w-3.5 rounded-full bg-[#111]" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} />
        </span>
      ))}
    </div>
  );
}
