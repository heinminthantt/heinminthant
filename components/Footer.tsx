import Link from "next/link";
import type { SocialLink } from "@/lib/types";

export default function Footer({
  name,
  socials,
}: {
  name: string;
  socials: SocialLink[];
}) {
  return (
    <footer className="section-rule relative z-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faint">
          {name} · © {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6">
          {socials.slice(0, 4).map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dust transition-colors hover:text-mist"
            >
              {social.platform}
            </a>
          ))}
          <Link
            href="#top"
            className="text-sm text-starlight transition-colors hover:text-starbright"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
