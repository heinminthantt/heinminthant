import { getAllEducation } from "@/lib/queries";
import { saveEducation, deleteEducation } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  { name: "university", label: "University / school", type: "text", half: true, required: true },
  { name: "degree", label: "Degree", type: "text", half: true, required: true },
  { name: "major", label: "Major / field", type: "text", half: true },
  { name: "year_range", label: "Years (e.g. 2022 - Present)", type: "text", half: true },
  {
    name: "coursework",
    label: "Coursework or achievements (comma separated)",
    type: "textarea",
  },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminEducationPage() {
  const education = await getAllEducation();
  return (
    <EntityManager
      entityLabel="Education"
      fields={FIELDS}
      items={education}
      summaryPrimary="degree"
      summarySecondary="university"
      saveAction={saveEducation}
      deleteAction={deleteEducation}
    />
  );
}
