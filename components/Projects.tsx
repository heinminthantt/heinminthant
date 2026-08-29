import Image from "next/image";
import type { Project } from "@/lib/types";
import { splitList } from "@/lib/types";
import { ArrowRight, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

function NotionGalleryFallback({ title, id }: { title: string; id: number | string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-subtle p-4 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-white text-[12px] font-medium tracking-[-0.02em] text-text-tertiary">
        {String(id).padStart(2, "0")}
      </span>
      <span className="max-w-[16ch] text-[12px] leading-[1.4] text-text-tertiary">No cover — {title}</span>
      <span className="rounded-[4px] bg-white px-1.5 py-0.5 text-[11px] text-text-faint">Add image in admin</span>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <section id="work" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-text text-white" aria-hidden>
              <SquaresFour size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Selected work</h2>
            <span className="rounded-[4px] bg-bg-subtle px-2 py-0.5 text-[12px] font-medium text-text-tertiary">0 pages</span>
          </div>
          <div className="notion-callout mt-6 p-6 text-center">
            <p className="text-[14px] font-medium text-text">No pages yet</p>
            <p className="mx-auto mt-1 max-w-[42ch] text-[13px] leading-[1.5] text-text-secondary">Projects will appear here once added in admin. Each needs title, description, and links — no invented covers.</p>
          </div>
        </div>
      </section>
    );
  }
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="work" className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-14">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-text text-white" aria-hidden>
                <SquaresFour size={15} weight="regular" />
              </span>
              <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Selected work</h2>
              <span className="rounded-[4px] bg-bg-subtle px-2 py-0.5 text-[12px] tabular text-text-tertiary">{projects.length} pages</span>
              <span className="hidden rounded-[4px] border border-border bg-white px-2 py-0.5 text-[12px] text-text-tertiary sm:inline">Gallery · Featured row</span>
            </div>
            <span className="hidden text-[12px] text-text-tertiary sm:inline">Cover · Name · Properties · Links</span>
          </div>
        </Reveal>

        {/* Featured editorial row — hierarchy, not equal cards */}
        <Reveal>
          <article className="notion-card group mt-6 grid overflow-hidden lg:grid-cols-[1.4fr_0.95fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle lg:aspect-[16/10]">
              {featured.image_url ? (
                <Image
                  src={featured.image_url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  priority
                />
              ) : (
                <NotionGalleryFallback title={featured.title} id={featured.id} />
              )}
              <div className="absolute left-3 top-3 flex gap-2">
                <span className="rounded-full bg-text px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">Featured</span>
                {featured.year && <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-text shadow-sm">{featured.year}</span>}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  {featured.category && (
                    <span className="inline-flex rounded-[4px] bg-bg-subtle px-2 py-1 text-[11px] font-medium tracking-wide text-text-tertiary">
                      {featured.category}
                    </span>
                  )}
                  <h3 className="mt-2 text-[22px] font-[700] leading-[1.05] tracking-[-0.025em] text-text sm:text-[26px]">{featured.title}</h3>
                </div>
                <span className="shrink-0 rounded-[7px] border border-border bg-white px-2.5 py-1 text-[11px] font-semibold tabular text-text-tertiary">01</span>
              </div>
              <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.6] text-text-secondary">{featured.description}</p>
              {(() => {
                const tech = splitList(featured.technologies);
                return tech.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tech.slice(0, 6).map((t) => (
                      <span key={t} className="rounded-full border border-border bg-white px-2 py-1 text-[11px] text-text-secondary">
                        {t}
                      </span>
                    ))}
                    {tech.length > 6 && <span className="px-1 py-1 text-[11px] text-text-tertiary">+{tech.length - 6}</span>}
                  </div>
                ) : null;
              })()}
              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4">
                {featured.live_url ? (
                  <a
                    href={featured.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex items-center gap-1.5 rounded-[6px] bg-text px-3.5 py-2 text-[13px] font-medium text-white hover:bg-accent-hover"
                  >
                    Open live <ArrowRight size={14} weight="regular" className="transition-transform duration-200 group-hover/live:translate-x-0.5" aria-hidden />
                  </a>
                ) : (
                  <span className="text-[12px] text-text-tertiary">No live URL</span>
                )}
                {featured.repo_url && (
                  <a href={featured.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-[6px] border border-border bg-white px-3.5 py-2 text-[13px] font-medium text-text hover:bg-bg-subtle">
                    Source
                  </a>
                )}
              </div>
            </div>
          </article>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => {
              const tech = splitList(project.technologies);
              const idx = String(i + 2).padStart(2, "0");
              return (
                <Reveal key={project.id} delay={(i % 3) * 0.04}>
                  <article className="notion-card group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-subtle">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <NotionGalleryFallback title={project.title} id={project.id} />
                      )}
                      <div className="absolute left-2 top-2 flex gap-1.5">
                        {project.year && <span className="rounded-[4px] bg-white px-1.5 py-0.5 text-[11px] font-medium text-text shadow-sm">{project.year}</span>}
                      </div>
                      <span className="absolute right-2 top-2 rounded-[6px] border border-border bg-white px-1.5 py-0.5 text-[11px] tabular text-text-tertiary">{idx}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="line-clamp-1 text-[15px] font-medium leading-tight text-text">{project.title}</h3>
                      {project.category && (
                        <span className="mt-1 w-fit rounded-[4px] bg-blue-bg px-1.5 py-0.5 text-[11px] font-medium text-blue">{project.category}</span>
                      )}
                      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-text-secondary">{project.description}</p>
                      {tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {tech.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-[4px] bg-bg-subtle px-1.5 py-0.5 text-[11px] text-text-secondary">
                              {t}
                            </span>
                          ))}
                          {tech.length > 4 && <span className="px-1 py-0.5 text-[11px] text-text-tertiary">+{tech.length - 4}</span>}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/live-sm inline-flex items-center gap-1 rounded-[6px] bg-text px-2.5 py-1 text-[12px] font-medium text-white hover:bg-accent-hover"
                          >
                            Open <ArrowRight size={12} weight="regular" className="transition-transform duration-200 group-hover/live-sm:translate-x-0.5" aria-hidden />
                          </a>
                        )}
                        {project.repo_url && (
                          <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="rounded-[6px] border border-border bg-white px-2.5 py-1 text-[12px] text-text hover:bg-bg-subtle">
                            Source
                          </a>
                        )}
                        {!project.live_url && !project.repo_url && <span className="text-[12px] text-text-tertiary">Links pending</span>}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
