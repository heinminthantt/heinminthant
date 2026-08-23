import { getAllExperience } from "@/lib/queries";
import { saveExperience, deleteExperience } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  { name: "company", label: "Company", type: "text", half: true, required: true },
  { name: "role", label: "Role", type: "text", half: true, required: true },
  { name: "date_range", label: "Date range (e.g. 2026 or 2024 - 2025)", type: "text", half: true },
  { name: "location", label: "Location", type: "text", half: true },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "skills",
    label: "Skills used (comma separated)",
    type: "textarea",
  },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminExperiencePage() {
  const experience = await getAllExperience();
  return (
    <EntityManager
      entityLabel="Experience"
      fields={FIELDS}
      items={experience}
      summaryPrimary="role"
      summarySecondary="company"
      saveAction={saveExperience}
      deleteAction={deleteExperience}
    />
  );
}
