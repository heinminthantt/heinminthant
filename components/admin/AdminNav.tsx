"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/settings", label: "Hero & About" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/socials", label: "Social links" },
  { href: "/admin/messages", label: "Messages" },
];

function PendingDot() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      aria-hidden="true"
      className="ml-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-starlight align-middle"
    />
  );
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 lg:flex-col">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-[10px] px-3.5 py-2 text-sm transition-colors ${
              active
                ? "bg-starlight/10 font-medium text-starlight"
                : "text-dust hover:bg-mist/5 hover:text-mist"
            }`}
          >
            {link.label}
            <PendingDot />
          </Link>
        );
      })}
    </nav>
  );
}
