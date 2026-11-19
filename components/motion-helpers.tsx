"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* PopIn — whileInView pop used for the About stat cards.              */
/* Entrance: rises, scales up and settles into its tilt (spring).      */
/* Any static stagger offset (e.g. lg:translate-y-6) stays on a plain  */
/* wrapper div in the caller so it never fights the motion transform. */
/* ------------------------------------------------------------------ */
export function PopIn({
  children,
  className = "",
  rotateDeg = 0,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  rotateDeg?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.88, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotateDeg }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 170, damping: 19, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — an <article> that rests at a tilt and straightens +      */
/* lifts on hover. Entrance is left to the caller's Reveal wrapper so  */
/* opacity is never animated on two nested nodes. Reduced motion      */
/* renders a plain article with the equivalent CSS tilt class.        */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className = "",
  rotateDeg = 0,
  rotateClass = "",
  hoverY = -5,
  hoverScale = 1.015,
}: {
  children: ReactNode;
  className?: string;
  rotateDeg?: number;
  rotateClass?: string;
  hoverY?: number;
  hoverScale?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <article className={`${className} ${rotateClass}`}>{children}</article>;
  }
  return (
    <motion.article
      className={className}
      initial={false}
      animate={{ rotate: rotateDeg }}
      whileHover={{ rotate: 0, y: hoverY, scale: hoverScale }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* ScaleLink — Next Link with springy hover/tap scale (pills, CTAs).   */
/* ------------------------------------------------------------------ */
const MotionLink = motion.create(Link);

export function ScaleLink({
  children,
  className = "",
  href,
  hoverScale = 1.05,
  tapScale = 0.95,
  target,
  rel,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  hoverScale?: number;
  tapScale?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <Link href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <MotionLink
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 320, damping: 17 }}
    >
      {children}
    </MotionLink>
  );
}

/* ------------------------------------------------------------------ */
/* LiftAnchor — plain <a> that lifts on hover (footer social buttons).*/
/* ------------------------------------------------------------------ */
export function LiftAnchor({
  children,
  className = "",
  href,
  target,
  rel,
  ariaLabel,
  title,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <a href={href} className={className} target={target} rel={rel} aria-label={ariaLabel} title={title}>
        {children}
      </a>
    );
  }
  return (
    <motion.a
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      title={title}
      whileHover={{ y: -3, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 320, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* StaggerHeadline — multi-line headline, each line rises out of an    */
/* overflow-hidden mask with a stagger (footer CTA).                   */
/* ------------------------------------------------------------------ */
const lineVariants: Variants = {
  hidden: { opacity: 0, y: "0.7em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 170, damping: 21 },
  },
};

const headlineVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function StaggerHeadline({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.h2
      className={className}
      variants={headlineVariants}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className="block" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
