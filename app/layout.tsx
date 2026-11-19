import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSettings } from "@/lib/queries";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const description =
    settings.hero_subheadline ||
    `${settings.name}, ${settings.role_title.toLowerCase()}. ${settings.about_statement}`;
  return {
    metadataBase: new URL("https://heinminthant.com"),
    title: { default: `${settings.name} - ${settings.role_title}`, template: `%s | ${settings.name}` },
    description,
    applicationName: settings.name,
    keywords: [settings.name, "software engineer", "developer", "portfolio", "React", "Next.js", "TypeScript"],
    authors: [{ name: settings.name, url: "https://heinminthant.com" }],
    creator: settings.name,
    openGraph: {
      title: `${settings.name} - ${settings.role_title}`,
      description,
      type: "website",
      locale: "en_US",
      url: "https://heinminthant.com",
      siteName: settings.name,
    },
    twitter: { card: "summary_large_image", title: `${settings.name} - ${settings.role_title}`, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
    alternates: { canonical: "https://heinminthant.com" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="bg-bg text-text">
        {/* THESIS: Creatie-inspired playful scrapbook / sticker-book portfolio — warm cream + graph paper, huge ALL-CAPS grotesque headlines, tilted sticker cards, pushpins, pastel bars, bottom dock nav, adapted to Hein's real content as a software engineer.
            VECTOR BACKGROUND FIX: the template's scenic backgrounds were stretched low-quality raster photos. Here every scenic background is a crisp inline SVG scene (components/HillsScene.tsx: sky gradient, sun, layered green hills, one white cloud, flower speckles) plus a subtle SVG grain overlay, sharp at any size, used in Hero, Projects and the Footer CTA. No external stock or template images as backgrounds.
            OWN-WORLD: Cream #F4F1EA + graph paper #FDF6E3 with pale-blue grid, ink #111, accents lime #C6F135 / mustard #E3D44A / dusty blue #6B93A8 / pink #F5B8D0 / pale blue #BFE3F5 / mint #C8F0D8 / pale yellow #FFF3B0, cards rounded 24-32px tilted ±2-6deg with soft shadows.
            STORY: Hero over the hills (wordmark, availability badge, sticker labels, fanned project cards, googly eyes), black marquee, About with real computed stats, Projects as browser-window cards over the hills, pastel Services bars, Toolkit / Journey / Certificates on graph paper, FAQ pastel pills, Contact, then a pale-yellow footer with a HillsScene CTA card.
            FINISH: unreviewed and undocumented is unfinished; this build ends with detect, build, screenshots, verdict, and DESIGN.md */}
        {children}
      </body>
    </html>
  );
}
