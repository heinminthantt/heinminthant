import type { Skill } from "@/lib/types";
import { Toolbox } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import TechLogo from "./TechLogo";

function groupByCategory(skills: Skill[]): [string, Skill[]][] {
  const map = new Map<string, Skill[]>();
  for (const s of skills) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return Array.from(map.entries());
}

const DOT: Record<string, string> = {
  Languages: "bg-[#e03e3e]",
  Frontend: "bg-[#0b6e99]",
  Backend: "bg-[#6940a5]",
  Database: "bg-[#4c7268]",
  Tools: "bg-[#dfab01]",
};

function levelLabel(level: number) {
  if (level >= 85) return { label: "Expert", cls: "bg-[#ede9fe] text-[#3d2f7a] border-[#e0d9ff]" };
  if (level >= 65) return { label: "Proficient", cls: "bg-blue-bg text-blue border-[#d3e5ef]" };
  if (level >= 40) return { label: "Intermediate", cls: "bg-[#fbf3db] text-[#64513a] border-[#f0deb4]" };
  return { label: "Learning", cls: "bg-bg-subtle text-text-secondary border-border" };
}

export default function Toolkit({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) {
    return (
      <section id="toolkit" className="border-b border-border bg-bg-subtle">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <Toolbox size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Toolkit</h2>
            <span className="rounded-[4px] bg-white px-2 py-0.5 text-[12px] font-medium text-text-tertiary">0 items</span>
          </div>
          <div className="notion-callout mt-6 bg-white p-6 text-center">
            <p className="text-[14px] font-medium text-text">No items yet</p>
            <p className="mt-1 text-[13px] text-text-secondary">Skills will appear grouped by category once added in admin.</p>
          </div>
        </div>
      </section>
    );
  }
  const grouped = groupByCategory(skills);

  return (
    <section id="toolkit" className="border-b border-border bg-bg-subtle">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <Toolbox size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Toolkit</h2>
            <span className="rounded-[4px] bg-white px-2 py-0.5 text-[12px] font-medium tabular text-text-tertiary shadow-sm">{skills.length} items</span>
            <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-blue-border bg-blue-bg px-2.5 py-1 text-[12px] font-medium text-blue sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-blue" aria-hidden /> Board by category · Level is a select
            </span>
          </div>

        </Reveal>

        {/* Toolkit as Notion board — true grid, no horizontal scroll */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.03}>
              <div className="rounded-[10px] border border-border bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 border-b border-border pb-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full border border-white shadow-sm ${DOT[category] || "bg-text-tertiary"}`} aria-hidden />
                  <span className="text-[13px] font-semibold tracking-[-0.01em] text-text">{category}</span>
                  <span className="ml-auto rounded-[4px] bg-bg-subtle px-1.5 py-0.5 text-[11px] tabular text-text-tertiary">{items.length}</span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {items.map((skill) => {
                    const lvl = levelLabel(skill.level);
                    return (
                      <div key={skill.id} className="flex items-center justify-between gap-2 rounded-[6px] border border-border bg-bg-subtle px-2.5 py-2.5">
                        <span className="flex min-w-0 items-center gap-2">
                          <TechLogo name={skill.name} />
                          <span className="truncate text-[13px] font-medium text-text">{skill.name}</span>
                        </span>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${lvl.cls}`} title={`${skill.level}% — ${lvl.label}`}>
                          {lvl.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
