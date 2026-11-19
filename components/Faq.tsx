"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { SectionPill, headingCls, Squiggle } from "./Doodles";

const FAQS = [
  { q: "What can you build for me?", a: "Websites, e-commerce stores, dashboards, catalogs and full-stack web apps, plus the APIs and admin panels behind them. If it runs in a browser and needs to feel fast and reliable, I can build it." },
  { q: "What is your main stack?", a: "Next.js, React and TypeScript on the frontend, with Laravel, Spring Boot and Node.js behind them. PostgreSQL and Supabase for data, Tailwind CSS for styling, and Docker and Vercel for deployment." },
  { q: "Do you work remotely?", a: "Yes. I am based in Yangon and work remotely with clients and teams. Most projects run happily over async updates with regular check-ins." },
  { q: "How quickly will you reply, and how do we start?", a: "I reply within 24 hours. You send a short note about the goal, I reply with scope and next steps within a day, and we start with a small, focused slice before committing to the whole build." },
  { q: "Can you design as well as code?", a: "Yes. I design the interfaces I build, with clean layouts, thoughtful typography and purposeful motion, so the design and the code never fight each other at handoff." },
];
const BGS = ["bg-[#F5B8D0]", "bg-[#BFE3F5]", "bg-[#C8F0D8]", "bg-[#FFF3B0]", "bg-[#E9FBC0]"];
const TILTS = [-2, 2, -1, 1, -2];

export default function Faq() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="faq" className="graph-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <div className="text-center">
            <SectionPill rotate="rotate-1" bg="bg-[#FFF3B0]">FAQs</SectionPill>
            <h2 className={`${headingCls} mt-5`}>Answers before<br />we start</h2>
            <Squiggle className="mx-auto mt-4 h-4 w-36" color="#6B93A8" />
          </div>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                className={`rounded-[28px] ${BGS[i % BGS.length]} shadow-[0_10px_26px_rgba(60,55,20,0.10)]`}
                variants={{
                  rest: { opacity: 1, scale: 1, rotate: TILTS[i % TILTS.length], transition: { type: "spring", stiffness: 180, damping: 19, delay: (i % 3) * 0.07 } },
                  hover: { scale: 1.01, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 22, delay: 0 } },
                }}
                initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: 0 }}
                whileInView="rest"
                whileHover={reduce ? undefined : "hover"}
                viewport={{ once: true, amount: 0.4 }}
              >
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full min-h-[56px] items-center gap-3 px-6 py-4 text-left">
                  <span className="flex-1 text-[16px] font-extrabold text-[#111] sm:text-[18px]">{f.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#111] shadow">
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-center">
                      <Plus size={18} weight="bold" />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[14.5px] leading-[1.65] text-[#33362d]">{f.a}</p>
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
