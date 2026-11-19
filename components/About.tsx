import Image from "next/image";
import { splitList } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { PopIn, ScaleLink } from "./motion-helpers";
import { Pushpin, FoldedCorner, Squiggle, headingCls } from "./Doodles";

interface AboutProps { settings: SiteSettings; projectCount?: number; skillCount?: number; certificateCount?: number; }

export default function About({ settings, projectCount = 0, skillCount = 0, certificateCount = 0 }: AboutProps) {
  const interests = splitList(settings.interests);
  const learning = splitList(settings.currently_learning);
  const stats = [
    { value: projectCount, suffix: projectCount >= 1 ? "+" : "", label: "Projects built", desc: "Projects shipped and live in the real world.", deg: -3, y: "" },
    { value: skillCount, suffix: skillCount >= 1 ? "+" : "", label: "Technologies", desc: "Technologies in the toolkit, used day to day.", deg: 2, y: "lg:translate-y-6" },
    { value: certificateCount, suffix: certificateCount >= 1 ? "+" : "", label: "Certificates verified", desc: "Verified certificates, with credentials to check.", deg: -2, y: "" },
    { value: 24, suffix: "h", label: "Average reply", desc: "Reply time, always. Usually by tomorrow morning.", deg: 3, y: "lg:translate-y-6" },
  ];
  return (
    <section id="about" className="graph-paper overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <div className="relative mx-auto max-w-[820px] text-center">
            <h2 className={headingCls}>I build software<br />people remember</h2>
            <Squiggle className="mx-auto mt-4 h-4 w-36" />
            <p className="mx-auto mt-6 max-w-[58ch] text-[20px] font-medium leading-[1.55] text-[#33362d] sm:text-[24px]">
              {settings.about_statement || "I build reliable software with a focus on clean architecture, useful interfaces, and thoughtful user experiences."}
            </p>
            {settings.philosophy && <p className="mx-auto mt-4 max-w-[54ch] text-[15px] italic leading-[1.65] text-[#55584E]">“{settings.philosophy}”</p>}
            {settings.about_body && <p className="mx-auto mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-[#55584E]">{settings.about_body}</p>}
            <ScaleLink href="#contact" hoverScale={1.04} tapScale={0.96} className="relative mt-8 inline-flex min-h-[52px] items-center rounded-full bg-white px-7 py-3 text-[15px] font-bold text-[#111] shadow-[0_10px_28px_rgba(0,0,0,0.14)] ring-1 ring-black/5">
              <Pushpin className="-left-1 -top-1" /> Start a project →
            </ScaleLink>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={s.y}>
              <PopIn rotateDeg={s.deg} delay={i * 0.09} className="relative rounded-[24px] bg-white p-6 pt-8 shadow-[0_14px_34px_rgba(60,55,20,0.12)]">
                <Pushpin className="left-4 top-3" /><FoldedCorner />
                <p className="text-[52px] font-extrabold leading-none tracking-[-0.03em] text-[#111]">{s.value}{s.suffix}</p>
                <p className="mt-2 text-[16px] font-extrabold text-[#111]">{s.label}</p>
                <p className="mt-1 text-[13px] leading-[1.55] text-[#7A7D6F]">{s.desc}</p>
              </PopIn>
            </div>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="relative mt-16 -rotate-1 rounded-[28px] bg-white p-6 shadow-[0_16px_40px_rgba(60,55,20,0.12)] sm:p-8">
            <Pushpin className="left-5 top-4" /><FoldedCorner />
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-4">
                {settings.avatar_url ? (
                  <Image src={settings.avatar_url} alt={`Portrait of ${settings.name}`} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-[#FFF3B0]" />
                ) : (
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#111] text-[20px] font-bold text-white">{settings.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>
                )}
                <div>
                  <p className="text-[20px] font-extrabold leading-tight text-[#111]">{settings.name}</p>
                  <p className="text-[14px] font-medium text-[#55584E]">{settings.role_title}</p>
                  {settings.location && <p className="text-[13px] text-[#7A7D6F]">{settings.location}</p>}
                  {settings.email && <a href={`mailto:${settings.email}`} className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#111] underline decoration-[#C6F135] decoration-[3px] underline-offset-4"><EnvelopeSimple size={14} /> {settings.email}</a>}
                </div>
              </div>
              <div className="grid flex-1 gap-5 sm:grid-cols-2">
                {interests.length > 0 && (<div><p className="text-[12px] font-extrabold uppercase tracking-wider text-[#7A7D6F]">Interests</p><div className="mt-2 flex flex-wrap gap-1.5">{interests.map((it) => <span key={it} className="rounded-full bg-[#C8F0D8] px-3 py-1 text-[12px] font-semibold text-[#111]">{it}</span>)}</div></div>)}
                {learning.length > 0 && (<div><p className="text-[12px] font-extrabold uppercase tracking-wider text-[#7A7D6F]">Currently learning</p><div className="mt-2 flex flex-wrap gap-1.5">{learning.map((it) => <span key={it} className="rounded-full bg-[#FFF3B0] px-3 py-1 text-[12px] font-semibold text-[#111]">{it}</span>)}</div></div>)}
              </div>
              {settings.resume_url && <a href={settings.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-[#111] px-5 py-2.5 text-[13px] font-bold text-white">View resume →</a>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
