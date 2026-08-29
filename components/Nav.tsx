"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#toolkit", label: "Toolkit" },
  { href: "/#work", label: "Work" },
  { href: "/#journey", label: "Journey" },
  { href: "/#certificates", label: "Certs" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b bg-white/80 nav-blur ${scrolled ? "border-border" : "border-transparent"}`}>
      <div className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[14px] font-medium tracking-[-0.01em] text-text">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-text text-[12px] font-semibold leading-none text-white">H</span>
          <span className="hidden sm:inline">{name}</span>
          <span className="hidden text-text-tertiary sm:inline">/</span>
          <span className="hidden text-text-secondary sm:inline">Portfolio</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[6px] px-2.5 py-1.5 text-[13px] font-medium text-text-secondary hover:bg-bg-subtle hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-[6px] bg-text px-3.5 py-2 text-[14px] font-medium text-white hover:bg-accent-hover lg:inline-flex"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border bg-white text-text shadow-sm hover:bg-bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text lg:hidden"
          >
            <span className="relative block h-3 w-3">
              <span className={`absolute left-0 top-0 h-[1.5px] w-3 bg-current transition-all ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[5px] h-[1.5px] w-3 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 top-[10px] h-[1.5px] w-3 bg-current transition-all ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-[6px] px-3 py-3 text-[15px] font-medium text-text hover:bg-bg-subtle active:bg-bg-subtle"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-[6px] bg-text px-4 py-3 text-[14px] font-medium text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
