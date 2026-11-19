"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { SectionPill, headingCls, DoodleStar } from "./Doodles";

const SERVICES = [
  { name: "Website Development", bg: "bg-[#F5B8D0]", desc: "Business sites, landing pages and e-commerce that load fast and look sharp.", long: "From a first landing page to a full e-commerce store, built to be fast, responsive and easy to update.", chips: ["Business websites", "Landing pages", "E-commerce", "Next.js · Tailwind · Vercel"] },
  { name: "Full-Stack Web Apps", bg: "bg-[#BFE3F5]", desc: "Dashboards, catalogs and admin panels with real data and real users.", long: "Complete web applications with authentication, databases and admin tooling, designed around how your team actually works.", chips: ["Dashboards", "Catalogs & admin panels", "Auth & roles", "Next.js · Laravel · Spring Boot · PostgreSQL · Supabase"] },
  { name: "Frontend Engineering & UI/UX", bg: "bg-[#C8F0D8]", desc: "React interfaces, design systems and motion that feels alive.", long: "Polished, accessible interfaces with a consistent design system and purposeful animation, not decoration for its own sake.", chips: ["React interfaces", "Design systems", "Responsive UI", "GSAP · Framer Motion"] },
  { name: "APIs & Backend Systems", bg: "bg-[#FFF3B0]", desc: "REST APIs, auth, databases and Docker, built to stay reliable.", long: "Backend systems with clean architecture, well modelled data and deployments that are boring in the best way.", chips: ["REST APIs", "Auth & security", "Database design", "Docker & deployment"] },
];

export default function Services() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="services" className="graph-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <div className="relative">
            <SectionPill>Services</SectionPill>
            <DoodleStar className="absolute right-2 top-0 h-10 w-10 sm:right-16" />
            <h2 className={`${headingCls} mt-5`}>Where I<br />can help you</h2>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-col gap-4">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={s.name}
                className={`overflow-hidden rounded-[24px] ${s.bg} shadow-[0_10px_28px_rgba(60,55,20,0.10)]`}
                variants={{
                  rest: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 130, damping: 20, delay: i * 0.06 } },
                  hover: { scale: 1.005, transition: { type: "spring", stiffness: 300, damping: 22, delay: 0 } },
                }}
                initial={reduce ? false : { opacity: 0, x: i % 2 === 0 ? -36 : 36 }}
                whileInView="rest"
                whileHover={reduce ? undefined : "hover"}
                viewport={{ once: true, amount: 0.3 }}
              >
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full min-h-[88px] items-center gap-4 px-5 py-6 text-left sm:gap-6 sm:px-8">
                  <span className="text-[14px] font-extrabold tabular text-[#111]/50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#111] sm:text-[30px]">{s.name}</span>
                    <span className="mt-1 block max-w-[56ch] text-[14px] leading-[1.5] text-[#55584E]">{s.desc}</span>
                  </span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#111] shadow-md">
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-center">
                      <Plus size={24} weight="bold" />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-7 sm:px-8 sm:pl-[76px]">
                        <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[#33362d]">{s.long}</p>
                        <div className="mt-4 flex flex-wrap gap-2">{s.chips.map((c) => <span key={c} className="rounded-full bg-white/85 px-3.5 py-1.5 text-[12px] font-bold text-[#111] shadow-sm">{c}</span>)}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
