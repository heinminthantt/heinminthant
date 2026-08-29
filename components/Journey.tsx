import type { Education, Experience } from "@/lib/types";
import { splitList } from "@/lib/types";
import { ClockCounterClockwise, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

interface JourneyProps { experience: Experience[]; education: Education[]; }

export default function Journey({ experience, education }: JourneyProps) {
  if (experience.length === 0 && education.length === 0) {
    return (
      <section id="journey" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <ClockCounterClockwise size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Journey</h2>
            <span className="rounded-[4px] bg-bg-subtle px-2 py-0.5 text-[12px] font-medium text-text-tertiary">0 entries</span>
          </div>
          <div className="notion-callout mt-6 p-6 text-center">
            <p className="text-[14px] font-medium text-text">Journey not yet added</p>
            <p className="mt-1 text-[13px] text-text-secondary">Experience and education will appear here once added in admin.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="journey" className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12">
        {/* rhythm: dense ledger, tighter than Projects */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <ClockCounterClockwise size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Journey</h2>
            <span className="rounded-[4px] bg-bg-subtle px-2 py-0.5 text-[12px] tabular text-text-tertiary">{experience.length + education.length} entries</span>
            <span className="ml-auto hidden items-center gap-2 text-[12px] text-text-tertiary sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6e99]" aria-hidden /> Table view · Sorted by date
            </span>
          </div>
        </Reveal>

        {/* Mini timeline — fast scan for hiring manager */}
        {experience.length > 0 && (
          <div className="mt-6 grid gap-3 lg:hidden">
            {experience.slice(0, 3).map((job) => (
              <div key={`mini-${job.id}`} className="relative flex gap-3 rounded-[8px] border border-border bg-bg-subtle p-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0b6e99] shadow-[0_0_0_3px_#e9f3f7]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium tabular text-text-tertiary">{job.date_range}</p>
                  <p className="text-[14px] font-semibold leading-tight text-text">{job.role} · {job.company}</p>
                  {job.location && <p className="text-[12px] text-text-tertiary">{job.location}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience — Notion table + adapted cards on small */}
        <div className="mt-6 hidden overflow-x-auto rounded-[8px] border border-border lg:block">
          <div className="min-w-[720px]">
            <div className="sticky top-0 z-[1] grid grid-cols-[140px_1.4fr_1fr_0.9fr] gap-0 border-b border-border bg-bg-subtle text-[12px] font-semibold tracking-wide text-text-tertiary">
              <div className="px-3 py-2.5">Date</div>
              <div className="border-l border-border px-3 py-2.5">Role</div>
              <div className="border-l border-border px-3 py-2.5">Company</div>
              <div className="border-l border-border px-3 py-2.5">Focus</div>
            </div>

            {experience.map((job) => {
              const skills = splitList(job.skills);
              return (
                <div key={job.id} className="grid grid-cols-[140px_1.4fr_1fr_0.9fr] gap-0 border-b border-border last:border-0 hover:bg-bg-subtle/60">
                  <div className="px-3 py-3 text-[13px] tabular text-text-secondary">{job.date_range}</div>
                  <div className="border-l border-border px-3 py-3">
                    <p className="text-[14px] font-medium leading-tight text-text">{job.role}</p>
                    <p className="mt-1 text-[13px] leading-[1.5] text-text-secondary">{job.description}</p>
                  </div>
                  <div className="border-l border-border px-3 py-3 text-[13px] text-text">
                    <p className="font-medium">{job.company}</p>
                    {job.location && <p className="text-text-tertiary">{job.location}</p>}
                  </div>
                  <div className="border-l border-border px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 4).map((s) => (
                        <span key={s} className="rounded-[4px] bg-white px-1.5 py-0.5 text-[11px] text-text-secondary shadow-sm">
                          {s}
                        </span>
                      ))}
                      {skills.length > 4 && <span className="px-1 py-0.5 text-[11px] tabular text-text-tertiary">+{skills.length - 4}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile adaptation: stacked cards — no horizontal scroll trap */}
        <div className="mt-4 grid gap-3 lg:hidden">
          {experience.map((job) => {
            const skills = splitList(job.skills);
            return (
              <div key={`mob-${job.id}`} className="rounded-[8px] border border-border bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-bg-subtle px-2 py-1 text-[11px] font-medium tabular text-text-tertiary">{job.date_range}</span>
                  {job.location && <span className="text-[12px] text-text-tertiary">· {job.location}</span>}
                </div>
                <p className="mt-2 text-[15px] font-semibold leading-tight text-text">{job.role}</p>
                <p className="text-[13px] font-medium text-text-secondary">{job.company}</p>
                <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">{job.description}</p>
                {skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="rounded-[4px] bg-bg-subtle px-2 py-1 text-[11px] text-text-secondary">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {education.length > 0 && (
          <>
            <h3 className="mt-8 flex items-center gap-2 text-[15px] font-[700] tracking-[-0.015em] text-text">
              <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-border bg-white text-text shadow-sm" aria-hidden>
                <GraduationCap size={15} weight="regular" />
              </span>{" "}
              Education
            </h3>
            <div className="mt-3 hidden overflow-x-auto rounded-[8px] border border-border lg:block">
              <div className="min-w-[680px]">
                <div className="grid grid-cols-[120px_1.2fr_1fr] gap-0 border-b border-border bg-bg-subtle text-[12px] font-semibold tracking-wide text-text-tertiary">
                  <div className="px-3 py-2.5">Year</div>
                  <div className="border-l border-border px-3 py-2.5">Degree</div>
                  <div className="border-l border-border px-3 py-2.5">University</div>
                </div>
                {education.map((s) => {
                  const coursework = splitList(s.coursework);
                  return (
                    <div key={s.id} className="grid grid-cols-[120px_1.2fr_1fr] gap-0 border-b border-border last:border-0 hover:bg-bg-subtle/60">
                      <div className="px-3 py-3 text-[13px] tabular text-text-secondary">{s.year_range}</div>
                      <div className="border-l border-border px-3 py-3">
                        <p className="text-[14px] font-medium text-text">{s.degree}</p>
                        {s.major && <p className="text-[12px] text-text-tertiary">{s.major}</p>}
                        {coursework.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {coursework.slice(0, 4).map((c) => (
                              <span key={c} className="rounded-[4px] bg-bg-subtle px-1.5 py-0.5 text-[11px] text-text-secondary">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="border-l border-border px-3 py-3 text-[13px] text-text">{s.university}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 grid gap-3 lg:hidden">
              {education.map((s) => {
                const coursework = splitList(s.coursework);
                return (
                  <div key={`edu-mob-${s.id}`} className="rounded-[8px] border border-border bg-white p-4">
                    <p className="text-[12px] tabular text-text-tertiary">{s.year_range}</p>
                    <p className="mt-1 text-[14px] font-semibold text-text">{s.degree}</p>
                    {s.major && <p className="text-[12px] text-text-secondary">{s.major}</p>}
                    <p className="text-[13px] text-text">{s.university}</p>
                    {coursework.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {coursework.map((c) => (
                          <span key={c} className="rounded-[4px] bg-bg-subtle px-1.5 py-0.5 text-[11px] text-text-secondary">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
