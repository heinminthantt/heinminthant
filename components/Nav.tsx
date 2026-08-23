"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#work", label: "Work" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6">
        <nav className="nav-glass pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-[18px] px-4 sm:px-5">
          <Link
            href="/"
            className="shrink-0 font-mono text-sm tracking-wide text-mist transition-colors hover:text-starlight"
          >
            {name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-pill rounded-full px-3.5 py-1.5 text-sm text-dust hover:text-mist"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav-pill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-dust hover:text-mist md:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </nav>

        {open && (
          <div className="pointer-events-auto mt-2 flex flex-col gap-1 rounded-[18px] border border-mist/[0.07] bg-deep/95 p-3 md:hidden">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2.5 text-base text-dust transition-colors hover:bg-mist/5 hover:text-mist"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
