import { getAllSkills } from "@/lib/queries";
import { saveSkill, deleteSkill } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  {
    name: "category",
    label: "Category (e.g. Languages, Frontend)",
    type: "text",
    half: true,
    required: true,
  },
  { name: "name", label: "Skill name", type: "text", half: true, required: true },
  { name: "level", label: "Level (0-100)", type: "number", half: true },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminSkillsPage() {
  const skills = await getAllSkills();
  return (
    <EntityManager
      entityLabel="Skills"
      fields={FIELDS}
      items={skills}
      summaryPrimary="name"
      summarySecondary="category"
      saveAction={saveSkill}
      deleteAction={deleteSkill}
    />
  );
}
