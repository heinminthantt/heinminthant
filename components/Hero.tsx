"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import BlackHole from "./BlackHole";

interface HeroProps {
  roleTitle: string;
  headline: string;
  subheadline: string;
  available: boolean;
  availabilityLabel: string;
}

export default function Hero({
  roleTitle,
  headline,
  subheadline,
  available,
  availabilityLabel,
}: HeroProps) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[0%] top-1/2 hidden w-[min(48vw,640px)] -translate-y-1/2 md:block lg:right-[3%]"
      >
        {/* layered glow behind the black hole */}
        <div className="bh-bloom inset-[-18%]" />
        {/* halo hugging the event horizon (voidRadius 30 -> 60px sphere) */}
        <div className="bh-halo" />
        <BlackHole
          showCenter
          centre={{ voidRadius: 30, voidX: 50, voidY: 50 }}
          colors={["#fff4dd", "#f3cf87", "#e6b95f", "#d99b45"]}
          particleCount={900}
          particleSize={4}
          outerRadius={80}
          tilt={-24}
          tiltSideway={-14}
          trail={42}
          orbitSpeed={4}
          pullSpeed={0}
          style={{ width: "100%", aspectRatio: "1 / 1" }}
        />
        {/* warmth over the disk */}
        <div className="bh-warmth pointer-events-none inset-[-10%]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 md:pb-0"
      >
        <motion.div variants={item} className="mb-7">
          <span className="shiny-pill inline-flex items-center gap-2.5 rounded-full border border-starlight/25 bg-starlight/[0.06] px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              {available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-starlight opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  available ? "bg-starlight" : "bg-faint"
                }`}
              />
            </span>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-dust">
              {availabilityLabel}
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-[13ch] text-5xl font-semibold leading-[1.04] tracking-tighter text-mist sm:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[52ch] text-base leading-relaxed text-dust sm:text-lg"
        >
          {subheadline || `${roleTitle} crafting software that is useful, maintainable, and quietly dependable.`}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 rounded-[10px] bg-starlight px-6 py-3 text-sm font-medium text-space transition-all hover:bg-starbright active:-translate-y-px active:scale-[0.98]"
          >
            View work
            <ArrowRight
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center rounded-[10px] border border-mist/15 px-6 py-3 text-sm font-medium text-mist transition-colors hover:border-starlight/50 hover:text-starlight active:-translate-y-px active:scale-[0.98]"
          >
            Contact me
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
