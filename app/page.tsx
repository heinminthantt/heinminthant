import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Certificates from "@/components/Certificates";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getSettings,
  getSkills,
  getProjects,
  getExperience,
  getEducation,
  getCertificates,
  getSocialLinks,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage() {
  const [settings, skills, projects, experience, education, certificates, socials] =
    await Promise.all([
      getSettings(),
      getSkills(),
      getProjects(),
      getExperience(),
      getEducation(),
      getCertificates(),
      getSocialLinks(),
    ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://heinminthant.com/#website",
        url: "https://heinminthant.com",
        name: settings.name,
        alternateName: ["heinminthant.com"],
        description: settings.about_statement,
        publisher: { "@id": "https://heinminthant.com/#person" },
      },
      {
        "@type": "Person",
        "@id": "https://heinminthant.com/#person",
        name: settings.name,
        url: "https://heinminthant.com",
        jobTitle: settings.role_title,
        description: settings.about_statement,
        email: settings.email ? `mailto:${settings.email}` : undefined,
        sameAs: socials
          .filter((s) => s.url.startsWith("http"))
          .map((s) => s.url),
        knowsAbout: skills.map((s) => s.name),
      },
    ],
  };

  return (
    <div id="top" className="relative min-h-[100dvh] overflow-x-clip bg-[#F4F1EA]">
      <JsonLd data={structuredData} />
      <Nav name={settings.name} available={settings.available} availabilityLabel={settings.availability_label} />
      <main className="relative">
        <Hero
          roleTitle={settings.role_title}
          headline={settings.hero_headline}
          subheadline={settings.hero_subheadline}
          available={settings.available}
          availabilityLabel={settings.availability_label}
          avatarUrl={settings.avatar_url}
          name={settings.name}
          projects={projects}
        />
        <Marquee />
        <About settings={settings} projectCount={projects.length} skillCount={skills.length} certificateCount={certificates.length} />
        <Projects projects={projects} />
        <Services />
        <Toolkit skills={skills} />
        <Journey experience={experience} education={education} />
        <Certificates certificates={certificates} />
        <Faq />
        <Contact settings={settings} socials={socials} />
      </main>
      <Footer name={settings.name} socials={socials} email={settings.email} />
    </div>
  );
}
