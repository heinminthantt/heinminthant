"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  roleTitle: string;
  headline: string;
  subheadline: string;
  available: boolean;
  availabilityLabel: string;
}

export default function Hero({ roleTitle, headline, subheadline, available, availabilityLabel }: HeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Breadcrumb — one focus line, not competing pills */}
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-text-tertiary">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[12px] font-medium">
              <span className={`h-2 w-2 rounded-full ${available ? "bg-[#2ecc71]" : "bg-text-tertiary"}`} aria-hidden /> {available ? availabilityLabel : "Not available"}
            </span>
            <span className="hidden sm:inline text-text-faint">·</span>
            <span className="text-text-secondary">{roleTitle}</span>
            <span className="hidden sm:inline text-text-faint">·</span>
            <span>Yangon · Remote</span>
          </div>

          <h1 className="mt-5 max-w-[18ch] text-balance text-[42px] font-[800] leading-[0.98] tracking-[-0.04em] text-text sm:text-[58px] lg:text-[68px]">
            {headline}
          </h1>

          <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.6] text-text-secondary sm:text-[18px]">
            {subheadline || "Software engineer building reliable systems that feel effortless. Clean architecture, calm interfaces, care in equal measure."}
          </p>

          {/* Properties — proof, not decoration; 2 pills max to keep single focus */}
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-white px-3 py-1.5 text-[13px] shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6e99]" aria-hidden />
              <span className="text-text-tertiary">Stack</span>
              <span className="font-medium text-text">Next.js · TypeScript · Supabase</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-white px-3 py-1.5 text-[13px] shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
              <span className="text-text-tertiary">Reply</span>
              <span className="font-medium text-text">Within 24h</span>
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="inline-flex items-center rounded-[6px] bg-text px-6 py-3 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              View selected work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center rounded-[6px] border border-border bg-white px-6 py-3 text-[14px] font-medium text-text hover:bg-bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              Start a conversation
            </Link>
            <span className="hidden items-center gap-1.5 text-[13px] text-text-tertiary sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6e99]" aria-hidden /> Updated today
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
