import Link from "next/link";
import type { SocialLink } from "@/lib/types";

export default function Footer({ name, socials }: { name: string; socials: SocialLink[] }) {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-text text-[11px] font-semibold text-white">H</span>
            <span className="font-medium tracking-[-0.01em] text-text">{name}</span>
            <span className="text-text-tertiary">© {new Date().getFullYear()}</span>
            <span className="hidden rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-text-tertiary shadow-sm sm:inline">Yangon · Remote</span>
          </div>

          <div className="flex items-center gap-1.5">
            {socials.slice(0, 4).map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] px-2.5 py-1.5 text-[13px] text-text-secondary hover:bg-white hover:text-text"
              >
                {s.platform}
              </a>
            ))}
            <Link href="#top" className="ml-2 rounded-[6px] border border-border bg-white px-3 py-1.5 text-[13px] text-text hover:bg-white">
              Back to top ↑
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4 text-[12px] text-text-tertiary">
          <span className="font-medium text-text">Available for roles &amp; collaborations</span>
          <span className="text-text-faint">·</span>
        </div>
      </div>
    </footer>
  );
}
