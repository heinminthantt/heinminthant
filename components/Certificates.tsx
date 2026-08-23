import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Certificate } from "@/lib/types";
import Reveal from "./Reveal";
import CosmicTile from "./CosmicTile";
import SectionLabel from "./SectionLabel";

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <SectionLabel index="05" label="Certifications" />
          <h2 className="text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
            Certifications
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="-mx-6 mt-12 flex gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-width:thin]">
            {certificates.map((cert) => (
              <article
                key={cert.id}
                className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-mist/[0.07] bg-deep/60 transition-colors duration-300 hover:border-starlight/25 sm:w-[340px]"
              >
                {cert.image_url ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={cert.image_url}
                      alt={cert.title}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <CosmicTile seed={cert.title} className="aspect-[16/9]" />
                )}

                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    {[cert.issuer, cert.issue_year].filter(Boolean).join(" / ")}
                  </p>
                  <h3 className="font-semibold leading-snug text-mist">{cert.title}</h3>
                  {cert.description && (
                    <p className="text-sm leading-relaxed text-dust">{cert.description}</p>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm text-starlight transition-colors hover:text-starbright"
                    >
                      Verify credential
                      <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
