import Image from "next/image";
import { MapPin, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { splitList } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import SpotlightText from "./SpotlightText";

export default function About({ settings }: { settings: SiteSettings }) {
  const interests = splitList(settings.interests);
  const learning = splitList(settings.currently_learning);

  return (
    <section id="about" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <SectionLabel index="01" label="About" />
        </Reveal>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <h2 className="text-3xl font-semibold leading-snug tracking-tight text-mist sm:text-4xl">
              <SpotlightText>
                {settings.about_statement || `I build reliable software that serves the people who use it.`}
              </SpotlightText>
            </h2>
            {settings.philosophy && (
              <figure className="mt-12 border-l border-starlight/30 pl-6">
                <blockquote className="max-w-[52ch] text-base italic leading-relaxed text-dust sm:text-lg">
                  &ldquo;{settings.philosophy}&rdquo;
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  Philosophy
                </figcaption>
              </figure>
            )}
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            {settings.avatar_url && (
              <div className="group/avatar relative w-fit">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-full bg-[radial-gradient(closest-side,rgba(230,185,95,0.28),transparent_75%)] opacity-70 blur-md transition-opacity duration-500 group-hover/avatar:opacity-100"
                />
                <Image
                  src={settings.avatar_url}
                  alt={`Portrait of ${settings.name}`}
                  width={104}
                  height={104}
                  className="relative h-[104px] w-[104px] rounded-full border border-starlight/30 object-cover shadow-[0_0_32px_rgba(230,185,95,0.18)]"
                />
              </div>
            )}
            <p className="leading-relaxed text-dust">{settings.about_body}</p>

            {(interests.length > 0 || learning.length > 0) && (
              <div className="flex flex-col gap-5 pt-2">
                {interests.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                      Interests
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {interests.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-mist/10 px-3 py-1 text-xs text-dust"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {learning.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                      Currently learning
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {learning.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-starlight/25 bg-starlight/[0.06] px-3 py-1 text-xs text-starbright"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="mt-2 flex flex-col gap-2.5 border-t border-mist/[0.07] pt-5 font-mono text-sm">
              {settings.location && (
                <span className="inline-flex items-center gap-2.5 text-dust">
                  <MapPin size={14} className="text-starlight" aria-hidden="true" />
                  {settings.location}
                </span>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2.5 text-dust transition-colors hover:text-mist"
                >
                  <EnvelopeSimple size={14} className="text-starlight" aria-hidden="true" />
                  {settings.email}
                </a>
              )}
              {settings.resume_url && (
                <a
                  href={settings.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep w-fit text-starlight"
                >
                  View résumé
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
