import { getAllProjects } from "@/lib/queries";
import { saveProject, deleteProject } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  { name: "title", label: "Title", type: "text", half: true, required: true },
  { name: "year", label: "Year", type: "text", half: true },
  { name: "category", label: "Category", type: "text", half: true },
  {
    name: "technologies",
    label: "Technologies (comma separated)",
    type: "text",
    half: true,
  },
  { name: "description", label: "Short description", type: "textarea" },
  { name: "long_description", label: "Extended notes (optional)", type: "textarea" },
  { name: "live_url", label: "Live URL", type: "url", half: true },
  { name: "repo_url", label: "Repository URL", type: "url", half: true },
  { name: "image_file", label: "Upload screenshot (optional)", type: "file" },
  { name: "featured", label: "Featured project", type: "checkbox" },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();
  return (
    <EntityManager
      entityLabel="Projects"
      fields={FIELDS}
      items={projects}
      summaryPrimary="title"
      summarySecondary="category"
      imageKey="image_url"
      saveAction={saveProject}
      deleteAction={deleteProject}
    />
  );
}
