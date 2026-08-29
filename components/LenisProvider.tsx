"use client";

import { useEffect, type ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: unknown;
    let raf = 0;

    (async () => {
      try {
        const mod = await import("lenis");
        const Lenis = (mod as unknown as { default: new (opts: unknown) => { raf: (t: number) => void; destroy: () => void } }).default;
        const instance = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.8,
        } as unknown);
        lenis = instance;
        const loop = (time: number) => {
          (instance as { raf: (t: number) => void }).raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch {
        // lenis not installed yet, fallback to native scroll
      }
    })();

    return () => {
      cancelAnimationFrame(raf);
      if (lenis && typeof (lenis as { destroy?: () => void }).destroy === "function") {
        (lenis as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
