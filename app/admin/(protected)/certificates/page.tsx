import { getAllCertificates } from "@/lib/queries";
import { saveCertificate, deleteCertificate } from "@/app/actions/admin";
import EntityManager from "@/components/admin/EntityManager";
import type { FieldDef } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FIELDS: FieldDef[] = [
  { name: "title", label: "Certificate title", type: "text", required: true },
  { name: "issuer", label: "Issuer", type: "text", half: true },
  { name: "issue_year", label: "Year issued", type: "text", half: true },
  { name: "credential_url", label: "Credential verification URL", type: "url" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_file", label: "Upload certificate image (optional)", type: "file" },
  { name: "sort_order", label: "Sort order", type: "number", half: true },
  { name: "visible", label: "Visible on site", type: "checkbox" },
];

export default async function AdminCertificatesPage() {
  const certificates = await getAllCertificates();
  return (
    <EntityManager
      entityLabel="Certificates"
      fields={FIELDS}
      items={certificates}
      summaryPrimary="title"
      summarySecondary="issuer"
      imageKey="image_url"
      saveAction={saveCertificate}
      deleteAction={deleteCertificate}
    />
  );
}
