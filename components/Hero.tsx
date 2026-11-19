"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { splitList } from "@/lib/types";
import HillsScene from "./HillsScene";
import GooglyEyes from "./GooglyEyes";

interface HeroProps {
  roleTitle: string;
  headline: string;
  subheadline: string;
  available: boolean;
  availabilityLabel: string;
  avatarUrl?: string;
  name?: string;
  projects?: Project[];
}

const STICKERS = [
  { label: "Web Development", dot: "bg-[#C6F135]", rotate: "-rotate-3", deg: -3 },
  { label: "Full-Stack Apps", dot: "bg-[#F5B8D0]", rotate: "rotate-2", deg: 2 },
  { label: "UI/UX & Motion", dot: "bg-[#7C5CFF]", rotate: "-rotate-2", deg: -2 },
];

const stickerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
};

const stickerItem: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: 0 },
  show: (deg: number) => ({
    opacity: 1,
    scale: 1,
    rotate: deg,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  }),
};

export function StickerLabels({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={`flex flex-wrap gap-2.5 ${className}`}>
        {STICKERS.map((s) => (
          <span key={s.label} className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#111] shadow-[0_6px_18px_rgba(0,0,0,0.16)] ${s.rotate}`}>
            <span className={`h-3 w-3 rounded-full ${s.dot} ring-2 ring-black/5`} aria-hidden /> {s.label}
          </span>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className={`flex flex-wrap gap-2.5 ${className}`}
      variants={stickerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {STICKERS.map((s) => (
        <motion.span
          key={s.label}
          variants={stickerItem}
          custom={s.deg}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#111] shadow-[0_6px_18px_rgba(0,0,0,0.16)]"
        >
          <span className={`h-3 w-3 rounded-full ${s.dot} ring-2 ring-black/5`} aria-hidden /> {s.label}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* Hero entrance orchestration: a variants container flips to "show" on
   mount; each element carries its own delay/spring in its variant. The
   headline is a nested variant parent so its words stagger themselves. */
const heroContainer: Variants = {
  hidden: {},
  show: {},
};

const wordmarkVar: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const badgeVar: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { delay: 0.3, type: "spring", stiffness: 120, damping: 17 } },
};

const headlineVar: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } },
};

const wordVar: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 210, damping: 21 } },
};

const eyesVar: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { delay: 0.75, type: "spring", stiffness: 200, damping: 14 } },
};

const sublineVar: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const fanVar: Variants = {
  hidden: { opacity: 0, y: 24, rotate: 0 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: [-6, 0, 6][i] ?? 0,
    transition: { delay: 0.6 + i * 0.1, type: "spring", stiffness: 160, damping: 17 },
  }),
};

const MotionLink = motion.create(Link);

