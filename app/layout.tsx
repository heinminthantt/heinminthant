import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getSettings } from "@/lib/queries";
import { WebsiteStructuredData } from "@/components/structured-data";
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
        {/* THESIS: A Notion doc that proves shipping — white doc + 8px + Geist carries hierarchy, blue provenance (#0b6e99/#e9f3f7) owns featured/select/callout at system scale.
            OWN-WORLD: Restrained — #fff/#f7f7f5/#e9e9e9 + #37352f/#111, 8px radius, 0 1px 2px shadow, Geist 700/500/400, 60-62ch measure, left-aligned; cover removed, yellow/red only as select, no glow.
            STORY: Cold hiring manager + freelance client gets in one scroll: who Hein is (About), what he knows (Toolkit grid-as-select), what he shipped (featured editorial row + gallery), how he worked (mini timeline + table/cards adaptive), decisive Contact split 01/02/03.
            FIRST VIEWPORT: Clean header — breadcrumb (availability·role·Yangon), 52px title, Stack/Reply proof pills (2 max), primary View work dominant + secondary conversation, Updated today — no canvas, hierarchy does selling.
            FORM: Notion refinement — P0-P1 polish (cover trap + toolkit scroll + contact fracture + IA order), adapt (board/tables stack <lg), restrained colorize, layout rhythm varied (Hero 10/14, Toolkit 8/10, Projects 12/14, Contact 12/16); seed 79afa416 acknowledged, rebuild not needed.
            FINISH: unreviewed and undocumented is unfinished; this build ends with detect, build, screenshots, verdict, and DESIGN.md */}
        <WebsiteStructuredData />
        {children}
      </body>
    </html>
  );
}
