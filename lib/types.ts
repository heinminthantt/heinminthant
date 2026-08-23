export type SiteSettings = {
  id: number;
  name: string;
  role_title: string;
  hero_headline: string;
  hero_subheadline: string;
  about_statement: string;
  about_body: string;
  philosophy: string;
  interests: string;
  currently_learning: string;
  email: string;
  location: string;
  resume_url: string;
  avatar_url: string;
  availability_label: string;
  available: boolean;
}

export type Skill = {
  id: number;
  category: string;
  name: string;
  level: number;
  sort_order: number;
  visible: boolean;
}

export type Project = {
  id: number;
  title: string;
  description: string;
  long_description: string;
  technologies: string;
  category: string;
  year: string;
  image_url: string;
  live_url: string;
  repo_url: string;
  featured: boolean;
  sort_order: number;
  visible: boolean;
}

export type Experience = {
  id: number;
  company: string;
  role: string;
  date_range: string;
  location: string;
  description: string;
  skills: string;
  sort_order: number;
  visible: boolean;
}

export type Education = {
  id: number;
  university: string;
  degree: string;
  major: string;
  year_range: string;
  coursework: string;
  sort_order: number;
  visible: boolean;
}

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  issue_year: string;
  description: string;
  credential_url: string;
  image_url: string;
  sort_order: number;
  visible: boolean;
}

export type SocialLink = {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
  visible: boolean;
}

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const splitList = (value: string): string[] =>
  value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
