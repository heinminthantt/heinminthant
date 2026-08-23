import type { Education, Experience } from "@/lib/types";
import { splitList } from "@/lib/types";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

interface JourneyProps {
  experience: Experience[];
  education: Education[];
}

export default function Journey({ experience, education }: JourneyProps) {
  if (experience.length === 0 && education.length === 0) return null;

  return (
    <section id="journey" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <SectionLabel index="04" label="Journey" />
          <h2 className="text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
            Journey
          </h2>
        </Reveal>

        <div className="mt-14 flex max-w-3xl flex-col">
          {experience.map((job, i) => {
            const skills = splitList(job.skills);
            return (
              <Reveal key={job.id} delay={i * 0.06}>
                <div className="grid gap-2 border-l border-mist/[0.09] py-7 pl-7 sm:grid-cols-[130px_1fr] sm:gap-8">
                  <p className="font-mono text-xs leading-6 tracking-wide text-starlight">
                    {job.date_range}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-semibold text-mist">{job.role}</h3>
                      <p className="mt-1 text-sm text-dust">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                    </div>
                    {job.description && (
                      <p className="leading-relaxed text-dust">{job.description}</p>
                    )}
                    {skills.length > 0 && (
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-mist/10 px-3 py-1 text-xs text-dust"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {education.length > 0 && (
            <>
              <h3 className="mt-10 pb-2 text-lg font-semibold text-mist">Education</h3>
              {education.map((school, i) => {
                const coursework = splitList(school.coursework);
                return (
                  <Reveal key={school.id} delay={i * 0.06}>
                    <div className="grid gap-2 border-l border-mist/[0.09] py-7 pl-7 sm:grid-cols-[130px_1fr] sm:gap-8">
                      <p className="font-mono text-xs leading-6 tracking-wide text-starlight">
                        {school.year_range}
                      </p>
                      <div className="flex flex-col gap-3">
                        <div>
                          <h4 className="font-semibold text-mist">{school.degree}</h4>
                          <p className="mt-1 text-sm text-dust">{school.university}</p>
                        </div>
                        {coursework.length > 0 && (
                          <ul className="flex flex-wrap gap-2 pt-1">
                            {coursework.map((course) => (
                              <li
                                key={course}
                                className="rounded-full border border-mist/10 px-3 py-1 text-xs text-dust"
                              >
                                {course}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
