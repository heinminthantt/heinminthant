import Image from "next/image";
import type { Certificate } from "@/lib/types";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { TiltCard } from "./motion-helpers";
import { SectionPill, headingCls, Pushpin } from "./Doodles";

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates" className="graph-paper">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-4 sm:px-6 sm:pb-32">
        <Reveal>
          <SectionPill bg="bg-[#FFF3B0]">Certificates</SectionPill>
          <h2 className={`${headingCls} mt-5`}>Certificates</h2>
          <p className="mt-3 text-[15px] font-medium text-[#55584E]">{certificates.length} verified credentials.</p>
        </Reveal>
        {certificates.length === 0 ? (
          <div className="mt-10 rounded-[24px] bg-white p-8 text-center shadow"><p className="font-bold">No certifications yet</p><p className="mt-1 text-[14px] text-[#55584E]">Verified credentials will appear here with issuer and year.</p></div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 3) * 0.05}>
                <TiltCard rotateDeg={i % 2 ? 1.5 : -1.5} rotateClass={i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"} className="relative flex h-full flex-col rounded-[24px] bg-white p-5 shadow-[0_14px_34px_rgba(60,55,20,0.12)]">
                  <Pushpin className="left-4 top-3" />
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-[16px] bg-[#ECE8DC]">
                    {cert.image_url ? <Image src={cert.image_url} alt={cert.title} fill className="object-cover" unoptimized sizes="(max-width: 768px) 100vw, 33vw" /> : <span className="flex h-full w-full items-center justify-center bg-[#BFE3F5] text-[#174a63]"><Scroll size={36} /></span>}
                  </div>
                  <h3 className="mt-4 text-[18px] font-extrabold leading-tight text-[#111]">{cert.title}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-[#55584E]">{cert.issuer}{cert.issue_year ? ` · ${cert.issue_year}` : ""}</p>
                  {cert.description && <p className="mt-2 line-clamp-2 text-[13.5px] leading-[1.55] text-[#55584E]">{cert.description}</p>}
                  <div className="mt-auto pt-4">
                    {cert.credential_url ? <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center rounded-full bg-[#111] px-5 py-2 text-[12px] font-bold text-white">Verify →</a> : <span className="text-[12px] text-[#7A7D6F]">No verification link</span>}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
