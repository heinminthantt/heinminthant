"use server";

import { rest } from "@/lib/rest";
import { isAuthenticated } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export interface ActionState {
  ok?: boolean;
  error?: string;
}

async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function int(formData: FormData, key: string): number {
  const n = Number.parseInt(str(formData, key), 10);
  return Number.isFinite(n) ? n : 0;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

async function maybeUpload(
  formData: FormData,
  field: string,
  folder: string,
): Promise<string | null> {
  const file = formData.get(field);
  if (file instanceof File && file.size > 0) {
    return uploadImage(file, folder);
  }
  return null;
}

function refresh(): void {
  revalidatePath("/", "layout");
}

/* ------------------------------ site settings ----------------------------- */

export async function saveSettings(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const avatar = await maybeUpload(formData, "avatar_file", "site");
    const name = str(formData, "name");
    if (!name) return { error: "Name is required." };

    const { error } = await rest()
      .from("site_settings")
      .update({
        name,
        role_title: str(formData, "role_title"),
        hero_headline: str(formData, "hero_headline"),
        hero_subheadline: str(formData, "hero_subheadline"),
        about_statement: str(formData, "about_statement"),
        about_body: str(formData, "about_body"),
        philosophy: str(formData, "philosophy"),
        interests: str(formData, "interests"),
        currently_learning: str(formData, "currently_learning"),
        email: str(formData, "email"),
        location: str(formData, "location"),
        resume_url: str(formData, "resume_url"),
        avatar_url: avatar ?? str(formData, "avatar_url"),
        availability_label: str(formData, "availability_label"),
        available: bool(formData, "available"),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

/* ---------------------------------- skills -------------------------------- */

export async function saveSkill(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const name = str(formData, "name");
    const category = str(formData, "category");
    if (!name || !category) return { error: "Name and category are required." };
    const values = {
      category,
      name,
      level: Math.min(100, Math.max(0, int(formData, "level"))),
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("skills").update(values).eq("id", id)
        : await rest().from("skills").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteSkill(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("skills").delete().eq("id", int(formData, "id"));
  refresh();
}

/* --------------------------------- projects ------------------------------- */

export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const title = str(formData, "title");
    if (!title) return { error: "Title is required." };
    const image = await maybeUpload(formData, "image_file", "projects");

    const values = {
      title,
      description: str(formData, "description"),
      long_description: str(formData, "long_description"),
      technologies: str(formData, "technologies"),
      category: str(formData, "category"),
      year: str(formData, "year"),
      image_url: image ?? str(formData, "image_url"),
      live_url: str(formData, "live_url"),
      repo_url: str(formData, "repo_url"),
      featured: bool(formData, "featured"),
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("projects").update(values).eq("id", id)
        : await rest().from("projects").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteProject(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("projects").delete().eq("id", int(formData, "id"));
  refresh();
}

/* -------------------------------- experience ------------------------------ */

export async function saveExperience(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const company = str(formData, "company");
    const role = str(formData, "role");
    if (!company || !role) return { error: "Company and role are required." };

    const values = {
      company,
      role,
      date_range: str(formData, "date_range"),
      location: str(formData, "location"),
      description: str(formData, "description"),
      skills: str(formData, "skills"),
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("experience").update(values).eq("id", id)
        : await rest().from("experience").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteExperience(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("experience").delete().eq("id", int(formData, "id"));
  refresh();
}

/* -------------------------------- education ------------------------------- */

export async function saveEducation(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const university = str(formData, "university");
    const degree = str(formData, "degree");
    if (!university || !degree) {
      return { error: "University and degree are required." };
    }

    const values = {
      university,
      degree,
      major: str(formData, "major"),
      year_range: str(formData, "year_range"),
      coursework: str(formData, "coursework"),
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("education").update(values).eq("id", id)
        : await rest().from("education").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteEducation(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("education").delete().eq("id", int(formData, "id"));
  refresh();
}

/* ------------------------------- certificates ------------------------------ */

export async function saveCertificate(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const title = str(formData, "title");
    if (!title) return { error: "Title is required." };
    const image = await maybeUpload(formData, "image_file", "certificates");

    const values = {
      title,
      issuer: str(formData, "issuer"),
      issue_year: str(formData, "issue_year"),
      description: str(formData, "description"),
      credential_url: str(formData, "credential_url"),
      image_url: image ?? str(formData, "image_url"),
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("certificates").update(values).eq("id", id)
        : await rest().from("certificates").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteCertificate(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("certificates").delete().eq("id", int(formData, "id"));
  refresh();
}

/* ------------------------------- social links ----------------------------- */

export async function saveSocialLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAuth();
    const id = int(formData, "id");
    const platform = str(formData, "platform");
    const url = str(formData, "url");
    if (!platform || !url) {
      return { error: "Platform and URL are required." };
    }

    const values = {
      platform,
      url,
      sort_order: int(formData, "sort_order"),
      visible: bool(formData, "visible"),
    };

    const { error } =
      id > 0
        ? await rest().from("social_links").update(values).eq("id", id)
        : await rest().from("social_links").insert(values);

    if (error) return { error: error.message };
    refresh();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save." };
  }
}

export async function deleteSocialLink(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("social_links").delete().eq("id", int(formData, "id"));
  refresh();
}

/* --------------------------------- messages -------------------------------- */

export async function markMessageRead(formData: FormData): Promise<void> {
  await requireAuth();
  await rest()
    .from("messages")
    .update({ read: true })
    .eq("id", int(formData, "id"));
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData): Promise<void> {
  await requireAuth();
  await rest().from("messages").delete().eq("id", int(formData, "id"));
  revalidatePath("/admin/messages");
}
