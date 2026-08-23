import type { Skill } from "@/lib/types";
import Reveal from "./Reveal";
import TechLogo from "./TechLogo";
import SectionLabel from "./SectionLabel";

function groupByCategory(skills: Skill[]): [string, Skill[]][] {
  const map = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = map.get(skill.category) ?? [];
    list.push(skill);
    map.set(skill.category, list);
  }
  return Array.from(map.entries());
}

export default function Toolkit({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;
  const grouped = groupByCategory(skills);

  return (
    <section id="toolkit" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <SectionLabel index="02" label="Toolkit" />
          <h2 className="text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
            Toolkit
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {grouped.map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.07}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-starlight">
                {category}
              </p>
              <ul className="flex flex-col">
                {items.map((skill) => (
                  <li
                    key={skill.id}
                    className="group flex items-center justify-between gap-3 border-b border-mist/[0.06] py-2.5"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <TechLogo name={skill.name} />
                      <span className="truncate text-sm text-dust transition-colors group-hover:text-mist">
                        {skill.name}
                      </span>
                    </span>
                    <span
                      className="h-px shrink-0 bg-starlight/50 transition-all duration-500 group-hover:bg-starlight"
                      style={{ width: `${Math.max(8, skill.level * 0.28)}px` }}
                      title={`${skill.level}%`}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
