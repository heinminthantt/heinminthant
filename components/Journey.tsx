import type { Education, Experience } from "@/lib/types";
import { splitList } from "@/lib/types";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { TiltCard } from "./motion-helpers";
import { SectionPill, headingCls, Pushpin, FoldedCorner } from "./Doodles";

interface JourneyProps { experience: Experience[]; education: Education[]; }

export default function Journey({ experience, education }: JourneyProps) {
  return (
    <section id="journey" className="graph-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionPill bg="bg-[#C8F0D8]">Journey</SectionPill>
          <h2 className={`${headingCls} mt-5`}>The journey<br />so far</h2>
        </Reveal>
        {experience.length === 0 && education.length === 0 && (
          <div className="mt-10 rounded-[24px] bg-white p-8 text-center shadow"><p className="font-bold">Journey not yet added</p><p className="mt-1 text-[14px] text-[#55584E]">Experience and education will appear here once added in admin.</p></div>
        )}
        {experience.length > 0 && (
          <div className="relative mt-12 ml-2 border-l-[3px] border-dashed border-[#6B93A8]/50 pl-6 sm:ml-6 sm:pl-10">
            <div className="flex flex-col gap-6">
              {experience.map((job, i) => { const skills = splitList(job.skills); return (
                <Reveal key={job.id} delay={i * 0.04}>
                  <TiltCard hoverY={-3} hoverScale={1} className="relative rounded-[24px] bg-white p-6 shadow-[0_14px_34px_rgba(60,55,20,0.10)] sm:p-7">
                    <span className="absolute -left-[35px] top-8 h-4 w-4 rounded-full bg-[#C6F135] ring-4 ring-[#FDF6E3] sm:-left-[51px]" aria-hidden />
                    <Pushpin className="right-10 top-3" /><FoldedCorner />
                    <p className="text-[12px] font-extrabold uppercase tracking-wider text-[#7A7D6F]">{job.date_range}{job.location ? ` · ${job.location}` : ""}</p>
                    <h3 className="mt-1.5 text-[22px] font-extrabold leading-tight text-[#111]">{job.role}</h3>
                    <p className="text-[15px] font-bold text-[#3E6B2F]">{job.company}</p>
                    {job.description && <p className="mt-2 max-w-[68ch] text-[14.5px] leading-[1.65] text-[#55584E]">{job.description}</p>}
                    {skills.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{skills.map((s) => <span key={s} className="rounded-full bg-[#F4F1EA] px-3 py-1 text-[11px] font-bold text-[#111]">{s}</span>)}</div>}
                  </TiltCard>
                </Reveal>); })}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <>
            <h3 className="mt-16 flex items-center gap-2 text-[22px] font-extrabold uppercase tracking-[-0.01em] text-[#111]"><GraduationCap size={26} /> Education</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {education.map((s, i) => { const coursework = splitList(s.coursework); return (
                <Reveal key={s.id} delay={i * 0.04}>
                  <TiltCard rotateDeg={i % 2 ? 1 : -1} rotateClass={i % 2 ? "rotate-1" : "-rotate-1"} hoverY={-3} hoverScale={1.005} className="relative h-full rounded-[24px] bg-white p-6 shadow-[0_14px_34px_rgba(60,55,20,0.10)]">
                    <Pushpin className="left-4 top-3" />
                    <p className="mt-3 text-[12px] font-extrabold uppercase tracking-wider text-[#7A7D6F]">{s.year_range}</p>
                    <h4 className="mt-1 text-[20px] font-extrabold leading-tight text-[#111]">{s.degree}</h4>
                    {s.major && <p className="text-[14px] font-semibold text-[#55584E]">{s.major}</p>}
                    <p className="mt-1 text-[14px] text-[#111]">{s.university}</p>
                    {coursework.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{coursework.map((c) => <span key={c} className="rounded-full bg-[#BFE3F5] px-3 py-1 text-[11px] font-bold text-[#111]">{c}</span>)}</div>}
                  </TiltCard>
                </Reveal>); })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
