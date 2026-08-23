import Link from "next/link";
import {
  getCertificates,
  getEducation,
  getExperience,
  getMessages,
  getProjects,
  getSkills,
  getSettings,
  getSocialLinks,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [settings, skills, projects, experience, education, certificates, socials, messages] =
    await Promise.all([
      getSettings(),
      getSkills(),
      getProjects(),
      getExperience(),
      getEducation(),
      getCertificates(),
      getSocialLinks(),
      getMessages().catch(() => []),
    ]);

  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Skills", count: skills.length, href: "/admin/skills" },
    {
      label: "Projects",
      count: projects.length,
      href: "/admin/projects",
    },
    {
      label: "Experience",
      count: experience.length,
      href: "/admin/experience",
    },
    {
      label: "Education",
      count: education.length,
      href: "/admin/education",
    },
    {
      label: "Certificates",
      count: certificates.length,
      href: "/admin/certificates",
    },
    { label: "Social links", count: socials.length, href: "/admin/socials" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-mist">
        Welcome back, {settings.name.split(" ")[0]}
      </h1>
      <p className="mt-2 text-sm text-dust">
        Everything on the public site is editable from here.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-mist/[0.07] bg-deep/60 p-6 transition-colors hover:border-starlight/30"
          >
            <p className="text-3xl font-semibold text-mist">{stat.count}</p>
            <p className="mt-1 text-sm text-faint">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/messages"
          className="rounded-2xl border border-mist/[0.07] bg-deep/60 p-6 transition-colors hover:border-starlight/30"
        >
          <p className="text-3xl font-semibold text-mist">
            {unread > 0 ? `${unread} new` : messages.length}
          </p>
          <p className="mt-1 text-sm text-faint">
            {unread > 0 ? "unread messages" : "messages received"}
          </p>
        </Link>

        <div className="rounded-2xl border border-mist/[0.07] bg-deep/60 p-6">
          <p
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wide ${
              settings.available
                ? "border-starlight/40 text-starlight"
                : "border-mist/15 text-faint"
            }`}
          >
            {settings.available ? "Visible as open to work" : "Shown as unavailable"}
          </p>
          <Link
            href="/admin/settings"
            className="link-sweep mt-4 block w-fit text-sm text-starlight"
          >
            Edit hero & about
          </Link>
        </div>
      </div>
    </div>
  );
}
