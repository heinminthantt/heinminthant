import type { Project } from "@/lib/types";
import Reveal from "./Reveal";
import HillsScene from "./HillsScene";
import ProjectCard from "./ProjectCard";
import { SectionPill } from "./Doodles";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="relative overflow-hidden">
      <div className="absolute inset-0"><HillsScene className="h-full w-full" /></div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionPill rotate="-rotate-2">Projects</SectionPill>
          <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-white [text-shadow:0_3px_20px_rgba(30,90,40,0.45)]">Projects that<br />tell stories</h2>
        </Reveal>
        {projects.length === 0 ? (
          <div className="mt-10 rounded-[24px] bg-white p-8 text-center shadow-xl"><p className="font-bold text-[#111]">No projects yet</p><p className="mt-1 text-[14px] text-[#55584E]">Projects will appear here once added in admin.</p></div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
