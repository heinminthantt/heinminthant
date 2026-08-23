import { rest } from "./rest";
import type {
  Certificate,
  Education,
  Experience,
  Message,
  Project,
  SiteSettings,
  Skill,
  SocialLink,
} from "./types";

/* ------------------------------------------------------------------ */
/* Normalizers: coerce REST rows into exact typed shapes so downstream */
/* code never sees undefined fields.                                   */
/* ------------------------------------------------------------------ */

type Row = Record<string, unknown>;

const s = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

const num = (v: unknown, fallback = 0): number =>
  typeof v === "number" && Number.isFinite(v)
    ? v
    : typeof v === "string" && /^\d+$/.test(v)
      ? Number(v)
      : fallback;

const bool = (v: unknown, fallback = false): boolean =>
  typeof v === "boolean" ? v : fallback;

const iso = (v: unknown): string =>
  typeof v === "string"
    ? v
    : new Date().toISOString();

function normSettings(r: Row | undefined | null, base: SiteSettings): SiteSettings {
  if (!r) return base;
  return {
    id: num(r.id, 1),
    name: s(r.name, base.name),
    role_title: s(r.role_title, base.role_title),
    hero_headline: s(r.hero_headline, base.hero_headline),
    hero_subheadline: s(r.hero_subheadline),
    about_statement: s(r.about_statement),
    about_body: s(r.about_body),
    philosophy: s(r.philosophy),
    interests: s(r.interests),
    currently_learning: s(r.currently_learning),
    email: s(r.email),
    location: s(r.location),
    resume_url: s(r.resume_url),
    avatar_url: s(r.avatar_url),
    availability_label: s(r.availability_label, base.availability_label),
    available: bool(r.available, true),
  };
}

function normSkill(r: Row): Skill {
  return {
    id: num(r.id),
    category: s(r.category),
    name: s(r.name),
    level: Math.min(100, Math.max(0, num(r.level))),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normProject(r: Row): Project {
  return {
    id: num(r.id),
    title: s(r.title),
    description: s(r.description),
    long_description: s(r.long_description),
    technologies: s(r.technologies),
    category: s(r.category),
    year: s(r.year),
    image_url: s(r.image_url),
    live_url: s(r.live_url),
    repo_url: s(r.repo_url),
    featured: bool(r.featured),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normExperience(r: Row): Experience {
  return {
    id: num(r.id),
    company: s(r.company),
    role: s(r.role),
    date_range: s(r.date_range),
    location: s(r.location),
    description: s(r.description),
    skills: s(r.skills),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normEducation(r: Row): Education {
  return {
    id: num(r.id),
    university: s(r.university),
    degree: s(r.degree),
    major: s(r.major),
    year_range: s(r.year_range),
    coursework: s(r.coursework),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normCertificate(r: Row): Certificate {
  return {
    id: num(r.id),
    title: s(r.title),
    issuer: s(r.issuer),
    issue_year: s(r.issue_year),
    description: s(r.description),
    credential_url: s(r.credential_url),
    image_url: s(r.image_url),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normSocialLink(r: Row): SocialLink {
  return {
    id: num(r.id),
    platform: s(r.platform),
    url: s(r.url),
    sort_order: num(r.sort_order),
    visible: bool(r.visible, true),
  };
}

function normMessage(r: Row): Message {
  return {
    id: num(r.id),
    name: s(r.name),
    email: s(r.email),
    message: s(r.message),
    read: bool(r.read),
    created_at: iso(r.created_at),
  };
}

async function safe<T>(
  run: () => PromiseLike<{
    data: Row[] | null;
    error: { message: string } | null;
  }>,
  map: (r: Row) => T,
  fallback: T[],
): Promise<T[]> {
  try {
    const { data, error } = await run();
    if (error || !Array.isArray(data)) return fallback;
    return data.map(map);
  } catch {
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/* Public reads                                                        */
/* ------------------------------------------------------------------ */

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  name: "Hein Min Thant",
  role_title: "Software Engineer / Developer",
  hero_headline: "Building thoughtful digital experiences through code.",
  hero_subheadline: "",
  about_statement: "",
  about_body: "",
  philosophy: "",
  interests: "",
  currently_learning: "",
  email: "",
  location: "",
  resume_url: "",
  avatar_url: "",
  availability_label: "Open to work",
  available: true,
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await rest()
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) return DEFAULT_SETTINGS;
    return normSettings(data as Row | null, DEFAULT_SETTINGS);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getSkills(): Promise<Skill[]> {
  return safe(
    () => rest().from("skills").select("*").eq("visible", true).order("sort_order").order("id"),
    normSkill,
    [],
  );
}

export async function getProjects(): Promise<Project[]> {
  return safe(
    () => rest().from("projects").select("*").eq("visible", true).order("sort_order").order("id"),
    normProject,
    [],
  );
}

export async function getExperience(): Promise<Experience[]> {
  return safe(
    () =>
      rest()
        .from("experience")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: false })
        .order("id", { ascending: false }),
    normExperience,
    [],
  );
}

export async function getEducation(): Promise<Education[]> {
  return safe(
    () => rest().from("education").select("*").eq("visible", true).order("sort_order").order("id"),
    normEducation,
    [],
  );
}

export async function getCertificates(): Promise<Certificate[]> {
  return safe(
    () =>
      rest()
        .from("certificates")
        .select("*")
        .eq("visible", true)
        .order("sort_order")
        .order("id"),
    normCertificate,
    [],
  );
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return safe(
    () =>
      rest()
        .from("social_links")
        .select("*")
        .eq("visible", true)
        .order("sort_order")
        .order("id"),
    normSocialLink,
    [],
  );
}

export async function getMessages(): Promise<Message[]> {
  return safe(
    () => rest().from("messages").select("*").order("created_at", { ascending: false }),
    normMessage,
    [],
  );
}

/* ------------------------- admin: unfiltered reads ------------------------ */

export async function getAllSkills(): Promise<Skill[]> {
  return safe(() => rest().from("skills").select("*").order("sort_order").order("id"), normSkill, []);
}

export async function getAllProjects(): Promise<Project[]> {
  return safe(
    () => rest().from("projects").select("*").order("sort_order").order("id"),
    normProject,
    [],
  );
}

export async function getAllExperience(): Promise<Experience[]> {
  return safe(
    () =>
      rest()
        .from("experience")
        .select("*")
        .order("sort_order", { ascending: false })
        .order("id", { ascending: false }),
    normExperience,
    [],
  );
}

export async function getAllEducation(): Promise<Education[]> {
  return safe(
    () => rest().from("education").select("*").order("sort_order").order("id"),
    normEducation,
    [],
  );
}

export async function getAllCertificates(): Promise<Certificate[]> {
  return safe(
    () => rest().from("certificates").select("*").order("sort_order").order("id"),
    normCertificate,
    [],
  );
}

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  return safe(
    () => rest().from("social_links").select("*").order("sort_order").order("id"),
    normSocialLink,
    [],
  );
}
