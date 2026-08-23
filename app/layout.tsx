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

    title: {
      default: `${settings.name} - ${settings.role_title}`,
      template: `%s | ${settings.name}`,
    },

    description,

    applicationName: settings.name,

    keywords: [
      settings.name,
      "software engineer",
      "developer",
      "portfolio",
      "full-stack developer",
      "React",
      "Next.js",
      "TypeScript",
    ],

    authors: [
      {
        name: settings.name,
        url: "https://heinminthant.com",
      },
    ],

    creator: settings.name,

    openGraph: {
      title: `${settings.name} - ${settings.role_title}`,
      description,
      type: "website",
      locale: "en_US",
      url: "https://heinminthant.com",
      siteName: settings.name,
    },

    twitter: {
      card: "summary_large_image",
      title: `${settings.name} - ${settings.role_title}`,
      description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: "https://heinminthant.com",
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="bg-space text-mist">
        <WebsiteStructuredData />

        {children}

        <div className="nebula-haze" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}