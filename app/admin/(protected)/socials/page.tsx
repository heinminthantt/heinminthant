import { getAllSocialLinks } from "@/lib/queries";
import { saveSocialLink, deleteSocialLink } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  { name: "platform", label: "Platform (e.g. GitHub, LinkedIn)", type: "text", half: true, required: true },
  { name: "url", label: "URL", type: "text", half: true, required: true },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminSocialsPage() {
  const socials = await getAllSocialLinks();
  return (
    <EntityManager
      entityLabel="Social links"
      fields={FIELDS}
      items={socials}
      summaryPrimary="platform"
      summarySecondary="url"
      saveAction={saveSocialLink}
      deleteAction={deleteSocialLink}
    />
  );
}
