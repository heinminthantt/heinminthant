import { getSettings } from "@/lib/queries";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-mist">
        Hero & About
      </h1>
      <p className="mt-2 text-sm text-dust">
        These fields drive the hero section and about area of your site.
      </p>
      <div className="mt-10 max-w-2xl">
        <SettingsForm
          values={{
            name: settings.name,
            role_title: settings.role_title,
            hero_headline: settings.hero_headline,
            hero_subheadline: settings.hero_subheadline,
            about_statement: settings.about_statement,
            about_body: settings.about_body,
            philosophy: settings.philosophy,
            interests: settings.interests,
            currently_learning: settings.currently_learning,
            email: settings.email,
            location: settings.location,
            resume_url: settings.resume_url,
            avatar_url: settings.avatar_url,
            availability_label: settings.availability_label,
            available: settings.available,
          }}
        />
      </div>
    </div>
  );
}
