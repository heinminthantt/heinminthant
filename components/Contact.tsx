import type { SiteSettings, SocialLink } from "@/lib/types";
import { EnvelopeSimple, MapPin, NotePencil } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

interface ContactProps { settings: SiteSettings; socials: SocialLink[]; }

export default function Contact({ settings, socials }: ContactProps) {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <EnvelopeSimple size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Contact</h2>
            <span className="rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-[11px] font-medium tracking-wide text-text-tertiary">Reply within 24h</span>
            <span className="ml-auto hidden text-[12px] text-text-tertiary sm:inline">Let’s talk →</span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[8px] border border-[#d3e5ef] bg-blue-bg p-5">
              <h3 className="max-w-[18ch] text-[20px] font-semibold leading-tight tracking-[-0.015em] text-blue sm:text-[22px]">Let’s build something useful.</h3>
              <p className="mt-2 max-w-[42ch] text-[14px] leading-[1.6] text-blue/80">Have a project in mind, a role to fill, or just want to talk shop? My inbox is always open. I reply within 24 hours.</p>

              <div className="mt-5 flex flex-col gap-2 text-[13px]">
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="inline-flex w-fit items-center gap-1.5 rounded-[6px] bg-white px-3 py-2 text-[13px] font-medium text-text shadow-sm hover:bg-white">
                    <EnvelopeSimple size={14} weight="regular" aria-hidden /> {settings.email}
                  </a>
                )}
                {settings.location && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-blue/70">
                    <MapPin size={14} weight="regular" aria-hidden /> {settings.location}
                  </span>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {socials.map((s) => (
                    <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-[6px] bg-white px-3 py-1.5 text-[13px] font-medium text-text shadow-sm hover:bg-white">
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[8px] border border-border bg-bg-subtle p-4 text-[13px] leading-[1.6] text-text-secondary">
              <p className="text-[12px] font-semibold tracking-wide text-text">What happens next</p>
              <ol className="mt-2 space-y-1.5">
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-medium tabular text-text-tertiary shadow-sm">01</span> You send a short note about the goal.</li>
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-medium tabular text-text-tertiary shadow-sm">02</span> I reply with scope and next steps within a day.</li>
                <li className="flex gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-medium tabular text-text-tertiary shadow-sm">03</span> We start with a small, focused slice.</li>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[8px] border border-border bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-border bg-bg-subtle text-text" aria-hidden>
                  <NotePencil size={14} weight="regular" />
                </span>
                <span className="text-[13px] font-semibold text-text">New message</span>
                <span className="ml-auto rounded-[4px] bg-bg-subtle px-2 py-0.5 text-[11px] text-text-tertiary">Required *</span>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
