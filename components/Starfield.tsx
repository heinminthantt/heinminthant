"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number;
  phase: number;
  twinkleSpeed: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let comets: Comet[] = [];
    let raf = 0;
    let lastTime = performance.now();
    let nextCometAt = performance.now() + 3500;
    const mouse = { x: 0.5, y: 0.5 };
    const parallax = { x: 0, y: 0 };

    const seedStars = () => {
      const count = Math.min(260, Math.floor((width * height) / 6500));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + depth * 1.5,
          depth,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.1,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    const drawFrame = (time: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // parallax eases toward a fraction of mouse offset, stronger for near stars
      parallax.x += ((mouse.x - 0.5) * 14 - parallax.x) * 0.04;
      parallax.y += ((mouse.y - 0.5) * 10 - parallax.y) * 0.04;

      for (const s of stars) {
        const twinkle = reduced
          ? 0.75
          : 0.55 + 0.45 * Math.sin(time * 0.001 * s.twinkleSpeed + s.phase);
        const alpha = 0.18 + s.depth * 0.6 * twinkle;
        const px = s.x + parallax.x * (0.3 + s.depth);
        const py = s.y + parallax.y * (0.3 + s.depth);

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.depth > 0.85 ? `rgba(240, 220, 180, ${alpha})` : `rgba(226, 232, 248, ${alpha})`;
        ctx.fill();

        if (!reduced) {
          s.x -= dt * (0.0022 + s.depth * 0.004);
          s.y += dt * (0.0012 + s.depth * 0.002);
          if (s.x < -4) s.x = width + 4;
          if (s.y > height + 4) s.y = -4;
        }
      }

      // comets: rare, short streaks
      if (!reduced && time >= nextCometAt) {
        const fromLeft = Math.random() < 0.7;
        comets.push({
          x: fromLeft ? -40 : Math.random() * width,
          y: Math.random() * height * 0.35,
          vx: 340 + Math.random() * 200,
          vy: 130 + Math.random() * 90,
          life: 0,
          maxLife: 700 + Math.random() * 400,
        });
        nextCometAt = time + 5000 + Math.random() * 6000;
      }

      comets = comets.filter((c) => c.life < c.maxLife);
      for (const c of comets) {
        c.life += dt;
        c.x += (c.vx * dt) / 1000;
        c.y += (c.vy * dt) / 1000;
        const fade = 1 - c.life / c.maxLife;
        const grad = ctx.createLinearGradient(
          c.x,
          c.y,
          c.x - c.vx * 0.16,
          c.y - c.vy * 0.16,
        );
        grad.addColorStop(0, `rgba(245, 230, 200, ${0.8 * fade})`);
        grad.addColorStop(1, "rgba(245, 230, 200, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * 0.16, c.y - c.vy * 0.16);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      const dt = Math.min(50, time - lastTime);
      lastTime = time;
      drawFrame(time, dt);
      raf = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) {
        lastTime = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawFrame(performance.now(), 16);
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
