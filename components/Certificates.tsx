import Image from "next/image";
import type { Certificate } from "@/lib/types";
import { Certificate as CertificateIcon, Scroll } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  if (certificates.length === 0) {
    return (
      <section id="certificates" className="border-b border-border bg-bg-subtle">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <CertificateIcon size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Certifications</h2>
            <span className="rounded-[4px] bg-white px-2 py-0.5 text-[12px] font-medium text-text-tertiary">0 verified</span>
          </div>
          <div className="notion-callout mt-4 bg-white p-6 text-center">
            <p className="text-[14px] font-medium text-text">No certifications yet</p>
            <p className="mt-1 text-[13px] text-text-secondary">Verified credentials will appear here with issuer and year.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="certificates" className="border-b border-border bg-bg-subtle">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-border bg-white text-text shadow-sm" aria-hidden>
              <CertificateIcon size={15} weight="regular" />
            </span>
            <h2 className="text-[20px] font-[700] tracking-[-0.02em] text-text">Certifications</h2>
            <span className="rounded-[4px] bg-white px-2 py-0.5 text-[12px] tabular text-text-tertiary shadow-sm">{certificates.length} verified</span>
            <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[12px] text-text-tertiary sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0b6e99]" aria-hidden /> List · Verify to audit
            </span>
          </div>
        </Reveal>

        <div className="mt-4 overflow-hidden rounded-[8px] border border-border bg-white">
          <div className="hidden grid-cols-[1.6fr_0.9fr_0.6fr_110px] gap-0 border-b border-border bg-bg-subtle text-[12px] font-semibold tracking-wide text-text-tertiary sm:grid">
            <div className="px-3 py-2.5">Name</div>
            <div className="border-l border-border px-3 py-2.5">Issuer</div>
            <div className="border-l border-border px-3 py-2.5">Year</div>
            <div className="border-l border-border px-3 py-2.5">Link</div>
          </div>
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col gap-3 border-b border-border p-3 last:border-0 hover:bg-bg-subtle/50 sm:grid sm:grid-cols-[1.6fr_0.9fr_0.6fr_110px] sm:gap-0 sm:p-0"
            >
              <div className="flex min-w-0 items-center gap-3 px-0 sm:px-3 sm:py-3">
                <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-[6px] border border-border bg-bg-subtle">
                  {cert.image_url ? (
                    <Image src={cert.image_url} alt={cert.title} fill className="object-cover" unoptimized />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-blue-bg text-blue" aria-hidden>
                      <Scroll size={16} weight="regular" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium leading-tight text-text">{cert.title}</p>
                  {cert.description && <p className="line-clamp-1 text-[12px] text-text-secondary">{cert.description}</p>}
                  <p className="mt-1 text-[12px] text-text-tertiary sm:hidden">
                    {cert.issuer} {cert.issue_year ? `· ${cert.issue_year}` : ""}
                  </p>
                </div>
              </div>
              <div className="hidden items-center border-l border-border px-3 text-[13px] text-text sm:flex">{cert.issuer}</div>
              <div className="hidden items-center border-l border-border px-3 text-[13px] tabular text-text sm:flex">{cert.issue_year || <span className="text-text-faint">—</span>}</div>
              <div className="hidden items-center border-l border-border px-3 sm:flex">
                {cert.credential_url ? (
                  <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-[6px] bg-text px-2.5 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover">
                    Verify →
                  </a>
                ) : (
                  <span className="rounded-[4px] bg-bg-subtle px-2 py-1 text-[12px] text-text-tertiary">No link</span>
                )}
              </div>
              <div className="sm:hidden">
                {cert.credential_url ? (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-[6px] bg-text px-3 py-2 text-[13px] font-medium text-white hover:bg-accent-hover"
                  >
                    Verify →
                  </a>
                ) : (
                  <span className="block rounded-[6px] bg-bg-subtle px-3 py-2 text-center text-[12px] text-text-tertiary">No verification link</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
