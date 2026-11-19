import Link from "next/link";
import type { SocialLink } from "@/lib/types";
import HillsScene from "./HillsScene";
import GooglyEyes from "./GooglyEyes";
import { StickerLabels } from "./Hero";
import { LiftAnchor, ScaleLink, StaggerHeadline } from "./motion-helpers";

export default function Footer({ name, socials, email }: { name: string; socials: SocialLink[]; email?: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#FFF3B0]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-[-5%] top-[38%] -rotate-[8deg] whitespace-nowrap text-[120px] font-extrabold lowercase text-[#111]/[0.05]">let&apos;s work · let&apos;s work · let&apos;s work</span>
      </div>
      <div className="relative mx-auto max-w-[1280px] px-4 pb-32 pt-16 sm:px-6 sm:pt-20">
        <div className="hills-grain relative min-h-[560px] overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(60,55,20,0.25)]">
          <div className="absolute inset-0"><HillsScene className="h-full w-full" /></div>
          <div className="relative z-10 flex min-h-[560px] flex-col p-6 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex flex-wrap gap-2.5">
                {email && <LiftAnchor href={`mailto:${email}`} ariaLabel="Email" title="Email" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[15px] font-extrabold text-[#111] shadow-lg">@</LiftAnchor>}
                {socials.map((s) => <LiftAnchor key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" ariaLabel={s.platform} title={s.platform} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[13px] font-extrabold text-[#111] shadow-lg">{s.platform.charAt(0)}</LiftAnchor>)}
              </div>
              <div className="text-right text-white [text-shadow:0_2px_10px_rgba(30,90,40,0.4)]">
                <p className="text-[22px] font-extrabold leading-tight">Have an idea?</p>
                <p className="mt-1 max-w-[28ch] text-[14px] font-medium">Let&apos;s turn it into software people remember.</p>
              </div>
            </div>
            <div className="mt-10 flex justify-center"><GooglyEyes /></div>
            <div className="mt-6 flex justify-center"><StickerLabels className="justify-center" /></div>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-12">
              <StaggerHeadline lines={["Let's build", "something", "memorable"]} className="text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-white [text-shadow:0_4px_28px_rgba(30,90,40,0.4)]" />
              <ScaleLink href="#contact" hoverScale={1.05} tapScale={0.95} className="inline-flex min-h-[56px] items-center rounded-full bg-white px-8 py-3.5 text-[16px] font-extrabold text-[#111] shadow-xl">Let&apos;s chat →</ScaleLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[17px] font-extrabold uppercase tracking-wide text-[#111]">{name}</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {[["About", "#about"], ["Projects", "#work"], ["Services", "#services"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([label, href]) => (
              <Link key={href} href={href} className="text-[13px] font-extrabold uppercase tracking-wide text-[#111] hover:underline">{label}</Link>
            ))}
          </nav>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#111]/10 pt-4 text-[12.5px] font-medium text-[#55584E]">
          <span>© {year} {name}</span>
          <span>Yangon · Remote</span>
          <Link href="#top" className="font-bold text-[#111]">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
