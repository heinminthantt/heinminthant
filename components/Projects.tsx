import Image from "next/image";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/types";
import { splitList } from "@/lib/types";
import Reveal from "./Reveal";
import CosmicTile from "./CosmicTile";
import SectionLabel from "./SectionLabel";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.live_url && !project.repo_url) return null;
  return (
    <div className="flex items-center gap-5">
      {project.live_url && (
        <a
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-starlight transition-colors hover:text-starbright"
        >
          Visit
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </a>
      )}
      {project.repo_url && (
        <a
          href={project.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-dust transition-colors hover:text-mist"
        >
          <GithubLogo size={15} aria-hidden="true" />
          Source
        </a>
      )}
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  const tech = splitList(project.technologies);
  const bits = [project.year, project.category].filter(Boolean);
  return (
    <div className="flex flex-col gap-4">
      {bits.length > 0 && (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {bits.join(" / ")}
        </p>
      )}
      <h3 className="text-xl font-semibold tracking-tight text-mist sm:text-2xl">
        {project.title}
      </h3>
      <p className="max-w-[58ch] leading-relaxed text-dust">{project.description}</p>
      {tech.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <li key={t} className="rounded-full border border-mist/10 px-3 py-1 text-xs text-dust">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  const [first, ...rest] = projects;

  return (
    <section id="work" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel index="03" label="Selected work" />
            <h2 className="text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
              Selected work
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm text-faint">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </p>
          </Reveal>
        </div>

        {/* Feature row for the first project */}
        <Reveal className="mt-14">
          <article className="grid overflow-hidden rounded-2xl border border-mist/[0.07] bg-deep/60 lg:grid-cols-12">
            <div className="relative min-h-[260px] overflow-hidden lg:col-span-7">
              {first.image_url ? (
                <Image
                  src={first.image_url}
                  alt={first.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              ) : (
                <CosmicTile
                  seed={first.title}
                  className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 md:p-10 lg:col-span-5">
              <Meta project={first} />
              <ProjectLinks project={first} />
            </div>
          </article>
        </Reveal>

        {/* Remaining projects in a two-column grid */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist/[0.07] bg-deep/60 transition-colors duration-300 hover:border-starlight/25">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <CosmicTile
                        seed={project.title}
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-5 p-6 md:p-7">
                    <Meta project={project} />
                    <ProjectLinks project={project} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
