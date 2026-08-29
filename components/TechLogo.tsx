"use client";

import { useState } from "react";

/**
 * Skill logo chips backed by the simple-icons CDN.
 * Dimmed monochrome by default; the brand color fades in on hover.
 * Icons missing from simple-icons fall back to devicon originals
 * (grayscale by default, full color on hover), then to a mono
 * letter chip - so nothing ever renders as a broken image.
 */

const DIM = "8a90aa";
const ACCENT = "e6b95f";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// simple-icons dropped these marks; devicon has faithful originals.
const OVERRIDES: Record<string, string[]> = {
  java: [`${DEVICON}/java/java-original.svg`],
  "c++": [`${DEVICON}/cplusplus/cplusplus-original.svg`],
  cpp: [`${DEVICON}/cplusplus/cplusplus-original.svg`],
  "c#": [`${DEVICON}/csharp/csharp-original.svg`],
  csharp: [`${DEVICON}/csharp/csharp-original.svg`],
};

// Slugs whose official brand color is too dark for the page background;
// those get the site accent instead of their brand color on hover.
const DARK_BRANDS = new Set([
  "nextdotjs",
  "vercel",
  "express",
  "github",
  "rust",
  "flask",
  "apple",
]);

const SLUGS: Record<string, string[]> = {
  python: ["python"],
  c: ["c"],
  javascript: ["javascript"],
  js: ["javascript"],
  typescript: ["typescript"],
  ts: ["typescript"],
  react: ["react"],
  reactnative: ["react"],
  nextjs: ["nextdotjs"],
  nodejs: ["nodedotjs"],
  node: ["nodedotjs"],
  express: ["express", "expressdotjs"],
  tailwindcss: ["tailwindcss"],
  html: ["html5"],
  html5: ["html5"],
  css: ["css"],
  sass: ["sass"],
  postgresql: ["postgresql"],
  postgres: ["postgresql"],
  mysql: ["mysql"],
  mongodb: ["mongodb"],
  mongo: ["mongodb"],
  redis: ["redis"],
  sqlite: ["sqlite"],
  prisma: ["prisma"],
  graphql: ["graphql"],
  supabase: ["supabase"],
  firebase: ["firebase"],
  django: ["django"],
  flask: ["flask"],
  fastapi: ["fastapi"],
  spring: ["spring"],
  springboot: ["springboot"],
  php: ["php"],
  laravel: ["laravel"],
  ruby: ["ruby"],
  rails: ["rubyonrails"],
  rubyonrails: ["rubyonrails"],
  rust: ["rust"],
  go: ["go"],
  golang: ["go"],
  kotlin: ["kotlin"],
  swift: ["swift"],
  dart: ["dart"],
  flutter: ["flutter"],
  docker: ["docker"],
  kubernetes: ["kubernetes"],
  k8s: ["kubernetes"],
  git: ["git"],
  github: ["github"],
  gitlab: ["gitlab"],
  linux: ["linux"],
  ubuntu: ["ubuntu"],
  bash: ["gnubash"],
  aws: ["amazonwebservices", "amazonaws"],
  amazonwebservices: ["amazonwebservices", "amazonaws"],
  azure: ["azure"],
  gcp: ["googlecloud"],
  googlecloud: ["googlecloud"],
  vercel: ["vercel"],
  vite: ["vite"],
  jest: ["jest"],
  playwright: ["playwright"],
  cypress: ["cypress"],
  figma: ["figma"],
  postman: ["postman"],
  pandas: ["pandas"],
  numpy: ["numpy"],
  pytorch: ["pytorch"],
  tensorflow: ["tensorflow"],
  scikitlearn: ["scikitlearn"],
};

type Source =
  | { kind: "si"; urls: string[] }
  | { kind: "devicon"; url: string };

function resolve(name: string): Source | null {
  const key = name
    .toLowerCase()
    .trim()
    .replace(/[\s.\-_]/g, "");

  const override = OVERRIDES[name.toLowerCase().trim()] ?? OVERRIDES[key];
  if (override) return { kind: "devicon", url: override[0] };

  const slugs = SLUGS[key];
  if (!slugs) return null;
  return { kind: "si", urls: slugs };
}

function Chip({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-white/15 font-mono text-[9px] uppercase leading-none text-faint"
    >
      {label}
    </span>
  );
}

export default function TechLogo({ name }: { name: string }) {
  const source = resolve(name);
  const [siIdx, setSiIdx] = useState(0);
  const [brandOk, setBrandOk] = useState(true);
  const [overrideOk, setOverrideOk] = useState(true);

  if (!source) {
    return <Chip label={name.charAt(0)} />;
  }

  if (source.kind === "devicon") {
    return (
      <span
        aria-hidden="true"
        className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center"
      >
        {overrideOk ? (
          <img
            src={source.url}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            onError={() => setOverrideOk(false)}
            className="h-4 w-4 opacity-80 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <Chip label={name.charAt(0)} />
        )}
      </span>
    );
  }

  if (siIdx >= source.urls.length) {
    return <Chip label={name.charAt(0)} />;
  }
  const slug = source.urls[siIdx];
  const brandColor = DARK_BRANDS.has(slug) ? ACCENT : "";
  const brandUrl = brandColor
    ? `https://cdn.simpleicons.org/${slug}/${brandColor}`
    : `https://cdn.simpleicons.org/${slug}`;

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center"
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/${DIM}`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        onError={() => {
          setBrandOk(false);
          setSiIdx((i) => i + 1);
        }}
        className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:opacity-0"
      />
      {brandOk && (
        <img
          src={brandUrl}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          onError={() => setBrandOk(false)}
          className="absolute h-4 w-4 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        />
      )}
    </span>
  );
}
