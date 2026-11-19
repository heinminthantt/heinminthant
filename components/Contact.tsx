import type { SiteSettings, SocialLink } from "@/lib/types";
import { EnvelopeSimple, MapPin, NotePencil } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { SectionPill, headingCls } from "./Doodles";

interface ContactProps { settings: SiteSettings; socials: SocialLink[]; }

export default function Contact({ settings, socials }: ContactProps) {
  return (
    <section id="contact" className="bg-[#F4F1EA]">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionPill bg="bg-[#F5B8D0]">Contact</SectionPill>
          <h2 className={`${headingCls} mt-5`}>Let&apos;s build<br />something useful.</h2>
          <p className="mt-3 inline-flex rounded-full bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#111] shadow-sm">Reply within 24h</p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[28px] bg-[#BFE3F5] p-6 shadow-[0_14px_34px_rgba(60,55,20,0.10)] sm:p-7">
              <p className="max-w-[42ch] text-[16px] leading-[1.65] text-[#174a63]">Have a project in mind, a role to fill, or just want to talk shop? My inbox is always open. I reply within 24 hours.</p>
              <div className="mt-6 flex flex-col gap-3">
                {settings.email && <a href={`mailto:${settings.email}`} className="inline-flex w-fit min-h-[44px] items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-bold text-[#111] shadow"><EnvelopeSimple size={16} /> {settings.email}</a>}
                {settings.location && <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#174a63]"><MapPin size={16} /> {settings.location}</span>}
                <div className="flex flex-wrap gap-2">{socials.map((s) => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#111] shadow-sm">{s.platform}</a>)}</div>
              </div>
            </div>
            <div className="mt-5 rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(60,55,20,0.08)]">
              <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#111]">What happens next</p>
              <ol className="mt-4 space-y-3.5">
                {["You send a short note about the goal.", "I reply with scope and next steps within a day.", "We start with a small, focused slice."].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-[#55584E]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C6F135] text-[12px] font-extrabold tabular text-[#111]">{String(i + 1).padStart(2, "0")}</span>{step}</li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_44px_rgba(60,55,20,0.12)] sm:p-7">
              <div className="mb-5 flex items-center gap-2 border-b border-[#E2DDCE] pb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFF3B0] text-[#111]"><NotePencil size={18} /></span>
                <span className="text-[15px] font-extrabold text-[#111]">New message</span>
                <span className="ml-auto rounded-full bg-[#F4F1EA] px-3 py-1 text-[11px] font-bold text-[#7A7D6F]">Required *</span>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
