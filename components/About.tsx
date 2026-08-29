import Image from "next/image";
import { splitList } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";
import { User, Quotes, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

export default function About({ settings }: { settings: SiteSettings }) {
  const interests = splitList(settings.interests);
  const learning = splitList(settings.currently_learning);

  return (
    <section id="about" className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-text-tertiary">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <User size={15} weight="regular" />
            </span>
            <span className="text-[13px] font-semibold tracking-wide text-text">About</span>
            <span className="rounded-full border border-[#d3e5ef] bg-blue-bg px-2 py-0.5 text-[11px] font-medium text-blue">Available for work</span>
            <span className="h-px flex-1 bg-border max-sm:hidden" />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <Reveal>
            <h2 className="max-w-[20ch] text-[30px] font-[700] leading-[1.15] tracking-[-0.03em] text-text sm:text-[36px]">
              {settings.about_statement || "I build reliable software that serves the people who use it."}
            </h2>

            {settings.philosophy && (
              <div className="mt-5 flex gap-3 rounded-[8px] border border-[#d3e5ef] bg-blue-bg p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d3e5ef] bg-white text-blue shadow-sm" aria-hidden>
                  <Quotes size={14} weight="regular" />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] italic leading-[1.6] text-blue">“{settings.philosophy}”</p>
                  <p className="mt-1 text-[11px] font-medium tracking-wide text-blue/70">Philosophy — how I work</p>
                </div>
              </div>
            )}

            {settings.about_body && (
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.65] text-text-secondary">{settings.about_body}</p>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[8px] border border-border bg-bg-subtle p-4">
              <div className="flex items-center gap-3">
                {settings.avatar_url ? (
                  <Image
                    src={settings.avatar_url}
                    alt={`Portrait of ${settings.name}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-text text-[14px] font-medium text-white">
                    {settings.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-[14px] font-medium leading-none text-text">{settings.name}</p>
                  <p className="mt-1 text-[13px] text-text-secondary">{settings.role_title}</p>
                  {settings.location && <p className="text-[12px] text-text-tertiary">{settings.location}</p>}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {interests.length > 0 && (
                  <div>
                    <p className="text-[12px] font-medium text-text-tertiary">Interests</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {interests.map((i) => (
                        <span key={i} className="rounded-[6px] bg-white px-2 py-1 text-[12px] text-text-secondary shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {learning.length > 0 && (
                  <div>
                    <p className="text-[12px] font-medium text-text-tertiary">Currently learning</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {learning.map((i) => (
                        <span key={i} className="rounded-[6px] bg-[#fbe4e4] px-2 py-1 text-[12px] text-[#5a1f1f]">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-[13px]">
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="inline-flex w-fit items-center gap-1.5 rounded-[6px] bg-white px-2.5 py-1.5 text-[13px] font-medium text-text shadow-sm hover:bg-white">
                    <EnvelopeSimple size={14} weight="regular" aria-hidden /> {settings.email}
                  </a>
                )}
                {settings.resume_url && (
                  <a href={settings.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1 rounded-[6px] border border-border bg-bg-subtle px-3 py-1.5 text-[13px] font-medium text-text hover:bg-white">
                    View resume →
                  </a>
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[8px] border border-border bg-white p-3.5">
                <p className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-text-tertiary"><span className="h-1.5 w-1.5 rounded-full bg-[#0b6e99]" aria-hidden /> Reliability</p>
                <p className="mt-1 text-[13px] font-semibold leading-tight text-text">Quietly dependable</p>
                <p className="text-[12px] leading-snug text-text-secondary">Ships that last.</p>
              </div>
              <div className="rounded-[8px] border border-border bg-bg-muted p-3.5">
                <p className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide text-text-tertiary"><span className="h-1.5 w-1.5 rounded-full bg-[#dfab01]" aria-hidden /> Approach</p>
                <p className="mt-1 text-[13px] leading-snug text-text">Clean architecture, calm interfaces.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
