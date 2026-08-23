import type { SiteSettings, SocialLink } from "@/lib/types";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import ContactForm from "./ContactForm";

interface ContactProps {
  settings: SiteSettings;
  socials: SocialLink[];
}

export default function Contact({ settings, socials }: ContactProps) {
  return (
    <section id="contact" className="section-rule relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="06" label="Contact" />
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-mist sm:text-4xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-dust">
              Have a project in mind, a role to fill, or just want to talk shop?
              My inbox is always open.
            </p>

            <div className="mt-9 flex flex-col gap-2.5 font-mono text-sm">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="link-sweep w-fit text-starlight"
                >
                  {settings.email}
                </a>
              )}
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep w-fit text-dust transition-colors hover:text-mist"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
