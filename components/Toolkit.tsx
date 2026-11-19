import type { Skill } from "@/lib/types";
import Reveal from "./Reveal";
import TechLogo from "./TechLogo";
import { SectionPill, headingCls, CloudOutline } from "./Doodles";

function groupByCategory(skills: Skill[]): [string, Skill[]][] {
  const map = new Map<string, Skill[]>();
  for (const s of skills) { const list = map.get(s.category) ?? []; list.push(s); map.set(s.category, list); }
  return Array.from(map.entries());
}
function levelLabel(level: number) {
  if (level >= 85) return { label: "Expert", cls: "bg-[#EDE9FE] text-[#3d2f7a]" };
  if (level >= 65) return { label: "Proficient", cls: "bg-[#BFE3F5] text-[#174a63]" };
  if (level >= 40) return { label: "Intermediate", cls: "bg-[#FFF3B0] text-[#64513a]" };
  return { label: "Learning", cls: "bg-[#F4F1EA] text-[#55584E]" };
}

export default function Toolkit({ skills }: { skills: Skill[] }) {
  const grouped = groupByCategory(skills);
  return (
    <section id="toolkit" className="graph-paper">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <div className="relative">
            <SectionPill>Toolkit</SectionPill>
            <CloudOutline className="absolute right-2 top-0 h-11 w-20 sm:right-16" />
            <h2 className={`${headingCls} mt-5`}>My toolkit</h2>
            <p className="mt-3 text-[15px] font-medium text-[#55584E]">{skills.length} technologies, grouped by what they do.</p>
          </div>
        </Reveal>
        {skills.length === 0 ? (
          <div className="mt-10 rounded-[24px] bg-white p-8 text-center shadow"><p className="font-bold">No items yet</p><p className="mt-1 text-[14px] text-[#55584E]">Skills will appear grouped by category once added in admin.</p></div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {grouped.map(([category, items], i) => (
              <Reveal key={category} delay={i * 0.03}>
                <div className="h-full rounded-[24px] bg-white p-5 shadow-[0_14px_34px_rgba(60,55,20,0.10)]">
                  <div className="flex items-center gap-2 border-b border-[#E2DDCE] pb-3">
                    <span className="text-[16px] font-extrabold text-[#111]">{category}</span>
                    <span className="ml-auto rounded-full bg-[#F4F1EA] px-2.5 py-0.5 text-[11px] font-bold tabular text-[#7A7D6F]">{items.length}</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {items.map((skill) => { const lvl = levelLabel(skill.level); return (
                      <div key={skill.id} className="group flex items-center justify-between gap-2 rounded-[14px] bg-[#FAF8F2] px-3 py-2.5 ring-1 ring-[#EDE9DB]">
                        <span className="flex min-w-0 items-center gap-2.5"><TechLogo name={skill.name} /><span className="truncate text-[14px] font-semibold text-[#111]">{skill.name}</span></span>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${lvl.cls}`} title={`${skill.level}%`}>{lvl.label}</span>
                      </div>); })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
