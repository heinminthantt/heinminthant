"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { User, FolderOpen, Star, ChatCircleText, House } from "@phosphor-icons/react";

const ITEMS = [
  { href: "/#top", label: "Home", icon: House, bg: "bg-[#C6F135]" },
  { href: "/#about", label: "About", icon: User, bg: "bg-[#C9B8FF]" },
  { href: "/#work", label: "Projects", icon: FolderOpen, bg: "bg-[#BFE3F5]" },
  { href: "/#services", label: "Services", icon: Star, bg: "bg-[#FF9F43]" },
  { href: "/#contact", label: "Contact", icon: ChatCircleText, bg: "bg-[#8ECDF0]", badge: "1" },
];

const MotionLink = motion.create(Link);

export default function Nav({ name, available, availabilityLabel }: { name: string; available?: boolean; availabilityLabel?: string }) {
  void name; void available; void availabilityLabel;
  const reduce = useReducedMotion();
  return (
    <motion.nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-50 sm:bottom-6"
      initial={reduce ? false : { y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.5 }}
    >
      <div className="liquid-glass flex items-center gap-2 rounded-[24px] p-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <MotionLink
              key={item.label}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center"
              whileHover={reduce ? undefined : { scale: 1.14, y: -5 }}
              whileTap={reduce ? undefined : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 15 }}
            >
              <span className={`relative flex h-11 w-11 items-center justify-center rounded-[14px] ${item.bg} text-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_8px_rgba(0,0,0,0.15)]`}>
                <span className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-b from-white/50 via-white/10 to-transparent" aria-hidden />
                <Icon size={22} weight="fill" aria-hidden className="relative" />
                {item.badge && <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E53935] text-[11px] font-bold text-white ring-2 ring-white">{item.badge}</span>}
              </span>
            </MotionLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
