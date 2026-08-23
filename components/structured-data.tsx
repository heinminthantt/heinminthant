// components/structured-data.tsx

import { getSettings } from "@/lib/queries";

export async function WebsiteStructuredData() {
  const settings = await getSettings();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hein Min Thant",
    url: "https://heinminthant.com/",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}