export default function Hero({ roleTitle, headline, subheadline, available, availabilityLabel, avatarUrl, name = "Hein Min Thant", projects = [] }: HeroProps) {
  const reduce = useReducedMotion();
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2);
  const fan = projects.slice(0, 3);
  const words = headline.split(/\s+/).filter(Boolean);

  return (
    <section className="hills-grain relative overflow-hidden">
      <div className="absolute inset-0"><HillsScene className="h-full w-full" /></div>
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col px-4 pb-28 pt-7 sm:px-6">
        <motion.div variants={heroContainer} initial={reduce ? false : "hidden"} animate="show" className="flex flex-col">
          <motion.p variants={wordmarkVar} className="text-center text-[17px] font-extrabold uppercase tracking-[0.08em] text-white [text-shadow:0_2px_12px_rgba(30,80,30,0.35)] sm:text-[20px]">
            {name}<sup className="ml-0.5 text-[11px]">®</sup>
          </motion.p>

          {/* Availability badge - top-left under the wordmark on desktop,
              centered in flow on mobile; z-30 + liquid glass so it floats
              OVER the headline, never behind it */}
          <div className="z-30 mt-8 flex justify-center lg:absolute lg:left-8 lg:top-[104px] lg:mt-0 lg:justify-start">
            <motion.div variants={badgeVar} className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
              {avatarUrl ? (
                <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={avatarUrl} alt={`Portrait of ${name}`} fill className="object-cover" sizes="44px" />
                  <span className="absolute bottom-0.5 right-0.5 z-10 h-3 w-3 rounded-full bg-[#2ecc71] ring-2 ring-white" aria-hidden />
                </span>
              ) : (
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111] text-[13px] font-bold text-white ring-2 ring-white">{initials}<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#2ecc71] ring-2 ring-white" aria-hidden /></span>
              )}
              <span className="text-left leading-tight">
                <span className="block text-[13px] font-bold text-[#111]">{available ? availabilityLabel : "Not available"}</span>
                <span className="block text-[12px] font-semibold uppercase tracking-wide text-[#111]/70">{name} · {roleTitle}</span>
              </span>
            </motion.div>
          </div>

          <div className="relative mx-auto mt-10 w-full max-w-[980px] text-center lg:mt-24">
            <motion.h1 variants={headlineVar} className="text-[clamp(3rem,9vw,7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-white [text-shadow:0_4px_28px_rgba(30,90,40,0.35)]">
              {words.map((w, i) => (
                <span key={i} className={`inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] ${i < words.length - 1 ? "mr-[0.24em]" : ""}`}>
                  <motion.span variants={wordVar} className="inline-block will-change-transform">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.div variants={eyesVar} className="mt-4 flex justify-center">
              <GooglyEyes />
            </motion.div>
          </div>

          <div className="z-30 mt-6 flex justify-center lg:absolute lg:right-6 lg:top-[36%] lg:mt-0">
            <StickerLabels className="max-w-[300px] justify-center lg:flex-col lg:items-end" />
          </div>

          <div className="mt-auto grid items-end gap-8 pt-14 lg:grid-cols-2">
            <motion.div variants={sublineVar} className="text-center text-white lg:text-left">
              <p className="text-[20px] font-extrabold [text-shadow:0_2px_10px_rgba(30,90,40,0.4)]">— Not just code.</p>
              <p className="mx-auto mt-1 max-w-[44ch] text-[16px] font-medium lowercase leading-relaxed [text-shadow:0_1px_8px_rgba(30,90,40,0.4)] lg:mx-0">
                {subheadline || "i build digital things that feel alive"}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href="#work" className="inline-flex min-h-[48px] items-center rounded-full bg-[#111] px-6 py-3 text-[14px] font-bold text-white shadow-xl hover:bg-black">View project →</Link>
                <Link href="#contact" className="inline-flex min-h-[48px] items-center rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[#111] shadow-xl">Let&apos;s chat</Link>
              </div>
            </motion.div>

            {fan.length > 0 && (
              <div className="relative mx-auto hidden h-[190px] w-full max-w-[460px] md:block" aria-label="Featured projects">
                {fan.map((p, i) => (
                  <MotionLink key={p.id} href={p.live_url || "#work"} target={p.live_url ? "_blank" : undefined} rel={p.live_url ? "noopener noreferrer" : undefined} variants={fanVar} custom={i} whileHover={reduce ? undefined : { scale: 1.03 }} className="group absolute top-4 w-[240px] rounded-[18px] bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.22)] hover:z-20" style={{ left: `${i * 105}px`, zIndex: i + 1 }}>
                    <span className="flex items-center gap-3">
                      {p.image_url ? (
                        <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-[12px]"><Image src={p.image_url} alt="" fill className="object-cover" sizes="56px" /></span>
                      ) : (
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#79BEE8] to-[#55883C] text-[18px] font-extrabold text-white">{p.title.charAt(0)}</span>
                      )}
                      <span className="min-w-0 text-left">
                        <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-[#7A7D6F]">{splitList(p.technologies)[0] || p.category || "Project"}</span>
                        <span className="block truncate text-[14px] font-extrabold leading-tight text-[#111]">{p.title}</span>
                        <span className="mt-0.5 block text-[11px] font-bold uppercase text-[#3E6B2F]">View project →</span>
                      </span>
                    </span>
                  </MotionLink>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
