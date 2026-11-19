"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { splitList } from "@/lib/types";
import { ArrowRight } from "@phosphor-icons/react";

const TILTS = [-2, 1.5, -1, 2];
const CLIPS = ["bg-[#6B93A8]", "bg-[#E53935]", "bg-[#E3D44A]", "bg-[#55883C]"];

function hostname(url: string, fallback: string) {
  if (!url) return fallback.toLowerCase().replace(/\s+/g, "") + ".web";
  try { return new URL(url).hostname; } catch { return fallback; }
}

export default function ProjectCard({ project, i }: { project: Project; i: number }) {
  const reduce = useReducedMotion();
  const tech = splitList(project.technologies);
  const tilt = TILTS[i % TILTS.length];

  /* Entrance lives in the "rest" variant (with its stagger delay); the
     "hover" variant carries its own zero-delay spring so hovering never
     inherits the entrance delay. */
  const cardVariants: Variants = {
    rest: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: tilt,
      transition: { type: "spring", stiffness: 150, damping: 20, delay: (i % 4) * 0.07 },
    },
    hover: {
      scale: 1.025,
      rotate: 0,
      y: -6,
      transition: { type: "spring", stiffness: 300, damping: 22, delay: 0 },
    },
  };

  return (
    <motion.article
      className="group relative flex h-full flex-col rounded-[24px] bg-white p-3 shadow-[0_18px_44px_rgba(20,50,20,0.25)] hover:z-20"
      variants={cardVariants}
      initial={reduce ? false : { opacity: 0, y: 44, scale: 0.94, rotate: 0 }}
      whileInView="rest"
      whileHover={reduce ? undefined : "hover"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <span className={`absolute -top-2 left-1/2 z-10 h-4 w-10 -translate-x-1/2 rotate-[-8deg] rounded-full ${CLIPS[i % CLIPS.length]} shadow`} aria-hidden />
      <div className="flex items-center gap-1.5 px-1 pb-2 pt-1">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-[#F4F1EA] px-3 py-1 text-[11px] font-medium text-[#7A7D6F]">{hostname(project.live_url, project.title)}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#ECE8DC]">
        {project.image_url ? (
          <Image src={project.image_url} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#79BEE8] via-[#7FB069] to-[#3E6B2F]"><span className="text-[64px] font-extrabold text-white/90">{project.title.charAt(0)}</span></div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <h3 className="text-[19px] font-extrabold leading-tight text-[#111]">{project.title}</h3>
        <p className="mt-1 text-[12px] font-semibold uppercase tracking-wide text-[#7A7D6F]">{[project.category, project.year].filter(Boolean).join(" · ")}</p>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-[1.55] text-[#55584E]">{project.description}</p>
        {tech.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{tech.slice(0, 5).map((t) => <span key={t} className="rounded-full bg-[#F4F1EA] px-2.5 py-1 text-[11px] font-semibold text-[#111]">{t}</span>)}</div>}
        <div className="mt-auto flex gap-2 pt-4">
          {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center gap-1 rounded-full bg-[#111] px-4 py-2 text-[12px] font-bold text-white">View project <ArrowRight size={13} /></a>}
          {project.repo_url && <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[#111] ring-1 ring-[#E2DDCE]">Source</a>}
          {!project.live_url && !project.repo_url && <span className="text-[12px] text-[#7A7D6F]">Links pending</span>}
        </div>
      </div>
    </motion.article>
  );
}
